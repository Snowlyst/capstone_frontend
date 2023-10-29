import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClient } from "@supabase/supabase-js";
import { UserProvider } from "./Components/UserContext";
import { Auth0ProviderWithNavigate } from "./Components/Auth0";

const supabase = createClient(
  `${process.env.REACT_APP_SUPABASE_PROJECT_URL}`,
  `${process.env.REACT_APP_SUPABASE_PUBLIC_API_KEY}`
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Auth0ProviderWithNavigate
      domain={process.env.REACT_APP_DOMAIN}
      clientId={process.env.REACT_APP_CLIENTID}
      authorizationParams={{
        redirect_uri: process.env.REACT_APP_REDIRECT_URI,
        audience: process.env.REACT_APP_AUDIENCE,
        scope: process.env.REACT_APP_SCOPE,
      }}
    >
      <SessionContextProvider supabaseClient={supabase}>
        <UserProvider>
          <App />
        </UserProvider>
      </SessionContextProvider>
    </Auth0ProviderWithNavigate>
  </BrowserRouter>
);
