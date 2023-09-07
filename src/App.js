import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import PageLoader from "./Components/PageLoader";
import Navbar from "./Components/Navbar";
import Homepage from "./Pages/Homepage";
import Categories from "./Pages/Categories";
import CategoriesListing from "./Pages/User/CategoriesListing";
import Dashboard from "./Pages/Dashboard";
import IndividualListing from "./Pages/IndividualListing";
import Profile from "./Pages/User/Profile";
import Search from "./Pages/Search";
import UpdateProfile from "./Pages/UpdateProfile";
// import Error from "./Pages/Error";
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
import AdminApproveDenyUserCompanies from "./Pages/Administrator/AdminApproveDenyUser";
import EditProfile from "./Pages/User/EditProfile";
// import Swal from "sweetalert2";

import AdminManageExistingUserCompany from "./Pages/Administrator/AdminManageExistingUserCompany";
import ReviewApplication from "./Pages/Employer/ReviewApplication";
function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    if (isLoading) {
      setAuthLoading(true);
    } else {
      setAuthLoading(false);
    }
  }, [isLoading]);

  if (authLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  // function RequireAuth({ children, redirectTo }) {
  //   const { isAuthenticated, loginWithRedirect } = useAuth0(); // Get Auth0 authentication status and functions

  //   useEffect(() => {
  //     // Redirect to Auth0 login if not authenticated
  //     const login = async () => {
  //       if (!isAuthenticated) {
  //         await loginWithRedirect({
  //           appState: {
  //             returnTo: "/",
  //           },
  //           authorizationParams: {
  //             screen_hint: "Login/Register",
  //           },
  //         });
  //       } else {
  //         return;
  //       }
  //     };
  //     login();
  //   }, [isAuthenticated, loginWithRedirect]);

  //   return isAuthenticated ? children : null;
  // }

  return (
    <Box>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/job-categories" element={<Categories />} />
        <Route path="/job-search" element={<Search />} />
        <Route path="/company/jobs/:jobId" element={<IndividualJobPage />} />
        <Route path="/companyprofile/:companyId" element={<CompanyProfile />} />
        <Route path="/categories/:categoryId" element={<CategoriesListing />} />
        {/* <Route
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
        <Route
          path="/admin/checkusercompanies"
          element={
            <AuthenticationGuard component={AdminApproveDenyUserCompanies} />
          }
        />
        <Route
          path="/admin/manageusercompanies"
          element={
            <AuthenticationGuard component={AdminManageExistingUserCompany} />
          }
        />

        <Route
          path="/checkapplication/:jobId"
          element={<AuthenticationGuard component={ReviewApplication} />}
        /> */}
        {/* These 4 Pages are Test pages, to be deleted near the end */}
        <Route path="/onemap" element={<OnemapApiTest />} />
        <Route path="/pdf" element={<PDFReadingTest />} />
        <Route path="/googlecalendar" element={<GoogleCalendar />} />
        <Route path="/firebaseupload" element={<FirebaseUpload />} />
        <Route path="/listing/:listingId" element={<IndividualListing />} />

        {/* <Route
          path="*"
          element={
            <RequireAuth> */}
        {/* <Routes> */}
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile/:userId" element={<EditProfile />} />
        <Route path="/post-job" element={<JobPost />} />
        <Route path="/resume" element={<ResumeList />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
        <Route path="/createresume" element={<CreateResume />} />
        <Route path="/joblisting" element={<JobListingOverall />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/checkjobs" element={<AdminApproveDenyJob />} />
        <Route
          path="/admin/checkusercompanies"
          element={<AdminApproveDenyUserCompanies />}
        />
        <Route
          path="/admin/manageusercompanies"
          element={<AdminManageExistingUserCompany />}
        />
        {/* </Routes>
            </RequireAuth>
          }
        ></Route> */}
      </Routes>
    </Box>
  );
}

export default App;
