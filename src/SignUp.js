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


export default function SignUp() {

  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!isValidName(data.get('firstName'))){
      console.log("first name contained numeric")
    }

    if (!isValidName(data.get('lastName'))){
      console.log("last name contained numeric")
    }

    if (!isValidEmail(data.get('email'))){
      console.log( "email is invalid" )
    }

    if (isEqualPassword(data.get('password'),data.get('password2'))){
      console.log( "password not alike" )
    }

    console.log({
      email: data.get('email'),
      password: data.get('password'),
      password2: data.get('password2'),
      name: data.get('firstName'),
      lastName: data.get('lastName'),

    });
  };ט
  //const [firstNameValue, setFirstName] = useState('');
  //console.log({ firstNameValue })
  

  const [formValues, setFormValues] = useState({
    firstName:{
      value:'',
      error:false,
      errorMessage:'You must enter a name'
    }})

    const handleChange = (e) => {
      const {name, value} = e.target;
      setFormValues({
        ...formValues,
        [name]:{
          ...formValues[name],
          value
        }
      })
    }

    //console.log({ formValues:firstName.value })
  
return (
    <ThemeProvider theme={theme}>
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
          <Avatar className='' sx={{ m: 1, bgcolor: '#ff895d' }}>
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
                  //value
                  id="accountName"
                  label="Account Name"
                  name="accountName"
                  autoComplete="accountName"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  //value={firstNameValue}
                  //onChange={(e) => setFirstName(e.target?.value)}
                  //autoFocus
                  //error

                  value={formValues.firstName.value}
                  onChange={handleChange}
                  error={formValues.firstName.error}
                  helperText={formValues.firstName.error && formValues.firstName.errorMessage}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
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
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  //autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="password2"
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

    </ThemeProvider>
  );



  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

function isEqualPassword(ps1,ps2){
 return ((ps1 === ps2) === false )
}

function isValidName(name) {
  return /^[A-Za-z]+$/.test(name);
}
 
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