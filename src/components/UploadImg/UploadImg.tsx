// @ts-nocheck
import React, { useState } from "react";
import ImageUploader from "react-images-upload";

const UploadImg = () => {
  const [pictures, setPictures] = useState([]);
  const [img, setImg] = useState(null);

  const onDrop = (picture, e) => {
    console.log(e);
    setPictures([...pictures, picture]);
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImg(URL.createObjectURL(img));
    }
  };
  return (
    <>
      <input type="file" name="myImage" onChange={onImageChange} />
      <img src={img} alt="img" />
      <ImageUploader
        withIcon={true}
        buttonText="Choose images"
        onChange={onDrop}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />
      {pictures.map((el) => {
        console.log(el);
        return <img src={el} alt="img" />;
      })}
    </>
  );
};

export default UploadImg;
