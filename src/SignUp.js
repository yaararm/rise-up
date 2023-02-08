import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./SignUp.css";
import { useState } from "react";
import { Form, Formik, Field, FieldArray } from "formik";
import { TextField } from "formik-mui";
import * as Yup from "yup";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        our Rise up website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const fieldNames = {
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  EMAIL: "email",
  PASSWORD: "password",
  PASSWORD2: "password2",
  // PARTNER_FIRST_NAME: "partnerFirstName",
  // PARTNER_LAST_NAME: "partnerLastName",
  // PARTNER_EMAIL: "partnerEmail",
};

function getInitialFormValues() {
  return Object.values(fieldNames).reduce((state, fieldName) => {
    state[fieldName] = { value: "", error: false };
    return state;
  }, {});
}

const SignupSchema = Yup.object().shape({
  account: Yup.string()
    .min(2, "Account Name is too short")
    .max(50, "Account Name is too long")
    .required("Required"),
  firstName: Yup.string()
    .min(2, "First Name is too short")
    .max(50, "First Name is too long")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Last Name is too short")
    .max(50, "Last Name is too long")
    .required("Required"),
  password: Yup.string()
    .min(2, "Password is too short")
    .max(50, "Password is too long")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export default function SignUp() {
  const partnersGroup = {
    partnerFirstName: "",
    partnerLastName: "",
    partnerEmail: "",
  };

  //TODO handle this according to Formik examples
  const [formValues, setFormValues] = useState(getInitialFormValues());

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        style={{ backgroundColor: "white", borderRadius: 10 }}
      >
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            paddingTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar className="" sx={{ m: 1, bgcolor: "#ff895d" }}></Avatar>
          <Typography component="h1" variant="h4">
            Sign up
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Formik
              initialValues={{
                account: "",
                firstName: "",
                lastName: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false);
                  alert(JSON.stringify(values, null, 2));
                }, 500);
              }}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      name="account"
                      label="Account Name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      name="firstName"
                      label="First Name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      name="lastName"
                      label="Last Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      name="email"
                      label="Email Address"
                      type="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      name="password"
                      label="Password"
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                    />
                  </Grid>
                  <Formik
                    initialValues={{
                      partners: [],
                    }}
                    onSubmit={async (values, actions) => {
                      alert(JSON.stringify(values, null, 2));
                    }}
                  >
                    {({ values }) => (
                      <FieldArray name="partners">
                        {({ push, remove }) => (
                          <Grid
                            container
                            spacing={2}
                            sx={{ marginTop: 2, paddingX: 2 }}
                          >
                            Add Another Account Partner
                          </Button>
                        </Grid>
                            {values.partners.map((_, index) => (
                              <>
                                <Grid item xs={12} sm={6}>
                                  <Field
                                    fullWidth
                                    name={`partners.${index}.partnerFirstName`}
                                    component={TextField}
                                    label="First Name"
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <Field
                                    fullWidth
                                    name={`partners.${index}.partnerLastName`}
                                    component={TextField}
                                    label="Last Name"
                                  />
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                  <Field
                                    fullWidth
                                    name={`partners.${index}.partnerEmail`}
                                    component={TextField}
                                    label="Email Address"
                                  />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => remove(index)}
                                  >
                                    Delete
                                  </Button>
                                </Grid>
                              </>
                            ))}{" "}
                            <Grid item xs={12}>
                              <Button
                                variant="outlined"
                                onClick={() => push(partnersGroup)}
                              >
                                Add Another Account Partner
                              </Button>
                            </Grid>
                          </Grid>
                        )}
                      </FieldArray>
                    )}
                  </Formik>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Box>
        </Box>

        <Copyright sx={{ mt: 5, paddingBottom: 3 }} />
      </Container>
    </ThemeProvider>
  );
}
