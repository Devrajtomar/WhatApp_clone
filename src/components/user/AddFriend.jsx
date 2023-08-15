import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { HiUserAdd } from "react-icons/hi";
import { state } from "@/context/store.js";
import { User } from "../../containers";

const AddFriend = ({ userData }) => {
  const { setIsOpen, setChatUser, user } = state();
  const status = formatDistanceToNow(new Date(userData.updatedAt), {
    addSuffix: true,
  });
  const icon =
    window.innerWidth >= 1000 ? (
      <pre className="text-lg p-1">Add Friend</pre>
    ) : (
      <HiUserAdd />
    );

  const createConversation = async () => {
    const anotherUser = userData.id;
    const userId = user.id;
    await axios.post("/api/conversations/NewConversation", {
      userId,
      anotherUser,
    });
  };

  const NameClick = () => {
    setIsOpen(window.innerWidth >= 800 ? true : false);
    setChatUser(userData);
    createConversation(userData.id);
  };
  const IconClick = () => {
    console.log({
      sender: user.id,
      reciever: userData.id,
    });
  };

  return (
    <div className="w-full">
      <User
        id={userData.id}
        name={userData.Name}
        image={userData.image}
        status={status}
        icon={icon}
        NameClick={NameClick}
        IconClick={IconClick}
      />
    </div>
  );
};

export default AddFriend;
