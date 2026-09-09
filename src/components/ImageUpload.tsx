import { useState, useRef } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import { uploadImage, getErrorMessage } from "../api/client";
import toast from "react-hot-toast";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file", {
        style: { background: "#D82727", color: "#ffffff" },
      });
      return;
    }
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
      toast.success("Image uploaded", {
        style: { background: "#059669", color: "#ffffff" },
      });
    } catch (err) {
      toast.error(getErrorMessage(err, "Upload failed"), {
        style: { background: "#D82727", color: "#ffffff" },
      });
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-4">
        <div className="h-28 w-40 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center shrink-0">
          {value ? (
            <img src={value} alt="Preview" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="h-8 w-8 text-gray-300" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
          >
            {uploading ? (
              <>
                <span className="h-4 w-4 border-2 border-gray-300 border-t-[#0078B7] rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                {value ? "Replace Image" : "Upload Image"}
              </>
            )}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <X className="h-4 w-4" />
              Remove image
            </button>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-500">
        Or paste an image URL below:
      </p>
    </div>
  );
};

export default ImageUpload;