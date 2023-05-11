import React from "react";
import { CryptoType } from "../../../types/CryptoType";
import styles from "./CryptoRow.modules.scss";

const CryptoRow: React.FC<CryptoType> = ({
  cmcRank,
  name,
  price,
  marketCap,
  volumeChange24H,
  percentChange24H,
}) => {
  const changedPrice =
    price > 1
      ? price > 1000
        ? price.toFixed(0)
        : price.toFixed(2)
      : price.toFixed(5);
  return (
    <tr>
      <td>{cmcRank}</td>
      <td>{name}</td>
      <td>{changedPrice}$</td>
      <td>{marketCap}</td>
      <td style={volumeChange24H < 0 ? { color: "red" } : { color: "green" }}>
        {volumeChange24H}%
      </td>
      <td style={percentChange24H < 0 ? { color: "red" } : { color: "green" }}>
        {percentChange24H}%
      </td>
    </tr>
  );
};

export default CryptoRow;
