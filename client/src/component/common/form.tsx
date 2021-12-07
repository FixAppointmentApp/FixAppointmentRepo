import "./form.css";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import UploadImageInput from "../uploadImageInput";
import PlacesAutocompleteInput from "../placesAutocompleteInput";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { useHistory } from "react-router-dom";
import axios from "axios";
// import { readImage } from "../../utils/readImage";

type Inputs = {
  title: string;
  host: string;
  date: string;
  location: string;
  image: {};
  content: string;
  coordinates: { lat: number | null; lng: number | null };
};

export default function CreateEventForm() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [serverErrors, setServerErrors] = useState<Array<string>>([]);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageFile, setimageFile] = useState<{}>("");
  const [address, setAddress] = useState<string>("");
  const [coordinates, setCoordinates] = useState<{
    lat: number | null;
    lng: number | null;
  }>({
    lat: null,
    lng: null,
  });

  const history = useHistory();
  const methods = useForm<Inputs>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    console.log(
      "outPut ~ file: form.tsx ~ line 46 ~ handleImageChange ~ file",
      typeof file
    );
    setimageFile(e.target.files[0]);
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
  const handlePlacesSelect = async (value: string) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  const handlePlacesChange = (value: string) => {
    setAddress(value);
  };

  const onSubmit = async (data: Inputs) => {
    data.image = imageFile;
    data.location = address;
    data.coordinates = coordinates;
    console.log("data", data);
    setSubmitting(true);
    setServerErrors([]);
    const response = await axios.post("http://localhost:3001/events", { data });
    const eventDetails = await response.data;
    console.log(eventDetails);
    if (eventDetails.errors) {
      setServerErrors(eventDetails.errors);
    } else {
      history.push(`/eventPage/${eventDetails.id}`, {state:data});
    }
    // history.push({
    //   pathname: "/eventPreviewPage",
    //   search: "?query=abc",
    //   state: { data },
    // });

    setSubmitting(false);
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
          <PlacesAutocompleteInput
            address={address}
            handlePlacesChange={handlePlacesChange}
            coordinates={coordinates}
            handleSelect={handlePlacesSelect}
          />
          <UploadImageInput
            imageUrl={imageUrl}
            onChange={handleImageChange}
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
