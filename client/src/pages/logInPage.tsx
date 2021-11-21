import React, { useState } from "react";
import { useForm } from "react-hook-form";
import NavBar from "../component/common/navBar";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./style.css";

interface FormData {
  email: string;
  password: string;
}

export default function LogInPage() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [serverErrors, setServerErrors] = useState<Array<string>>([]);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log("error", errors);
    console.log("data", data);
    setSubmitting(true);
    setServerErrors([]);
    const response = await axios.post("http://localhost:3001/logIn", {
      email: data.email,
      password: data.password,
    });
    const userData = await response.data;
    console.log(userData);
    if (userData.errors) {
      setServerErrors(userData.errors);
    } else {
      history.push(`/profilePage/${userData.id}`);
    }
    setSubmitting(false);
    // catch(error){
    //   console.log(error)
    // }
  };

  return (
    <>
      <NavBar />
      <form onSubmit={handleSubmit(onSubmit)}>
        {serverErrors && (
          <ul>
            {serverErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "required" })}
          />
          {errors.email && <div>{errors.email.message}</div>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "required",
              minLength: {
                value: 8,
                message: "password must be 8 chars",
              },
            })}
          />
          {errors.password && <div>{errors.password.message}</div>}
        </div>
        <div>
          <button type="submit" disabled={submitting}>
            Log in
          </button>
        </div>
      </form>
    </>
  );
}
