import "../Assets/Styles/Homepage.css";
import axiosLoading from "../Assets/Images/axiosLoading.gif";
import { Box } from "@mui/material";

const Loading = () => {
  return (
    <Box className="loading-overlay">
      <Box className="loading-spinner">
        <img src={axiosLoading} alt="Importing" />
      </Box>
    </Box>
  );
};

export default Loading;
