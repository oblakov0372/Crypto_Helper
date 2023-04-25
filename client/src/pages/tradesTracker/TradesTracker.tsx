import React, { useEffect, useState } from "react";
import styles from "./TradesTracker.module.scss";
import { Column } from "../../types/Column";
import TradeRow from "../../components/tradeRow/TradeRow";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { TradeFutureType } from "../../types/TradeFutureType";
import { setTrades } from "../../redux/slices/tradeStatistic";
import { authenticatedRequest } from "../../utils/Request";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import TradeModal from "../../components/tradeModal/TradeModal";
import MyButton from "../../components/UI/MyButton/MyButton";
import { PieChart } from "react-minimal-pie-chart";
const TradesTracker = () => {
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [isLoadingDataError, setIsLoadingDataError] = useState<boolean>(false);
  const [isOpenModel, setIsOpenModal] = useState<boolean>(false);
  const [trade, setTrade] = useState<TradeFutureType>();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingData(true);
        setIsLoadingDataError(false);
        const response = await authenticatedRequest("TradeFuture");
        dispatch(setTrades(response.data));
        setIsLoadingData(false);
        console.log("data");
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

  const dataForPieCahrt = [
    { title: "Profit", value: totalPositivTrades, color: "#00ff00" },
    {
      title: "Lose",
      value: totalTrades - totalPositivTrades,
      color: "#ff0000",
    },
  ];
  const tableColumns: Column[] = [
    { name: "Symbol", orderBy: "symbol" },
    { name: "Position Size$", orderBy: "positionSize" },
    { name: "Stop Loss%", orderBy: "stopLossPercent" },
    { name: "Take Profit%", orderBy: "takeProfitPercent" },
    { name: "Earned Money", orderBy: "earnedMoney" },
    { name: "Trading View", orderBy: "symbol" },
  ];
  return (
    <>
      <div className={styles.content}>
        <div className={styles.description}>
          <div className={styles.description__text}>
            <div className={styles.title}>
              <h1>Trades Tracker</h1>
            </div>
            <p>
              Record-Keeping: Keeping track of your trades helps you keep a
              record of your investment decisions. This record can help you
              analyze your performance, identify trends, and make better
              decisions in the future.
              <br />
              Learning from mistakes: By tracking your trades, you can learn
              from your mistakes and improve your trading strategy. You can
              review your past trades and identify what went wrong or right and
              take corrective action.
            </p>
          </div>
          <div className={styles.description__img}></div>
        </div>
        <div className={styles.content}>
          {isLoadingDataError ? (
            <h2 className="error">
              Failed to load data. Please try again later.
            </h2>
          ) : isLoadingData ? (
            <LoadingSpinner />
          ) : (
            <div className={styles.functional}>
              <div className={styles.tableWrapper}>
                <div className={styles.title}>
                  <h1>My Trades</h1>
                  <MyButton
                    onClick={() => {
                      setIsOpenModal(true);
                      setTrade(undefined);
                    }}
                  >
                    New Trade
                  </MyButton>
                </div>
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
                        setIsOpenModal={setIsOpenModal}
                        setTrade={setTrade}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.functional__ride}>
                <div className={styles.tradesInformationsDiagram}>
                  <div className="flex justify-between items-center">
                    <h2 className="font-bold">Trade Analysis</h2>
                    <p
                      className={
                        "font-black " +
                        (totalEarnedMoney > 0
                          ? "text-green-500"
                          : "text-red-500")
                      }
                    >
                      {totalEarnedMoney}$
                    </p>
                  </div>
                  <div className="flex items-center">
                    <PieChart
                      className={styles.PieChart}
                      data={dataForPieCahrt}
                      lineWidth={15}
                      paddingAngle={5}
                      rounded
                      animate
                      animationDuration={1000}
                    />
                    <div className="ml-4">
                      <ul>
                        <li className="flex items-center">
                          Positive:
                          <p className="text-green-500 ml-1">
                            {totalPositivTrades}
                          </p>
                        </li>
                        <li className="flex items-center">
                          Negative:
                          <p className="text-red-500 ml-1">
                            {totalTrades - totalPositivTrades}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {isOpenModel && (
        <TradeModal setIsOpenModal={setIsOpenModal} trade={trade} />
      )}
    </>
  );
};

export default TradesTracker;
