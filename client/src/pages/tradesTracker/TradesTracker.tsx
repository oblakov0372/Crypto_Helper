import React, { useEffect, useState } from "react";
import styles from "./TradesTracker.module.scss";
import { Column } from "../../types/Column";
import TradeRow from "../../components/tradeRow/TradeRow";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { TradeFutureType } from "../../types/TradeFutureType";
import axios from "axios";
import { setTrades } from "../../redux/slices/tradeStatistic";
import { anonimRequest } from "../../utils/AnonimRequest";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";

const TradesTracker = () => {
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [isLoadingDataError, setIsLoadingDataError] = useState<boolean>(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingData(true);
        setIsLoadingDataError(false);
        const trades = await anonimRequest<TradeFutureType[]>("TradeFuture");
        dispatch(setTrades(trades));
        setIsLoadingData(false);
      } catch (error) {
        console.error(error);
        setIsLoadingData(false);
        setIsLoadingDataError(true);
      }
    };

    fetchData();
  }, []);

  const { totalEarnedMoney, totalPositivTrades, totalTrades, trades } =
    useSelector((state: RootState) => state.tradeStatistic);
  const tableColumns: Column[] = [
    { name: "Symbol", orderBy: "symbol" },
    { name: "Position Size$", orderBy: "positionSize" },
    { name: "Stop Loss%", orderBy: "stopLossPercent" },
    { name: "Take Profit%", orderBy: "takeProfitPercent" },
    { name: "Earned Money", orderBy: "earnedMoney" },
    { name: "Trading View", orderBy: "symbol" },
  ];
  return (
    <div className={styles.content}>
      <div className={styles.description}>
        <div className={styles.description__text}>
          <div className={styles.title}>
            <h1>Trades Tracker</h1>
          </div>
          <p>
            Record-Keeping: Keeping track of your trades helps you keep a record
            of your investment decisions. This record can help you analyze your
            performance, identify trends, and make better decisions in the
            future.
            <br />
            Learning from mistakes: By tracking your trades, you can learn from
            your mistakes and improve your trading strategy. You can review your
            past trades and identify what went wrong or right and take
            corrective action.
          </p>
        </div>
        <div className={styles.description__img}></div>
      </div>
      <div className={styles.functional}>
        {isLoadingDataError ? (
          <h2 className="error">
            Failed to load data. Please try again later.
          </h2>
        ) : isLoadingData ? (
          <LoadingSpinner />
        ) : (
          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  {tableColumns.map((column: Column, index: number) => (
                    <th key={index}>{column.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {trades.map((trade: TradeFutureType) => (
                  <TradeRow
                    key={trade.id}
                    id={trade.id}
                    coinName={trade.coinName}
                    positionSize={trade.positionSize}
                    stopLossPercent={trade.stopLossPercent}
                    takeProfitPercent={trade.takeProfitPercent}
                    tradingViewImgLink={trade.tradingViewImgLink}
                    earnedMoney={trade.earnedMoney}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradesTracker;
