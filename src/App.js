import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Homepage from "./Pages/Homepage";
import Categories from "./Pages/Categories";
import CategoriesListing from "./Pages/CategoriesListing";
import Dashboard from "./Pages/Dashboard";
import IndividualListing from "./Pages/IndividualListing";
import Profile from "./Pages/Profile";
import Search from "./Pages/Search";
import UpdateProfile from "./Pages/UpdateProfile";
import Error from "./Pages/Error";
import JobPost from "./Pages/Employer/JobPost";
import OnemapApiTest from "./TestPages(TO_BE_DELETED)/OnemapApiTest";
import PDFReadingTest from "./TestPages(TO_BE_DELETED)/PDFReaderTest";
import GoogleCalendar from "./TestPages(TO_BE_DELETED)/GoogleCalendarPlanner";

function App() {
  return (
    <Box>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:categoryId" element={<CategoriesListing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/listing/:listingId" element={<IndividualListing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
        <Route path="/jobpost" element={<JobPost />} />
        <Route path="/onemap" element={<OnemapApiTest />} />
        <Route path="/pdf" element={<PDFReadingTest />} />
        <Route path="/googlecalendar" element={<GoogleCalendar />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Box>
  );
}

export default App;
