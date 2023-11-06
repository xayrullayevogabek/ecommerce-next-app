"use client";
import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div>
      <header className="text-black-600 z-50 body-font shadow-md fixed top-0 w-full bg-white">
        <div className="container mx-auto flex flex-wrap px-8 py-5 flex-col md:flex-row items-center">
          <Link
            href={"/"}
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl font-semibold">
              Ecommerce <span className=" text-indigo-500 font-bold">Next</span>
            </span>
          </Link>
          <nav className="md:ml-auto md:mr-auto font-medium flex flex-wrap items-center text-base justify-between">
            <Link href={"/"} className="mr-5 hover:text-gray-900">
              Home
            </Link>
            <Link href={"/products"} className="mr-5 hover:text-gray-900">
              All Products
            </Link>
            <Link href={"/contact"} className="mr-5 hover:text-gray-900">
              Contact
            </Link>
            {session ? (
              <li className="mr-5 hover:text-gray-900 truncate">
                {session?.user?.email}
              </li>
            ) : (
              ""
            )}
          </nav>
          {!session ? (
            <>
              <Link href={"/login"}>
                <button className="bg-indigo-500 flex items-center px-3 py-3 text-white rounded-md hover:bg-transparent border hover:text-black hover:border-indigo-500 transition duration-500">
                  Login
                </button>
              </Link>
              <Link href={"/register"}>
                <button className="bg-indigo-500 flex  ml-3 items-center px-3 py-3 text-white rounded-md hover:bg-transparent border hover:text-black hover:border-indigo-500 transition duration-500">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <Link href={"/"}>
              <button onClick={() => signOut()} className="bg-indigo-500 flex  ml-3 items-center px-3 py-3 text-white rounded-md hover:bg-transparent border hover:text-black hover:border-indigo-500 transition duration-500">
                Log Out
              </button>
            </Link>
          )}
          <Link href={"/shopping-cart"}>
            <button className="bg-indigo-500 flex ml-3 items-center px-3 py-3 text-white rounded-md hover:bg-transparent border hover:text-black hover:border-indigo-500 transition duration-500">
              My Bag
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
