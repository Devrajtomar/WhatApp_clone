import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import SocialIcons from "./SocialIcons";
import { Loading } from "../../../containers";
import { useRouter } from "next/navigation";

const AuthForm = ({ varient, setVarient }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (varient === "Sign In") {
      if (Email !== "" && Password !== "") {
        setIsLoading(true);
        try {
          await axios
            .post("/api/login", {
              Email,
              Password,
            })
            .then((res) => {
              if (res.data.Found) {
                setIsLoading(false);

                window.localStorage.setItem("token", res.data.token);
                router.push("/");

                toast.success(<h1 className="message">{res.data.message}</h1>);
              } else {
                setIsLoading(false);
                toast.error(<h1 className="errBold">{res.data.message}</h1>);
              }
            });
        } catch (err) {
          toast.error("Internel Error");
        }
      } else {
        setIsLoading(false);
        toast.error(
          <h1 className="italic font-semibold text-lg text-zinc-800">
            Please type your{" "}
            <span className="text-black font-bold mx-1 whitespace-nowrap">
              E-mail
            </span>
            And
            <span className="text-black font-bold mx-1">Password</span>
          </h1>,
        );
      }
    }
    if (varient === "Register") {
      if (Name !== "" && Email !== "" && Password !== "") {
        setIsLoading(true);
        try {
          const res = await axios.post("/api/register", {
            Name,
            Email,
            Password,
          });
          if (res.data.user) {
            setIsLoading(false);
            toast.error(
              <h1 className="errBold text-rose-400">E-mail Already Exist</h1>,
            );
          }
          if (res.data.success) {
            setIsLoading(false);
            toast.success(<div className="message">New Account Created</div>);
            window.localStorage.setItem("token", res.data.token);
            router.push("/");
          }
        } catch (err) {
          setIsLoading(false);
          toast.error("Internel Error") || toast.error("Something went wrong");
        }
      } else {
        toast.error(
          <h1 className="italic font-semibold text-lg text-zinc-800">
            Please type your{" "}
            <span className="text-black font-bold mx-1 whitespace-nowrap">
              Name, E-mail
            </span>
            And
            <span className="text-black font-bold mx-1">Password</span>
          </h1>,
        );
      }
    }
  };

  return (
    <div className="loginForm">
      {isLoading && <Loading />}
      <form onSubmit={(e) => handleSubmit(e)}>
        {varient === "Register" && (
          <div className="mb-4 ">
            <label htmlFor="Name">Name</label>
            <input
              autoComplete="off"
              className="inputForm"
              id="Name"
              type="text"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Name"
            />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="Email">Email</label>
          <input
            className="inputForm"
            id="Email"
            type="Email"
            autoComplete="off"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Password">Password</label>
          <input
            autoComplete="off"
            className="inputForm"
            id="Password"
            type="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
          />
        </div>
        <button className="btn w-full mt-4" type="submit">
          {varient === "Sign In" ? "Sign In" : "Create New Account"}
        </button>
      </form>
      <div className=" flex justify-center items-center w-full my-4">
        <div className="w-full border-t border-gray-900 bg-black" />
        <div className="bg-white mx-3 text-zinc-600 font-serif">Or</div>
        <div className="w-full border-t border-gray-900 bg-black" />
      </div>
      <SocialIcons />
      <div className="mt-4 text-lg">
        {varient === "Sign In" ? (
          <div>
            New user ?{" "}
            <span
              className="text-blue-500  hover:text-blue-600 cursor-pointer"
              onClick={() => setVarient("Register")}
            >
              Create an account
            </span>
          </div>
        ) : (
          <div>
            Already have an account ?{" "}
            <span
              className="text-blue-500 hover:text-blue-600 cursor-pointer"
              onClick={() => setVarient("Sign In")}
            >
              Log In
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
