import styles from "./CryptoTracker.module.scss";
import image from "../../assets/img/картинка 1.png";
import { Column } from "../../types/Column";
import TokenPortfolioRow from "../../components/tokenPortfolioRow/TokenPortfolioRow";
import MyButton from "../../components/UI/MyButton/MyButton";
const CryptoTracker = () => {
  const columns: Column[] = [
    { name: "Coin", orderBy: "coin" },
    { name: "Price", orderBy: "price" },
    { name: "Holdings", orderBy: "holdings" },
  ];
  return (
    <div className={styles.content}>
      <div className={styles.description}>
        <div className={styles.description__text}>
          <div className={styles.title}>
            <h1>CryptoTracker</h1>
          </div>
          <p>
            Crypto Tracker is a tool that helps users track their cryptocurrency
            portfolio by providing real-time data and analytics on various
            cryptocurrencies. It can help users manage their portfolio. With
            Crypto Tracker, users can also create custom portfolios.Overall,
            Crypto Tracker can be a valuable tool for anyone interested in
            cryptocurrency, whether they are beginners or experienced traders.
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
                <button>portfolio 1</button>
                <button>portfolio 1</button>
                <button>portfolio 1</button>
                <button>portfolio 1</button>
                <button>portfolio 1</button>
              </div>
              <MyButton>Add Portfolio</MyButton>
            </div>
            <div className="mt-5 mb-5 flex justify-between items-center ">
              <div className="w-full flex justify-between items-center ">
                <div>
                  <p className="text-2xl text-yellow-100">
                    ActivePortfolioName
                  </p>
                  <div>
                    <p className="text-gray-300 text-lg">
                      Your current balance:
                    </p>
                    <span className="font-extrabold text-xl"> 1233.3$</span>
                  </div>
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
          </div>
          <div className={styles.functional__ride}></div>
        </div>
      </div>
    </div>
  );
};

export default CryptoTracker;
