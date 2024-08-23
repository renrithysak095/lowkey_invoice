import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import Image from "next/image";
import { Category2, HambergerMenu } from "iconsax-react";
import { Button } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { pushAlert } from "@/app/redux/sampleSlice";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {

  const dispatch = useDispatch();

  return (
    <header className="sticky top-0 z-10 flex w-full border-b border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark">
      <div className="flex flex-grow items-center justify-between px-4 py-5 shadow-2 md:px-5 2xl:px-10">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <Button
            isIconOnly
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-dark-3 dark:bg-dark-2 lg:hidden"
          >
            <HambergerMenu />
          </Button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" href="/">
            <Category2 className="text-primary" size={24} />
          </Link>
        </div>

        <div className="hidden xl:block">
          <div>
            <h1 className="mb-0.5 text-heading-5 font-bold text-dark dark:text-white">
              Dashboard
            </h1>
          </div>
        </div>

        <div className="flex items-center justify-normal gap-2 2xsm:gap-4 lg:w-full lg:justify-between xl:w-auto xl:justify-normal">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggle --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggle --> */}
            <Button
              size="sm"
              onPress={() => dispatch(pushAlert({
                open: true,
                type: "success",
                message: "Alert Pushed",
                duration: 1600,
              }))}>
              Test Alert
            </Button>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
