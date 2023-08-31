import { Box } from "@mui/material";
import "../Assets/Styles/PageLoader.css";

function PageLoader() {
  return (
    <Box className="container1">
      <Box className="content">
        <Box className="circle"></Box>
        <Box className="circle"></Box>
        <Box className="circle"></Box>
        <Box className="circle"></Box>
      </Box>
    </Box>
  );
}

export default PageLoader;
