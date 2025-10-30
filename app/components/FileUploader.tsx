import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "../lib/utils";

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const maxFileSize = 20 * 1024 * 1024; // 20MB

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
    maxSize: maxFileSize,
  });

  const file = acceptedFiles[0] || null;

  return (
    <div className="w-full">
      {/* Outer gradient border */}
      <div className="p-[2px] rounded-2xl bg-gradient-to-r from-[#8e98ff] to-[#606beb] transition-all duration-300 hover:shadow-[0_0_30px_#8e98ff50]">
        {/* Inner container */}
        <div
          {...getRootProps()}
          className={`bg-white rounded-2xl p-8 text-center transition-all duration-500 cursor-pointer min-h-[220px] flex flex-col items-center justify-center
            ${
              isDragActive
                ? "shadow-[0_0_25px_#8e98ff80] scale-[1.02]"
                : "hover:shadow-[0_0_15px_#8e98ff30]"
            }`}
        >
          <input {...getInputProps()} />

          {file ? (
            <div
              className="uploader-selected-file w-full flex items-center justify-between bg-gray-50 rounded-xl p-4 transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <img src="/images/pdf.png" alt="pdf" className="size-10" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-700 truncate max-w-[180px]">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFileSelect(null);
                }}
                className="p-2 rounded-full hover:bg-gray-200 transition-all"
                aria-label="Remove file"
              >
                <img
                  src="/icons/cross.svg"
                  alt="remove"
                  className="w-4 h-4 opacity-70 hover:opacity-100"
                />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <img
                src="/icons/info.svg"
                alt="upload"
                className="size-20 opacity-80"
              />
              <p className="text-lg text-gray-500">
                <span className="font-semibold text-gradient">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-sm text-gray-400">
                PDF (max {formatSize(maxFileSize)})
              </p>
            </div>
          )}
        </div>
      </div>

      {fileRejections.length > 0 && (
        <p className="text-red-500 text-sm mt-2">
          File too large or invalid. Please upload a PDF under 20MB.
        </p>
      )}
    </div>
  );
};

export default FileUploader;
