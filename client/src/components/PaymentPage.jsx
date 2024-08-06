import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {API_BASE_URL} from "../constants/Constants";
import {daysBetween} from "../utils/Utils";
import {Amount} from "./Amount";

const PaymentPage = ({next}) => {
    const [searchParams] = useSearchParams();

    const [booking, setBooking] = useState();
    const [site, setSite] = useState();
    const [couponCode, setCouponCode] = useState("");
    const [couponResponse, setCouponResponse] = useState();
    const [paymentDueToday, setPaymentDueToday] = useState(false);


    useEffect(() => {
        (async () => {
            try {
                const bookingId = searchParams.get("bookingId");
                const url = new URL(`${API_BASE_URL}/bookings/${bookingId}`);

                const response = await fetch(url);
                const booking = await response.json();

                // Check if payment is due today
                const paymentDeadline = new Date(booking.paymentDeadline);
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Set the time to the start of the day

                if (paymentDeadline <= today) {
                    setPaymentDueToday(true);
                }

                setBooking(booking);
                console.log(booking);
            } catch (err) {
                alert(err);
            }
        })();
    }, [searchParams, couponResponse]);

    useEffect(() => {
        (async () => {
            if (!booking) return;
            try {
                const siteId = booking.siteId;

                const response = await fetch(`${API_BASE_URL}/sites/${siteId}`);
                const site = await response.json();
                setSite(site);
            } catch (err) {
                alert(err);
            }
        })();
    }, [booking]);

    const redeemCoupon = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_BASE_URL}/coupons/redeem`, {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({
                    code: couponCode, bookingId: booking.id,
                }),
            });

            const couponResponse = await response.json();
            console.log(couponResponse);
            setCouponResponse(couponResponse);
        } catch (err) {
            alert(err);
        }

        setCouponCode("");
    };

    const handleNext = () => {
        next({booking, site});
    };

    return booking && site ? (// <div className="container mx-auto p-6 max-w-5xl">
        //   <div className="flex flex-col items-center mb-12">
        //     <h1 className="text-4xl font-bold text-gray-900">Payment</h1>
        //   </div>
        //   <div className="flex gap-8">
        //     {/* Back Arrow */}
        //     {showCreditCard && (
        //       <div
        //         className="absolute top-4 left-4 cursor-pointer text-blue-600"
        //         onClick={handleBack}
        //       >
        //         <FaArrowLeft className="text-2xl" />
        //       </div>
        //     )}

        //     {/* Left Section: Order Summary */}
        //     <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md border border-gray-300">
        //       <h2 className="text-3xl font-extrabold mb-6 text-gray-900">
        //         Order Summary
        //       </h2>
        //       <div className="bg-gray-100 p-5 rounded-lg shadow-inner mb-8">
        //         <h3 className="text-xl font-semibold text-gray-800 mb-4">
        //           Total ${booking.totalPrice}
        //         </h3>
        //         <h3>Promotions and Discounts</h3>
        //         <ul className="space-y-4">
        //           {booking.coupons.map((coupon) => (
        //             <li className="justify-between text-gray-700">
        //               <p className="font-medium">Code: {coupon.code}</p>
        //               <p className="font-medium">
        //                 {coupon.discountRate}% off:{" "}
        //                 <b>-{(booking.totalPrice * coupon.discountRate) / 100}</b>
        //               </p>
        //               <p className="font-medium">
        //                 Flat Discount: -{coupon.flatDiscount}
        //               </p>
        //             </li>
        //           ))}
        //           <h3>Subtotal: {booking.discount}</h3>
        //         </ul>
        //         <h1>Summary</h1>
        //         <h2>Total: ${booking.totalPrice}</h2>
        //         <h2>Discount(s) applied: ${booking.discount}</h2>
        //         <h2>Net total: ${booking.netTotal}</h2>
        //       </div>
        //     </div>

        //     {/* Right Section: Conditional Content */}
        //     <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md border border-gray-300">
        //       {showCreditCard ? (
        //         <>
        //           <h3 className="text-2xl font-semibold mb-6 text-gray-900">
        //             Credit Card Details
        //           </h3>
        //           <div className="mb-4">
        //             <label className="block text-gray-700 font-medium">
        //               Card Number *
        //             </label>
        //             <input
        //               type="text"
        //               name="cardNumber"
        //               placeholder="1234 5678 9012 3456"
        //               value={creditCard.cardNumber}
        //               onChange={handleCreditCardChange}
        //               className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //               required
        //             />
        //           </div>
        //           <div className="grid grid-cols-2 gap-4 mb-4">
        //             <div>
        //               <label className="block text-gray-700 font-medium">
        //                 Cardholder Name *
        //               </label>
        //               <input
        //                 type="text"
        //                 name="cardName"
        //                 placeholder="John Doe"
        //                 value={creditCard.cardName}
        //                 onChange={handleCreditCardChange}
        //                 className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                 required
        //               />
        //             </div>
        //             <div>
        //               <label className="block text-gray-700 font-medium">
        //                 Expiry Date *
        //               </label>
        //               <input
        //                 type="text"
        //                 name="expiryDate"
        //                 placeholder="MM/YY"
        //                 value={creditCard.expiryDate}
        //                 onChange={handleCreditCardChange}
        //                 className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                 required
        //               />
        //             </div>
        //           </div>
        //           <div className="mb-4">
        //             <label className="block text-gray-700 font-medium">CVV *</label>
        //             <input
        //               type="text"
        //               name="cvv"
        //               placeholder="123"
        //               value={creditCard.cvv}
        //               onChange={handleCreditCardChange}
        //               className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //               required
        //             />
        //           </div>
        //           <div className="flex items-center space-x-3 mb-6">
        //             <FaCcVisa className="text-blue-600 text-xl" />
        //             <FaCcMastercard className="text-red-600 text-xl" />
        //             <FaCcAmex className="text-green-600 text-xl" />
        //           </div>
        //           <div className="flex items-center gap-4 mb-6">
        //             <input
        //               type="text"
        //               placeholder="Coupon Code"
        //               onChange={(e) => setCouponCode(e.target.value)}
        //               className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //             />
        //             <button
        //               onClick={redeemCoupon}
        //               className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        //             >
        //               REDEEM
        //             </button>
        //           </div>
        //           <button
        //             type="button"
        //             className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 w-full"
        //           >
        //             Confirm Payment
        //           </button>
        //         </>
        //       ) : (
        //         <form onSubmit={handleSubmit}>
        //           <h3 className="text-2xl font-semibold mb-6 text-gray-900">
        //             Shipping Address
        //           </h3>
        //           <div className="grid grid-cols-2 gap-4 mb-6">
        //             <div>
        //               <label className="block text-gray-700 font-medium">
        //                 First name *
        //               </label>
        //               <input
        //                 type="text"
        //                 name="firstName"
        //                 placeholder="John"
        //                 value={shippingAddress.firstName}
        //                 onChange={handleShippingChange}
        //                 className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                 required
        //               />
        //             </div>
        //             <div>
        //               <label className="block text-gray-700 font-medium">
        //                 Last name *
        //               </label>
        //               <input
        //                 type="text"
        //                 name="lastName"
        //                 placeholder="Doe"
        //                 value={shippingAddress.lastName}
        //                 onChange={handleShippingChange}
        //                 className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                 required
        //               />
        //             </div>
        //           </div>
        //           <div className="mb-6">
        //             <label className="block text-gray-700 font-medium">
        //               Address line 1 *
        //             </label>
        //             <input
        //               type="text"
        //               name="addressLine1"
        //               placeholder="123 Main St"
        //               value={shippingAddress.addressLine1}
        //               onChange={handleShippingChange}
        //               className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //               required
        //             />
        //           </div>
        //           <div className="mb-6">
        //             <label className="block text-gray-700 font-medium">
        //               Address line 2
        //             </label>
        //             <input
        //               type="text"
        //               name="addressLine2"
        //               placeholder="Apt, suite, etc. (optional)"
        //               value={shippingAddress.addressLine2}
        //               onChange={handleShippingChange}
        //               className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //             />
        //           </div>
        //           <div className="grid grid-cols-2 gap-4 mb-6">
        //             <div>
        //               <label className="block text-gray-700 font-medium">
        //                 City *
        //               </label>
        //               <input
        //                 type="text"
        //                 name="city"
        //                 placeholder="New York"
        //                 value={shippingAddress.city}
        //                 onChange={handleShippingChange}
        //                 className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                 required
        //               />
        //             </div>
        //             <div>
        //               <label className="block text-gray-700 font-medium">
        //                 State *
        //               </label>
        //               <input
        //                 type="text"
        //                 name="state"
        //                 placeholder="NY"
        //                 value={shippingAddress.state}
        //                 onChange={handleShippingChange}
        //                 className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                 required
        //               />
        //             </div>
        //           </div>
        //           <div className="grid grid-cols-2 gap-4 mb-6">
        //             <div>
        //               <label className="block text-gray-700 font-medium">
        //                 Zip / Postal code *
        //               </label>
        //               <input
        //                 type="text"
        //                 name="zipCode"
        //                 placeholder="10001"
        //                 value={shippingAddress.zipCode}
        //                 onChange={handleShippingChange}
        //                 className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                 required
        //               />
        //             </div>
        //             <div>
        //               <label className="block text-gray-700 font-medium">
        //                 Country *
        //               </label>
        //               <input
        //                 type="text"
        //                 name="country"
        //                 placeholder="United States"
        //                 value={shippingAddress.country}
        //                 onChange={handleShippingChange}
        //                 className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //                 required
        //               />
        //             </div>
        //           </div>
        //           <div className="mb-6">
        //             <label className="flex items-center text-gray-700">
        //               <input type="checkbox" className="mr-2 text-blue-600" />
        //               Use this address for payment details
        //             </label>
        //           </div>
        //           <button
        //             type="submit"
        //             className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 w-full"
        //           >
        //             Next
        //           </button>
        //         </form>
        //       )}
        //     </div>
        //   </div>
        // </div>
        <div className="container mx-auto flex flex-col justify-between">

            {paymentDueToday && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <strong className="font-bold">Attention!</strong>
                    <span className="block sm:inline">
                        {" "}
                        You need to make the payment today, otherwise your booking will be canceled.
                    </span>
                </div>)}


            <div className="mb-5">
                <h1 className="text-5xl mb-2">
                    {site.street}, {site.city}
                </h1>
                <p className="text-lg">
                    from <span className="text-2xl px-2">{booking.checkInDate}</span> till{" "}
                    <span className="text-2xl px-2">{booking.checkOutDate}</span>
                </p>
            </div>

            <div className="flex justify-between mb-4">
                <div>
                    <h2 className="text-2xl mb-2">Reservation Rates</h2>
                    <div className="ms-4">
                        <p>
                            For{" "}
                            <b>
                                {daysBetween(new Date(booking.checkInDate), new Date(booking.checkOutDate))}
                            </b>{" "}
                            night(s)
                        </p>
                        <p className="text-xs">Each night @ ${site.price}</p>
                    </div>
                </div>

                <Amount value={booking.totalPrice}/>
            </div>

            <div className="mb-5">
                <h2 className="text-2xl mb-2">Promotions and Discounts</h2>
                <ul className="ms-4">
                    {booking.coupons?.length > 0 && booking.coupons.map((coupon, idx) => {
                        return (<li key={idx} className="flex justify-between mb-4">
                            <div>
                                <p>
                                    Applied coupon{" "}
                                    <span className="font-medium">{coupon.code}</span>
                                </p>
                                {coupon.discountRate > 0 && (<p className="text-xs">
                                    {coupon.discountRate}% off on your total
                                </p>)}
                                {coupon.flatDiscount > 0 && (
                                    <p className="text-xs">Flat ${coupon.flatDiscount} off</p>)}
                            </div>
                            <Amount
                                negative
                                value={coupon.flatDiscount + (coupon.discountRate * booking.totalPrice) / 100}
                            />
                        </li>);
                    })}
                </ul>
            </div>

            <hr/>

            <div className="flex justify-between mt-2 mb-8">
                <p className="text-2xl">Net total</p>
                <Amount value={booking.netTotal}/>
            </div>

            <div className="mb-8">
                <div>
                    <h2 className="text-2xl mb-2">Reedem a coupon</h2>
                </div>
                <form onSubmit={redeemCoupon}>
                    <div className="flex">
                        <input
                            name="field_name"
                            className="border border-2 rounded-r px-4 py-2 me-2"
                            type="text"
                            placeholder="Enter coupon code..."
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="text-sm border border-2 rounded px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white whitespace-no-wrap"
                        >
                            Reedem
                        </button>
                    </div>
                </form>
            </div>

            <div className="flex justify-end mb-4">
                <button
                    type="submit"
                    className="text-sm border border-2 rounded px-4 py-2 bg-green-600 hover:bg-green-500 text-white whitespace-no-wrap"
                    onClick={handleNext}
                >
                    Continue
                </button>
            </div>
        </div>) : (<>No booking found</>);
};

export default PaymentPage;
