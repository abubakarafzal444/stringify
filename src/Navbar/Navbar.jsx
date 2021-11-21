import React from "react";
import styles from "./Navbar.module.css";

import { BiSearch } from "react-icons/bi";
import {
  AiFillHome,
  AiOutlineHome,
  AiFillCamera,
  AiOutlineCamera,
} from "react-icons/ai";
import { RiMessengerLine, RiMessengerFill } from "react-icons/ri";
import { IoIosNotificationsOutline, IoIosNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FullScreenDialog from "../LoginSignup/ModelUserInfo";

const Navbar = () => {
  const photoURL = useSelector((state) => state.loginInfo.id?.dp);
  const signedup = useSelector((state) => state.loginInfo.signup);

  return (
    <div className={styles.navCompWrapper}>
      <nav className={styles.navTag}>
        <div className={styles.logoDiv}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <h3 className={styles.logoText}>stringify</h3>
          </Link>
        </div>
        <div className={styles.searchDiv}>
          <input className={styles.input} type="text" placeholder="Search" />
        </div>
        {signedup && <FullScreenDialog show={signedup} />}
        <div className={styles.iconsDiv}>
          <AiFillHome className={styles.navIcons} />
          <RiMessengerLine className={styles.navIcons} />
          <AiOutlineCamera className={styles.navIcons} />
          <IoIosNotificationsOutline className={styles.navIcons} />
          <div className={styles.roundImgDiv}>
            <img className={styles.roundImg} src={photoURL} alt="" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
