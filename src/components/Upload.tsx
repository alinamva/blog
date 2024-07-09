"use client";

import { useState } from "react";
import { Input } from "./ui/input";

const Upload = () => {
  const [resources, setResources] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileList = Array.from(files);
    setResources(fileList);
  };
  return (
    <Input
      type="file"
      name="image"
      multiple
      required
      onChange={handleFileChange}
    />
  );
};

export default Upload;
