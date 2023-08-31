import axios from "axios";
import { useState, useEffect } from "react";

function JobPost() {
  const [htmlContent, setHtmlContent] = useState("");

  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/listings/linkedin`
      );
      const html = response.data;
      console.log(html);
      setHtmlContent(html);
    } catch (error) {
      console.error("Error fetching HTML: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <p>JobPost</p>
      {console.log(htmlContent)}
    </div>
  );
}

export default JobPost;
