import styles from "./UploadPost.module.css";
import * as React from "react";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../Store/Firebase";
import Button from "@mui/material/Button";
import { MdPublish } from "react-icons/md";
import { useSelector } from "react-redux";
//
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Stack } from "@mui/material";
import { useRef, useState, useEffect } from "react";
//
//storage imports
import { storage } from "../../Store/Firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
//
const UploadPost = () => {
  const [caption, setCaption] = React.useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [postType, setPostType] = useState(false);

  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef();
  const dp = useSelector((state) => state.loginInfo?.id?.dp);
  const id = useSelector((state) => state.loginInfo?.id?.uid);
  const name = useSelector((state) => state.loginInfo?.id?.username);

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

  // .then((res) => {
  //           onAuthStateChanged(auth, async (user) => {
  //             console.log(user);
  //             const docRef = await doc(db, "users", user?.uid);
  //             const docSnap = await getDoc(docRef);
  //             dispatch(loginActions.loggingin({ id: docSnap?.data() }));
  //           });
  //         })
  //         .then(() => dispatch(loginActions.signup()));

  const postInput = (event) => {
    setCaption(event.target.value);
  };

  const uploadPost = async (e) => {
    e.preventDefault();
    if (!image) {
      setPostType(true);
      onSubmitPost({ typeText: true, postPhoto: null });
    } else {
      const sotrageRef = ref(storage, `posts/${id}/${Date.now()}`);
      const uploadTask = uploadBytesResumable(sotrageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
          console.log(prog);
        },
        (error) => alert(error),
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then(
            async (downloadURL) => {
              console.log("File available at", downloadURL);
              setPhotoUrl(downloadURL);
              onSubmitPost({ typeText: false, postPhoto: downloadURL });
            }
          );
        }
      );
    }

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

  const onSubmitPost = async (props) => {
    console.log("entered in second");
    console.log("value is", photoUrl);
    const rand = Math.random();
    const locationPostRef = doc(db, `posts/${rand}`);
    //
    const locationLikesRef = doc(
      collection(locationPostRef, "likersCollection"),
      "likers"
    );
    //
    const locationCommentsRef = doc(
      collection(locationPostRef, "commentersCollection"),
      "commenters"
    );
    console.log("setting");
    //
    setDoc(locationPostRef, {
      uid: id,
      dp: dp,
      username: name,
      textType: props.typeText,
      imgurl: props.postPhoto,
      caption: caption,
      time: new Date().getTime(),
      likesNum: 0,
      commentsNum: 0,
      postId: rand,
    });
    setPreview(null);
    setImage(null);
    setPhotoUrl(null);
    setCaption("");

    // template
    // setDoc(locationLikesRef, {
    //   abubakar: { id: "nscssdkj", dp: "ncjsnsdkjns" },
    //   aliiiiii: { id: "sccs", dp: "vvd" },
    // });
    setDoc(locationLikesRef, {});
    setDoc(locationCommentsRef, {});
    // const docsInMainCollection = await getDocs(mainCollectionName);
    // const convertingDocData = docsInMainCollection.docs.map((doc) =>
    //   doc.data()
    // );
    //console.log("runnning", convertingDocData);
    //     const locationRef = doc(db, "users", user.uid);
    //     try {
    //       await setDoc(locationRef, { name: "hello", post: "bhdsduibde" });
    //       alert("submitted");
    //     } catch (error) {
    //       alert(error);
    //     }
    //
    //     setCaption("");
  };
  return (
    <div className={styles.wrapper}>
      <form action="" onSubmit={uploadPost} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="say something..."
          onChange={postInput}
          value={caption}
        />

        <div className={styles.container}>
          <form>
            {preview && (
              <div className={styles.form1}>
                <button
                  className={styles.cross}
                  onClick={() => {
                    setPreview(null);
                    setImage(null);
                  }}
                >
                  x
                </button>
                <img
                  className={styles.img}
                  src={preview}
                  alt=""
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}

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
            <Stack
              direction="row"
              justifyContent="space-between"
              padding="0px 30px"
            >
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  fileInputRef.current.click();
                  setImage(null);
                }}
                variant="contained"
                color="info"
                startIcon={<PhotoCameraIcon />}
              >
                PHOTO
              </Button>
              <Button variant="contained" type="submit" color="info">
                POST
              </Button>
            </Stack>
            <div style={{ height: "20px" }}></div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadPost;
