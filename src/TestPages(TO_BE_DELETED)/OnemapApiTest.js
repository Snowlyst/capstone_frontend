import { useState } from "react";
import axios from "axios";

function OnemapApiTest() {
  const [postalCode, setPostalCode] = useState("");
  const [displayedAddress, setDisplayedAddress] = useState("");

  const handleSearchPostal = (e) => {
    e.preventDefault();
    const searchQuery = postalCode;
    axios
      .get(
        `https://developers.onemap.sg/commonapi/search?searchVal=${searchQuery}&returnGeom=Y&getAddrDetails=Y`
      )
      .then((info) => {
        setPostalCode("");
        const spreadData = info.data.results.map((info, index) => {
          console.log(info);
          return <div key={index}>Address: {info.ADDRESS}</div>;
        });
        setDisplayedAddress(spreadData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <input
        type="number"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
      />
      <button onClick={handleSearchPostal}>Search Address</button>
      <br />
      {displayedAddress ? displayedAddress : null}
    </div>
  );
}

export default OnemapApiTest;
