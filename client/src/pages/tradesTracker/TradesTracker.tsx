import React, { useEffect, useState } from "react";
import styles from "./TradesTracker.module.scss";
import titleImage from "../../assets/img/Картинка 2.png";
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
import Pagination from "../../components/pagination/Pagination";

const TradesTracker = () => {
  //#region useStates
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [isLoadingDataError, setIsLoadingDataError] = useState<boolean>(false);
  const [isOpenModel, setIsOpenModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [countPages, setCountPages] = useState<number>(1);
  const [trade, setTrade] = useState<TradeFutureType>();
  //#endregion

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = {
          pageNumber: currentPage,
          pageSize: "20",
        };
        setIsLoadingData(true);
        setIsLoadingDataError(false);
        const response = await authenticatedRequest("TradeFuture", {
          queryParams,
        });
        dispatch(setTrades(response.data.trades));
        setCountPages(response.data.countPages);
        setIsLoadingData(false);
        console.log("data");
      } catch (error) {
        console.error(error);
        setIsLoadingData(false);
        setIsLoadingDataError(true);
      }
    };

    fetchData();
  }, [currentPage]);

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
    { name: "Position Size", orderBy: "positionSize" },
    { name: "Risk", orderBy: "risk" },
    { name: "Reward", orderBy: "reward" },
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
          <div className={styles.description__img}>
            <img src={titleImage} alt="Image" />
          </div>
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
                        risk={trade.risk}
                        reward={trade.reward}
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
                <MyButton
                  onClick={() => {
                    setIsOpenModal(true);
                    setTrade(undefined);
                  }}
                >
                  New Trade
                </MyButton>
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
        <Pagination countPages={countPages} onChangePage={setCurrentPage} />
      </div>
      {isOpenModel && (
        <TradeModal setIsOpenModal={setIsOpenModal} trade={trade} />
      )}
    </>
  );
};

export default TradesTracker;
