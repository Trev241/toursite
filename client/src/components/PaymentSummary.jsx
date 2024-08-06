import { Amount } from "./Amount";

const PaymentSummary = ({ data, next }) => {
  const handleNext = () => {
    next({ payment: data.payments[0] });
  };

  return (
    <div className="container mx-auto flex flex-col">
      <h1 className="text-5xl mb-8">Here are your dues</h1>
      <div className="mb-8 px-4 rounded-2xl">
        <h2 className="text-2xl mb-1">Required now</h2>
        <div className="flex justify-between">
          <Amount value={data.payments[0].amount} />
        </div>
        <p>Make this payment now to secure your reservation.</p>
      </div>

      <div className="px-4">
        <h2 className="text-2xl mb-1">On the tab</h2>
        {data.payments.length > 1 ? (
          data.payments.slice(1).map((payment, idx) => (
            <div key={idx} className="flex justify-between items-center mb-4">
              <div className="">
                <Amount value={payment.amount} />
                <p className="mt-2 text-semibold">
                  Required by {payment.requiredBy.join("-")}.
                </p>
                <p className="mb-2">
                  75% of your total is on the tab. Make sure to clear your due
                  on time.
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>All clear here!</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          className="text-sm rounded px-4 py-2 bg-green-600 hover:bg-green-500 text-white whitespace-no-wrap"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PaymentSummary;
