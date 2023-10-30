import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  ThemeProvider,
  Button,
  CardActions,
} from "@mui/material";
import { theme } from "../Assets/Styles/Theme";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Components/UserContext";

function Categories() {
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const { categories } = useUserContext();

  const handleCardClick = (category) => {
    setSelectedCategoryId(category.id);
  };

  const handleTitleClick = (categoryId) => {
    navigate(`/categories/${categoryId}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        sx={theme.customStyles.centered.container}
        direction="column"
        pl={3}
        pr={3}
      >
        <Box
          sx={{
            maxWidth: "880px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: theme.typography.h4.fontWeightBold,
              textAlign: "center",
              mt: 3,
              mb: 5,
            }}
          >
            Categories
          </Typography>
          <Box>
            <Grid container spacing={3}>
              {categories.map((category) => (
                <Grid item key={category.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      cursor: "pointer",
                    }}
                    onClick={() => handleCardClick(category)}
                  >
                    <CardContent>
                      <Button onClick={() => handleTitleClick(category.id)}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: theme.typography.h6.fontWeightBold,
                            color: "#0E0140",
                          }}
                        >
                          {category.name}
                        </Typography>
                      </Button>
                      <Typography
                        variant="body2"
                        sx={{
                          overflow: "hidden",

                          display: "-webkit-box",
                          WebkitLineClamp: 6,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {category.description}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{
                        mt: "auto",
                        backgroundColor: "#5b5f97",
                        justifyContent: "center",
                      }}
                    >
                      <Link to={`/categories/${category.id}`}>
                        <Button size="small" sx={{ color: "white" }}>
                          Learn More
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}

export default Categories;
