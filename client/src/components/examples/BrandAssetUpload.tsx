import BrandAssetUpload from '../BrandAssetUpload'
import { useState } from 'react'

export default function BrandAssetUploadExample() {
  const [assets, setAssets] = useState([
    { id: "1", name: "logo-main.png", type: "wordmark" as const, isActive: true },
    { id: "2", name: "logo-alt.png", type: "wordmark" as const, isActive: false },
  ]);

  const handleUpload = (file: File) => {
    console.log('Upload file:', file.name);
    const newAsset = {
      id: Date.now().toString(),
      name: file.name,
      type: "wordmark" as const,
      isActive: false,
    };
    setAssets([...assets, newAsset]);
  };

  const handleDelete = (id: string) => {
    setAssets(assets.filter(a => a.id !== id));
    console.log('Deleted asset:', id);
  };

  const handleSetActive = (id: string) => {
    setAssets(assets.map(a => ({ ...a, isActive: a.id === id })));
    console.log('Set active:', id);
  };

  return (
    <div className="max-w-4xl p-8 bg-background">
      <BrandAssetUpload
        category="wordmark"
        assets={assets}
        onUpload={handleUpload}
        onDelete={handleDelete}
        onSetActive={handleSetActive}
      />
    </div>
  )
}
