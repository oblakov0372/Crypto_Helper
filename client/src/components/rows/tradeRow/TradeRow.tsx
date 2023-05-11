import React from "react";
import { TradeFutureType } from "../../../types/TradeFutureType";
import edit from "../../../assets/icons/edit.png";
import remove from "../../../assets/icons/delete.png";
import { authenticatedRequest } from "../../../utils/Request";
import { useDispatch } from "react-redux";
import { deleteTrade } from "../../../redux/slices/tradeStatistic";
import styles from "./TradeRow.module.scss";
type Props = {
  id: number;
  coinName: string;
  positionSize: number;
  risk: number;
  reward: number;
  earnedMoney: number;
  tradingViewImgLink: string;
  setIsOpenModal: (value: boolean) => void;
  setTrade: (value: TradeFutureType) => void;
};
const TradeRow: React.FC<Props> = ({
  id,
  coinName,
  risk,
  reward,
  positionSize,
  earnedMoney,
  tradingViewImgLink,
  setIsOpenModal,
  setTrade,
}) => {
  const dispatch = useDispatch();

  const deleteRow = async () => {
    try {
      const response = await authenticatedRequest(
        `TradeFuture`,
        {
          method: "delete",
        },
        id
      );
      dispatch(
        deleteTrade({
          id,
          coinName,
          risk,
          reward,
          positionSize,
          earnedMoney,
          tradingViewImgLink: tradingViewImgLink,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr>
      <td className="font-extrabold">{coinName.toUpperCase()}</td>
      <td className="font-bold">{positionSize}$</td>
      <td>{risk}%</td>
      <td>{reward}%</td>
      <td style={earnedMoney < 0 ? { color: "red" } : { color: "green" }}>
        {earnedMoney}$
      </td>
      <td>
        <a
          className={
            !tradingViewImgLink.includes("https://www.tradingview.com")
              ? styles.disabled
              : undefined
          }
          target="_blank"
          href={tradingViewImgLink}
        >
          Trade Image
        </a>
      </td>
      <td>
        <img
          onClick={() => {
            setIsOpenModal(true);
            setTrade({
              id,
              coinName,
              risk,
              reward,
              positionSize,
              earnedMoney,
              tradingViewImgLink: tradingViewImgLink,
            });
          }}
          src={edit}
          alt="edit"
          width={30}
        />
        <img onClick={() => deleteRow()} src={remove} alt="remove" width={30} />
      </td>
    </tr>
  );
};

export default TradeRow;
