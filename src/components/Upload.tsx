"use client";

import { CldUploadWidget } from "next-cloudinary";

import { useState } from "react";

const Upload = ({ handleImageUpload }) => {
  const [resource, setResource] = useState();

  console.log("aaa", resource?.url);
  return (
    <CldUploadWidget
      signatureEndpoint="/api/post"
      onSuccess={(result, { widget }) => {
        console.log("Upload Result:", result);
        setResource(result?.info);
        const imageUrl = result?.info?.url;
        if (imageUrl) {
          handleImageUpload(imageUrl);
        }
        console.log(result);
        widget.close();
      }}
    >
      {({ open }) => {
        function handleOnClick() {
          setResource(undefined);
          open();
        }
        return (
          <button
            onClick={handleOnClick}
            type="button"
          >
            Upload an Image
          </button>
        );
      }}
    </CldUploadWidget>
  );
};

export default Upload;
