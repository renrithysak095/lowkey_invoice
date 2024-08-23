"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/app/components/Sidebar/SidebarItem";
import ClickOutside from "@/app/components/ClickOutside";
import useLocalStorage from "@/app/hooks/useLocalStorage";
import {
  ArrowLeft2,
  ArrowLeft3,
  ArrowRight2,
  BrushBig,
  Category,
  Category2,
  DocumentText,
  ElementPlus,
  Layer,
} from "iconsax-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    name: "MAIN MENU",
    menuItems: [
      {
        icon: <Category2 />,
        label: "Templates",
        route: "/template",
      },
      {
        icon: <BrushBig />,
        label: "Design",
        route: `/design/${"create"}`,
        // children: [
        //   { label: "Create Invoice", route: "/create_new" },
        // ],
      },

      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
              d="m6.5 4.25.75-.75a2.121 2.121 0 0 1 3 3L6.5 10.25 2.75 6.5a2.121 2.121 0 0 1 3-3l.75.75zm7 6 4-7.5 4 7.5h-8zm-10.75 3.5h7.5v7.5h-7.5v-7.5zm14.75-.25a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
            ></path>
          </svg>
        ),
        label: "Elements",
        route: "/elements",
      },
      {
        icon: <DocumentText />,
        label: "Document",
        route: "/docs",
      },
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const [pageName, setPageName] = useLocalStorage("selectedMenu", "Design");

  const [toggleClass, setToggleClass] = useState("w-[200px]");
  const handleToggleSmallbar = () => {
    toggleClass === "w-[80px]"
      ? setToggleClass("w-[200px]")
      : setToggleClass("w-[80px]");
  };
  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`absolute left-0 top-0 z-[9999] transition-all duration-500 flex h-screen ${toggleClass} flex-col overflow-y-hidden border-r border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark lg:static lg:translate-x-0 ${sidebarOpen
            ? "translate-x-0 duration-300 ease-linear"
            : "-translate-x-full"
          }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 pl-4 py-5.5 lg:py-6.5 py-4 xl:py-10 overflow-hidden">
          <Link href="/" className="lg-text-2xl font-bold flex">
            <span>
              <Category2
                className={`text-primary`}
                size={toggleClass === "w-[80px]" ? 30 : 16}
              />
              <span className={`${toggleClass === "w-[80px]" && "hidden"}`}>
                <span className="text-primary">Invoice</span>
                <br /> Viewer
              </span>
            </span>
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>

          <div
            onClick={handleToggleSmallbar}
            className="bg-primary text-white rounded-md -mr-2 cursor-pointer"
          >
            {toggleClass === "w-[80px]" ? (
              <ArrowLeft2 size={20} />
            ) : (
              <ArrowRight2 size={20} />
            )}
          </div>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-1 px-2 lg:px-4">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                {/* <h3 className="mb-2 text-sm font-medium text-dark-4 dark:text-dark-6">
                  {group.name}
                </h3> */}

                <ul className="mb-4 flex flex-col gap-2">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                      toggleClass={toggleClass}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
