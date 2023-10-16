import { useRouter } from "next/navigation";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
const LogOut = () => {
  const router = useRouter();
  const handleLogOut = () => {
    window.localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <div className="page_icons" onClick={handleLogOut}>
      <HiArrowLeftOnRectangle className="text-2xl" />
      <div className="md:hidden">LogOut</div>
    </div>
  );
};

export default LogOut;
