/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FaFilePdf, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import { useUploadFileMutation } from "../../../Redux/feature/auth/aithapi";
const EditPurchaseModal = ({
  isOpen,
  onClose,
  refetchUpcomingWarranty,
  refetchActiveWarranty,
  refetchTotalPurchase,
}) => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  // Using the RTK Query hook for file upload
  const [uploadFile, { isLoading, isError }] = useUploadFileMutation();
  if (!isOpen) return null;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file && file.type === "application/pdf") {
      try {
        // Generate a unique ID using the current timestamp
        const uniqueId = new Date().getTime();

        // Log the unique ID to verify it is being created
        console.log("Unique ID for this request:", uniqueId);

        // Upload the file with the unique ID as a query parameter
        const response = await uploadFile(file, {
          params: { uniqueId },
        }).unwrap(); // Unwrap the response

        // Log the server response
        console.log("File upload response:", response);

        // Check if the response contains data
        if (response && response.length > 0) {
          Swal.fire({
            icon: "success",
            title: "File Uploaded",
            text: `${file.name} has been uploaded successfully!`,
            confirmButtonColor: "#22c55e", // green
          });
        } else {
          Swal.fire({
            icon: "info",
            title: "No Data",
            text: "No relevant data was found in the file.",
            confirmButtonColor: "#f59e0b", // orange
          });
        }

        setFile(null); // Clear the file after upload
        onClose(); // Close modal after upload
      } catch (err) {
        // Handle error
        console.error("Error uploading file:", err);

        // Show SweetAlert error message if upload fails
        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: "There was an error uploading the file.",
          confirmButtonColor: "#ef4444", // red
        });
      }
    } else {
      // Show SweetAlert error if file type is invalid
      Swal.fire({
        icon: "error",
        title: "Invalid File",
        text: "Please select a valid PDF file.",
        confirmButtonColor: "#ef4444", // red
      });
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-40">
      <div className="relative w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
        {/* Close Button */}
        <button
          className="absolute text-2xl font-bold text-gray-400 top-4 right-4 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="mb-6 text-2xl font-semibold text-center main-color poppins">
          📄 Upload PDF Receipt
        </h2>

        {/* Upload Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-all poppins ${
              dragActive ? "border-gray-500 bg-green-50" : "border-gray-300"
            }`}
          >
            {file ? (
              <div className="flex items-center justify-between w-full gap-2 px-4 py-2 bg-gray-100 rounded">
                <div className="flex items-center gap-2">
                  <FaFilePdf className="text-xl text-green-600" />
                  <p className="text-sm text-black">{file.name}</p>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="text-lg text-red-500 hover:text-red-700"
                  title="Remove File"
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <>
                <FaFilePdf className="mb-3 text-4xl text-green-600" />
                <p className="mb-2 text-sm text-gray-700 poppins">
                  Drag & Drop your PDF here or
                </p>
                <label className="font-medium text-green-600 cursor-pointer hover:underline">
                  Browse file
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white transition rounded-lg shadow bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          >
            Upload PDF
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPurchaseModal;
