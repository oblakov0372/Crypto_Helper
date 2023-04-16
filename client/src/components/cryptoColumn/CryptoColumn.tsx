import React from "react";
import { CryptoType } from "../../types/CryptoType";

const CryptoColumn: React.FC<CryptoType> = ({
  id,
  name,
  price,
  marketCap,
  volumeChange,
}) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{price}</td>
      <td>{marketCap}</td>
      <td>{volumeChange}%</td>
    </tr>
  );
};

export default CryptoColumn;
