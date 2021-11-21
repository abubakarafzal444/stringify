import * as React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import styles from "./Login.module.css";
import { FcGoogle } from "react-icons/fc";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "@firebase/auth";
import { auth, db } from "../Store/Firebase";
//redux
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../Store/Slices/LoginControl";
import { doc, setDoc, getDoc } from "@firebase/firestore";
import FullScreenDialog from "./ModelUserInfo";
import { DialogTitle } from "@mui/material";

const Login = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //
  //inputs
  const [name, setName] = React.useState("");
  const [pass, setPass] = React.useState("");
  const userName = (event) => {
    setName(event.target.value);
  };
  const password = (event) => {
    setPass(event.target.value);
  };

  //submit

  const submitSignin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, name, pass);
    } catch (error) {
      alert(error.message);
    }
    setName("");
    setPass("");
  };
  //   const googleProvider = new GoogleAuthProvider();
  //   const googleSignin = async () => {
  //     await signInWithPopup(auth, googleProvider).then((result) => {
  //       const locationRef = doc(db, "users", result.user.uid);
  //
  //       setDoc(locationRef, {
  //         uid: result.user.uid,
  //         actualName: result.user.displayName,
  //         dp: result.user.photoURL,
  //         username: "defined here",
  //         email: result.user.email,
  //         phoneNo: result.user.phoneNumber,
  //       });
  //     });
  //   };

  const googleProvider = new GoogleAuthProvider();
  const googleSignin = async () => {
    await signInWithPopup(auth, googleProvider).then(async (result) => {
      const locationRef = await doc(db, "users", result.user.uid);

      const docSnap = await getDoc(locationRef);

      if (!docSnap.exists()) {
        await setDoc(locationRef, {
          uid: result.user.uid,
          actualName: result.user.displayName,
          dp: result.user.photoURL,
          username: result.user.email,
          email: result.user.email,
          phoneNo: result.user.phoneNumber,
        });
        dispatch(loginActions.signup());
      }
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.heading}>stringify</h1>

        <input
          className={styles.input}
          onChange={userName}
          placeholder="Enter your username"
          type="text"
          value={name}
        />
        <input
          className={styles.input}
          onChange={password}
          placeholder="Enter your password"
          type="password"
          value={pass}
        />
        <button
          type="submit"
          className={styles.loginButton}
          onClick={submitSignin}
        >
          log in
        </button>
        <p className={styles.signupPara}>
          Don't have an account?
          <strong className={styles.para} onClick={handleClickOpen}>
            Sign Up
          </strong>
          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title"></DialogTitle>
              <DialogContent>
                <div className={styles.dialogWrapper}>
                  <h2>Sign Up</h2>
                </div>
                <div className={styles.buttonWrapper}>
                  <button onClick={googleSignin}>
                    <FcGoogle size="20px" />
                    <p className={styles.buttonPara}>Google</p>
                  </button>

                  <button>
                    <FacebookIcon color="primary" />
                    <p className={styles.buttonPara}> Facebook</p>
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </p>
      </div>
    </div>
  );
};

export default Login;
