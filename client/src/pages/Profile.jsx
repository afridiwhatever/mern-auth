import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return !currentUser ? <Navigate to="/signin" /> : <div>Profile</div>;
};

export default Profile;
