import { useState } from "react";
import PaymentPage from "../components/PaymentPage";
import { PaymentOption } from "../components/PaymentOption";
import PaymentSummary from "../components/PaymentSummary";
import { Checkout } from "../components/Checkout";
import StageMarker from "../components/StageMarker";
import Invoice from "../components/Invoice";

export const Booking = () => {
  const [stage, setStage] = useState(0);
  const [data, setData] = useState({});

  const stages = ["Review", "Payment", "Summary", "Checkout"];

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
        return <Invoice data={data} next={changeStage} />;
      default:
        return <>Something went wrong!</>;
    }
  };

  return (
    <div className="container mx-auto">
      <div class="print:hidden relative flex pt-8 pb-12 items-center">
        {stages.map((s, idx) => (
          <StageMarker
            key={idx}
            complete={stage > idx}
            name={s}
            last={idx === stages.length - 1}
          />
        ))}
      </div>
      <div className="transition">{currentStage()}</div>
    </div>
  );
};
