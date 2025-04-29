import React, { useRef } from "react";
import sideImg from "../assets/signupImg.jpeg";
import InputBox from "@/components/InputBox";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";

const baseURL = import.meta.env.VITE_BASE_URL;

export default function SignUp() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const formSchema = z.object({
    username: z.string().min(1, { message: "username is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email format" }),
    password: z
      .string()
      .min(1, { message: "password is required" })
      .min(3, { message: "password must have atleast 3 characters" }),
  });

  const handleSubmit = async () => {
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const formData = { username, email, password };

    try {
      formSchema.parse(formData);

      const response = await axios.post(
        `${baseURL}/api/user/register`,
        {
          username,
          email,
          password,
        },
        { withCredentials: true }
      );
      if (response.status == 200) {
        toast.success(response.data.message);
        navigate("/home");
      } else {
        toast.error("Registration Failed");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((error) => {
          toast.error(error.message);
        });
      } else {
        toast.error("Registration failed");
      }
      return;
    }
  };

  return (
    <div className="flex h-[100dvh] w-full gap-2 md:p-1 overflow-hidden bg-gray-900 ">
      <div className="hidden md:flex md:flex-1  md:rounded-lg">
        <img
          src={sideImg}
          alt="Decorative"
          className="object-cover h-full w-full rounded-lg"
        />
      </div>
      <div className=" relative flex-1 rounded-lg flex flex-col justify-center gap-4 items-center px-4 md:px-2 bg-white dark:bg-gray-950 ">
        <h1 className="absolute top-4 left-4 text-3xl md:text-4xl  font-heading ">
          Cipher
        </h1>
        <div className="absolute right-4 top-4">{<ModeToggle />}</div>

        <div className="flex flex-col py-3 items-center">
          <h1 className=" text-4xl md:text-6xl font-bold ">Register</h1>
        </div>
        <InputBox
          place={"Anonymous Username"}
          type={"text"}
          variant={"primary"}
          refer={usernameRef}
        />
        <InputBox
          place={"Email"}
          type={"text"}
          variant={"primary"}
          refer={emailRef}
        />
        <InputBox
          place={"Password"}
          type={"password"}
          variant={"primary"}
          refer={passwordRef}
        />
        <Button onClick={handleSubmit} size={"lg"}>
          Submit
        </Button>
        <div>
          <p className="text-sm ">
            Already have account?{" "}
            <span
              className="text-blue-400 underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
