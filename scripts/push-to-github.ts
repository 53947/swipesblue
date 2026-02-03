// GitHub Integration - Push all code to repository
import { Octokit } from '@octokit/rest'
import * as fs from 'fs';
import * as path from 'path';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

const OWNER = '53947';
const REPO = 'swipesblue';
const BRANCH = 'main';

const IGNORE_PATTERNS = [
  'node_modules',
  '.git',
  '.cache',
  '.replit',
  'replit.nix',
  '.upm',
  '.config',
  'scripts/push-to-github.ts',
  'dist',
  '.local'
];

function shouldIgnore(filePath: string): boolean {
  return IGNORE_PATTERNS.some(pattern => filePath.includes(pattern));
}

function getAllFiles(dir: string, baseDir: string = dir): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath);
    
    if (shouldIgnore(relativePath)) continue;
    
    if (entry.isDirectory()) {
      files.push(...getAllFiles(fullPath, baseDir));
    } else {
      files.push(relativePath);
    }
  }
  
  return files;
}

async function main() {
  console.log('🚀 Starting GitHub push...');
  
  const octokit = await getUncachableGitHubClient();
  
  // Get the current commit SHA for the branch
  let currentSha: string;
  try {
    const { data: ref } = await octokit.git.getRef({
      owner: OWNER,
      repo: REPO,
      ref: `heads/${BRANCH}`
    });
    currentSha = ref.object.sha;
    console.log(`📍 Current branch SHA: ${currentSha}`);
  } catch (error: any) {
    if (error.status === 404) {
      console.log('Branch not found, will create new branch');
      currentSha = '';
    } else {
      throw error;
    }
  }

  // Get the current tree
  let baseTree: string | undefined;
  if (currentSha) {
    const { data: commit } = await octokit.git.getCommit({
      owner: OWNER,
      repo: REPO,
      commit_sha: currentSha
    });
    baseTree = commit.tree.sha;
  }

  // Get all files to upload
  const workspaceDir = '/home/runner/workspace';
  const files = getAllFiles(workspaceDir);
  console.log(`📁 Found ${files.length} files to push`);

  // Create blobs for each file
  const treeItems: { path: string; mode: '100644'; type: 'blob'; sha: string }[] = [];
  
  for (const file of files) {
    const fullPath = path.join(workspaceDir, file);
    const content = fs.readFileSync(fullPath);
    const base64Content = content.toString('base64');
    
    try {
      const { data: blob } = await octokit.git.createBlob({
        owner: OWNER,
        repo: REPO,
        content: base64Content,
        encoding: 'base64'
      });
      
      treeItems.push({
        path: file,
        mode: '100644',
        type: 'blob',
        sha: blob.sha
      });
      
      console.log(`✅ Uploaded: ${file}`);
    } catch (error) {
      console.error(`❌ Failed to upload: ${file}`, error);
    }
  }

  // Create a new tree
  console.log('🌳 Creating tree...');
  const { data: newTree } = await octokit.git.createTree({
    owner: OWNER,
    repo: REPO,
    tree: treeItems,
    base_tree: baseTree
  });

  // Create a commit
  console.log('💾 Creating commit...');
  const commitMessage = `Sync all code from Replit - ${new Date().toISOString()}`;
  const { data: newCommit } = await octokit.git.createCommit({
    owner: OWNER,
    repo: REPO,
    message: commitMessage,
    tree: newTree.sha,
    parents: currentSha ? [currentSha] : []
  });

  // Update the branch reference
  console.log('🔄 Updating branch...');
  await octokit.git.updateRef({
    owner: OWNER,
    repo: REPO,
    ref: `heads/${BRANCH}`,
    sha: newCommit.sha,
    force: true
  });

  console.log(`✨ Successfully pushed to GitHub!`);
  console.log(`🔗 https://github.com/${OWNER}/${REPO}`);
}

main().catch(console.error);
