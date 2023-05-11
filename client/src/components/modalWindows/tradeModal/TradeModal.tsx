import React, { useState } from "react";
import styles from "./TradeModal.module.scss";
import { authenticatedRequest } from "../../../utils/Request";
import { TradeFutureType } from "../../../types/TradeFutureType";
import { useDispatch } from "react-redux";
import { addTrade, editTrade } from "../../../redux/slices/tradeStatistic";
import MyButton from "../../UI/MyButton/MyButton";

type Props = {
  trade?: TradeFutureType;
  setIsOpenModal: (value: boolean) => void;
};
const TradeModal: React.FC<Props> = ({ trade, setIsOpenModal }) => {
  const dispatch = useDispatch();
  //#region UseStates
  const [id, setId] = useState<number>(trade?.id || 0);
  const [symbol, setSymbol] = useState<string>(trade?.coinName || "");
  const [positionSize, setPositionSize] = useState<number>(
    trade?.positionSize || 0
  );
  const [risk, setRisk] = useState<number>(trade?.risk || 0);
  const [reward, setReward] = useState<number>(trade?.reward || 0);
  const [earnedMoney, setEarnedMoney] = useState<number>(
    trade?.earnedMoney || 0
  );
  const [tradingViewImgLink, setTradingViewImgLink] = useState<string>(
    trade?.tradingViewImgLink || ""
  );
  //#endregion

  const isEdit = !!trade;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const method = isEdit ? "put" : "post";
      const trade = {
        id,
        coinName: symbol,
        positionSize,
        risk,
        reward,
        earnedMoney,
        tradingViewImgLink,
      };
      const response = await authenticatedRequest(
        "TradeFuture",
        { method: method },
        {
          id: id,
          coinName: symbol,
          positionSize: positionSize,
          risk: risk,
          reward: reward,
          earnedMoney: earnedMoney,
          tradingViewImgLink: tradingViewImgLink,
        }
      );

      dispatch(isEdit ? editTrade(trade) : addTrade(trade));
      setIsOpenModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const title = isEdit ? "Edit Trade" : "Add New Trade";
  const submitText = isEdit ? "Save Changes" : "Add Trade";

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalWrapper}>
        <div className={styles.modalHeader}>
          <h3>{title}</h3>
          <button
            onClick={() => setIsOpenModal(false)}
            className={styles.closeButton}
          >
            X
          </button>
        </div>
        <div className={styles.modalBody}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="symbol">Symbol</label>
              <input
                type="text"
                id="symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="positionSize">Position Size</label>
              <input
                type="number"
                id="positionSize"
                value={positionSize}
                onChange={(e) => setPositionSize(Number(e.target.value))}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="risk">Risk %</label>
              <input
                type="number"
                id="stopLossPercent"
                value={risk}
                onChange={(e) => setRisk(Number(e.target.value))}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="reward">Reward %</label>
              <input
                type="number"
                id="takeProfitPercent"
                value={reward}
                onChange={(e) => setReward(Number(e.target.value))}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="earnedMoney">Earned Money</label>
              <input
                type="number"
                id="earnedMoney"
                value={earnedMoney}
                onChange={(e) => setEarnedMoney(Number(e.target.value))}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="tradingViewImglink">Trading View Link</label>
              <input
                type="text"
                id="tradingViewImgLink"
                value={tradingViewImgLink}
                onChange={(e) => setTradingViewImgLink(e.target.value)}
              />
            </div>
            <MyButton type="submit">{submitText}</MyButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TradeModal;
