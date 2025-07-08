import { useUser } from "../context/AuthContext";
import getSymbolFromCurrency from "currency-symbol-map";

export default function Amount({ amount }) {
  const { userCurrency } = useUser();
  const currency = getSymbolFromCurrency(userCurrency);

  return (
    <>
      {currency} {amount.toFixed(2)}
    </>
  );
}
