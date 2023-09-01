import React from "react";
import useStore from "../store";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  // ChartPieIcon,
  LightningBoltIcon,
  BookOpenIcon,
  BeakerIcon,
  DuplicateIcon,
  GlobeIcon,
  ArrowDownIcon,
  RefreshIcon,
  ClockIcon,
  UserIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";

import MenuItem from "../components/MenuItem";
import useProfile from "../hooks/useProfile";
// import MenuSection from "../components/MenuSection";
import Image from "next/image";
function Menu() {
  let setIsMenuExpanded = useStore((state) => state.setIsMenuExpanded);
  let isMenuExpanded = useStore((state) => state.isMenuExpanded);
  let { data } = useProfile();
  return (
    <nav
      id="scrollbarNav"
      className="h-screen sticky top-0 border-r border-gray-200 overflow-auto bg-primary"
    >
      <div
        style={{ height: 65 }}
        className="flex items-center justify-between px-5"
      >
        <Image
          alt="logo"
          src="/logo-white.png"
          width="170"
          height="50"
          className="w-20"
        ></Image>

        <div
          className=" cursor-pointer"
          onClick={() => setIsMenuExpanded(!isMenuExpanded)}
        >
          {isMenuExpanded ? (
            <ChevronDoubleLeftIcon className="text-gray-200 hover:text-gray-50 w-5 h-5"></ChevronDoubleLeftIcon>
          ) : (
            <ChevronDoubleRightIcon className="text-gray-200 hover:text-gray-50 w-5 h-5"></ChevronDoubleRightIcon>
          )}
        </div>
      </div>
      {/* {data?.role == "admin" ? ( */}
      <MenuItem
        href="/publication"
        includeActiveLink={["/publication"]}
        isExpanded={!isMenuExpanded}
        title="File Publikasi"
      >
        <PlusCircleIcon className="w-5 h-5"></PlusCircleIcon>
      </MenuItem>
      <MenuItem
        href="/publication-download-count"
        includeActiveLink={["/publication-download-count"]}
        isExpanded={!isMenuExpanded}
        title="Publikasi Download Count"
      >
        <PlusCircleIcon className="w-5 h-5"></PlusCircleIcon>
      </MenuItem>
      <MenuItem
        href="/sync"
        includeActiveLink={["/sync"]}
        isExpanded={!isMenuExpanded}
        title="Sinkronisasi Data"
      >
        <RefreshIcon className="w-5 h-5"></RefreshIcon>
      </MenuItem>
      <MenuItem
        href="/manual-update"
        includeActiveLink={["/manual-update"]}
        isExpanded={!isMenuExpanded}
        title="Update Data Manual"
      >
        <ArrowDownIcon className="w-5 h-5"></ArrowDownIcon>
      </MenuItem> 
      <MenuItem
        href="/sync-log"
        includeActiveLink={["/sync-log"]}
        isExpanded={!isMenuExpanded}
        title="Log Sinkronasi"
      >
        <ClockIcon className="w-5 h-5"></ClockIcon>
      </MenuItem>
      {/* ) : null} */}
      <MenuItem
        href="/merek/detail"
        includeActiveLink={["/merek"]}
        isExpanded={!isMenuExpanded}
        title="Data Merek"
      >
        <LightningBoltIcon className="w-5 h-5"></LightningBoltIcon>
      </MenuItem>
      <MenuItem
        href="/paten/detail"
        includeActiveLink={["/paten"]}
        isExpanded={!isMenuExpanded}
        title="Data Paten"
      >
        <BookOpenIcon className="w-5 h-5"></BookOpenIcon>
      </MenuItem>{" "}
      <MenuItem
        href="/desain-industri/detail"
        includeActiveLink={["/desain-industri"]}
        isExpanded={!isMenuExpanded}
        title="Data Desain Industri"
      >
        <BeakerIcon className="w-5 h-5"></BeakerIcon>
      </MenuItem>
      <MenuItem
        href="/hak-cipta/detail"
        includeActiveLink={["/hak-cipta"]}
        isExpanded={!isMenuExpanded}
        title="Data Hak Cipta"
      >
        <DuplicateIcon className="w-5 h-5"></DuplicateIcon>
      </MenuItem>
      <MenuItem
        href="/indikasi-geografis/detail"
        includeActiveLink={["/indikasi-geografis"]}
        isExpanded={!isMenuExpanded}
        title="Data Indikasi Geografis"
      >
        <GlobeIcon className="w-5 h-5"></GlobeIcon>
      </MenuItem> 
      <MenuItem
        href="/user"
        includeActiveLink={["/user"]}
        isExpanded={!isMenuExpanded}
        title="Manajemen User"
      >
        <UserIcon className="w-5 h-5"></UserIcon>
      </MenuItem>
    </nav>
  );
}
export default Menu;
