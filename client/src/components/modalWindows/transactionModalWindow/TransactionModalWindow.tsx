import React, { useEffect, useState } from "react";
import ModalWindow from "../modalWindow/ModalWindow";
import { PortfolioType } from "../../../types/PortfolioType";
import { CryptoType } from "../../../types/CryptoType";
import { anonymRequest } from "../../../utils/Request";
import MyButton from "../../UI/MyButton/MyButton";
import styles from "./TransactionModalWindow.module.scss";

type Props = {
  setIsOpenTransactionModalWindow: (state: boolean) => void;
  currentPortfolio: PortfolioType;
};
type CreateTransactionType = {
  coinSymbol: string;
  count: number;
  price: number;
};

const TransactionModalWindow: React.FC<Props> = ({
  setIsOpenTransactionModalWindow,
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

  const [transaction, setTransaction] = useState<CreateTransactionType>({
    coinSymbol: cryptocurrencies[0]?.symbol,
    count: 0,
    price: 0,
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <div>
      <ModalWindow
        title="Create Transaction"
        setIsOpenModal={setIsOpenTransactionModalWindow}
        className="w-1/2"
      >
        <form className="text-center" onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="cryptocurrencies">Choose a cryptocurrency: </label>
            <select
              required
              onChange={(e: any) =>
                setTransaction((prev: CreateTransactionType) => ({
                  coinSymbol: e.target.value,
                  count: prev.count,
                  price: prev.price,
                }))
              }
              id="cryptocurrencies"
              name="cryptocurrencies"
            >
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
              value={transaction.count}
              onChange={(e: any) =>
                setTransaction((prev: CreateTransactionType) => ({
                  coinSymbol: prev.coinSymbol,
                  count: e.target.value,
                  price: prev.price,
                }))
              }
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="count">Trade Money$:</label>
            <input
              required
              type="number"
              value={transaction.price}
              onChange={(e: any) =>
                setTransaction((prev: CreateTransactionType) => ({
                  coinSymbol: prev.coinSymbol,
                  count: prev.count,
                  price: e.target.value,
                }))
              }
            />
          </div>
          <MyButton type="submit">Create</MyButton>
        </form>
      </ModalWindow>
    </div>
  );
};

export default TransactionModalWindow;
