import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Typography, ThemeProvider, Avatar, Button } from "@mui/material";
import { theme } from "../../Assets/Styles/Theme";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function CategoriesListing() {
  const navigate = useNavigate();
  const [selectedListing, setSelectedListing] = useState(null);
  const [listings, setListings] = useState([]);
  const { categoryId } = useParams();


  useEffect(() => {
    axios
      .get(`http://localhost:8080/listings/categories/${categoryId}`)
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

  const handleBackClick=() =>{
    navigate("/categories")
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          minHeight: "100vh",
          padding: "80px 0",
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
          {selectedListing ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <Avatar
                  src={selectedListing.company_profile_info.companyLogo}
                  alt={selectedListing.company_profile_info.companyName}
                  sx={{
                    width: 450,
                    height: 220,
                    marginRight: "25px",
                  }}
                />
                <div>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: theme.typography.h4.fontWeightBold }}
                  >
                    {selectedListing.company_profile_info.companyName}
                  </Typography>
                  <Typography
                    variant="p"
                    sx={{ fontWeight: theme.typography.p.fontWeightBold }}
                  >
                    {selectedListing.company_profile_info.description}
                  </Typography>
                </div>
              </Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: theme.typography.h5.fontWeightBold }}
                mb={2}
              >
                {selectedListing.title}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: theme.typography.h6 }}>
                Job Description:
              </Typography>
              <Typography variant="p" sx={{ fontWeight: theme.typography.p }}>
                {selectedListing.description}
              </Typography>
              <Box display="flex" justifyContent="left" py={2}>
                <Button
                  className="orange"
                  variant="contained"
                  onClick={()=>{
                    Swal.fire({
                      icon: "success",
                      title: "Resume Sent",
                      text: "Your resume has been sent to the recruiter.",
                      confirmButtonColor: "#FF6B2C",
                    });
                  }}
                >
                  Apply Job
                </Button>
              </Box>
            </>
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
