import React, { useState, useRef } from "react";

import { ScaleFade, useOutsideClick } from "@chakra-ui/react";
import Link from "next/link";
import { clearToken } from "../services/axios";
import { useQueryClient } from "react-query";
import AlertDialog from "../components/AlertDialog";
import { useRouter } from "next/router";
import useStore from "../store";
import Cookies from "js-cookie";

import { ChevronDownIcon } from "@heroicons/react/outline";

function Dropdown({ children, ...props }) {
  return (
    <div
      className="origin-top-right absolute -right-3 mt-2 w-44 rounded border  z-50"
      {...props}
    >
      <div className="rounded bg-white shadow">
        <div
          className="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function DropdownLink({ href, children }) {
  return (
    <Link href={href}>
      <a
        className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-blue-50 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
        role="menuitem"
      >
        {children}
      </a>
    </Link>
  );
}

function DropdownButtonRed({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      type="submit"
      className="block w-full text-left px-4 py-2 text-sm leading-5 text-red-600 hover:bg-red-500 hover:text-white focus:outline-none focus:bg-gray-100 focus:text-gray-900"
      role="menuitem"
    >
      {children}
    </button>
  );
}

// function DropdownButton({ onClick, children }) {
//   return (
//     <button
//       onClick={onClick}
//       type="submit"
//       className="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-800 hover:bg-blue-50 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
//       role="menuitem"
//     >
//       {children}
//     </button>
//   );
// }

function ProfileDropdown() {
  const [show, setShow] = React.useState(false);

  let router = useRouter();

  let setIsAuthenticated = useStore((state) => state.setIsAuthenticated);

  let [showConfirmLogout, setShowConfirmLogout] = useState(false);
  let [loading,setLoading] = useState(false);

  const queryClient = useQueryClient();

  async function handleLogout() {
    try {
      setLoading(true)
      setIsAuthenticated(false);

      Cookies.remove('is_authenticated');
      Cookies.remove('token');

      clearToken();
      setIsAuthenticated(false);
      localStorage.clear();


      router.replace("/auth/login");
      queryClient.clear();
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  const ref = useRef();

  useOutsideClick({
    ref: ref,
    handler: () => setShow(false),
  });

  return (
    <div
      className="h-full flex justify-center items-center w-44 px-2 hover:bg-blue-50 cursor-pointer z-20"
      onClick={() => setShow((prev) => !prev)}
    >
      <AlertDialog
        title="Konfirmasi"
        message="Apakah anda yakin untuk keluar?"
        isOpen={showConfirmLogout}
        onClose={() => setShowConfirmLogout(false)}
        isLoading={loading}
        onConfirm={handleLogout}
      ></AlertDialog>
      <div className="relative w-full">
        <div className="flex items-center justify-between">
          <div className="flex space-x-2 items-center ">
            <div className="h-8 w-8 bg-emerald-500 rounded-full"></div>
            <div className="text-gray-700 text-sm">Admin</div>
          </div>
          <ChevronDownIcon className="w-4 h-4"></ChevronDownIcon>
        </div>

        <ScaleFade initialScale={0.9} in={show} unmountOnExit>
          <Dropdown ref={ref}>

            <DropdownButtonRed onClick={() => setShowConfirmLogout(true)}>
              Keluar
            </DropdownButtonRed>
          </Dropdown>
        </ScaleFade>
      </div>
    </div>
  );
}

export default ProfileDropdown;
