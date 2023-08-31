import { withAuthenticationRequired } from "@auth0/auth0-react";
import PageLoader from "./PageLoader";
// import { Box } from "@mui/material";
import "../Assets/Styles/App.css";

export const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <PageLoader />
      </div>
    ),
  });

  return <Component />;
};
