import React, { useEffect, useState } from "react";
import ModalWindow from "../modalWindow/ModalWindow";
import { PortfolioType } from "../../../types/PortfolioType";
import { CryptoType } from "../../../types/CryptoType";
import { anonymRequest, authenticatedRequest } from "../../../utils/Request";
import MyButton from "../../UI/MyButton/MyButton";
import styles from "./TransactionModalWindow.module.scss";
import { addPortfolioToken } from "../../../redux/slices/portfolioToken";
import { useDispatch } from "react-redux";
import { PortfolioTokenType } from "../../../types/PortfolioTokenType";

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
  currentPortfolio,
}) => {
  const dispatch = useDispatch();
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
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await authenticatedRequest(
        "Transaction",
        { method: "post" },
        {
          coinSymbol: transaction.coinSymbol,
          count: transaction.count,
          price: transaction.price,
          portfolioId: currentPortfolio.id,
        }
      );

      const cryptocurrency: CryptoType | undefined = cryptocurrencies.find(
        (c) => c.symbol == transaction.coinSymbol
      );

      if (cryptocurrency) {
        const newPortfolioToken: PortfolioTokenType = {
          id: -1,
          count: transaction.count,
          coinSymbol: transaction.coinSymbol,
          coinName: cryptocurrency.name,
          percentChange24H: cryptocurrency.percentChange24H,
          price: cryptocurrency.price,
          portfolioId: currentPortfolio.id,
        };

        dispatch(addPortfolioToken(newPortfolioToken));
        setIsOpenTransactionModalWindow(false);
      }
    } catch (error) {
      console.log(error);
    }
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
              onChange={(e: any) => {
                setTransaction((prev: CreateTransactionType) => ({
                  coinSymbol: e.target.value,
                  count: prev.count,
                  price: prev.price,
                }));
              }}
              required
              id="cryptocurrencies"
              name="cryptocurrencies"
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
            <label htmlFor="tradePrice">Trade Price$:</label>
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
