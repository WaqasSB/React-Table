export const amountFormat = (amount) => {
    let formatter = new Intl.NumberFormat("en-Us", {
      style: "currency",
      currency: "AED",
    });
    let val = formatter.format(amount);
    return val.substr(0, val.indexOf("."));
  };