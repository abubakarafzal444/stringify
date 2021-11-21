import React from "react";
import styles from "./SingleImgPost.module.css";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import { BsSave, BsSaveFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { db } from "../../Store/Firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
} from "@firebase/firestore";
import { useSelector } from "react-redux";

const SingleImgPost = (props) => {
  //
  useEffect(() => {
    const locationPostRef = doc(db, `posts/${props.postId}`);
    const locationLikesRef = doc(
      collection(locationPostRef, "likersCollection"),
      user.uid
    );
    const docSnap = getDoc(locationLikesRef).then((docSnap) => {
      if (docSnap.exists()) {
        var data = docSnap.data();
        setLiked(true);
        console.log("Document data:", docSnap.data());
      } else {
        setLiked(false);
      }
    });
  }, []);

  const user = useSelector((state) => state.loginInfo?.id);
  var prevDataMain = props.obj;
  const [liked, setLiked] = React.useState(false);

  const likeFunc = async () => {
    // setLiked(() => setLiked(!liked));
    const locationPostRef = doc(db, `posts/${props.postId}`);
    const locationLikesRef = doc(
      collection(locationPostRef, "likersCollection"),
      user.uid
    );
    // const docSnap = await getDoc(locationLikesRef);
    // console.log(docSnap.data());
    //
    if (!liked) {
      setLiked(() => setLiked(!liked));
      setDoc(locationPostRef, {
        ...prevDataMain,
        likesNum: prevDataMain.likesNum + 1,
      });
      await setDoc(locationLikesRef, {
        likerId: user.uid,
        likerUsername: user.username,
        likersDp: user.dp,
      });
    }

    if (liked) {
      setLiked(() => setLiked(!liked));
      setDoc(locationPostRef, {
        ...prevDataMain,
        likesNum: prevDataMain.likesNum - 1,
      });
      await deleteDoc(locationLikesRef);
    }
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <div className={styles.dpWrapper}>
            <img className={styles.dpImg} src={props.dp} alt="" />
          </div>
          <div className={styles.nameWrapper}>
            <h5 className={styles.nameText}>{props.name}</h5>
          </div>
        </div>
        <div className={styles.headerButton}>
          <BsThreeDots />
        </div>
      </div>
      <div className={styles.postImgWrapper}>
        <img className={styles.postImg} src={props.img} alt="" />
      </div>
      {/* .
      . */}
      <div className={styles.bottomSection}>
        <div className={styles.iconsDiv}>
          <div className={styles.leftIcons}>
            {!liked && (
              <AiOutlineLike
                className={styles.bottomIcons}
                onClick={likeFunc}
              />
            )}
            {liked && (
              <AiFillLike className={styles.bottomIcons} onClick={likeFunc} />
            )}
            <FaRegComment className={styles.bottomIcons} />
            <IoMdShareAlt className={styles.bottomIcons} />
          </div>
          <div className={styles.rightIcons}>
            <BsSave className={styles.bottomIcons} />
          </div>
        </div>
        <h4 className={styles.likesNum}>{props.likesnum} Likes</h4>
        <h4 className={styles.caption}>
          <span className={styles.userName}> {props.name} </span>
          <span className={styles.actualCaption}>{props.caption}</span>
        </h4>
        <h4 className={styles.commentsCount}>
          View All {props.commentsnum} comments
        </h4>
        <h4 className={styles.caption}>
          <span className={styles.userName}> Abdullah </span>
          <span className={styles.actualCaption}>comment 1</span>
        </h4>

        <h4 className={styles.caption}>
          <span className={styles.userName}> Ahsan </span>
          <span className={styles.actualCaption}>comment 2</span>
        </h4>

        <p className={styles.timePosted}>1 Day Ago</p>
      </div>
      <div className={styles.commentSection}>
        <input
          onClick={() => {
            console.log("");
          }}
          className={styles.commentInput}
          placeholder="Write a comment"
          type="text"
        />
        <p className={styles.post}>Post</p>
      </div>
    </div>
  );
};

export default SingleImgPost;
