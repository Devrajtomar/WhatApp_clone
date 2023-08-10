import Image from "next/image";
import UpdatedAt from "../../utils/UpdatedAt.js";
import { HiUser, HiStatusOnline } from "react-icons/hi2";
import { HiUserAdd } from "react-icons/hi";
import { state } from "../../context/store.js";

const AddFriend = ({ user }) => {
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
      <pre className="btn_ w-fit p-2 rounded hidden md:block mr-3">
        Add Friend
      </pre>
      <HiUserAdd
        className="btn_ p-1 w-10 h-10 rounded-full md:hidden mr-3"
        size={30}
      />
    </div>
  );
};

export default AddFriend;
