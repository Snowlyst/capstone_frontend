import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../Components/UserContext";
import { theme } from "../../Assets/Styles/Theme";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import * as SwalMsgs from "../../Utils/SwalMsgs";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import { stateFromHTML } from "draft-js-import-html";
import "draft-js/dist/Draft.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AxiosLoader from "../../Components/AxiosLoader";
// import ReactSelect from "react-select";
// import makeAnimated from "react-select/animated";
// import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Swal from "sweetalert2";
import { ThemeProvider } from "@emotion/react";
import "../../Assets/Styles/Homepage.css";

function JobPostDialog() {
  return (
    <ThemeProvider theme={theme}>
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <Grid container direction="column">
          <Grid item>
            <Box mt={2} justifyContent="center" display="flex">
              <DialogTitle>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: theme.typography.h4.fontWeightBold,
                  }}
                >
                  New Job Post
                </Typography>
              </DialogTitle>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <DialogContent>
              <DialogContentText
                style={{ marginBottom: "16px", textAlign: "center" }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: theme.typography.h5.fontWeightBold,
                  }}
                >
                  {fieldValues.jobTitle
                    ? fieldValues.jobTitle
                    : "Please key in Job Title!"}
                </Typography>{" "}
              </DialogContentText>

              <DialogContentText>
                <Typography
                  variant="p"
                  sx={{
                    fontWeight: theme.typography.p.fontWeightBold,
                  }}
                >
                  {fieldValues.employmentType ? fieldValues.employmentType : ""}
                </Typography>
              </DialogContentText>

              <DialogContentText>
                <Typography
                  variant="p"
                  sx={{
                    fontWeight: theme.typography.p.fontWeightBold,
                  }}
                >
                  Location:{" "}
                </Typography>
                {fieldValues.location && fieldValues.location.name
                  ? fieldValues.location.name
                  : "Please select a location."}
              </DialogContentText>

              <DialogContentText style={{ marginBottom: "16px" }}>
                <Typography
                  variant="p"
                  sx={{
                    fontWeight: theme.typography.p.fontWeightBold,
                  }}
                >
                  Category:{" "}
                </Typography>
                {fieldValues.jobCategory && fieldValues.jobCategory.name
                  ? fieldValues.jobCategory.name
                  : "Please select a category."}
              </DialogContentText>
              <DialogContentText>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: theme.typography.h6.fontWeightBold,
                    }}
                  >
                    Job Details{" "}
                  </Typography>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: fieldValues.jobDescription,
                    }}
                  />
                </Box>
              </DialogContentText>
            </DialogContent>
          </Grid>

          <DialogActions>
            <Button
              disabled={disableSubmit}
              onClick={() => setModalOpen(false)}
              classes={{ root: "blue" }}
              variant="contained"
            >
              edit
            </Button>
            <Button
              disabled={disableSubmit}
              onClick={handleSubmit}
              classes={{ root: "orange" }}
              variant="contained"
            >
              submit
            </Button>
          </DialogActions>
        </Grid>
      </Dialog>
    </ThemeProvider>
  );
}

export default JobPostDialog;
