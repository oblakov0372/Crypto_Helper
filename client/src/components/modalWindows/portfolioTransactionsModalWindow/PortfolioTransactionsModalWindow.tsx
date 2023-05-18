import React, { useEffect } from "react";
import ModalWindow from "../modalWindow/ModalWindow";
import { PortfolioType } from "../../../types/PortfolioType";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { authenticatedRequest } from "../../../utils/Request";

type Props = {
  setIsOpenModalWindow: (state: boolean) => void;
  currentPortfolio: PortfolioType;
};

const PortfolioTransactionsModalWindow: React.FC<Props> = ({
  currentPortfolio,
  setIsOpenModalWindow,
}) => {
  const dispatch = useDispatch();

  const transactions = useSelector(
    (state: RootState) => state.transactionSlice.transactions
  );

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await authenticatedRequest(
        "Transaction/GetTransactionsByPortfolioId",
        { queryParams: { portfolioId: currentPortfolio.id } }
      );
      console.log(response.data);
    };
    fetchTransactions();
  }, []);
  return (
    <ModalWindow title="Transactions" setIsOpenModal={setIsOpenModalWindow}>
      dwqd
    </ModalWindow>
  );
};

export default PortfolioTransactionsModalWindow;
