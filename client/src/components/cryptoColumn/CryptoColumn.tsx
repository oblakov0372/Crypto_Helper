import React from "react";
import { CryptoType } from "../../types/CryptoType";
import styles from "./CryptoColumn.modules.scss";

const CryptoColumn: React.FC<CryptoType> = ({
  cmcRank,
  name,
  price,
  marketCap,
  volumeChange24H,
  percentChange24H,
}) => {
  return (
    <tr>
      <td>{cmcRank}</td>
      <td>{name}</td>
      <td>{price}$</td>
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

export default CryptoColumn;
