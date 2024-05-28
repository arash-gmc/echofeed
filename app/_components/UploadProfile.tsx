import { Button } from "@radix-ui/themes";
import { CldUploadWidget } from "next-cloudinary";
import React from "react";

interface Props {
  passPublicId: (publicId: string) => void;
}

const UploadProfile = ({ passPublicId }: Props) => {
  return (
    <CldUploadWidget
      uploadPreset={process.env.CLOUDINARY_PRESET}
      options={{
        sources: ["local", "google_drive", "instagram", "url"],
        folder: "suci/profiles",
        multiple: false,
        cropping: true,
        croppingAspectRatio: 1,
      }}
      onUpload={(result, widget) => {
        if (result.event !== "success") return;
        const info = result.info as { public_id: string };
        passPublicId(info.public_id);
      }}
    >
      {({ open }) => (
        <Button type="button" variant="soft" onClick={() => open()}>
          Upload
        </Button>
      )}
    </CldUploadWidget>
  );
};

export default UploadProfile;
