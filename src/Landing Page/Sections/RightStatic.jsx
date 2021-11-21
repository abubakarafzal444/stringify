import { onAuthStateChanged, signOut } from "@firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FullScreenDialog from "../../LoginSignup/ModelUserInfo";
import { auth, db } from "../../Store/Firebase";
import { loginActions } from "../../Store/Slices/LoginControl";
import styles from "./RightStatic.module.css";
import SingleNoti from "./SingleNoti";
import { doc, onSnapshot } from "firebase/firestore";
const RightStatic = () => {
  const dispatch = useDispatch();

  const name = useSelector((state) => state.loginInfo.id?.actualName);
  const userName = useSelector((state) => state.loginInfo?.id?.username);
  const photoURL = useSelector((state) => state.loginInfo?.id?.dp);
  //..........
  // const signedup = useSelector((state) => state.loginInfo.signup);
  // const name1 = useSelector((state) => state.loginInfo.id?.actualName);
  // const username1 = useSelector((state) => state.loginInfo.id?.username);
  // const userId = useSelector((state) => state.loginInfo.id?.uid);

  //....
  const temp = () => {
    // console.log(signedup);
    // console.log(name1);
    // console.log(username1);
    // console.log(userId);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.userInfo}>
          <div className={styles.dpText}>
            <div className={styles.dpWrapper}>
              <img className={styles.dp} src={photoURL} alt="" />
            </div>
            <div className={styles.userTextInfo}>
              <h4>{userName}</h4>
              <p>{name}</p>
            </div>
          </div>
          <p
            onClick={() => {
              signOut(auth);
              dispatch(loginActions.loggingout());
            }}
            className={styles.switch}
          >
            logout
          </p>
        </div>
        {/* .
. */}

        <div className={styles.notifications}>
          <h4 className={styles.noti}>Notifications</h4>
          <p className={styles.view} onClick={temp}>
            View All
          </p>
        </div>
        <div className={styles.notificationSection}>
          <SingleNoti />
        </div>
      </div>
    </div>
  );
};

export default RightStatic;
