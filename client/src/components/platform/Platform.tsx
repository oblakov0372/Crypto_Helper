import React from "react";
import styles from "./Platform.module.scss";
import { PlatformType } from "../../types/PlatformType";
import MyButton from "../UI/MyButton/MyButton";

const Platform: React.FC<PlatformType> = ({
  imgLink,
  title,
  description,
  link,
}) => {
  return (
    <div>
      <div className={styles.platform}>
        <div className={styles.left}>
          <h2 className={styles.title}>{title}</h2>
          <p>{description}</p>
          <MyButton href={link} target="_blank">
            Go to {title.substring(3)}
          </MyButton>
        </div>
        <div className={styles.right}>
          <img width={150} alt="logo" src={imgLink} />
        </div>
      </div>
    </div>
  );
};

export default Platform;
