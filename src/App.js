import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Homepage from "./Pages/Homepage";
import Categories from "./Pages/Categories";
import CategoriesListing from "./Pages/User/CategoriesListing";
import Dashboard from "./Pages/Dashboard";
import IndividualListing from "./Pages/IndividualListing";
import Profile from "./Pages/User/Profile";
import Search from "./Pages/Search";
import UpdateProfile from "./Pages/UpdateProfile";
import Error from "./Pages/Error";
import JobPost from "./Pages/Employer/JobPost";
import OnemapApiTest from "./TestPages(TO_BE_DELETED)/OnemapApiTest";
import PDFReadingTest from "./TestPages(TO_BE_DELETED)/PDFReaderTest";
import GoogleCalendar from "./TestPages(TO_BE_DELETED)/GoogleCalendarPlanner";
import FirebaseUpload from "./TestPages(TO_BE_DELETED)/FirebaseUpload";
import ResumeList from "./Pages/User/ResumeList";
import CreateResume from "./Pages/User/CreateResume";
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
        <Route path="userresumelist" element={<ResumeList />} />
        <Route path="createresume" element={<CreateResume />} />
        {/* These 4 Pages are Test pages, to be deleted near the end */}
        <Route path="/onemap" element={<OnemapApiTest />} />
        <Route path="/pdf" element={<PDFReadingTest />} />
        <Route path="/googlecalendar" element={<GoogleCalendar />} />
        <Route path="/firebaseupload" element={<FirebaseUpload />} />
        {/* Error Page */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Box>
  );
}

export default App;
