import "./form.css";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { useState, useRef } from "react";
import { readBuilderProgram } from "typescript";
import UploadImageInput from "../uploadImageInput";

type Inputs = {
  title: string;
  host: string;
  date: string;
  location: string;
  image: string;
  content: string;
};

export default function CreateEventForm() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageFile, setimageFile] = useState<any>("");

  // const myRef = useRef<HTMLInputElement | null>(null);

  const methods = useForm<Inputs>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    console.log(
      "outPut ~ file: form.tsx ~ line 32 ~ handleChange ~ file",
      file
    );
    setimageFile(e.target.files);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    console.log("click change");
  };

  // const handleImageRemove = () => {
  //   setImageUrl("");
  //   console.log("click remove");
  // };

  const onSubmit = (data: Inputs) => {
    data.image = imageFile;
    console.log("data", data);
    // const formData = new FormData();
    // formData.append("image", data.image);
    // console.log("image", formData.get("image"));
    console.log(errors);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: "required" })}
          />
          {errors.title && <div>{errors.title.message}</div>}
          <input
            type="text"
            placeholder="Hosted by"
            {...register("host", { required: "required" })}
          />
          {errors.host && <div>{errors.host.message}</div>}
          <input
            type="datetime-local"
            placeholder="Date"
            {...register("date", { required: "required" })}
          />
          {errors.date && <div>{errors.date.message}</div>}
          <input
            type="text"
            placeholder="location"
            {...register("location", { required: "required" })}
          />
          {errors.location && <div>{errors.location.message}</div>}
          <UploadImageInput
            imageUrl={imageUrl}
            onChange={handleChange}
            // onRemove={handleImageRemove}
          />
          <textarea
            placeholder="event details"
            {...register("content", { required: "required" })}
          />
          {errors.content && <div>{errors.content.message}</div>}
          <input type="submit" />
        </form>
      </FormProvider>
    </>
  );
}
