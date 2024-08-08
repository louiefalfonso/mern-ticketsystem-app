import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const NotFound = () => {
  return (
    <>
      <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="logo" className="w-40" />
          </div>
          <h1 className="text-base font-semibold text-red-600 sm:text-5xl">
            404
          </h1>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 ">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-5 flex items-center justify-center gap-x-6">
            <Link
              to="/login"
              className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            >
            Go Back Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
