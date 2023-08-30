import React, { useState } from "react";
import axios from "axios";

function PDFReadingTest() {
  const [extractedText, setExtractedText] = useState("");

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("apikey", `${process.env.REACT_APP_OCR_SPACE_APIKEY}`);

      try {
        console.log(formData);
        const response = await axios.post(
          "https://api.ocr.space/parse/image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (
          response.data &&
          response.data.ParsedResults &&
          response.data.ParsedResults.length > 0
        ) {
          console.log(response.data);
          const extractedText = response.data.ParsedResults[0].ParsedText;
          setExtractedText(extractedText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".pdf, image/jpeg, image/png"
        onChange={handleFileUpload}
      />
      <div>
        <h2>Extracted Text</h2>
        <p>{extractedText ? extractedText : <div>Nothing here Yet!</div>}</p>
      </div>
    </div>
  );
}

export default PDFReadingTest;
