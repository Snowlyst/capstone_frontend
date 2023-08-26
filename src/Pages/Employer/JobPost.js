import axios from "axios";
import { useState, useEffect } from "react";

function JobPost() {
  const [htmlContent, setHtmlContent] = useState("");

  // const params = {
  //   headers: {
  //     "User-Agent":
  //       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
  //   },
  // };

  // https://www.linkedin.com/jobs/search?keywords=&location=Singapore&geoId=102454443&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0

  // const url = "";

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/proxy/linkedin");
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
