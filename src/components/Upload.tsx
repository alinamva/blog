"use client";
import { useState } from "react";
import { Button } from "./ui/button";

const Upload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("Image uploaded successfully!");
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
      <input
        type="file"
        name="image"
        onChange={handleFileChange}
      />
      <Button onClick={handleSubmit}>Upload Image</Button>
    </>
  );
};

export default Upload;
