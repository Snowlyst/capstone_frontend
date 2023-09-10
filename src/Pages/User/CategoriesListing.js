import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Typography, ThemeProvider, Avatar, Button } from "@mui/material";
import { theme } from "../../Assets/Styles/Theme";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import IndividualJobPage from "../Employer/IndividualJobPage";

function CategoriesListing() {
  const navigate = useNavigate();
  const [selectedListing, setSelectedListing] = useState(null);
  const [listings, setListings] = useState([]);
  const { categoryId } = useParams();
  const params = useParams();
const [jobId, setJobId] = useState(params.jobId);
const [jobInfo, setJobInfo] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/listings/categories/bycategory/${categoryId}`)
      .then((response) => {
        if (response.data.success) {
          setListings(response.data.output);
        }
      });
  }, []);

  console.log(listings);

  const handleListingClick = (listing) => {
    setSelectedListing(listing);
  };

  const handleBackClick = () => {
    navigate("/categories");
  };
console.log(selectedListing)
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          minHeight: "100vh",
          padding: "80px 0",
          backgroundColor:"#F3F1FF"
        }}
      >
        <Box
          sx={{
            width: "30%",
            position: "sticky",
            top: "80px",
            padding: "20px",
            borderRight: "1px solid #ccc",
          }}
        >
          {listings.length > 0 && (
            <Typography
              variant="h5"
              sx={{
                fontWeight: theme.typography.h5.fontWeightBold,
              }}
            >
              Category: {listings[0].job_category.name}
            </Typography>
          )}
          <ul style={{ listStyle: "none", padding: 0 }}>
            {listings.map((listing) => (
              <li
                key={listing.id}
                style={{ cursor: "pointer", marginBottom: "10px" }}
                onClick={() => handleListingClick(listing)}
              >
                <Typography variant="p" sx={{ fontWeight: theme.typography.p }}>
                  {listing.title}
                </Typography>
              </li>
            ))}
          </ul>
          <Box display="flex" justifyContent="left" py={2}>
            <Button
              className="orange"
              variant="contained"
              onClick={handleBackClick}
            >
              Back
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: "70%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {selectedListing ?  (
                  <IndividualJobPage
                    jobsId={selectedListing.id}
                  />
                ) : (
            <Typography
              variant="h6"
              sx={{ fontWeight: theme.typography.h6.fontWeightBold }}
            >
              Select a listing from the left panel
            </Typography>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default CategoriesListing;
