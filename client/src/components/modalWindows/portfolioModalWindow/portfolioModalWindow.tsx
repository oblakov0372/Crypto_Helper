import React, { useState } from "react";
import ModalWindow from "../modalWindow/ModalWindow";
import MyButton from "../../UI/MyButton/MyButton";
import { authenticatedRequest } from "../../../utils/Request";
import { useDispatch } from "react-redux";
import { addPortfolio } from "../../../redux/slices/portfolio";
import { PortfolioType } from "../../../types/PortfolioType";

type portfolioModalWindowProps = {
  setIsOpenPortfolioModal: (state: boolean) => void;
  setCurrentPortfolio: (portfolio: PortfolioType) => void;
};

type createPortfolioType = {
  name: string;
  description: string;
};

const PortfolioModalWindow: React.FC<portfolioModalWindowProps> = ({
  setIsOpenPortfolioModal,
  setCurrentPortfolio,
}) => {
  const dispatch = useDispatch();
  const [portfolio, setPortfolio] = useState<createPortfolioType>({
    name: "",
    description: "",
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await authenticatedRequest(
        "Portfolio",
        { method: "post" },
        portfolio
      );
      setIsOpenPortfolioModal(false);
      setCurrentPortfolio({
        id: response.data.id,
        name: portfolio.name,
        description: portfolio.description,
      });
      dispatch(
        addPortfolio({
          id: response.data.id,
          name: portfolio.name,
          description: portfolio.description,
        })
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <ModalWindow
      title="Create Portfolio"
      setIsOpenModal={setIsOpenPortfolioModal}
      className="w-1/2"
    >
      <form className="text-center" onSubmit={handleSubmit}>
        <input
          className="p-1 mr-auto ml-auto block rounded-md text-black mb-5 "
          type="text"
          value={portfolio.name}
          required
          placeholder="Name"
          onChange={(e) =>
            setPortfolio((prev: createPortfolioType) => ({
              name: e.target.value,
              description: prev.description,
            }))
          }
        />
        <input
          className="p-1 mr-auto ml-auto block rounded-md text-black mb-5 "
          type="text"
          value={portfolio.description}
          placeholder="Description"
          onChange={(e) =>
            setPortfolio((prev: createPortfolioType) => ({
              name: prev.name,
              description: e.target.value,
            }))
          }
        />
        <MyButton type="submit">Create</MyButton>
      </form>
    </ModalWindow>
  );
};

export default PortfolioModalWindow;
