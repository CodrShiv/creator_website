import React from "react";
import Home from "./components/Home/Home";
import Instagram from "./components/Instagram/Instagram";
import Twitter from "./components/Twitter/Twitter";
import Youtube from "./components/Youtube/Youtube";
import axios from "axios";
import { useState, useEffect } from "react";

const App = (props) => {
  const [data, setData] = useState(null);
  let res;
  useEffect(() => {
    (async () => {
      res = await axios.get(`${props.api}`);
      setData(res.data);
    })();
  }, []);
  return (
    <>
      <div className="page first-page" style={{ height: "100vh" }}>
        <Home
          count={{
            twitter: data ? data.twitter.count : 0,
            yt: data ? data.yt.count : 0,
            ig: data ? data.ig.count : 0,
          }}
          Name={props.username}
          Email="kyler@nomadicambience.com"
        />
      </div>
      <div className="page youtube second-page" style={{ height: "100vh" }}>
        <Youtube
          Media={data ? data.yt.media : null}
          Pic={data ? data.yt.pic_url : ""}
          Name={props.username}
        />
      </div>
      <div className="page twitter third-page" style={{ height: "100vh" }}>
        <Twitter
          Media={data ? data.twitter.media : null}
          PicUrl={data ? data.twitter.pic_url : ""}
          Name={props.username}
        />
      </div>
      <div className="page instagram fourth-page" style={{ height: "100vh" }}>
        <Instagram
          Media={data ? data.ig.media : null}
          Name={props.username}
        />
      </div>
    </>
  );
};

export default App;
