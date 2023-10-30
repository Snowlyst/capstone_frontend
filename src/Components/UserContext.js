import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [currUser, setCurrUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [location, setLocation] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      // get categories

      await axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/listings/allcategories/sorted`
        )
        .then((response) => {
          setCategories(response.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });

      // get location
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/company/location`)
        .then((response) => {
          console.log("Locations from context: ", response.data);
          setLocation(response.data);
        })
        .catch((error) => {
          console.log("Error fetching locations: ", error);
        });

      // get companies
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/company/`)
        .then((response) => {
          console.log("List of Companies from context: ", response.data);
          setCompanies(response.data);
        })
        .catch((error) => {
          console.log("Error fetching companies: ", error);
        });
    };
    loadData();
  }, []);

  const contextValue = {
    currUser,
    setCurrUser,
    categories,
    location,
    companies,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
