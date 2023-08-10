import axios from "axios";
import React from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";
const SocialIcons = () => {
  const GithubLogin = async () => {
    const res = await axios.post("/api/github/login");
    console.log(res);
  };
  const GoogleLogin = () => {};
  return (
    <div className="my-3 flex gap-3 w-full justify-start items-center">
      <div className="socialIcon">
        <BsGithub size={27} onClick={() => GithubLogin()} />
      </div>
      <div className="socialIcon">
        <BsGoogle size={27} onClick={() => GoogleLogin()} />
      </div>
    </div>
  );
};

export default SocialIcons;
