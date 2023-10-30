import { useState, useEffect } from "react";
import "../../Assets/Styles/MemberProfile.css";
import "../../Assets/Styles/Homepage.css";
import axios from "axios";
import "sweetalert2/dist/sweetalert2.min.css";
import { useUserContext } from "../../Components/UserContext";
import EditProfile from "./EditProfile";
import NewProfile from "./NewProfile";

function Profile() {
  const { currUser } = useUserContext();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [profileValid, setProfileValid] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      if (currUser !== null) {
        try {
          const userProfile = await axios.get(
            `${BACKEND_URL}/users/personalinfo/${currUser.id}`
          );
          console.log(userProfile.data.user_personal_detail);
          if (userProfile.data.user_personal_detail !== null) {
            setProfileValid(true);
          } else {
            setProfileValid(false);
          }
        } catch (error) {
          console.error("API call failed: ", error);
        }
      }
    };
    getProfile();
  }, [currUser]);

  return <div>{profileValid ? <EditProfile /> : <NewProfile />}</div>;
}

export default Profile;
