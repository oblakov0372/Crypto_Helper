import styles from "./CryptoTracker.module.scss";
import image from "../../assets/img/картинка 1.png";
import { Column } from "../../types/Column";
import TokenPortfolioRow from "../../components/rows/tokenPortfolioRow/TokenPortfolioRow";
import MyButton from "../../components/UI/MyButton/MyButton";
import { useEffect, useState } from "react";
import ModalWindow from "../../components/modalWindows/modalWindow/ModalWindow";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { PortfolioType } from "../../types/PortfolioType";
import PortfolioModalWindow from "../../components/modalWindows/portfolioModalWindow/portfolioModalWindow";
import { authenticatedRequest } from "../../utils/Request";
import { setPortfolios } from "../../redux/slices/portfolio";
import PortfolioNameItem from "../../components/UI/PortfolioNameItem/PortfolioNameItem";
const CryptoTracker = () => {
  const columns: Column[] = [
    { name: "Coin", orderBy: "coin" },
    { name: "Price", orderBy: "price" },
    { name: "Holdings", orderBy: "holdings" },
  ];
  const dispatch = useDispatch();
  const portfolios = useSelector(
    (state: RootState) => state.portfolioSlice.portfolios
  );

  const [currentPortoflio, setCurrentPortfolio] = useState<PortfolioType>(
    portfolios[0]
  );
  const [isOpenModalPortfolio, setIsOpenPortfolioModal] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authenticatedRequest("Portfolio");
        dispatch(setPortfolios(response.data.portfolios));
        setCurrentPortfolio(response.data.portfolios[0]);
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <>
      <div className={styles.content}>
        <div className={styles.description}>
          <div className={styles.description__text}>
            <div className={styles.title}>
              <h1>CryptoTracker</h1>
            </div>
            <p>
              Crypto Tracker is a tool that helps users track their
              cryptocurrency portfolio by providing real-time data and analytics
              on various cryptocurrencies. It can help users manage their
              portfolio. With Crypto Tracker, users can also create custom
              portfolios.Overall, Crypto Tracker can be a valuable tool for
              anyone interested in cryptocurrency, whether they are beginners or
              experienced traders.
            </p>
          </div>
          <div className={styles.description__img}>
            <img src={image} alt="Some image " width={200} />
          </div>
        </div>
        <div>
          <div className={styles.functional}>
            <div className={styles.functional__left}>
              <div className={styles.portfolioFunctional}>
                <div className={styles.portfoliosPanel}>
                  {portfolios.length == 0 ? (
                    <h1 className="text-2xl text-gray-300">
                      You don't have any portfolios
                      <br />
                      Create now :)
                    </h1>
                  ) : (
                    portfolios.map((p) => (
                      <PortfolioNameItem
                        key={p.id}
                        portfolio={p}
                        setCurrentPortfolio={setCurrentPortfolio}
                        currentPortfolio={currentPortoflio}
                      />
                    ))
                  )}
                </div>
                <MyButton onClick={() => setIsOpenPortfolioModal(true)}>
                  Add Portfolio
                </MyButton>
              </div>
              {portfolios.length > 0 && (
                <>
                  <div className="mt-5 mb-5 flex justify-between items-center ">
                    <div className="w-full flex justify-between items-center ">
                      <div>
                        <p className="text-2xl text-yellow-100">
                          {currentPortoflio.name}
                        </p>
                        <span className="font-extrabold text-xl"> 1233.3$</span>
                      </div>
                      <div>
                        <MyButton>Add Transaction</MyButton>
                      </div>
                    </div>
                  </div>
                  <div className={styles.tableWrapper}>
                    <table>
                      <thead>
                        <tr>
                          {columns.map((column: Column, index: number) => (
                            <th key={index}>{column.name}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <TokenPortfolioRow
                          coinSymbol="BTC"
                          count={100}
                          countDollars={2000}
                          name="Bitcoin"
                          percentChange24H={2}
                          price={29000}
                          key={1}
                        />
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
            <div className={styles.functional__ride}></div>
          </div>
        </div>
      </div>
      {isOpenModalPortfolio && (
        <PortfolioModalWindow
          setIsOpenPortfolioModal={setIsOpenPortfolioModal}
          setCurrentPortfolio={setCurrentPortfolio}
        />
      )}
    </>
  );
};

export default CryptoTracker;
