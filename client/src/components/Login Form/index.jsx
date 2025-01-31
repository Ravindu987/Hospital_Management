import React, { useState } from "react";
import * as Yup from "yup";
import {
  Button,
  Grid,
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Formik, Form, useField } from "formik";
import styled from "@emotion/styled";
import { PropTypes } from "prop-types";

async function loginUser(credentials) {
  return fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
    },
    body: credentials,
  }).then((data) => data.json());
}

const TextInput = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <TextField
        className="text-input"
        {...field}
        {...props}
        sx={{ marginTop: "10%" }}
        required
        fullWidth
      />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};

const StyledErrorMessage = styled.div`
  font-size: 15px;
  color: #db566a;
  margin-top: 0.5rem;
`;

export default function LoginForm({ setToken }) {
  return (
    <>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setTimeout(async () => {
            alert(JSON.stringify(values, null, 2));
            const token = await loginUser(JSON.stringify(values));
            alert("Token" + JSON.stringify(token));
            setToken(token);
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Grid
          container
          height="500px"
          xs={6}
          borderRadius={10}
          bgcolor={"#F2F5F4"}
          sx={{ opacity: "0.8" }}
          justifyContent="center"
          paddingTop={"5%"}
          paddingX={"5%"}
        >
          <Box
            component={Form}
            display="flex"
            flexDirection={"column"}
            height="95%"
            width="100%"
          >
            <Typography
              fontFamily={"Poppins"}
              fontSize={36}
              fontWeight="Bold"
              color={"#283856"}
              alignSelf="center"
            >
              Sign in
            </Typography>
            <TextInput
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextInput
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              sx={{ marginTop: "10%", alignSelf: "center" }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, marginTop: "10%" }}
            >
              Sign In
            </Button>
          </Box>
        </Grid>
      </Formik>
    </>
  );
}

LoginForm.propTypes = {
  setToken: PropTypes.func.isRequired,
};
