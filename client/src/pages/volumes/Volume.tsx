import titleImg from "../../assets/icons/increase.png";
import classes from "./Volume.module.scss";
import image from "../../assets/img/картинка 4.png";
import CryptoColumn from "../../components/cryptoColumn/CryptoColumn";
import { useEffect, useState } from "react";
import { CryptoType } from "../../types/CryptoType";
import axios from "axios";
import Pagination from "../../components/pagination/Pagination";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";

const Volume = () => {
  const [coins, setCoins] = useState<CryptoType[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoadingError, setIsLoadingError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    setIsLoadingError(false);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7261/api/CryptoCollector/GetCryptocurrencies?pageNumber=${currentPage}`
        );
        setCoins(response.data);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoadingError(true);
        setIsLoading(false);
      }
    };
    console.log(currentPage);

    fetchData();
  }, [currentPage]);

  return (
    <div className={classes.content}>
      <div className={classes.description}>
        <div className={classes.description__text}>
          <div className={classes.title}>
            <h1>Changes Volume </h1>
            <img src={titleImg} alt="png" width={50} />
          </div>
          <p>
            This service is designed to help users keep track of which
            cryptocurrencies have experienced significant changes in trading
            volume. The application uses real-time data from various
            cryptocurrency exchanges and analyzes the trading volume of each
            cryptocurrency. When a cryptocurrency experiences a significant
            change in trading volume, the application alerts the user by
            highlighting the cryptocurrency and displaying the percentage change
            in volume. This allows users to quickly identify which
            cryptocurrencies are experiencing high levels of trading activity
            and potential price movements.
          </p>
        </div>
        <div className={classes.description__img}>
          <img src={image} alt="image" width={200} />
        </div>
      </div>
      <div className={classes.cryptoList}>
        {isLoadingError ? (
          <h2 className="error">
            Failed to load data. Please try again later.
          </h2>
        ) : isLoading ? (
          <LoadingSpinner />
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Market Cap</th>
                <th>Volume Change</th>
                <th>Percentage Change</th>
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
        )}
      </div>
      <Pagination onChangePage={setCurrentPage} />
    </div>
  );
};

export default Volume;
