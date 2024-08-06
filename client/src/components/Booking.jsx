import { useState } from "react";
import PaymentPage from "./PaymentPage";
import { PaymentOption } from "./PaymentOption";
import PaymentSummary from "./PaymentSummary";
import { Checkout } from "./Checkout";

export const Booking = () => {
  const [stage, setStage] = useState(0);
  const [data, setData] = useState({});

  const changeStage = (newData) => {
    setData({ ...data, ...newData });
    setStage(stage + 1);
  };

  const currentStage = () => {
    switch (stage) {
      case 0:
        return <PaymentPage next={changeStage} />;
      case 1:
        return <PaymentOption data={data} next={changeStage} />;
      case 2:
        return <PaymentSummary data={data} next={changeStage} />;
      case 3:
        return <Checkout data={data} next={changeStage} />;
      case 4:
        return <>DONE!</>;
      default:
        return <>Something went wrong!</>;
    }
  };

  return <div>{currentStage()}</div>;
};
