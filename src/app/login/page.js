"use client";

import { AuthForm } from "./components";
import { Logo } from "../../containers";
import React, { useState } from "react";
const Login = () => {
  const [varient, setVarient] = useState("Sign In");
  return (
    <div className="loginPage">
      <div className="heading_1">
        <Logo />
        <div>
          {varient === "Sign In"
            ? "Sign In To Your Account"
            : "Create New Account"}
        </div>
      </div>
      <AuthForm varient={varient} setVarient={setVarient} />
    </div>
  );
};
export default Login;
