import * as React from "react";
import styles from "./ModelUserInfo.module.css";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../Store/Slices/LoginControl";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
} from "@firebase/firestore";
import { auth, db } from "../Store/Firebase";
import { onAuthStateChanged } from "@firebase/auth";
import Preview from "../ImagePreview/Preview";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const FullScreenDialog = (props) => {
  const dataObj = useSelector((state) => state.loginInfo?.id);
  const [name, setName] = React.useState(dataObj.actualName);
  const [userName, setUserName] = React.useState(dataObj.username);
  const [userId, setUserId] = React.useState(dataObj.uid);
  const [prevData, setPrevData] = React.useState(dataObj);
  const [imgurl, setnewurl] = React.useState(dataObj.dp);
  const getURL = (received) => {
    setnewurl(received);
  };
  //
  React.useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = await doc(db, "users", user?.uid);
        const docSnap = await getDoc(docRef);
        const data = docSnap?.data();
        setUserId(user?.uid);
        setName(data?.actualName);
        setUserName(data?.username);
        setPrevData(data);
      }
    });

    //correct above
    //
    //

    //
    //
    //
    // const func = async () => {
    //   if (userId) {
    //     const locationRef = doc(db, "users", userId);
    //     const docSnap = await getDoc(locationRef)?.then((res) => {
    //       console.log(res.data());
    //       const resObject = res.data();
    //       setPrevData(resObject);
    //       console.log({ ...prevData });
    //     });
    //   }
    // };
    // func();
  }, [userId]);
  //React.useEffect(() => {
  // const func = async () => {
  //   if (userId) {
  //     const locationRef = doc(db, "users", userId);
  //     const docSnap = await getDoc(locationRef)?.then((res) => {
  //       console.log(res.data());
  //       const resObject = res.data();
  //       setPrevData(resObject);
  //       console.log(prevData);
  //     });
  //   }
  // };
  // func();
  //     const func = async () => {
  //       const docRef = doc(db, "users", userId);
  //       const docSnap = await getDoc(docRef);
  //
  //       if (docSnap.exists()) {
  //         console.log("Document data:", docSnap.data());
  //       } else {
  //         // doc.data() will be undefined in this case
  //         console.log("No such document!");
  //       }
  //     };
  //     func();
  // }, [userId]);
  //
  // React.useEffect(() => {
  //   console.log("running2", userId);
  //   async function getdata(db) {
  //     const mainCollectionName = collection(db, "users");
  //     const docsInMainCollection = await getDocs(mainCollectionName);
  //     const convertingDocData = docsInMainCollection.docs.map((doc) =>
  //       doc.data()
  //     );
  //     setPrevData({ ...convertingDocData, field: "new" });
  //     console.log("list", convertingDocData);
  //   }
  //   getdata(db);
  // }, []);
  // //
  const dispatch = useDispatch();

  const handleClose = () => {
    //
    //
    //
    const locationRef = doc(db, "users", userId);

    setDoc(locationRef, {
      ...prevData,
      username: userName,
      actualName: name,
      dp: imgurl,
    });

    // const locationRef = await doc(db, "users", userId);
    // const docSnap = await getDoc(locationRef)?.then((res) => {
    //   console.log(res.data());
    //   const resObject = res.data();
    //   setPrevData(resObject);
    // });
    //
    //     await setDoc(locationRef, {
    //       ...prevData,
    //       username: userName,
    //       actualName: name,
    //
    //     uid: result.user.uid,
    //     actualName: result.user.displayName,
    //     dp: result.user.photoURL,
    //     username: result.user.email,
    //     email: result.user.email,
    //     phoneNo: result.user.phoneNumber,
    //     });

    dispatch(loginActions.signup());
  };

  const temp = async () => {
    // console.log(prevData);
    console.log(userId);
    console.log(name);
    console.log(userName);
    // const nestedCollectionRef = await collection(db, "users", userId, "test");
    // console.log(nestedCollectionRef);
    // const collection123 = await getDocs(nestedCollectionRef);
    // console.log(collection123);
    // const data = docSnap?.data();
    // const unsub = onSnapshot(
    //   collection(db, "users", userId, "test"),
    //   async (doc) => {
    //     await getDocs(doc);
    //     console.log("Current data: ", doc.data());
    //   }
    // );
    //
    //
    //

    // const mainCollectionName = collection(db, "users", userId, "test");
    // console.log(mainCollectionName);
    // const docsInMainCollection = getDocs(mainCollectionName);
    // const convertingDocData = docsInMainCollection.docs.map((doc) =>
    //   doc.data()
    // );
    // console.log("list", convertingDocData);
    //     const mainCollectionName1 = collection(db, "users", userId, "test");
    //     const docsInMainCollection1 = await getDocs(mainCollectionName1);
    //     console.log(docsInMainCollection1);
    //
    //     const convertingDocData1 = docsInMainCollection1?.docs?.map((doc) =>
    //       doc?.data()
    //     );
    //     console.log("runnning", convertingDocData1);
    //
    //
    //
    //
    onSnapshot(collection(db, "users", userId, "test"), (collection) => {
      const conData = collection.docs?.map((doc) => doc?.data());
      console.log("nested data ", conData);
    });
  };
  return (
    <div>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={props.show}
        onClose={handleClose}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <h5 onClick={temp}>Confirm personal detail</h5>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Preview func={getURL} />

          <Box
            style={{ display: "flex", justifyContent: "center" }}
            component="form"
            sx={{
              "& > :not(style)": { m: 2, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="standard-basic"
              label="Name"
              value={name}
              variant="standard"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="username"
              value={userName}
              variant="standard"
              onChange={(e) => setUserName(e.target.value)}
              focused
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Continue
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};
export default FullScreenDialog;
//
//   TO GET NESTED COLLECTION DATA
//
//   const mainCollectionName1 = collection(db, "users", userId, "test");
//   const docsInMainCollection1 = await getDocs(mainCollectionName1);
//   console.log(docsInMainCollection1);
//
//   const convertingDocData1 = docsInMainCollection1?.docs?.map((doc) =>
//     doc?.data()
//   );
//   console.log("runnning", convertingDocData1);
//
//
//
// onSnapshot(collection(db, "users", userId, "test"), (collection) => {
//   const conData = collection.docs?.map((doc) => doc?.data());
//   console.log("Current data: ", conData);
// });
