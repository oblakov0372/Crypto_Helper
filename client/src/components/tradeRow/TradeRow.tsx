import React from "react";
import { TradeFutureType } from "../../types/TradeFutureType";
const TradeRow: React.FC<TradeFutureType> = ({
  coinName,
  stopLossPercent,
  takeProfitPercent,
  positionSize,
  earnedMoney,
  tradingViewImgLink,
}) => {
  return (
    <tr>
      <td>{coinName}</td>
      <td className="font-bold">{positionSize}$</td>
      <td>{stopLossPercent}%</td>
      <td>{takeProfitPercent}%</td>
      <td style={earnedMoney < 0 ? { color: "red" } : { color: "green" }}>
        {earnedMoney}$
      </td>
      <td>
        <a target="_blank" href={tradingViewImgLink}>
          Trade Image
        </a>
      </td>
    </tr>
  );
};

export default TradeRow;
