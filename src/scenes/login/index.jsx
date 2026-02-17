
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Card, Box, Button, TextField, useMediaQuery } from "@mui/material";

//  Form
import { Formik } from "formik";
import * as yup from "yup";

//  Component
import Header from "../../components/Header";
import MessageAlerts from "../../components/MessageAlerts";

// Api
import { signin } from "../../slices/auth";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState(false);

  const handleFormSubmit = (values) => {
    setDisabled(true)

    const data = JSON.stringify(values)
    dispatch(signin(data)).unwrap()
      .then((res) => {
        if (res) {
          document.location.reload(navigate('/overview'));
        }
      }).catch((error) => {
        
        setError(true)
        setDisabled(false)

      });
  };

  return (
    <>
      <Card sx={{ maxWidth: 400, margin: "0 auto", position: "relative", top: "20vh" }}>
        <Box m="20px">
          <Header title="Sign in" subtitle="Sign in to Admin Panel" />
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }}
                    type='password'
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="30px">
                  <Button type="submit" color="secondary" disabled={disabled} variant="contained" style={{ fontWeight: 800 }}>
                    Sign In
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Card>
      {error && (
        <MessageAlerts message="Invalid Email and Passowrd" variant="error" setError={setError} />
      )}
    </>
  );
}

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});
const initialValues = {
  email: "",
  password: "",
};
