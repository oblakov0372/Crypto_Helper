import React, { useEffect, useState } from "react";
import ModalWindow from "../modalWindow/ModalWindow";
import { PortfolioType } from "../../../types/PortfolioType";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { authenticatedRequest } from "../../../utils/Request";
import LoadingSpinner from "../../loadingSpinner/LoadingSpinner";
import { toErrorMessage } from "../../../utils/Error";
import { setTransactions } from "../../../redux/slices/transaction";
import { TransactionType } from "../../../types/TransactionType";
import TransactionRow from "../../rows/transactionRow/TransactionRow";
import { ColumnType } from "../../../types/ColumnType";
import styles from "./PortfolioTransactionsModalWindow.module.scss";

type Props = {
  setIsOpenModalWindow: (state: boolean) => void;
  currentPortfolio: PortfolioType;
};

const PortfolioTransactionsModalWindow: React.FC<Props> = ({
  currentPortfolio,
  setIsOpenModalWindow,
}) => {
  const tableColumns: ColumnType[] = [
    { name: "CoinSymbol", orderBy: "coinSymbol" },
    { name: "Count", orderBy: "count" },
    { name: "Price", orderBy: "price" },
    { name: "Traded Money", orderBy: "" },
  ];
  const dispatch = useDispatch();
  const [isLoadingError, setIsLoadingError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const transactions = useSelector(
    (state: RootState) => state.transactionSlice.transactions
  );

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoadingError(false);
      setIsLoading(true);
      try {
        const response = await authenticatedRequest(
          "Transaction/GetTransactionsByPortfolioId",
          { queryParams: { portfolioId: currentPortfolio.id } }
        );
        setIsLoading(false);
        dispatch(setTransactions(response.data.transactions));
      } catch (error) {
        setIsLoading(false);
        setIsLoadingError(true);
        setErrorMessage(toErrorMessage(error));
      }
    };
    fetchTransactions();
  }, []);

  return (
    <ModalWindow title="Transactions" setIsOpenModal={setIsOpenModalWindow}>
      {isLoadingError ? (
        <h2 className="error text-2xl">{errorMessage}</h2>
      ) : isLoading ? (
        <LoadingSpinner />
      ) : transactions.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              {tableColumns.map((column: ColumnType, index: number) => (
                <th key={index}>{column.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction: TransactionType) => (
              <TransactionRow
                key={transaction.id}
                id={transaction.id}
                coinSymbol={transaction.coinSymbol}
                count={transaction.count}
                price={transaction.price}
                portfolioId={transaction.portfolioId}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <h1 className="text-xl font-bold">
          At the moment, you have no transactions :(
        </h1>
      )}
    </ModalWindow>
  );
};

export default PortfolioTransactionsModalWindow;
