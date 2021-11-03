import "./form.css";
import { useForm } from "react-hook-form";

type Inputs = {
  title: string;
  host: string;
  date: string;
  location: string;
  image: string;
  content: string;
};

export default function CreateEventForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = (data: Inputs) => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Title" {...register("title", {})} />
      <input type="text" placeholder="Hosted by" {...register("host", {})} />
      <input
        type="datetime-local"
        placeholder="Date"
        {...register("date", { required: true })}
      />
      <input
        type="text"
        placeholder="location"
        {...register("location", { required: true })}
      />
      <input type="file" placeholder="image" {...register("image", {})} />
      <textarea
        placeholder="event content"
        {...register("content", { required: true, maxLength: 200 })}
      />

      <input type="submit" />
    </form>
  );
}
