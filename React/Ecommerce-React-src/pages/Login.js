import { useFormik } from "formik";
import React, { useState } from "react";
import "./Login.scss";
import * as yup from "yup";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCheckLoginQuery } from "../api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import authSlice, { authActions } from "../store/auth-slice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import axios from "axios";

//https://localhost:7249/api/Login/${username}/${password}

const checkLogin = (username, password, formik, navigate, dispatch) => {
  axios
    .get(
      `https://goappapi.azurewebsites.net/api/Login/${username}/${password}`,
      {
        username: username,
        password: password,
      }
    )
    .then((response) => {
      dispatch(authActions.login(response.data));
      alert("Logged in");
      formik.resetForm();
      navigate("/home");
    })
    .catch((error) => {
      alert("Wrong Username or Password");
      console.log(error);
    });
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/home");
  };
  const handleRegisterClick = () => {
    navigate("/register");
  };

  const onSubmit = async (values, actions) => {
    checkLogin(values.username, values.password, formik, navigate, dispatch);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });
  return (
    <div className="container-main-login">
      <div className="container-content">
        <div className="login-register">
          <h2>Login</h2>
          <Button
            className="register-btn"
            onClick={handleRegisterClick}
            variant="text"
            disabled={formik.isSubmitting}
          >
            Register
          </Button>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          autoComplete="off"
          className="form-login"
        >
          <label htmlFor="username">Username</label>
          <input
            value={formik.values.username}
            onChange={formik.handleChange}
            id="username"
            type="username"
            placeholder="Enter your username"
            onBlur={formik.handleBlur}
            className={
              formik.errors.username && formik.touched.username
                ? "input-error"
                : ""
            }
          />
          {formik.errors.username && formik.touched.username && (
            <p className="error">{formik.errors.username}</p>
          )}

          <label htmlFor="password">Password</label>
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            id="password"
            type="password"
            placeholder="Enter your Password"
            onBlur={formik.handleBlur}
            className={
              formik.errors.password && formik.touched.password
                ? "input-error"
                : ""
            }
          />
          {formik.errors.password && formik.touched.password && (
            <p className="error">{formik.errors.password}</p>
          )}

          <Button
            className="submit-btn"
            variant="contained"
            disabled={formik.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
          <Button
            className="back-btn"
            onClick={handleBackClick}
            variant="contained"
            disabled={formik.isSubmitting}
          >
            Back
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;

//const passwordRules = /^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d).*$/;
const basicSchema = yup.object().shape({
  username: yup.string().min(6).required("Required"),

  password: yup
    .string()
    .min(6)
    //.matches(passwordRules, { message: "Create stronger password" })
    .required("Required"),
});
