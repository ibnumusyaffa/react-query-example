import Layout from "../../layouts/Layout";

import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import Select from "../../components/Select";
import { Table, Th, Td } from "../../components/Table";
import Pagination from "../../components/Pagination";
import Input from "../../components/Input";
import useDebounce from "../../hooks/useDebounce";
import { SearchIcon, FilterIcon } from "@heroicons/react/outline";
import { getUser, deleteUser } from "../../services/user";
import Button from "../../components/Button";
import { PlusIcon } from "@heroicons/react/outline";

import DeleteButton from "../../components/action/DeleteButton";
import EditLink from "../../components/action/EditLink";
import useDelete from "../../hooks/useDelete";
import AlertDialog from "../../components/AlertDialog";
import ButtonLink from "../../components/ButtonLink";

function Home() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState({});
  let [keyword, setKeyword] = useState("");
  let debouncedKeyword = useDebounce(keyword, 500);
  let queryClient = useQueryClient();
  const { isLoading, isError, data, isFetching } = useQuery(
    //query key
    [
      "user",
      {
        page: page,
        page_size: pageSize,
        keyword: debouncedKeyword,
        ...filter,
      },
    ],

    () =>
      getUser({
        page: page,
        page_size: pageSize,
        keyword: debouncedKeyword,
        ...filter,
      }),

    {
      keepPreviousData: true,
      select: (response) => response.data,
    }
  );

  let {
    showAlertDelete,
    setShowAlertDelete,
    deleteLoading,
    confirmDelete,
    onConfirmDelete,
  } = useDelete({
    afterDeleted: () => queryClient.invalidateQueries("user"),
    onDelete: (selectedRow) => {
      return deleteUser(selectedRow.id);
    },
  });

  return (
    <Layout>
      <AlertDialog
        title="Hapus User"
        message="Apakah anda yakin ingin menghapus user ini?"
        isOpen={showAlertDelete}
        onClose={() => setShowAlertDelete(false)}
        isLoading={deleteLoading}
        onConfirm={onConfirmDelete}
      ></AlertDialog>

      <div className="py-5 px-7">
        <div className="flex justify-between h-10 items-center mb-5 px-1">
          <div className="text-xl font-semibold text-gray-800">
            Manajemen User
          </div>
          <div>
            <ButtonLink
              href="/user/create"
              leftIcon={
                <div className="w-4 h-4">
                  <PlusIcon></PlusIcon>
                </div>
              }
            >
              Tambah User
            </ButtonLink>
          </div>
        </div>
        <div className="w-full  bg-white shadow-sm">
          <div>
            <div className=" flex justify-between items-center py-5 px-5">
              <div>
                <div className="flex space-x-2"></div>
              </div>
              <div>
                <Input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  size="lg"
                  placeholder="Cari"
                  rightIcon={
                    <SearchIcon className="w-5 h-5 text-gray-600"></SearchIcon>
                  }
                ></Input>
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table
                loading={isLoading}
                fetching={isFetching}
                error={isError}
                empty={data?.data?.length === 0 || data === undefined}
              >
                <thead className="border-t border-b w-full text-gray-600 font-normal">
                  <tr className="h-16">
                    <th className="whitespace-nowrap hover:bg-sky-50 p-3 text-left font-normal">
                      No
                    </th>
                    <th className="whitespace-nowrap hover:bg-sky-50 p-3 text-left font-normal">
                      Nama
                    </th>
                    <th className="whitespace-nowrap hover:bg-sky-50 p-3 text-left font-normal">
                      Role
                    </th>
                    <th className="whitespace-nowrap hover:bg-sky-50 p-3 text-left font-normal">
                      Email
                    </th>
                    <th className="whitespace-nowrap hover:bg-sky-50 p-3 text-left font-normal">
                      Wilayah
                    </th>
                    <th className="whitespace-nowrap hover:bg-sky-50 p-3 text-left font-normal">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* {JSON.stringify(data.data)} */}
                  {data?.data?.map((row, index) => {
                    return (
                      <tr
                        key={index}
                        className="hover:bg-sky-50 border-b border-gray-200"
                      >
                        <td className="px-3 py-5 text-sm text-gray-600  align-top">
                          {(page - 1) * pageSize + index + 1}
                        </td>
                        <td className="px-3 py-5 text-sm text-gray-600  align-top">
                          {row.name}
                        </td>
                        <td className="px-3 py-5 text-sm text-gray-600  align-top">
                          {row.role}
                        </td>
                        <td className="px-3 py-5 text-sm text-gray-600  align-top">
                          {row.email}
                        </td>
                        <td className="px-3 py-5 text-sm text-gray-600  align-top">
                          {row.province?.name}
                        </td>
                        <td className="px-3 py-5 text-sm text-gray-600  align-top">
                          <div className="flex space-x-3">
                            <EditLink href={`/user/edit/${row.id}`}></EditLink>
                            <DeleteButton
                              onClick={() => confirmDelete(row)}
                            ></DeleteButton>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
        <div className="p-5 flex justify-between bg-white mt-5 shadow-sm">
          <div className="flex space-x-5 items-center">
            <div className="flex space-x-2">
              <div className="flex items-center text-sm text-gray-800">
                Show
              </div>
              <div className="w-20">
                <Select
                  name="page_size"
                  onChange={(event) => setPageSize(event.target.value)}
                  value={pageSize}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </Select>
              </div>
            </div>
          </div>

          <Pagination
            currentPage={page}
            onChangePage={(newPage) => setPage(newPage)}
            totalItems={data?.hits?.total?.value}
            pageSize={pageSize}
          ></Pagination>
        </div>
      </div>
    </Layout>
  );
}
export default Home;
