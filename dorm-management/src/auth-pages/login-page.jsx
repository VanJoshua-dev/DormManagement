import React from "react";
import bg from "../assets/loginBg.jpg";

function LoginPage() {
  return (
    <div
      className="grid grid-cols-5 grid-rows-7 gap-4 min-h-screen bg-cover bg-center "
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="col-span-5 row-span-7 place-items-center place-content-center w-full h-full bg-black/60 py-2 px-10">
        <div className="flex flex-col items-center justify-center py-5 px-9 md:px-13 rounded-sm shadow bg-white">
          <h1 className="text-xl md:text-2xl font-medium text-center">
            Login to <br />
            Dormitory Management
          </h1>
          <form action="" className="flex flex-col gap-3">
            {/**
             * Input fields
             */}
            <div className="flex flex-col gap-4 items-center">
              <div className="flex flex-col">
                <label htmlFor="" className="text-md">
                  Username
                </label>
                <input type="text" className="py-1 px-2 rounded-sm border" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="text-md">
                  Password
                </label>
                <input type="text" className="py-1 px-2 rounded-sm border" />
                <div className="mt-2 flex flex-row items-center gap-1">
                  <input type="checkbox" className="w-4 h-4 cursor-pointer" />
                  <span className="text-sm">Show password</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button className="bg-blue-500 w-40 rounded-sm text-white text-lg py-1 hover:bg-blue-600 transition-colors duration-300 cursor-pointer">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
