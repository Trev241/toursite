import { useNavigate } from "react-router-dom";
import { Amount } from "./Amount";

const Invoice = ({ data, next }) => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/");
  };

  return (
    <>
      <div className="container mx-auto flex flex-col items-center">
        <div className="p-8 rounded border-gray-300 border m-8">
          <h1 className="text-5xl mb-4">Invoice</h1>

          <div className="w-[500px] ">
            <div className="mb-4">
              <h2 className="me-2">Reservation at</h2>
              <span className="text-3xl">
                {data.site.street}, {data.site.city}
              </span>
            </div>

            <div className="mb-4">
              <h2 className="me-2">Each night at a rate of</h2>
              <span>
                <Amount value={data.site.price} />
              </span>
            </div>

            <div className="flex justify-evenly mb-8">
              <div>
                <h2>From</h2>
                <p className="text-3xl">{data.booking.checkInDate}</p>
              </div>
              <div>
                <h2>To</h2>
                <p className="text-3xl">{data.booking.checkOutDate}</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <h2 className="text-xl">Reservation cost</h2>
                <Amount size="" value={data.booking.totalPrice} />
              </div>
              {data.booking.coupons.length > 0 && (
                <>
                  <h2 className="text-xl mb-2">Promotions and discounts</h2>
                  <ul>
                    {data.booking.coupons.map((coupon, idx) => (
                      <li key={idx} className="flex justify-between mb-2">
                        <h2 className="text-sm">
                          Applied coupon {coupon.code}
                        </h2>
                        <Amount
                          negative
                          size=""
                          value={
                            (data.booking.totalPrice * coupon.discountRate) /
                              100 +
                            coupon.flatDiscount
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <div className="flex justify-between mb-4">
                <h2 className="text-xl">On the tab</h2>
                <Amount negative size="" value={data.tabAmount} />
              </div>

              <hr />

              <div className="flex justify-between my-2 items-end">
                <h2 className="text-xl font-bold">Net total</h2>
                <Amount value={data.payments[0].amount} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleNext}
          className="text-sm mt-2 rounded px-4 py-2 bg-green-600 hover:bg-green-500 text-white whitespace-no-wrap"
        >
          Continue
        </button>
      </div>
    </>
  );
};

export default Invoice;
