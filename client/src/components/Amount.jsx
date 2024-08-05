export const Amount = ({
  currency = "CAD",
  value,
  size = 3,
  negative = false,
  showCurrency = true,
}) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  });

  const format = (value) => {
    const ccyStr = formatter.format(value);
    let wholeValue = "";
    let fractValue = ".";
    let decimalPointCrossed = false;

    for (const c of ccyStr) {
      if (!isNaN(c)) {
        if (decimalPointCrossed) fractValue += c;
        else wholeValue += c;
      } else if (c === ".") decimalPointCrossed = true;
    }

    return (
      <div className="flex">
        {negative && <span className={`text-${size}xl`}>-</span>}
        {showCurrency && <span className="">$</span>}
        <span className={`text-${size}xl`}>{wholeValue}</span>
        <span className="">{fractValue}</span>
      </div>
    );
  };

  return format(value);
};
