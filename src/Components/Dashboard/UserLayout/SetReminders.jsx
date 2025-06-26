import { useState } from "react";
import Swal from "sweetalert2";

const SetReminders = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    productName: "",

    date: "",
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [errors, setErrors] = useState({
    productName: "",
    date: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  if (!isOpen) return null;
  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { productName, date } = formData;

    let newErrors = {};
    if (!productName.trim()) {
      newErrors.productName = "Product name must be requiered";
    }
    if (!date.trim()) {
      newErrors.date = "Date must be requiered";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({ productName: "", date: "" });

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Purchase added successfully!",
    });

    setFormData({
      productName: "",

      date: "",
    });
    setPdfFile(null);
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-6 main-color text-center poppins">
          Set Reminders
        </h2>

        <form className="" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-3 py-2"
              placeholder="Product name*"
            />
            {errors.productName && (
              <p className="text-red-600 text-sm mt-1 ">{errors.productName}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-3 py-2"
              placeholder="Date*"
            />
            {errors.date && (
              <p className="text-red-600 text-sm mt-1 ">{errors.date}</p>
            )}
          </div>

          <div className="w-1/2  justify-center mx-auto mb-4">
            <button
              type="submit"
              className="bg-green-600 text-white  py-2 rounded-2xl w-full hover:bg-green-700"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetReminders;
