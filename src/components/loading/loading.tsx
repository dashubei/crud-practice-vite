import React from "react";
import { PacmanLoader } from "react-spinners";
import styles from "./loading.module.scss";

const Loading = (): React.JSX.Element => {
  return (
    <div className={styles.container}>
      <PacmanLoader />
    </div>
  );
};

export default Loading;
