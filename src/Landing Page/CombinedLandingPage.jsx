import React from "react";
import LeftScroll from "./Sections/LeftScroll";
import RightStatic from "./Sections/RightStatic";
import styles from "./CombinedLandingPage.module.css";
const CombinedLandingPage = () => {
  return (
    <div className={styles.wrapper}>
      <LeftScroll />
      <RightStatic />
    </div>
  );
};

export default CombinedLandingPage;
