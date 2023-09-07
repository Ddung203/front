/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import { Button } from "@material-tailwind/react";
const Upload = () => {
  const fileInput = useRef(null);

  const [studentName, setStudentName] = useState("");
  const [studentId, setstudentId] = useState("");

  const [newFileName, setNewFileName] = useState("");
  const [originFileName, setOriginFileName] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [preFile, setPreFile] = useState(null);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    const lastDot = file.name.lastIndexOf(".");
    const ext = file.name.substring(lastDot + 1);

    setSelectedFile(file);
    setOriginFileName(file.name);
    setNewFileName(`${studentId}-${studentName}.${ext}`);
    setPreFile(URL.createObjectURL(e.target.files[0]));
  };

  const submitForm = async () => {
    const formData = new FormData();
    formData.append("id", studentId);
    formData.append("studentName", studentName);
    formData.append("name", newFileName);
    formData.append("file", selectedFile, newFileName);

    const response = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      alert("SUCCESS: " + response.statusText);
    } else {
      const errorData = await response.json();
      alert("Error: " + response.statusText);
      throw new Error("File Upload Error");
    }
  };

  return (
    <>
      <div className="upload flex p-5 items-center gap-3 flex-col">
        <form
          style={{ padding: "20px" }}
          className="w-full shadow shadow-[rgba(0, 0, 0, 0.35) 0px 5px 15px]"
          onSubmit={submitForm}
        >
          <div className="group relative w-72 md:w-80 lg:w-96">
            <label
              htmlFor="1"
              className="block w-full pb-1 text-base mt-2 font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Tên sinh viên
            </label>
            <input
              id="1"
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Tên sinh viên"
              className="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-[#ff6700]"
            />
          </div>
          <div className="group relative w-72 md:w-80 lg:w-96">
            <label
              htmlFor="2"
              className="block w-full pb-1 text-base mt-2 font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Mã sinh viên
            </label>
            <input
              id="2"
              type="text"
              value={studentId}
              onChange={(e) => setstudentId(e.target.value)}
              placeholder="Mã sinh viên"
              className="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white  focus:ring-orange-600"
            />
          </div>

          <div className="flex items-center gap-3 flex-col object-cover">
            <label className="block w-full pb-1 text-base mt-2 font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
              Cover photo
            </label>
            <img className="w-36 mt-2" src={preFile} alt="Preview Image" />
          </div>

          <div className="file-uploader mt-4">
            <input
              type="file"
              onChange={handleFileInput}
              ref={fileInput}
              accept=".jpg, .jpeg, .png"
            />
          </div>

          <div className="w-full pt-4  flex justify-center items-center ">
            <Button
              type="submit"
              variant="gradient"
              className="mt-3 mb-4 flex items-center gap-3 text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
              Upload File
            </Button>
          </div>
        </form>
      </div>
      {/* <h1>{"studentName: " + studentName}</h1>
      <h1>{"studentId: " + studentId}</h1>
      <h1>{"newFileName: " + newFileName}</h1>
      <h1>{"originFileName: " + originFileName}</h1> */}
    </>
  );
};

export default Upload;
