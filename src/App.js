import { Box } from "@mui/material";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import PageLoader from "./Components/PageLoader";
import Navbar from "./Components/Navbar";
import Homepage from "./Pages/Homepage";
import Categories from "./Pages/Categories";
import CategoriesListing from "./Pages/User/CategoriesListing";
import Forbidden from "./Pages/Forbidden";
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
import AdminApproveDenyJob from "./Pages/Administrator/AdminApproveDenyJob";
import AdminApproveDenyUserCompanies from "./Pages/Administrator/AdminApproveDenyUser";
import EditProfile from "./Pages/User/EditProfile";
import Login from "./Components/Login";
import { useUserContext } from "./Components/UserContext";
import AdminDashboard from "./Pages/Dashboard";
import AdminManageExistingUserCompany from "./Pages/Administrator/AdminManageExistingUserCompany";
import ReviewApplication from "./Pages/Employer/ReviewApplication";
import CompanyList from "./Pages/Employer/CompanyList";

import CheckApplication from "./Pages/User/CheckApplication";
function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  const [authLoading, setAuthLoading] = useState(false);
  const { currUser } = useUserContext();

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

  if (authLoading || isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  function RequireAuth({ redirectTo, user, admin, jobseeker }) {
    console.log("In require Auth: ", currUser);

    const role =
      isAuthenticated && user !== null && user.userRoleId !== null
        ? user.userRoleId
        : 0;

    switch (role) {
      case 1:
      case 3:
        return currUser !== null ? admin : redirectTo;

      case 2:
        return currUser !== null ? jobseeker : redirectTo;

      default:
        return redirectTo;
    }
  }

  return (
    <Box>
      <Navbar />
      <Routes>
        {/* unprotected routes */}
        <Route path="/" element={<Homepage />} />

        <Route path="/job-categories" element={<Categories />} />
        <Route path="/job-search" element={<Search />} />
        <Route path="/company-profiles" element={<CompanyList />} />
        <Route path="/company/jobs/:jobId" element={<IndividualJobPage />} />
        <Route path="/companyprofile/:companyId" element={<CompanyProfile />} />
        <Route path="/categories/:categoryId" element={<CategoriesListing />} />

        {/* user routes */}
        <Route
          path="/checkapplication/:jobId"
          element={
            <RequireAuth
              redirectTo={<Login />}
              user={currUser}
              admin={<ReviewApplication />}
              jobseeker={<ReviewApplication />}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth
              redirectTo={<Login />}
              user={currUser}
              admin={<Forbidden />}
              jobseeker={<Profile />}
            />
          }
        />
        <Route
          path="/editprofile/:userId"
          element={
            <RequireAuth
              redirectTo={<Login />}
              user={currUser}
              admin={<Forbidden />}
              jobseeker={<EditProfile />}
            />
          }
        />
        <Route
          path="/resume"
          element={
            <RequireAuth
              redirectTo={<Login />}
              user={currUser}
              admin={<ResumeList />}
              jobseeker={<ResumeList />}
            />
          }
        />
        <Route
          path="/updateprofile"
          element={
            <RequireAuth
              redirectTo={<Login />}
              user={currUser}
              admin={<Forbidden />}
              jobseeker={<UpdateProfile />}
            />
          }
        />
        <Route
          path="/joblisting"
          element={
            <RequireAuth
              redirectTo={<Login />}
              user={currUser}
              admin={<JobListingOverall />}
              jobseeker={<Forbidden />}
            />
          }
        />
        <Route
          path="/createresume"
          element={
            <RequireAuth
              redirectTo={<Login />}
              user={currUser}
              admin={<CreateResume />}
              jobseeker={<CreateResume />}
            />
          }
        />

        <Route
          path="/usercheckapplication"
          element={
            <RequireAuth
              redirectTo={<Login />}
              user={currUser}
              admin={<CheckApplication />}
              jobseeker={<CheckApplication />}
            />
          }
        />
        {/* employer routes */}
        <Route
          path="/post-job"
          element={
            <RequireAuth
              redirectTo={<Login />}
              user={currUser}
              admin={<JobPost />}
              jobseeker={<Forbidden />}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth
              redirectTo={<Login />}
              user={currUser}
              admin={<AdminDashboard />}
              jobseeker={<Forbidden />}
            />
          }
        />

        {/* admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <RequireAuth
              redirectTo={<Login />}
              user={currUser}
              admin={<AdminDashboard />}
              jobseeker={<Forbidden />}
            />
          }
        />
        <Route
          path="/admin/checkjobs"
          element={
            <RequireAuth
              redirectTo={<Login />}
              user={currUser}
              admin={<AdminApproveDenyJob />}
              jobseeker={<Forbidden />}
            />
          }
        />
        <Route
          path="/admin/checkusercompanies"
          element={
            <RequireAuth
              redirectTo={<Login />}
              user={currUser}
              admin={<AdminApproveDenyUserCompanies />}
              jobseeker={<Forbidden />}
            />
          }
        />
        <Route
          path="/admin/manageusercompanies"
          element={
            <RequireAuth
              redirectTo={<Login />}
              user={currUser}
              admin={<AdminManageExistingUserCompany />}
              jobseeker={<Forbidden />}
            />
          }
        />

        {/* These 4 Pages are Test pages, to be deleted near the end */}
        <Route path="/onemap" element={<OnemapApiTest />} />
        <Route path="/pdf" element={<PDFReadingTest />} />
        <Route path="/googlecalendar" element={<GoogleCalendar />} />
        <Route path="/firebaseupload" element={<FirebaseUpload />} />
        <Route path="/listing/:listingId" element={<IndividualListing />} />
      </Routes>
    </Box>
  );
}

export default App;
