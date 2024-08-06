import { Amount } from "./Amount";

const PaymentSummary = ({ data, next }) => {
  const handleNext = () => {
    next({ payment: data.payments[0] });
  };

  return (
    <div className="container mx-auto flex flex-col justify-center min-h-screen">
      <h1 className="text-5xl mb-8">Here are your dues</h1>
      <div className="mb-8 bg-gray-700 text-white p-4 rounded">
        <h2 className="text-2xl mb-1">Required now</h2>
        <div className="flex justify-between">
          <Amount value={data.payments[0].amount} />
          <div>
            <button
              onClick={handleNext}
              className="text-sm rounded px-4 py-2 bg-green-600 hover:bg-green-500 text-white whitespace-no-wrap"
            >
              Proceed to pay
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-300 p-5 rounded">
        <h2 className="text-2xl mb-1">On the tab</h2>
        {data.payments.length > 1 ? (
          data.payments.slice(1).map((payment, idx) => (
            <div key={idx} className="flex justify-between items-center mb-4">
              <div className="">
                <p className="text-semibold">
                  Required by {payment.requiredBy.join("-")}.
                </p>
                <p className="mb-2">
                  75% of your total is on the tab. Make sure to clear your due
                  on time.
                </p>
                <Amount value={payment.amount} />
              </div>
            </div>
          ))
        ) : (
          <p>All clear here!</p>
        )}
      </div>
    </div>
  );
};

export default PaymentSummary;
