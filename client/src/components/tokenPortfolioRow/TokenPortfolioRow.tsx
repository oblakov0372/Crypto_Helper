import React from "react";
import styles from "./TokenPortfolioRow.module.scss";
type TokenPortfolioRowType = {
  name: string;
  coinSymbol: string;
  price: number;
  percentChange24H: number;
  count: number;
  countDollars: number;
};

const TokenPortfolioRow: React.FC<TokenPortfolioRowType> = ({
  name,
  coinSymbol,
  count,
  countDollars,
  percentChange24H,
  price,
}) => {
  return (
    <tr>
      <td>
        <div>
          <span className="font-bold">{name}</span>
          <span>{coinSymbol}</span>
        </div>
      </td>
      <td>
        <div>
          <span>{price}</span>
          <span
            className={percentChange24H > 0 ? "text-green-500" : "text-red-500"}
          >
            {percentChange24H}%
          </span>
        </div>
      </td>
      <td>
        <div>
          <span>{countDollars}</span>
          <span className="text-gray-600">{`${count} ${coinSymbol}`}</span>
        </div>
      </td>
    </tr>
  );
};
export default TokenPortfolioRow;
