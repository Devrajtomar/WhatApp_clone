import { User } from "@/containers";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
const Story = () => {
  const [filePreview, setFilePreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function (e) {
      console.log(e);
      setFilePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };
  return <User name={"Name"} status={"12:23 AM"} icon={<BsThreeDots />} />;
};

export default Story;
