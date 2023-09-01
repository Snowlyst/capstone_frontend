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

  useEffect(() => {
    // get categories
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/listings/categories/sorted`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
    // get location

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/listings/categories/sorted`)
      .then((response) => {
        console.log("Location from context: ", response.data);
        setLocation(response.data);
      })
      .catch((error) => {
        console.log("Error fetching locations: ", error);
      });
  }, []);

  const contextValue = {
    currUser,
    setCurrUser,
    categories,
    location,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
