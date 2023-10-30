# Instructions/Help for Styles

## To use Button style

Orange Button - Submit
Blue Button - edit etc

// to use a button remember to set this style if you are using Link to wrap it. if using onclick, then dont need to set this.

<!-- <Link to="/" style={{ textDecoration: "none" }}> -->

followed by the below

                  <Button classes={{ root: "blue" }} variant="contained">
                   Name
                  </Button>
                  <Button classes={{ root: "orange" }} variant="contained">
                    Name
                  </Button>

### to add link to button

<!-- don't use <Link to="/"> -->

use this [component={Link} to="/route"]

<!-- <Button
                  classes={{ root: "blue" }}
                  variant="contained"
                  component={Link}
                  to="/search"
                >
                  Search Jobs
                </Button> -->

#### to use grid centered

use this

<!-- <Grid
            container
            spacing={2}
            direction="row"
            sx={theme.customStyles.centered.container}
          > -->

##### to use font bold / color

use this to make color dark for P tag

<!-- <Typography
                          textAlign="center"
                          variant="p"
                          sx={{
                            color: theme.typography.darkP.color,
                          }}
                        > -->

use this to make font bold

 <!-- <Typography sx={{
                          color: theme.typography.darkP.color,
                          fontWeight: theme.typography.h6.fontWeightBold,
                        }} -->

use this to make error font (similar to mui error field font in red)

<!-- <Typography
                            variant="p"
                            sx={{
                              color: theme.typography.error.color,
                              fontSize: theme.typography.error.fontSize,
                            }}
                          > -->

###### to use axios loader

import Axios loader, declare state

import AxiosLoader from "../../Components/AxiosLoader";
const [axiosLoading, setAxiosLoading] = useState(false);

set axiosloading to true right before ur axios call
e.g.
setAxiosLoading(true);
try {
const newJobInfo = await axios.post(
`${BACKEND_URL}/company/newjobpost`,
jobPost,
{
headers: {
Authorization: `Bearer ${currUser.accessToken}`,
},
}
)}

add this .finally after the catch block
e.g.

try {}
.catch {}
.finally {
setAxiosLoading(false);
}

###### to use swal msgs

import \* as SwalMsgs from "../../Utils/SwalMsgs";

for those that accept props to personalize msgs (check SwalMsgs.js to see)

Swal.fire(SwalMsgs.numberRequired("Minimum Salary"));

for those that don't accept props
Swal.fire(SwalMsgs.overwriteCurrentInfo)

###### textboxes

to standardize textboxes from mui
standard textbox use {...theme.textbox.common}
For e.g.
<TextField
label="Mobile"
{...theme.textbox.common}
value={fieldValues.mobileNumber}
onChange={(e) =>
handleChange("mobileNumber", e.target.value)
}
error={fieldErrors.mobileNumber || false}
helperText={
fieldValues.mobileNumber === ""
? "Mobile Number is required"
: ""
}
/>

###### for stack in mui to wrap them when screensize small

put it in stack. there are more styles ie left, right, center, refer to theme.js under assets styles

<Stack
                        direction={theme.customStyles.stackCollapseRow}
                        sx={theme.customStyles.stackWrapLeft}
                      >
