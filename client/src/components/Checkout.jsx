import { Amount } from "./Amount";

export const Checkout = ({ data, next }) => {
  return (
    <div className="container mx-auto">
      <h1 className="text-5xl mb-4">Checkout</h1>
      <ul>
        <li className="flex justify-between">
          <p className="text-xl">Reservation cost</p>
          <Amount value={data.booking.totalPrice} />
        </li>
        <li className="flex justify-between">
          <p className="text-xl">Promotions and discounts</p>
          <Amount negative value={data.booking.discount} />
        </li>
        <li className="flex justify-between">
          <p className="text-xl">On the tab</p>
          <Amount
            negative
            value={data.payments
              .slice(1)
              .reduce((prev, curr) => prev.amount + curr.amount, 0)}
          />
        </li>
      </ul>
    </div>
  );
};
