import React, { useState } from 'react';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaArrowLeft } from 'react-icons/fa'; // Importing icons

const PaymentPage = () => {
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const [creditCard, setCreditCard] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [showCreditCard, setShowCreditCard] = useState(false); // State to toggle Credit Card Details

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handleCreditCardChange = (e) => {
    const { name, value } = e.target;
    setCreditCard({ ...creditCard, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowCreditCard(true); // Show Credit Card Details section on clicking Next
  };

  const handleBack = () => {
    setShowCreditCard(false); // Show Shipping Address section on clicking Back
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Payment</h1>
      </div>
      <div className="flex gap-8">
        {/* Back Arrow */}
        {showCreditCard && (
          <div className="absolute top-4 left-4 cursor-pointer text-blue-600" onClick={handleBack}>
            <FaArrowLeft className="text-2xl" />
          </div>
        )}

        {/* Left Section: Order Summary */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md border border-gray-300">
          <h2 className="text-3xl font-extrabold mb-6 text-gray-900">Order Summary</h2>
          <div className="bg-gray-100 p-5 rounded-lg shadow-inner mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Total $134.98</h3>
            <ul className="space-y-4">
              <li className="flex justify-between text-gray-700">
                <span className="font-medium">Tourism Plan</span>
                <span className="font-semibold">$15.00</span>
              </li>
              <li className="flex justify-between text-gray-700">
                <span className="font-medium">HST TAX%</span>
                <span className="font-semibold">Free</span>
              </li>
              <li className="flex justify-between text-gray-700">
                <span className="font-medium">Service Charges</span>
                <span className="font-semibold">$69.99</span>
              </li>
              <li className="flex justify-between text-gray-700">
                <span className="font-medium">Other Fees</span>
                <span className="font-semibold">$49.99</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section: Conditional Content */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md border border-gray-300">
          {showCreditCard ? (
            <>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">Credit Card Details</h3>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Card Number *</label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={creditCard.cardNumber}
                  onChange={handleCreditCardChange}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-medium">Cardholder Name *</label>
                  <input
                    type="text"
                    name="cardName"
                    placeholder="John Doe"
                    value={creditCard.cardName}
                    onChange={handleCreditCardChange}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Expiry Date *</label>
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={creditCard.expiryDate}
                    onChange={handleCreditCardChange}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">CVV *</label>
                <input
                  type="text"
                  name="cvv"
                  placeholder="123"
                  value={creditCard.cvv}
                  onChange={handleCreditCardChange}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex items-center space-x-3 mb-6">
                <FaCcVisa className="text-blue-600 text-xl" />
                <FaCcMastercard className="text-red-600 text-xl" />
                <FaCcAmex className="text-green-600 text-xl" />
              </div>
              <div className="flex items-center gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                  REDEEM
                </button>
              </div>
              <button
                type="button"
                className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 w-full"
              >
                Confirm Payment
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">Shipping Address</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium">First name *</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    value={shippingAddress.firstName}
                    onChange={handleShippingChange}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Last name *</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    value={shippingAddress.lastName}
                    onChange={handleShippingChange}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium">Address line 1 *</label>
                <input
                  type="text"
                  name="addressLine1"
                  placeholder="123 Main St"
                  value={shippingAddress.addressLine1}
                  onChange={handleShippingChange}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium">Address line 2</label>
                <input
                  type="text"
                  name="addressLine2"
                  placeholder="Apt, suite, etc. (optional)"
                  value={shippingAddress.addressLine2}
                  onChange={handleShippingChange}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium">City *</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="New York"
                    value={shippingAddress.city}
                    onChange={handleShippingChange}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">State *</label>
                  <input
                    type="text"
                    name="state"
                    placeholder="NY"
                    value={shippingAddress.state}
                    onChange={handleShippingChange}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium">Zip / Postal code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="10001"
                    value={shippingAddress.zipCode}
                    onChange={handleShippingChange}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Country *</label>
                  <input
                    type="text"
                    name="country"
                    placeholder="United States"
                    value={shippingAddress.country}
                    onChange={handleShippingChange}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="flex items-center text-gray-700">
                  <input type="checkbox" className="mr-2 text-blue-600" />
                  Use this address for payment details
                </label>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 w-full"
              >
                Next
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
