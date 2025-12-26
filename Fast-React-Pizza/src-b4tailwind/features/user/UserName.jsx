import { useSelector } from "react-redux";

function UserName() {
  const userName = useSelector((store) => store.userName);
  return <div className="hidden text-sm font-semibold">{userName}</div>;
}

export default UserName;
