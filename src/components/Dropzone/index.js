import "./Dropzone.css";
import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = ({ picture, setPicture }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setPicture(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    },
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => URL.revokeObjectURL(picture?.preview);
  }, [picture]);

  return (
    <div className="picture-form--container">
      {!picture ? (
        <div {...getRootProps({ className: "frame-image-sender" })}>
          <input name="imageSender" className="" {...getInputProps()} />
          <label htmlFor="imageSender">
            <span>Clique ici pour choisir une image</span> ou{" "}
            <span>Glisse et dépose ton image dans le cadre</span>
          </label>
        </div>
      ) : (
        <div className="preview-image--container">
          <img
            src={picture.preview}
            alt="offer sent by user"
            onLoad={() => {
              URL.revokeObjectURL(picture.preview);
            }}
            onClick={() => {
              setPicture(null);
            }}
          />
          <p>Clique sur l'image pour la supprimer</p>
        </div>
      )}
    </div>
  );
};

export default Dropzone;
