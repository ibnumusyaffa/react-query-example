//lib
import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Label from "../../components/Label";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import useStore from "../../store";
import { Formik } from "formik";
import * as Yup from "yup";
import useRedirectIfAuthenticated from "../../hooks/useRedirectIfAuthenticated";
import axios from "../../services/axios";
import { syncToken } from "../../services/axios";
import Cookies from "js-cookie";
import Alert from "../../components/Alert";
const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Email wajib diisi").email("Email tidak valid"),
  password: Yup.string().required("Kata sandi wajib diisi"),
});

function Login() {
  useRedirectIfAuthenticated();
  let router = useRouter();
  let [showPass, setShowPass] = useState(false);
  let setIsAuthenticated = useStore((state) => state.setIsAuthenticated);
  let [errorMessage, setErrorMessage] = useState(null);
  async function onSubmit(values, actions) {
    try {
      const response = await axios.post("/auth/login", values);

      Cookies.set("is_authenticated", true);
      Cookies.set("token", response.data.access_token);

      syncToken();
      setIsAuthenticated(true);
      router.push("/");
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMessage(error.response?.data?.message);
      } else {
        setErrorMessage(error.message);
      }
      actions.setSubmitting(false);
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center p-10 bg-primary">
      <Head>
        <title>Login</title>
      </Head>
      <div
        style={{ width: "30%" }}
        className="bg-white rounded px-12 py-5 h-auto flex flex-col"
      >
        <div className="flex-1">
          <div className="flex items-center justify-center mt-20">

          </div>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form className="mt-12" onSubmit={handleSubmit}>
                {errorMessage ? <Alert>{errorMessage}</Alert> : null}
                <div className="space-y-5">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      name="email"
                      disabled={isSubmitting}
                      error={errors.email && touched.email}
                      id="email"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Nama Pengguna"
                      tabIndex="1"
                      variant="filled"
                      size="lg"
                    ></Input>
                    {errors.email && touched.email && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <Label htmlFor="password">Password</Label>
                      <span className="text-sky-500 text-base">
                        Lupa password ?
                      </span>
                    </div>

                    <Input
                      name="password"
                      tabIndex="2"
                      disabled={isSubmitting}
                      error={errors.password && touched.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      variant="filled"
                      placeholder="Kata Sandi"
                      rightIcon={
                        showPass ? (
                          <EyeOffIcon
                            onClick={() => setShowPass(false)}
                            className="text-gray-500 cursor-pointer"
                          ></EyeOffIcon>
                        ) : (
                          <EyeIcon
                            onClick={() => setShowPass(true)}
                            className="text-gray-500 cursor-pointer"
                          ></EyeIcon>
                        )
                      }
                      type={showPass ? "text" : "password"}
                      size="lg"
                    ></Input>
                    {errors.password && touched.password && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-12 space-y-6">
                  <Button
                    tabIndex="3"
                    htmlType="submit"
                    block
                    variant="solid"
                    color="secondary"
                    loadingText="Loading..."
                    loading={isSubmitting}
                  >
                    <span className="text-lg">Masuk</span>
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
        <div className="flex items-center justify-center">
          <div>© {new Date().getFullYear()} PDKI</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
