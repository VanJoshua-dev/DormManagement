import React from "react";
import bg from "../assets/loginBg.jpg";
import bgFull from "../assets/bg-full.jpg";
function ApplicationForm() {
  return (
    <div className="w-full h-full min-h-screen grid grid-cols-1 md:grid-cols-2 px-6 py-10">
      {/* MOBILE IMAGE (visible on small screens only) */}
      <div className="w-full h-70 md:hidden bg-contain bg-center  bg-no-repeat">
        <img src={bgFull} alt="" className="w-full h-full rounded-t-lg" />
      </div>

      {/* LEFT — FORM */}
      <div className="w-full h-full flex items-center justify-center  bg-gray-50">
        <div className="w-full h-full bg-white shadow-[0px_0px_20px_1px_#cbd5e0] rounded-t-none md:rounded-l-lg p-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-6">
            Dormitory Application Form
          </h1>

          <form className="grid grid-cols-2 gap-6">
            {/* Student ID */}
            <div className="col-span-2">
              <label className="block text-gray-700 font-medium mb-2">
                Student ID Number
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                placeholder="e.g., 220100234"
              />
            </div>

            {/* First Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                placeholder="Enter first name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                placeholder="Enter last name"
              />
            </div>

            {/* Year Level */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Year Level
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300">
                <option value="">Choose Year</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>

            {/* Email */}
            <div className="col-span-2">
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                placeholder="example@email.com"
              />
            </div>

            {/* Contact Number */}
            <div className="col-span-2">
              <label className="block text-gray-700 font-medium mb-2">
                Contact Number
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                placeholder="09xxxxxxxxx"
              />
            </div>

            {/* Submit */}
            <div className="col-span-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 duration-300"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT — DESKTOP BG IMAGE (hidden on mobile) */}
      <div
        className="hidden md:block w-full h-full bg-cover bg-center rounded-r-lg"
        style={{ backgroundImage: `url(${bg})` }}
      />
    </div>
  );
}

export default ApplicationForm;
