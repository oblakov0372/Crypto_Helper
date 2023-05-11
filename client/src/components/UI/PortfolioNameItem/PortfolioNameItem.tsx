import React from "react";
import { PortfolioType } from "../../../types/PortfolioType";
import styles from "./PortfolioNameItem.module.scss";
import { useDispatch } from "react-redux";
import { deletePortfolio } from "../../../redux/slices/portfolio";
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
      dispatch(deletePortfolio(portfolio));
    }
  };

  return (
    <button
      onClick={() => setCurrentPortfolio(portfolio)}
      className={
        currentPortfolio.id === portfolio.id
          ? "opacity-100 relative"
          : "opacity-50 relative"
      }
      key={portfolio.id}
    >
      {portfolio.name}
      <span
        onClick={() => onClickDeletePortfolio()}
        className={styles.deleteButton}
      >
        X
      </span>
    </button>
  );
};

export default PortfolioNameItem;
