"use client";

import React, { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { FileInput, FileUploader } from "@/components/ui/file-upload";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CloudUpload, X } from "lucide-react";
import Image from "next/image";

type Props = {
  name: string;
};

export default function FileUploadField({ name }: Props) {
  const { control, watch, setValue } = useFormContext();
  const watchedValue = watch(name);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [objectUrl, setObjectUrl] = React.useState<string | null>(null);

  useEffect(() => {
    if (watchedValue instanceof File) {
      const url = URL.createObjectURL(watchedValue);
      setObjectUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setObjectUrl(null);
    }
  }, [watchedValue]);

  const imageUrl =
    watchedValue instanceof File
      ? objectUrl
      : typeof watchedValue === "string" && watchedValue
      ? watchedValue
      : null;

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({}) => (
        <FormItem>
          <FormLabel>Обкладинка книжки</FormLabel>
          <FileUploader
            value={
              watchedValue instanceof File && watchedValue ? [watchedValue] : []
            }
            onValueChange={(selectedFiles) => {
              const selectedFile =
                selectedFiles && selectedFiles.length > 0
                  ? selectedFiles[0]
                  : "";
              setValue(name, selectedFile);
              if (fileInputRef.current && !selectedFile) {
                fileInputRef.current.value = "";
              }
            }}
            dropzoneOptions={dropZoneConfig}
            className="relative bg-background rounded-lg p-2"
          >
            <FileInput
              id="fileInput"
              ref={fileInputRef}
              className="outline-dashed outline-1 outline-slate-500"
            >
              <div className="flex items-center justify-center flex-col p-8 w-full ">
                <CloudUpload className="text-gray-500 w-10 h-10" />
                <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">
                    Натисніть, щоб завантажити
                  </span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG
                </p>
              </div>
            </FileInput>
            <div>
              {imageUrl && (
                <div className="flex items-center gap-2 my-2 justify-between p-1 rounded-xl border border-slate-500">
                  <Image
                    src={imageUrl}
                    alt="Cover Preview"
                    width={56}
                    height={56}
                    className="rounded border object-cover mb-0"
                  />
                  <span className="text-xs truncate max-w-[120px]">
                    {watchedValue instanceof File
                      ? watchedValue.name
                      : typeof watchedValue === "string"
                      ? watchedValue.split("/").pop()
                      : ""}
                  </span>
                  <button
                    type="button"
                    className="ml-2 text-destructive hover:bg-muted/70 p-1 rounded-full"
                    onClick={() => {
                      // Сброс значения (в RHF и у file input)
                      setValue(name, "");
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </FileUploader>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
