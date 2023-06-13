import { useAppSelector } from "hooks";

const UserName: React.FC = () => {
  const { userInfo } = useAppSelector(state => state.user);

  return <span className="username">{userInfo.name}</span>;
};

export default UserName;
