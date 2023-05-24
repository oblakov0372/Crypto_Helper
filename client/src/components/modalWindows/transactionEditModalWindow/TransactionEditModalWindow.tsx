import React, { useEffect, useState } from "react";
import ModalWindow from "../modalWindow/ModalWindow";
import { PortfolioType } from "../../../types/PortfolioType";
import styles from "./TransactionEditModalWindow.module.scss";
import { anonymRequest } from "../../../utils/Request";
import { CryptoType } from "../../../types/CryptoType";
import MyButton from "../../UI/MyButton/MyButton";

type Props = {
  setIsOpenTransactionModalWindow: (state: boolean) => void;
  transaction: EditTransactionType;
};
type EditTransactionType = {
  id: number;
  coinSymbol: string;
  count: number;
  price: number;
  portfolioId: number;
};

const TransactionEditModalWindow: React.FC<Props> = ({
  setIsOpenTransactionModalWindow,
  transaction,
}) => {
  useEffect(() => {
    //Get first 500 cryptocurrencies from coinmarketcap
    const fetchDataCryptocurrencies = async () => {
      const response = await anonymRequest(
        "CryptoCollector/GetAllCryptocurrencies"
      );
      setCryptocurrencies(response.data.cryptocurrencies);
    };
    fetchDataCryptocurrencies();
  }, []);
  //500 cryptocurrencies from coinmarketcap
  const [cryptocurrencies, setCryptocurrencies] = useState<CryptoType[]>([]);
  const [transactionForEdit, setTransactionForEdit] =
    useState<EditTransactionType>(transaction);

  return (
    <div>
      <ModalWindow
        title="Edit Transaction"
        setIsOpenModal={setIsOpenTransactionModalWindow}
        className="w-1/2"
      >
        <form className="text-center">
          <div className={styles.formGroup}>
            <label htmlFor="cryptocurrencies">Choose a cryptocurrency: </label>
            <select
              value={transactionForEdit.coinSymbol}
              required
              id="cryptocurrencies"
              name="cryptocurrencies"
              onChange={(e: any) =>
                setTransactionForEdit((prev: EditTransactionType) => ({
                  ...prev,
                  coinSymbol: e.target.value,
                }))
              }
            >
              <option value=""></option>
              {cryptocurrencies.map((crypto: CryptoType) => (
                <option key={crypto.cmcRank} value={crypto.symbol}>
                  {crypto.symbol}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="count">Count:</label>
            <input
              required
              type="number"
              value={transactionForEdit.count}
              onChange={(e: any) =>
                setTransactionForEdit((prev: EditTransactionType) => ({
                  ...prev,
                  count: e.target.value,
                }))
              }
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="tradePrice">Trade Price$:</label>
            <input
              required
              type="number"
              value={transactionForEdit.price}
              onChange={(e: any) =>
                setTransactionForEdit((prev: EditTransactionType) => ({
                  ...prev,
                  price: e.target.value,
                }))
              }
            />
          </div>
          <MyButton type="submit">Edit</MyButton>
        </form>
      </ModalWindow>
    </div>
  );
};

export default TransactionEditModalWindow;
