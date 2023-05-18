import styles from "./CryptoTracker.module.scss";
import image from "../../assets/img/картинка 1.png";
import { ColumnType } from "../../types/ColumnType";
import TokenPortfolioRow from "../../components/rows/tokenPortfolioRow/TokenPortfolioRow";
import MyButton from "../../components/UI/MyButton/MyButton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { PortfolioType } from "../../types/PortfolioType";
import PortfolioModalWindow from "../../components/modalWindows/portfolioModalWindow/portfolioModalWindow";
import { authenticatedRequest } from "../../utils/Request";
import { setPortfolios } from "../../redux/slices/portfolio";
import PortfolioNameItem from "../../components/UI/PortfolioNameItem/PortfolioNameItem";
import { setPortfolioTokens } from "../../redux/slices/portfolioToken";
import { PortfolioTokenType } from "../../types/PortfolioTokenType";
import { changeDecimal } from "../../utils/Utils";
import TransactionModalWindow from "../../components/modalWindows/transactionModalWindow/TransactionModalWindow";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import { toErrorMessage } from "../../utils/Error";
import PortfolioTransactionsModalWindow from "../../components/modalWindows/portfolioTransactionsModalWindow/PortfolioTransactionsModalWindow";
const CryptoTracker = () => {
  const dispatch = useDispatch();
  //Table columns
  const columns: ColumnType[] = [
    { name: "Coin", orderBy: "coin" },
    { name: "Price", orderBy: "price" },
    { name: "Holdings", orderBy: "holdings" },
  ];

  const [isLoadingError, setIsLoadingError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const portfolios = useSelector(
    (state: RootState) => state.portfolioSlice.portfolios
  );
  const { portfolioTokens, totalMoney } = useSelector(
    (state: RootState) => state.portfolioTokenSlice
  );
  //Current Portfolio which user select
  const [currentPortoflio, setCurrentPortfolio] = useState<PortfolioType>(
    portfolios[0]
  );
  //Modal Window for add new Portfolio
  const [isOpenModalPortfolio, setIsOpenPortfolioModal] =
    useState<boolean>(false);
  //Modal Window for add or edit Transaction
  const [isOpenModalAddTransaction, setIsOpenModalAddTransaction] =
    useState<boolean>(false);
  const [isOpenModalPortfolioTransactions, setIsOpenModalTransactions] =
    useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    setIsLoadingError(false);
    //Get All User Portfolios from backend
    const fetchDataPortfolios = async () => {
      try {
        const response = await authenticatedRequest("Portfolio");
        dispatch(setPortfolios(response.data.portfolios));
        setCurrentPortfolio(response.data.portfolios[0]);
        setIsLoading(false);
      } catch (error) {
        setIsLoadingError(true);
        setIsLoading(false);
        setErrorMessage(toErrorMessage(error));
      }
    };

    //Call fetches
    fetchDataPortfolios();
  }, []);

  //get portfolio tokens
  useEffect(() => {
    setIsLoading(true);
    setIsLoadingError(false);
    const fetchDataPortfolioTones = async () => {
      try {
        const response = await authenticatedRequest(
          `PortfolioToken/GetPortfoliosById?portfolioId=${currentPortoflio.id}`,
          { method: "get" }
        );
        dispatch(setPortfolioTokens(response.data.portfolioTokens));
        setIsLoading(false);
      } catch (error) {
        setIsLoadingError(true);
        setIsLoading(false);
        setErrorMessage(toErrorMessage(error));
      }
    };
    if (currentPortoflio) {
      fetchDataPortfolioTones();
    }
  }, [currentPortoflio]);

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
          {isLoadingError ? (
            <h2 className="error text-2xl">{errorMessage}</h2>
          ) : isLoading ? (
            <LoadingSpinner />
          ) : (
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
                          <div className="flex justify-between items-end ">
                            <h1 className="text-2xl font-extrabold text-yellow-100 ">
                              {currentPortoflio.name}
                              <span className="font-normal text-gray-300 text-xl">
                                ({currentPortoflio.description})
                              </span>
                            </h1>
                          </div>
                          <span className="font-extrabold text-xl">
                            {" "}
                            {changeDecimal(totalMoney)}$
                          </span>
                        </div>
                        <div>
                          <MyButton
                            onClick={() => setIsOpenModalAddTransaction(true)}
                          >
                            Add Transaction
                          </MyButton>
                        </div>
                      </div>
                    </div>
                    <div className={styles.tableWrapper}>
                      <table>
                        <thead>
                          <tr>
                            {columns.map(
                              (column: ColumnType, index: number) => (
                                <th key={index}>{column.name}</th>
                              )
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {portfolioTokens.map(
                            (portfolioToken: PortfolioTokenType) => (
                              <TokenPortfolioRow
                                coinSymbol={portfolioToken.coinSymbol}
                                count={portfolioToken.count}
                                name={portfolioToken.coinName}
                                percentChange24H={
                                  portfolioToken.percentChange24H
                                }
                                price={portfolioToken.price}
                                key={portfolioToken.id}
                              />
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
              <div className={styles.functional__ride}>
                <MyButton onClick={() => setIsOpenModalTransactions(true)}>
                  Show transaction
                </MyButton>
              </div>
            </div>
          )}
        </div>
      </div>
      {isOpenModalPortfolio && (
        <PortfolioModalWindow
          setIsOpenPortfolioModal={setIsOpenPortfolioModal}
          setCurrentPortfolio={setCurrentPortfolio}
        />
      )}
      {isOpenModalAddTransaction && (
        <TransactionModalWindow
          setIsOpenTransactionModalWindow={setIsOpenModalAddTransaction}
          currentPortfolio={currentPortoflio}
        />
      )}
      {isOpenModalPortfolioTransactions && (
        <PortfolioTransactionsModalWindow
          currentPortfolio={currentPortoflio}
          setIsOpenModalWindow={setIsOpenModalTransactions}
        />
      )}
    </>
  );
};

export default CryptoTracker;
