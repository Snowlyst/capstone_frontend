import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  ThemeProvider,
  Button,
} from "@mui/material";
import { theme } from "../Assets/Styles/Theme";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Components/UserContext";
function Categories() {
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
const { categories, setCategories } = useUserContext();

  const handleCardClick = (category) => {
    setSelectedCategoryId(category.id);
  };

  const handleTitleClick = (categoryId) => {
    navigate(`/categories/${categoryId}`);
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
      </Box>
    </ThemeProvider>
  );
}

export default Categories;
