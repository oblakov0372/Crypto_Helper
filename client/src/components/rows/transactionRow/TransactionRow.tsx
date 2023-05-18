import React from "react";
import { TransactionType } from "../../../types/TransactionType";
import edit from "../../../assets/icons/edit.png";
import remove from "../../../assets/icons/delete.png";
import { authenticatedRequest } from "../../../utils/Request";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "../../../redux/slices/transaction";
import { RootState } from "../../../redux/store";
import { editPortfolioToken } from "../../../redux/slices/portfolioToken";

type Props = {
  id: number;
  coinSymbol: string;
  count: number;
  price: number;
  portfolioId: number;
};

const TransactionRow: React.FC<Props> = ({
  coinSymbol,
  count,
  price,
  id,
  portfolioId,
}) => {
  const dispatch = useDispatch();
  const portfolioTokens = useSelector(
    (state: RootState) => state.portfolioTokenSlice.portfolioTokens
  );

  const deleteRow = async () => {
    try {
      const response = await authenticatedRequest(
        `Transaction`,
        {
          method: "delete",
        },
        id
      );
      dispatch(
        deleteTransaction({
          id,
          coinSymbol,
          count,
          portfolioId,
          price,
        })
      );
      const portfolioToken = portfolioTokens.find(
        (pt) => pt.coinSymbol == coinSymbol
      );
      if (portfolioToken) {
        dispatch(
          editPortfolioToken({
            coinName: portfolioToken.coinName,
            coinSymbol: coinSymbol,
            count: portfolioToken.count - count,
            percentChange24H: portfolioToken.percentChange24H,
            portfolioId: portfolioToken.percentChange24H,
            price: portfolioToken.price,
            id: portfolioToken.id,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr>
      <td className="font-extrabold">{coinSymbol}</td>
      <td style={count < 0 ? { color: "red" } : { color: "green" }}>{count}</td>
      <td>{price}</td>
      <td>{count * price}</td>
      <td>
        <img onClick={() => {}} src={edit} alt="edit" width={30} />
        <img onClick={() => deleteRow()} src={remove} alt="remove" width={30} />
      </td>
    </tr>
  );
};

export default TransactionRow;
