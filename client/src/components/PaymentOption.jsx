import { useState } from "react";
import { API_BASE_URL } from "../constants/Constants";

export const PaymentOption = ({ data, next }) => {
  const [paymentMethod, setPaymentMethod] = useState("0");

  const handleNext = async (e) => {
    e.preventDefault();

    let payments;

    console.log({
      bookingId: data.booking.id,
      paymentMode: Number(paymentMethod),
    });

    try {
      const response = await fetch(`${API_BASE_URL}/payments/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: data.booking.id,
          paymentMode: Number(paymentMethod),
        }),
      });
      payments = await response.json();

      next({
        paymentMethod,
        payments,
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="container mx-auto flex flex-col">
      <h1 className="text-5xl mb-8">Choose a method of payment</h1>

      <form onSubmit={handleNext}>
        <div
          className="flex rounded p-4 mb-4 hover:bg-gray-100"
          onClick={() => setPaymentMethod("0")}
        >
          <input
            name="strategy"
            type="radio"
            checked={paymentMethod === "0"}
            value="0"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <div className="px-4">
            <h2 className="text-2xl">Down payment</h2>
            <p>
              Pay down 25% of the total. The remaining will be due on the day
              you check in.
            </p>
          </div>
        </div>

        <div
          className="flex rounded p-4 mb-8 hover:bg-gray-100"
          onClick={() => setPaymentMethod("1")}
        >
          <input
            name="strategy"
            type="radio"
            checked={paymentMethod === "1"}
            value="1"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <div className="px-4">
            <h2 className="text-2xl">Full Settlement</h2>
            <p>
              Pay the entire amount at once now so that you do not have to worry
              about any dues later.
            </p>
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <button
            type="submit"
            className="text-sm border border-2 rounded px-4 py-2 bg-green-600 hover:bg-green-500 text-white whitespace-no-wrap"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};
