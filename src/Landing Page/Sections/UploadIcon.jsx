// import DeleteIcon from "@mui/icons-material/Delete";
// import UploadIcon from "@mui/icons-material/Upload";
// import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
// import { Button, Stack } from "@mui/material";
// import { useRef, useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import styles from "./UploadIcon.module.css";
//
// //
// //storage functions
//
// //
// export default function Preview(props) {
//   //
//   const [image, setImage] = useState();
//   const [preview, setPreview] = useState();
//   const fileInputRef = useRef();
//
//   useEffect(() => {
//     if (image) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreview(reader.result);
//       };
//       reader.readAsDataURL(image);
//     } else {
//       setPreview(null);
//     }
//   }, [image]);
//   return (
//     <div className={styles.container}>
//       <form>
//         {preview && (
//           <div className={styles.form1}>
//             <button
//               className={styles.cross}
//               onClick={() => {
//                 setPreview(null);
//                 setImage(null);
//               }}
//             >
//               x
//             </button>
//             <img
//               className={styles.img}
//               src={preview}
//               alt=""
//               style={{ objectFit: "cover" }}
//             />
//           </div>
//         )}
//
//         <input
//           type="file"
//           style={{ display: "none" }}
//           ref={fileInputRef}
//           accept="image/*"
//           onClick={(e) => (e.target.value = null)}
//           onChange={(event) => {
//             const file = event.target.files[0];
//             if (file && file.type.substr(0, 5) === "image") {
//               setImage(file);
//             } else {
//               setImage(null);
//             }
//           }}
//         />
//       </form>
//       <div className={styles.uploadDeleteButtons}>
//         <Stack
//           direction="row"
//           justifyContent="space-between"
//           padding="0px 30px"
//         >
//           <Button
//             onClick={(event) => {
//               event.preventDefault();
//               fileInputRef.current.click();
//               setImage(null);
//             }}
//             variant="contained"
//             color="info"
//             startIcon={<PhotoCameraIcon />}
//           >
//             PHOTO
//           </Button>
//           <Button variant="contained" color="info" onclick={props.data(image)}>
//             POST
//           </Button>
//         </Stack>
//         <div style={{ height: "20px" }}></div>
//       </div>
//     </div>
//   );
// }
