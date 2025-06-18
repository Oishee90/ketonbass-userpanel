import React, { useState } from "react";
import { FaFilePdf, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
const EditPurchaseModal = ({ isOpen, onClose }) => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file && file.type === "application/pdf") {
      // Show SweetAlert success message
      Swal.fire({
        icon: "success",
        title: "File Uploaded",
        text: `${file.name} has been uploaded successfully!`,
        confirmButtonColor: "#22c55e", // green
      });
      console.log("Uploading file:", file.name);
      // Clear file or close modal if needed
      setFile(null);
      onClose(); // optional: close the modal
    } else {
      // Show SweetAlert error
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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold main-color mb-6 text-center poppins">
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
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded w-full justify-between">
                <div className="flex items-center gap-2">
                  <FaFilePdf className="text-green-600 text-xl" />
                  <p className="text-sm text-black">{file.name}</p>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="text-red-500 hover:text-red-700 text-lg"
                  title="Remove File"
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <>
                <FaFilePdf className="text-green-600 text-4xl mb-3" />
                <p className="text-gray-700 text-sm mb-2 poppins">
                  Drag & Drop your PDF here or
                </p>
                <label className="cursor-pointer text-green-600 font-medium hover:underline">
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
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-lg shadow hover:from-green-600 hover:to-green-700 transition"
          >
            Upload PDF
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPurchaseModal;
