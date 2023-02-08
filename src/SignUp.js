import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./SignUp.css";
import { useState } from "react";
import { Formik, Field, FieldArray } from "formik";
//import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

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

function isValidEmail(email) {
  return !/\S+@\S+\.\S+/.test(email);
}

function isEqualPassword(ps1, ps2) {
  return ps1 === ps2;
}

function isValidName(name) {
  return !/^[A-Za-z]+$/.test(name);
}

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

function validate(value, fieldName, formValues = {}) {
  switch (fieldName) {
    case fieldNames.FIRST_NAME:
    // case fieldNames.PARTNER_FIRST_NAME:
      return isValidName(value);
    case fieldNames.LAST_NAME:
    // case fieldNames.PARTNER_LAST_NAME:
      return isValidName(value);
    case fieldNames.EMAIL:
    // case fieldNames.PARTNER_EMAIL:
      return isValidEmail(value);
    case fieldNames.PASSWORD2:
      return !isEqualPassword(value, formValues[fieldNames.PASSWORD].value);
    default:
      return false;
  }
}

function getInitialFormValues() {
  return Object.values(fieldNames).reduce((state, fieldName) => {
    state[fieldName] = { value: "", error: false };
    return state;
  }, {});
}

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export default function SignUp() {
  const partnersGroup = {
    partnerFirstName: "",
    partnerLastName: "",
    partnerEmail: "",
  };

  const formik = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      password: 'foobar',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  }); 

  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    /// this need to be changed...
    if (!isValidName(data.get(fieldNames.FIRST_NAME))) {
      console.log("first name contained numeric");
    }

    if (!isValidName(data.get(fieldNames.LAST_NAME))) {
      console.log("last name contained numeric");
    }

    if (!isValidEmail(data.get(fieldNames.EMAIL))) {
      console.log("email is invalid");
    }

    if (
      !isEqualPassword(
        data.get(fieldNames.PASSWORD),
        data.get(fieldNames.PASSWORD2)
      )
    ) {
      console.log("password not alike");
    }

    console.log({
      email: data.get(fieldNames.EMAIL),
      password: data.get(fieldNames.PASSWORD),
      password2: data.get(fieldNames.PASSWORD2),
      name: data.get(fieldNames.FIRST_NAME),
      lastName: data.get(fieldNames.LAST_NAME),
    });
  };
  //const [firstNameValue, setFirstName] = useState('');
  //console.log({ firstNameValue })

  const [formValues, setFormValues] = useState(getInitialFormValues());
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((previousFormValues) => {
      const error = validate(value, name, previousFormValues);
      return {
        ...formValues,
        [name]: {
          value,
          error,
        },
      };
    });
  };

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
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="accountName"
                  label="Account Name"
                  name="accountName"
                  autoComplete="accountName"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name={fieldNames.FIRST_NAME}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  //value={firstNameValue}
                  //onChange={(e) => setFirstName(e.target?.value)}
                  //autoFocus
                  //error

                  value={formValues[fieldNames.FIRST_NAME].value}
                  onChange={handleChange}
                  error={formValues[fieldNames.FIRST_NAME].error}
                  helperText={
                    formValues[fieldNames.FIRST_NAME].error &&
                    "Invalid first name"
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name={fieldNames.LAST_NAME}
                  autoComplete="family-name"
                  value={formValues[fieldNames.LAST_NAME].value}
                  onChange={handleChange}
                  error={formValues[fieldNames.LAST_NAME].error}
                  helperText={
                    formValues[fieldNames.LAST_NAME].error &&
                    "Invalid last name"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name={fieldNames.EMAIL}
                  value={formValues[fieldNames.EMAIL].value}
                  onChange={handleChange}
                  error={formValues[fieldNames.EMAIL].error}
                  helperText={
                    formValues[fieldNames.EMAIL].error && "Invalid email"
                  }
                  //autoComplete="email"
                  // value={value}
                  //onChange={onChange}
                  //error={formValues.email.error}
                  //helperText="some validation error"
                  //type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name={fieldNames.PASSWORD}
                  label="Password"
                  type="password"
                  id="password"
                  value={formValues[fieldNames.PASSWORD].value}
                  onChange={handleChange}
                  error={formValues[fieldNames.PASSWORD].error}
                  helperText={
                    formValues[fieldNames.PASSWORD].error && "Invalid password"
                  }
                  //autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name={fieldNames.PASSWORD2}
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  value={formValues[fieldNames.PASSWORD2].value}
                  onChange={handleChange}
                  error={formValues[fieldNames.PASSWORD2].error}
                  helperText={
                    formValues[fieldNames.PASSWORD2].error &&
                    "Passwords don't match"
                  }
                  //autoComplete="new-password"
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
                        {/*<Grid
                          item
                          sx={{ width: "auto" }}
                          sm={12}
                          align="center"
                        >
                          <Typography component="h2" variant="h6">
                            Add Account Partners: (optional)
                          </Typography>
                    </Grid>*/}
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
{/*
              <Grid item xs={12} sm={6}>
                <TextField
                  //autoComplete="given-name"
                  fullWidth
                  id="partnerFirstName"
                  name="partnerFirstName"
                  label="First Name"
                  onChange={handleChange}
                  error={formValues[fieldNames.PARTNER_FIRST_NAME].error}
                  helperText={
                    formValues[fieldNames.PARTNER_FIRST_NAME].error &&
                    "Invalid first name"
                  }
                  //autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="partnerLastName"
                  name="partnerLastName"
                  label="Last Name"
                  onChange={handleChange}
                  error={formValues[fieldNames.PARTNER_LAST_NAME].error}
                  helperText={
                    formValues[fieldNames.PARTNER_LAST_NAME].error &&
                    "Invalid last name"
                  }
                  //autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="partnerEmail"
                  name="partnerEmail"
                  label="Email Address"
                  onChange={handleChange}
                  error={formValues[fieldNames.PARTNER_EMAIL].error}
                  helperText={
                    formValues[fieldNames.PARTNER_EMAIL].error &&
                    "Invalid email"
                  }
                  //autoComplete="email"
                />
              </Grid>
*/} 
              {/*<Grid item sx={{ width: "auto" }} sm={12} align="center">
                <Typography component="h2" variant="body2">
                  Intrested in shared account?
                </Typography>
              </Grid>
              <Grid item sx={{ width: "auto" }} sm={12} align="center">
                <Button
                  type="button"
                  color="success"
                  variant="contained" s
                  //onClick={}
                  sx={{ mt: 0, mb: 2 }}>
                  add another user
                </Button>
              </Grid>
               <Grid item xs={12}>
                <FormControlLabel   
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive notification of shared acoount."
                />
              </Grid> */}
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
          </Box>
        </Box>
        <Copyright sx={{ mt: 5, paddingBottom: 3 }} />
      </Container>
    </ThemeProvider>
  );
}
{
  /* <Box component="form" form onSubmit={handleSubmit(on2Submit)} mb={2}>
<TextField
  variant="outlined"
  label="email"
  fullWidth
  autoComplete="email"
  autoFocus
  {...register("email", {
    required: "Required field",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  })}
  error={!!errors?.email}
  helperText={errors?.email ? errors.email.message : null}
/>
</Box>
<Button type="submit" variant="contained" color="primary" fullWidth>
Login In / Sign Up
</Button> */
}

// const on2Submit = (data) => console.log(data);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
