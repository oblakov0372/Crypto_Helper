import React from "react";
import { PortfolioType } from "../../../types/PortfolioType";
import styles from "./PortfolioNameItem.module.scss";
import { useDispatch } from "react-redux";
import { deletePortfolio } from "../../../redux/slices/portfolio";
import { authenticatedRequest } from "../../../utils/Request";
type props = {
  setCurrentPortfolio: (portfolio: PortfolioType) => void;
  currentPortfolio: PortfolioType;
  portfolio: PortfolioType;
};

const PortfolioNameItem: React.FC<props> = ({
  setCurrentPortfolio,
  currentPortfolio,
  portfolio,
}) => {
  const dispatch = useDispatch();
  const onClickDeletePortfolio = async () => {
    if (confirm("Do you want  delete portfolio?")) {
      try {
        const response = await authenticatedRequest(
          "Portfolio",
          { method: "delete" },
          portfolio.id
        );
        dispatch(deletePortfolio(portfolio));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.item}>
      <button
        onClick={() => setCurrentPortfolio(portfolio)}
        // className={
        //   currentPortfolio.id === portfolio.id ? "opacity-100" : "opacity-50 "
        // }
        className={styles.button}
        key={portfolio.id}
      >
        {portfolio.name}
      </button>
      <span
        onClick={() => onClickDeletePortfolio()}
        className={styles.deleteButton}
      >
        X
      </span>
    </div>
  );
};

export default PortfolioNameItem;
