import React from "react";
import classes from "./Platform.module.scss";
import { PlatformType } from "../../types/PlatformType";

const Platform: React.FC<PlatformType> = ({
  imgLink,
  title,
  description,
  link,
}) => {
  return (
    <div>
      <div className={classes.platform}>
        <div className={classes.left}>
          <h2 className={classes.title}>{title}</h2>
          <p>{description}</p>
          <a href={link} target="_blank">
            Go to {title.substring(3)}
          </a>
        </div>
        <div className={classes.right}>
          <img width={150} alt="logo" src={imgLink} />
        </div>
      </div>
    </div>
  );
};

export default Platform;
