import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [currUser, setCurrUser] = useState(null);
  const [categories, setCategories] = useState([]);
<<<<<<< HEAD

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/listings/categories`)
      .then((response) => {
        setCategories(response.data);
        console.log("categories from context: ", categories);
=======
  const [location, setLocation] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // get categories
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/listings/categories/sorted`)
      .then((response) => {
        setCategories(response.data);
>>>>>>> main
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
<<<<<<< HEAD
    // other api calls if needed
=======

    // get location
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/company/location`)
      .then((response) => {
        console.log("Locations from context: ", response.data);
        setLocation(response.data);
      })
      .catch((error) => {
        console.log("Error fetching locations: ", error);
      });

    // get companies
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/company/`)
      .then((response) => {
        console.log("List of Companies from context: ", response.data);
        setCompanies(response.data);
      })
      .catch((error) => {
        console.log("Error fetching companies: ", error);
      });
>>>>>>> main
  }, []);

  const contextValue = {
    currUser,
    setCurrUser,
    categories,
<<<<<<< HEAD
=======
    location,
    companies,
>>>>>>> main
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
