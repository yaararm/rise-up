import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './SignUp.css';
import { useState } from "react";
import { useForm } from "react-hook-form"
//import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        our Rise up website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


function isValidEmail(email) {
  return !/\S+@\S+\.\S+/.test(email);
}

function isEqualPassword(ps1,ps2){
  return ps1 === ps2;
}

function isValidName(name) {
  return !/^[A-Za-z]+$/.test(name);
}

const fieldNames = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
  PASSWORD: 'password',
  PASSWORD2: 'password2'
}

function validate(value, fieldName, formValues = {}) {
  switch (fieldName) {
    case fieldNames.FIRST_NAME:
      return isValidName(value);
    case fieldNames.LAST_NAME:
      return isValidName(value);
    case fieldNames.EMAIL:
      return isValidEmail(value);
    case fieldNames.PASSWORD2:
      return !isEqualPassword(value, formValues[fieldNames.PASSWORD].value)
    default:
      return false;
  }
}

function getInitialFormValues() {
  return Object.values(fieldNames).reduce((state, fieldName) => {
    state[fieldName] = {value: '', error: false};
    return state;
  }, {});
}

export default function SignUp() {

  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    /// this need to be changed... 
    if (!isValidName(data.get(fieldNames.FIRST_NAME))){
      console.log("first name contained numeric")
    }

    if (!isValidName(data.get(fieldNames.LAST_NAME))){
      console.log("last name contained numeric")
    }

    if (!isEqualPassword(data.get(fieldNames.PASSWORD),data.get(fieldNames.PASSWORD2))){
      console.log( "password not alike" )
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
    const {name, value} = e.target;
    setFormValues(previousFormValues => {
      const error = validate(value, name, previousFormValues);
      return {
      ...formValues,
        [name]: {
          value,
          error
        }
      }
    })
  }

return (
    <ThemeProvider theme={theme}>
    <div className="back" style={{ height: '100%', position: 'absolute', left: '0px', width: '100%', overflow: 'hidden', overflowY:"scroll"}}>
      <Container component="main" maxWidth="xs" style={{ backgroundColor: 'white', borderRadius: 10 }}>
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            paddingTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar className='fourth' sx={{ m: 1, bgcolor: '#ff895d' }}>
          </Avatar>
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
                  helperText={formValues[fieldNames.FIRST_NAME].error && 'Invalid first name'}
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
                  helperText={formValues[fieldNames.LAST_NAME].error && 'Invalid last name'}
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
                  helperText={formValues[fieldNames.EMAIL].error && 'Invalid email'}
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
                  helperText={formValues[fieldNames.PASSWORD].error && 'Invalid password'}
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
                  helperText={formValues[fieldNames.PASSWORD2].error && "Passwords don't match"}
                  //autoComplete="new-password"
                />
              </Grid>

              <Grid item sx={{ width: "auto" }} sm={12} align="center">
                <Typography component="h2" variant="body2">
                  Add another account (optional):
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  //autoComplete="given-name"

                  name="secondfirstName"
                  fullWidth
                  id="secondfirstName"
                  label="First Name"
                  //autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="secondlastName"
                  label="Last Name"
                  name="secondlastName"
                //autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField

                  fullWidth
                  id="secondemail"
                  label="Email Address"
                  name="secondemail"
                //autoComplete="email"
                />
              </Grid>

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
              sx={{ mt: 3, mb: 2 }}>
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
      </div>
    </ThemeProvider>
  );
}   
{/* <Box component="form" form onSubmit={handleSubmit(on2Submit)} mb={2}>
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
</Button> */}


// const on2Submit = (data) => console.log(data);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();