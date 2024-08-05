import { Amount } from "./Amount";

const PaymentSummary = ({ data, next }) => {
  return (
    <div className="container mx-auto">
      <h1 className="text-5xl mb-8">Here are your dues</h1>
      {data.payments.map((payment, idx) => (
        <div className="flex justify-between items-center mb-4">
          <div className="">
            <h2 className="text-3xl">Payment {idx + 1}</h2>
            <Amount value={payment.amount} />
          </div>

          {idx === 0 ? (
            <div>
              <button
                type="submit"
                className="text-sm border border-2 rounded px-4 py-2 bg-green-600 hover:bg-green-500 text-white whitespace-no-wrap"
              >
                Proceed to pay
              </button>
            </div>
          ) : (
            <p>
              Required by <b>{payment.requiredBy.join("-")}</b>
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default PaymentSummary;
