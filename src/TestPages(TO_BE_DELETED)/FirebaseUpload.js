import React, { useState } from "react";
import { storage } from "../firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { Box } from "@mui/material";
const STORAGE_KEY = "images/";

export default function FirebaseUpload() {
  const [fileAdded, setFileAdded] = useState(null);
  const [returnedUrl, setReturnedUrl] = useState("");

  const submitData = () => {
    if (!fileAdded) {
      alert("Upload a file first");
      return;
    }
    const fullStorageRef = storageRef(storage, STORAGE_KEY + fileAdded.name);
    uploadBytes(fullStorageRef, fileAdded).then(() => {
      getDownloadURL(fullStorageRef).then((url) => {
        setReturnedUrl(url);
        setFileAdded(null);
        console.log(url);
      });
    });
  };

  return (
    <Box>
      <input
        type="file"
        name="file"
        onChange={(e) => {
          setFileAdded(e.target.files[0]);
        }}
      />
      <button onClick={submitData}>Send</button>
      {returnedUrl ? (
        <div>
          <a href={returnedUrl} target="_blank" rel="noreferrer">
            Link to Uploaded File
          </a>
        </div>
      ) : (
        <div>"NO URL YET"</div>
      )}
    </Box>
  );
}
