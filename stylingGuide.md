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
