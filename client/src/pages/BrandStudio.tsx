import { useState } from "react";
import BrandAssetUpload from "@/components/BrandAssetUpload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BrandAsset {
  id: string;
  name: string;
  type: "wordmark" | "brandmark" | "avatar" | "icon" | "favicon";
  url?: string;
  isActive?: boolean;
}

export default function BrandStudio() {
  const [assets, setAssets] = useState<BrandAsset[]>([
    { id: "1", name: "swipes-wordmark.png", type: "wordmark", isActive: true },
    { id: "2", name: "swipes-icon.png", type: "icon", isActive: true },
    { id: "3", name: "favicon.ico", type: "favicon", isActive: true },
  ]);

  const handleUpload = (category: BrandAsset["type"]) => (file: File) => {
    console.log('Upload file:', file.name, 'for category:', category);
    const newAsset: BrandAsset = {
      id: Date.now().toString(),
      name: file.name,
      type: category,
      isActive: false,
    };
    setAssets([...assets, newAsset]);
  };

  const handleDelete = (id: string) => {
    setAssets(assets.filter(a => a.id !== id));
    console.log('Deleted asset:', id);
  };

  const handleSetActive = (id: string) => {
    const asset = assets.find(a => a.id === id);
    if (asset) {
      setAssets(assets.map(a => ({
        ...a,
        isActive: a.type === asset.type ? a.id === id : a.isActive
      })));
      console.log('Set active:', id);
    }
  };

  const getAssetsByType = (type: BrandAsset["type"]) => {
    return assets.filter(a => a.type === type);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{ color: "#1844A6" }}>Brand Studio</h1>
        <p className="text-muted-foreground">Manage your brand assets and visual identity</p>
      </div>

      <Tabs defaultValue="wordmark" className="space-y-6">
        <TabsList>
          <TabsTrigger value="wordmark" data-testid="tab-wordmark">Wordmarks</TabsTrigger>
          <TabsTrigger value="brandmark" data-testid="tab-brandmark">Brandmarks</TabsTrigger>
          <TabsTrigger value="avatar" data-testid="tab-avatar">Avatars</TabsTrigger>
          <TabsTrigger value="icon" data-testid="tab-icon">Icons</TabsTrigger>
          <TabsTrigger value="favicon" data-testid="tab-favicon">Favicons</TabsTrigger>
        </TabsList>

        <TabsContent value="wordmark">
          <BrandAssetUpload
            category="wordmark"
            assets={getAssetsByType("wordmark")}
            onUpload={handleUpload("wordmark")}
            onDelete={handleDelete}
            onSetActive={handleSetActive}
          />
        </TabsContent>

        <TabsContent value="brandmark">
          <BrandAssetUpload
            category="brandmark"
            assets={getAssetsByType("brandmark")}
            onUpload={handleUpload("brandmark")}
            onDelete={handleDelete}
            onSetActive={handleSetActive}
          />
        </TabsContent>

        <TabsContent value="avatar">
          <BrandAssetUpload
            category="avatar"
            assets={getAssetsByType("avatar")}
            onUpload={handleUpload("avatar")}
            onDelete={handleDelete}
            onSetActive={handleSetActive}
          />
        </TabsContent>

        <TabsContent value="icon">
          <BrandAssetUpload
            category="icon"
            assets={getAssetsByType("icon")}
            onUpload={handleUpload("icon")}
            onDelete={handleDelete}
            onSetActive={handleSetActive}
          />
        </TabsContent>

        <TabsContent value="favicon">
          <BrandAssetUpload
            category="favicon"
            assets={getAssetsByType("favicon")}
            onUpload={handleUpload("favicon")}
            onDelete={handleDelete}
            onSetActive={handleSetActive}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
