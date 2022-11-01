import { useState, useEffect, useContext } from "react";
import "./styles/App.css";

import ImagePreviewer from "./Components/ImagePreviewer";
import { Header } from "./Components/Header";
import { Comparison } from "./Components/Comparison";
import { Table } from "./Components/Table";
import { backgroundQuery } from "./Components/backgroundQuery"
import { Footer } from "./Components/Footer";

function App({user}) {

  const [background, setBackground] = useState([]);

  useEffect(() => {
    backgroundQuery()
      .then(data => {
          setBackground(data.image_uris.art_crop);
      })
      .catch(error =>
        console.log(error.message));
  }, [setBackground]);

   //insert user token into database
  return (
    <div id="master-div" className=".container"  style={{
      backgroundImage: `url(${background})`,
    }}>
        <Header user={user} />
        <div className="main-container">
          <Comparison user={user} />
        </div>
        <div className="row .container">
          <div className="col-3 .container" id="preview-container">
            <ImagePreviewer />
          </div>
          <div className="col-6 .container" id="tableContainer">
            <Table />
          </div>
        </div>
        <Footer />
    </div>
  );
}
export default App;
