import React, { ReactFragment, useRef } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps {
  imageUrl: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  //   onRemove: () => void;
}

const UploadImageInput: React.FunctionComponent<InputProps> = (
  props: InputProps
) => {
  const myRef = useRef<HTMLInputElement | null>(null);
  const methods = useFormContext();
  const { ref } = { ...methods.register("image") };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (myRef.current) {
      myRef.current.click();
    }
  };

  return (
    <div>
      <img src={props.imageUrl} style={{ width: "400px" }} alt="" />
      <input
        id="uploadImgInput"
        type="file"
        placeholder="image"
        {...methods.register("image")}
        ref={(e) => {
          ref(e);
          myRef.current = e;
        }}
        accept="image/*"
        onChange={(e) => {
          props.onChange(e);
        }}
      />

      <button id="refBtn" onClick={(e) => handleClick(e)}>
        Add a new picture
      </button>
      {/* {props.imageUrl && (
        <button id="refBtn" onClick={props.onRemove}>
          {" "}
          remove
        </button>
      )} */}
    </div>
  );
};

export default UploadImageInput;
