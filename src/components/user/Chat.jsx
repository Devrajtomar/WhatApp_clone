import Image from "next/image";
import UpdatedAt from "../../utils/UpdatedAt.js";
import { HiUser, HiStatusOnline } from "react-icons/hi2";
import { HiChatAlt2, HiUserAdd } from "react-icons/hi";
import { state } from "../../context/store.js";

const Chat_ = ({ user }) => {
  const { setIsOpen, setUser } = state();
  const lastSeen = UpdatedAt(user.updatedAt);

  return (
    <div
      className="user"
      onClick={() => {
        setIsOpen(false);
        setUser(user);
      }}
    >
      <Image
        width={500}
        height={500}
        objectFit="cover"
        alt="Default"
        className="rounded-full h-[60px] w-[60px]"
        src={user.image === null ? "/DefaultUser.jpg" : user.image}
      />
      <div className="w-full ">
        <h3 className="text-base md:text-lg heading_2 ">{user.Name}</h3>
        <pre className="heading_3 text-sm md:text-base">{lastSeen}</pre>
      </div>
      <HiChatAlt2 />
    </div>
  );
};

export default Chat_;
