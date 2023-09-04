import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import PageLoader from "./Components/PageLoader";
import { AuthenticationGuard } from "./Components/AuthenticationGuard";
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
import CompanyProfile from "./Pages/Employer/CompanyProfile";
import CreateResume from "./Pages/User/CreateResume";
import JobListingOverall from "./Pages/Employer/JobListingOverall";
import IndividualJobPage from "./Pages/Employer/IndividualJobPage";
import AdminDashboard from "./Pages/Administrator/AdminDashboard";
import AdminApproveDenyJob from "./Pages/Administrator/AdminApproveDenyJob";
function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <Box>
      <Navbar />
      <Routes>
        {/* {isAuthenticated ? (
          <div> */}
        <Route path="/" element={<Homepage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:categoryId" element={<CategoriesListing />} />
        <Route
          path="/dashboard"
          element={<AuthenticationGuard component={Dashboard} />}
        />
        <Route path="/listing/:listingId" element={<IndividualListing />} />
        <Route
          path="/profile"
          element={<AuthenticationGuard component={Profile} />}
        />
        <Route
          path="/search"
          element={<AuthenticationGuard component={Search} />}
        />
        <Route path="/updateprofile" element={<UpdateProfile />} />
        <Route path="/company/jobs/:jobId" element={<IndividualJobPage />} />
        <Route
          path="/jobpost"
          element={<AuthenticationGuard component={JobPost} />}
        />
        <Route
          path="/userresumelist"
          element={<AuthenticationGuard component={ResumeList} />}
        />
        <Route
          path="/companyprofile/:companyId"
          element={<AuthenticationGuard component={CompanyProfile} />}
        />
        <Route path="createresume" element={<CreateResume />} />
        <Route
          path="/joblisting"
          element={<AuthenticationGuard component={JobListingOverall} />}
        />
        <Route
          path="/admin/dashboard"
          element={<AuthenticationGuard component={AdminDashboard} />}
        />
        <Route
          path="/admin/checkjobs"
          element={<AuthenticationGuard component={AdminApproveDenyJob} />}
        />
        {/* These 4 Pages are Test pages, to be deleted near the end */}
        <Route path="/onemap" element={<OnemapApiTest />} />
        <Route path="/pdf" element={<PDFReadingTest />} />
        <Route path="/googlecalendar" element={<GoogleCalendar />} />
        <Route path="/firebaseupload" element={<FirebaseUpload />} />
        {/* Error Page */}
        <Route path="*" element={<Error />} />
        {/* </div>
        ) : (
          ""
        )} */}
      </Routes>
    </Box>
  );
}

export default App;
