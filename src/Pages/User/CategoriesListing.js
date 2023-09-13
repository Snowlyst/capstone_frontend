import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  ThemeProvider,
  Avatar,
  Grid,
  Button,
  Divider,
} from "@mui/material";
import { theme } from "../../Assets/Styles/Theme";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import IndividualJobPage from "../Employer/IndividualJobPage";

function CategoriesListing() {
  const navigate = useNavigate();
  const [selectedListing, setSelectedListing] = useState(null);
  const [listings, setListings] = useState([]);
  const [listingData, setListingData] = useState([]);
  const { categoryId } = useParams();
  const params = useParams();
  const [jobId, setJobId] = useState(params.jobId);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/listings/categories/bycategory/${categoryId}`)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.output);
          setListingData(response.data.output);
          setListings(
            response.data.output.map((info, index) => {
              return (
                <Box key={index}>
                  <Grid
                    container
                    sx={{
                      width: "20vw",
                      height: "10vh",
                      borderRadius: "20px",
                      mt: 1.5,
                      mb: 1.5,
                    }}
                  >
                    <Grid item xs={12}>
                      <Box>
                        <Box
                          component="div"
                          onClick={() => handleListingClick(info)}
                          sx={{
                            cursor: "pointer",
                            width: "19vw",
                            height: "6vh",
                            ml: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                            display: "-webkit-box",
                          }}
                        >
                          {info.title}
                        </Box>

                        <Box>
                          <Typography
                            variant="p"
                            sx={{
                              width: "14vw",
                              fontSize: "1.25vh",
                              pl: 2,
                              fontWeight: theme.typography.p.fontWeight,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              WebkitLineClamp: "1",
                              WebkitBoxOrient: "vertical",
                              display: "-webkit-box",
                              mt: "1vh",
                            }}
                          >
                            {info.employmentType}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                  <Divider />
                </Box>
              );
            })
          );
        }
      });
  }, []);

  const handleListingClick = (listing) => {
    setSelectedListing(listing);
  };

  const handleBackClick = () => {
    navigate("/job-categories");
  };

  console.log(selectedListing);
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          minHeight: "100vh",
          padding: "80px 0",
          backgroundColor: "#F3F1FF",
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
              Category: {listingData[0].job_category.name}
            </Typography>
          )}
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "40px",
              overflow: "auto",
              WebkitBoxOrient: "vertical",
              display: "-webkit-box",
              width: "100%",
              height: "70vh",
            }}
          >
            {listings.length !== 0 ? (
              listings
            ) : (
              <Box sx={{ width: "15vw", ml: "5.5vw", mt: "25vh" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: theme.typography.h6.fontWeightBold,
                  }}
                >
                  No Jobs from this Category Available!
                </Typography>
              </Box>
            )}
          </Box>

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
            <Box>
              <IndividualJobPage jobsId={selectedListing.id} />
            </Box>
          ) : (
            <Typography
              variant="h6"
              sx={{
                fontWeight: theme.typography.h6.fontWeightBold,
                mt: "20vh",
                ml: "20vw",
              }}
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
