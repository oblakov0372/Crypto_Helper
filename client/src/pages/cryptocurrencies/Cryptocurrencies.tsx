import titleImg from "../../assets/icons/increase.png";
import styles from "./Cryptocurrencies.module.scss";
import image from "../../assets/img/картинка 4.png";
import CryptoColumn from "../../components/cryptoColumn/CryptoColumn";
import { useEffect, useState } from "react";
import { CryptoType } from "../../types/CryptoType";
import axios from "axios";
import Pagination from "../../components/pagination/Pagination";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";

type CryptocurrencyColumn = {
  name: string;
  orderBy: string;
};

const Cryptocurrencies = () => {
  const columns: CryptocurrencyColumn[] = [
    { name: "#", orderBy: "cmcRank" },
    { name: "Name", orderBy: "name" },
    { name: "Price", orderBy: "price" },
    { name: "Market Cap", orderBy: "marketCap" },
    { name: "Volume Change24H", orderBy: "volumeChange24H" },
    { name: "Price Change24H", orderBy: "priceChange24H" },
  ];
  //#region UseStates
  const [coins, setCoins] = useState<CryptoType[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoadingError, setIsLoadingError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [countPages, setCountPages] = useState<number>(1);
  const [orderBy, setOrderBy] = useState<string>("cmcRank");
  //#endregion

  useEffect(() => {
    setIsLoading(true);
    setIsLoadingError(false);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7261/api/CryptoCollector/GetCryptocurrencies?pageNumber=${currentPage}&pageSize=20&orderBy=${orderBy}`
        );
        setCoins(response.data.cryptocurrencies);
        setCountPages(response.data.countPages);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoadingError(true);
        setIsLoading(false);
      }
    };
    console.log(currentPage);

    fetchData();
  }, [currentPage, orderBy]);

  return (
    <div className={styles.content}>
      <div className={styles.description}>
        <div className={styles.description__text}>
          <div className={styles.title}>
            <h1>Cryptocurrencies</h1>
            <img src={titleImg} alt="png" width={50} />
          </div>
          <p>
            The list presented shows the 500 most valuable cryptocurrencies
            based on their market capitalization. This feature enables you to
            conveniently sort the data by any of the available columns, allowing
            you to quickly identify an asset that you may wish to trade. This
            functionality can assist you in making informed investment decisions
            and optimizing your trading strategy.
          </p>
        </div>
        <div className={styles.description__img}>
          <img src={image} alt="image" width={200} />
        </div>
      </div>
      <div className={styles.cryptoList}>
        {isLoadingError ? (
          <h2 className="error">
            Failed to load data. Please try again later.
          </h2>
        ) : isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  {columns.map((column: CryptocurrencyColumn) => (
                    <th
                      key={column.orderBy}
                      onClick={() => setOrderBy(column.orderBy)}
                    >
                      {column.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {coins?.map((coin: CryptoType) => (
                  <CryptoColumn
                    key={coin.cmcRank}
                    cmcRank={coin.cmcRank}
                    marketCap={coin.marketCap}
                    name={coin.name}
                    price={coin.price}
                    volumeChange24H={coin.volumeChange24H}
                    percentChange24H={coin.percentChange24H}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Pagination countPages={countPages} onChangePage={setCurrentPage} />
    </div>
  );
};

export default Cryptocurrencies;
