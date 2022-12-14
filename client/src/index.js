import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import createScrollSnap from "scroll-snap";
import AnimatedCursor from "react-animated-cursor";

import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root")),
  PRODUCTION = true,
  USER_NAME = "NomadicAmbience",
  BASE_API_URL = `${
    PRODUCTION
      ? "https://creator-website-server.netlify.app"
      : "http://localhost:9000"
  }/.netlify/functions/api`;
class Init extends React.Component {
  container = React.createRef();
  bindScrollSnap() {
    const element = this.container.current,
      config = {
        snapDestinationY: "100%",
        timeout: 40,
        duration: 800,
        threshold: 0,
      };
    createScrollSnap(element, config);
  }
  componentDidMount() {
    this.bindScrollSnap();
  }
  render() {
    setTimeout(() => {
      document.querySelector("#container").style.overflowY = "auto";
    }, 7200);
    return (
      <>
        <AnimatedCursor innerSize={8}
      outerSize={8}
      color='0, 102, 255'
      outerAlpha={0.4}
      innerScale={1.5}
      outerScale={5}
      clickables={[
        'a',
        '.link'
      ]}/>

        <div id="container" ref={this.container}>
          <App username={USER_NAME} api={BASE_API_URL} />
        </div>
      </>
    );
  }
}
root.render(<Init />);
