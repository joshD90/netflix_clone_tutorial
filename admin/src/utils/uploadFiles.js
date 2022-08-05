import storage from "../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";

const upload = (items, setState, setCounter) => {
  items.forEach((item) => {
    const fileName = new Date().getTime() + item.label + item.file.name;
    const fileRef = ref(storage, `item/${fileName}`);
    const uploadTask = uploadBytesResumable(fileRef, item.file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress} % completed`);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload has been paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error, "Upload was unsuccessful");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setState((prev) => {
            return { ...prev, [item.label]: downloadURL };
          });
          if (setCounter) {
            setCounter((prev) => prev + 1);
            console.log("File Available at ", downloadURL);
          }
        });
      }
    );
  });
};

export default upload;
