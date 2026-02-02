import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X, Check } from "lucide-react";
import { useState } from "react";

interface BrandAsset {
  id: string;
  name: string;
  type: "wordmark" | "brandmark" | "avatar" | "icon" | "favicon";
  url?: string;
  isActive?: boolean;
}

interface BrandAssetUploadProps {
  category: BrandAsset["type"];
  assets: BrandAsset[];
  onUpload?: (file: File) => void;
  onDelete?: (id: string) => void;
  onSetActive?: (id: string) => void;
}

const categoryLabels = {
  wordmark: "Wordmarks",
  brandmark: "Brandmarks",
  avatar: "Avatars",
  icon: "Icons",
  favicon: "Favicons",
};

export default function BrandAssetUpload({ 
  category, 
  assets, 
  onUpload, 
  onDelete, 
  onSetActive 
}: BrandAssetUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    console.log('File uploaded:', file.name);
    onUpload?.(file);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{categoryLabels[category]}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={`border-2 border-dashed rounded-md p-8 text-center transition-colors ${
            dragActive ? "border-[#1844A6] bg-muted" : "border-border"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          data-testid={`dropzone-${category}`}
        >
          <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-2">
            Drag and drop or click to upload
          </p>
          <input
            type="file"
            id={`upload-${category}`}
            className="hidden"
            onChange={handleChange}
            accept="image/*"
          />
          <label htmlFor={`upload-${category}`}>
            <Button
              type="button"
              variant="outline"
              style={{ borderColor: "#1844A6", color: "#1844A6" }}
              onClick={() => document.getElementById(`upload-${category}`)?.click()}
              data-testid={`button-upload-${category}`}
            >
              Select File
            </Button>
          </label>
        </div>

        {assets.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {assets.map((asset) => (
              <div
                key={asset.id}
                className={`relative p-4 rounded-md border-2 transition-colors ${
                  asset.isActive ? "border-[#1844A6]" : "border-border"
                }`}
                data-testid={`asset-${asset.id}`}
              >
                {asset.isActive && (
                  <div className="absolute top-2 right-2 bg-[#10B981] rounded-full p-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
                
                <div className="aspect-square bg-muted rounded mb-2 flex items-center justify-center">
                  {asset.url ? (
                    <img src={asset.url} alt={asset.name} className="max-w-full max-h-full" />
                  ) : (
                    <span className="text-xs text-muted-foreground">{asset.name}</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => onSetActive?.(asset.id)}
                    disabled={asset.isActive}
                    data-testid={`button-activate-${asset.id}`}
                  >
                    Set Active
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onDelete?.(asset.id)}
                    style={{ color: "#DC2626" }}
                    data-testid={`button-delete-${asset.id}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
