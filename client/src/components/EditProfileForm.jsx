import React, { useState } from 'react';

const EditProfileForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label htmlFor="username" className="font-semibold text-gray-700">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
          placeholder="Username"
          required
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="firstName" className="font-semibold text-gray-700">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
          placeholder="First Name"
          required
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="lastName" className="font-semibold text-gray-700">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
          placeholder="Last Name"
          required
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="email" className="font-semibold text-gray-700">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded"
          placeholder="Email Address"
          required
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-teal-500 text-white p-2 rounded hover:bg-teal-600 transition duration-150 ease-in-out"
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditProfileForm;
