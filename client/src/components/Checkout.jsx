import { API_BASE_URL } from "../constants/Constants";
import { Amount } from "./Amount";

export const Checkout = ({ data, next }) => {
  const tabAmount =
    data.payments.length > 1
      ? data.payments.slice(1).reduce((prev, curr) => prev.amount + curr.amount)
          .amount
      : 0;

  const handleNext = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/payments/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentId: data.payment.id,
        }),
      });

      const result = await response.json();
      console.log(result);

      next({
        payment: result,
        tabAmount: tabAmount,
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-5xl mb-8">Checkout</h1>
      <div className="flex flex-wrap">
        <div className="flex-grow m-8">
          <div className="mb-8">
            <p className="text-3xl">Total</p>
            <div className="px-4">
              <Amount size="5" value={data.payment.amount} />
            </div>
          </div>

          <ul>
            <li className="flex justify-between items-end mb-2">
              <p className="text-sm">Reservation cost</p>
              <Amount size="" value={data.booking.totalPrice} />
            </li>
            <li className="flex justify-between items-end mb-2">
              <p className="text-sm">Promotions</p>
              <Amount negative size="" value={data.booking.discount} />
            </li>
            <li className="flex justify-between items-end mb-2">
              <p className="text-sm">On the tab</p>
              <Amount negative size="" value={tabAmount} />
            </li>
            <hr />
            <li className="flex justify-between items-end my-4">
              <p className="font-bold">Net total</p>
              <Amount value={data.payment.amount} />
            </li>
          </ul>
        </div>

        <div className="flex flex-col justify-between flex-grow m-8">
          <h2 className="text-3xl">Payment Details</h2>

          <form className="flex flex-col py-8" onSubmit={handleNext}>
            <div className="flex justify-between">
              <label className="mb-1">Card Number</label>
              <div className="mb-2">
                <input
                  className="text-md border focus:outline-none rounded-lg px-2 py-1"
                  type="text"
                  placeholder="1234 1234 1234 1234"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <label className="mb-1">Expiry</label>
              <div className="flex mb-2">
                <input
                  className="text-md border focus:outline-none rounded-lg px-2 py-1"
                  type="text"
                  placeholder="MM/YY"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <label className="mb-1">CVV</label>
              <div className="mb-2">
                <input
                  className="text-md border focus:outline-none rounded-lg px-2 py-1"
                  type="password"
                  placeholder="Security Code"
                />
              </div>
            </div>

            <button
              type="submit"
              className="text-sm mt-2 w-1/2 mx-auto rounded px-4 py-2 bg-green-600 hover:bg-green-500 text-white whitespace-no-wrap"
            >
              Pay ${data.payment.amount}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
