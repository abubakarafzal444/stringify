import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Button, Stack } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./Preview.module.css";

//storage imports
import { storage } from "../Store/Firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
//
//storage functions

//
export default function Preview(props) {
  const picture = useSelector((state) => state.loginInfo?.id?.dp);
  const id = useSelector((state) => state.loginInfo?.id?.uid);
  //
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();
  //storage
  const [progress, setProgress] = useState(0);
  //
  const uploadFiles = async () => {
    if (!image) return;

    const sotrageRef = ref(storage, `profilePictures/${id}/${Date.now()}`);
    const uploadTask = uploadBytesResumable(sotrageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => alert(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          props.func(downloadURL);
        });
      }
    );

    // const locationRef = doc(db, "users", id);
    // const docSnap = getDoc(locationRef);
    // const prevData = docSnap.data();
    // console.log(dpURL);
    // setDoc(locationRef, {
    //   ...prevData,
    //   dp: dpURL,
    // });
  };
  //
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  return (
    <div className={styles.container}>
      <form>
        <div className={styles.form1}>
          <img
            className={styles.img}
            src={preview || picture}
            alt=""
            style={{ objectFit: "cover" }}
          />
        </div>
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          accept="image/*"
          onClick={(e) => (e.target.value = null)}
          onChange={(event) => {
            const file = event.target.files[0];
            if (file && file.type.substr(0, 5) === "image") {
              setImage(file);
            } else {
              setImage(null);
            }
          }}
        />
      </form>
      <div className={styles.uploadDeleteButtons}>
        <Stack direction="row" spacing={2}>
          {!image && (
            <Button
              onClick={(event) => {
                event.preventDefault();
                fileInputRef.current.click();
                setImage(null);
              }}
              variant="contained"
              color="success"
              startIcon={<PhotoCameraIcon />}
            >
              CHANGE
            </Button>
          )}
          {image && (
            <>
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  console.log();
                  // fileInputRef.target.value = null;

                  setPreview(picture);
                  setImage(null);
                }}
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
              >
                DELETE
              </Button>
              <Button
                variant="contained"
                color="info"
                onClick={uploadFiles}
                startIcon={<UploadIcon />}
              >
                UPLOAD
              </Button>
            </>
          )}
        </Stack>
      </div>
      <h1>{progress}</h1>
    </div>
  );
}

//
//
//
// const locationRef = doc(db, "users", id);
// const docSnap = await getDoc(locationRef);
// const prevData = docSnap.data();
// console.log(dpURL);
// setDoc(locationRef, {
//   ...prevData,
//   dp: downloadURL,
// });
