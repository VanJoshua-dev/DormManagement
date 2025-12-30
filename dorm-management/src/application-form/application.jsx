import React, { useState } from "react";
import bg from "../assets/loginBg.jpg";
import bgFull from "../assets/bg-full.jpg";
import { useSubmitApplication } from "../services/application-module-services.js";
import Swal from "sweetalert2";
import { IoIosInformationCircle } from "react-icons/io";
function ApplicationForm({ applicationAccessibility = false }) {
  const [studentID, setStudentID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNUmber] = useState("");

  const { loading, access, handleSubmit } = useSubmitApplication({
    studentID,
    firstName,
    lastName,
    gender,
    yearLevel,
    email,
    contactNumber,
  });

  const whenClosed = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "info",
      title: "Applications Closed",
      text: "Dormitory applications are currently closed at the moment.",
      confirmButtonText: "Okay",
    });
  };
  return (
    <div className="w-full h-full min-h-screen grid grid-cols-1 md:grid-cols-2 px-6 py-10 md:overflow-hidden">
      <div className="w-full h-70 md:hidden bg-contain bg-center  bg-no-repeat">
        <img src={bgFull} alt="" className="w-full h-full rounded-t-lg" />
      </div>

      <div className="w-full h-full flex items-center justify-center  bg-gray-50">
        <div className="w-full h-full bg-white shadow-[0px_0px_20px_1px_#cbd5e0] rounded-t-none md:rounded-l-lg p-8">
          {!access ? (
            <div className="w-full px-3 py-3 flex items-center gap-3 rounded-xl mb-4 bg-amber-50 border border-amber-200">
              <IoIosInformationCircle className="text-amber-400 mt-0.5 md:text-2xl text-7xl" />
              <p className="text-sm text-gray-700">
                Dormitory applications are currently closed. Please wait for the
                next opening.
              </p>
            </div>
          ) : (
            <></>
          )}
          <h1 className="text-2xl font-bold text-gray-700 mb-6">
            Dormitory Application Form
          </h1>

          <form
            onSubmit={!access ? whenClosed : handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Student ID */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">
                Student ID Number
              </label>
              <input
                type="number"
                value={studentID}
                onChange={(e) => setStudentID(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                placeholder="e.g., 220100234"
                required
              />
            </div>

            {/* First Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                placeholder="Enter first name"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                placeholder="Enter last name"
                required
              />
            </div>
            {/* Gender */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Gender
              </label>
              <select
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full cursor-pointer hover:border-blue-300 hover:border-2 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              >
                <option value="">- Choose Gender -</option>
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
              </select>
            </div>

            {/* Year Level */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Year Level
              </label>
              <select
                required
                value={yearLevel}
                onChange={(e) => setYearLevel(e.target.value)}
                className="w-full cursor-pointer hover:border-blue-300 hover:border-2 px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              >
                <option value="">- Choose Year -</option>
                <option value={1}>First Year</option>
                <option value={2}>Second Year</option>
                <option value={3}>Third Year </option>
                <option value={4}>Fourth Year</option>
              </select>
            </div>

            {/* Email */}
            <div className="md:col-span-1">
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                placeholder="example@email.com"
                required
              />
            </div>

            {/* Contact */}
            <div className="md:col-span-1">
              <label className="block text-gray-700 font-medium mb-2">
                Contact Number
              </label>
              <input
                type="number"
                value={contactNumber}
                onChange={(e) => setContactNUmber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                placeholder="09xxxxxxxxx"
                required
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white cursor-pointer rounded-md font-semibold hover:bg-blue-700 duration-300"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        className="hidden md:block w-full h-full bg-cover bg-center rounded-r-lg"
        style={{ backgroundImage: `url(${bg})` }}
      />
    </div>
  );
}

export default ApplicationForm;
