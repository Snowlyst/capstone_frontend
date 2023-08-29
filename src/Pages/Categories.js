import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  ThemeProvider,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import { theme } from "../Assets/Styles/Theme";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/listings/categories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleCardClick = (category) => {
    setSelectedCategory(category);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: theme.typography.h4.fontWeightBold,
            textAlign: "center",
            marginTop: theme.spacing(3),
          }}
        >
          Categories
        </Typography>
        <Box>
          <Grid container spacing={3}>
            {categories.map((category) => (
              <Grid item key={category.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: "100%", cursor: "pointer" }}
                  onClick={() => handleCardClick(category)}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: theme.typography.h6.fontWeightBold,
                        color: "#0E0140",
                      }}
                    >
                      {category.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        maxHeight: "6em",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 6,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {category.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Modal
          open={selectedCategory !== null}
          onClose={handleCloseModal}
          closeAfterTransition
        >
          <Fade in={selectedCategory !== null}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                width: "80%",
                maxHeight: "80%",
                overflowY: "auto",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: theme.typography.h6.fontWeightBold,
                  color: "#0E0140",
                }}
              >
                {selectedCategory?.name}
              </Typography>
              <Typography
                variant="p"
                sx={{ fontWeight: theme.typography.p, color: "#0E0140" }}
              >
                {selectedCategory?.description}
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </ThemeProvider>
  );
}

export default Categories;
