import Layout from "../../../layouts/Layout";
import { Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import { getProvince, putUser, getUserById } from "../../../services/user";
import RSelect from "../../../components/RSelect";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Select from "../../../components/Select";
const LoginSchema = Yup.object().shape({
  name: Yup.string().nullable().required("Email wajib diisi"),
  email: Yup.string()
    .nullable()
    .required("Email wajib diisi")
    .email("Email tidak valid"),
  role: Yup.string().nullable().required("Role wajib diisi"),
  province_id: Yup.object().nullable().required("Provinsi wajib dipilih"),
  password: Yup.string().nullable(),
});
function getFieldError(error) {
  let errors = error.response.data.error;
  let transformError = {};
  Object.keys(errors).forEach((item) => {
    transformError[item] = errors[item][0];
  });
  return transformError;
}

import { useQuery, useQueryClient } from "react-query";

function Create() {
  let queryClient = useQueryClient();
  let toast = useToast();
  let router = useRouter();
  let { id } = router.query;
  const { isLoading, isError, data, isFetching } = useQuery(
    //query key
    ["place"],

    () => getProvince(),

    {
      keepPreviousData: true,
      select: (response) => response.data,
    }
  );

  let { status: statusUser, data: dataUser } = useQuery(
    ["user", id],

    () => getUserById(id),

    {
      keepPreviousData: true,
      enabled: Boolean(id),
      select: (response) => response.data.data,
    }
  );

  async function onSubmit(values, actions) {
    try {
      let result = await putUser(id, {
        ...values,
        province_id: values.province_id?.value,
      });
      toast({
        position: "top-right",
        title: "Berhasil",
        description: result.data.message,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      router.push("/user");
    } catch (error) {
      console.log(error);
      if (error.response.status == 422) {
        let fieldError = getFieldError(error);
        actions.setErrors(fieldError);

        toast({
          position: "top-right",
          title: "Error",
          description: error.response.data.message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          position: "top-right",
          title: "Error",
          description: "Ada kesalahan",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  }

  return (
    <Layout>
      <div className="p-5">
        <div className="flex h-10 justify-center mb-5">
          <div className="text-xl font-semibold text-gray-800">Edit User</div>
        </div>
        {statusUser == "loading" ? (
          <div className="flex items-center justify-center h-80 text-lg text-gray-800">
            Loading...
          </div>
        ) : null}
        {statusUser == "success" ? (
          <div className="w-full  bg-white border border-gray-200 h-auto px-5 py-8">
            <Formik
              initialValues={{
                name: dataUser?.name,
                email: dataUser?.email,
                password: null,
                role: dataUser?.role,
                province_id: dataUser?.province
                  ? {
                      label: dataUser?.province.name,
                      value: dataUser?.province.id,
                    }
                  : null,
              }}
              enableReinitialize
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
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="name">Nama</Label>
                      <Input
                        name="name"
                        disabled={isSubmitting}
                        error={errors.name && touched.name}
                        id="name"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        placeholder="Nama"
                        tabIndex="1"
                        // variant="filled"
                        size="lg"
                      ></Input>
                      {errors.name && touched.name && (
                        <span className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </span>
                      )}
                    </div>
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
                        // variant="filled"
                        size="lg"
                      ></Input>
                      {errors.email && touched.email && (
                        <span className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </span>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Select
                        name="role"
                        disabled={isSubmitting}
                        error={errors.role && touched.role}
                        id="role"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.role}
                        placeholder="role"
                        tabIndex="1"
                        size="lg"
                      >
                        <option value="">Pilih Role</option>
                        <option value="admin">Admin</option>
                        <option value="nonadmin">Non admin</option>
                      </Select>
                      {errors.role && touched.role && (
                        <span className="text-red-500 text-sm mt-1">
                          {errors.role}
                        </span>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="province_id">Provinsi</Label>
                      <RSelect
                        name="province_id"
                        disabled={isSubmitting}
                        error={errors.province_id && touched.province_id}
                        id="province_id"
                        type="text"
                        options={data?.data?.map?.((item) => {
                          return {
                            label: item.name,
                            value: item.id,
                          };
                        })}
                        onChange={(value) =>
                          setFieldValue("province_id", value)
                        }
                        value={values.province_id}
                        placeholder="Nama Pengguna"
                        size="lg"
                      ></RSelect>
                      {errors.province_id && touched.province_id && (
                        <span className="text-red-500 text-sm mt-1">
                          {errors.province_id}
                        </span>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email">Password</Label>

                      <Input
                        name="password"
                        tabIndex="2"
                        disabled={isSubmitting}
                        error={errors.password && touched.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        // variant="filled"
                        placeholder="Kata Sandi"
                        type="text"
                        size="lg"
                      ></Input>
                      {errors.password && touched.password && (
                        <span className="text-red-500 text-sm mt-1">
                          {errors.password}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <div className="w-40">
                      <Button
                        tabIndex="3"
                        htmlType="submit"
                        block
                        loadingText="Loading..."
                        loading={isSubmitting}
                        disabled={isSubmitting}
                      >
                        <span className="text-lg">Simpan</span>
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}
export default Create;
