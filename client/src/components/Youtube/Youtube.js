import "./styles/youtube.css";
import Layers from "./assets/Layers";
import Play from "./assets/Play";
import Close from "./assets/Close";
import moment from "moment";
import { useState, useEffect } from "react";
import { v4 } from "uuid";
let viewFrame, closeFrame;

const Video = (props) => {
  let data;
  const [elements, setElements] = useState([]);
  useEffect(() => {
    if (!props.Data) return;
    data = [];
    props.Data.forEach((element) => {
      data.push(
        <div
          key={v4()}
          onClick={() => {
            viewFrame(element.id.videoId);
          }}
          className={`video ${element.id.videoId}`}
        >
          <div
            className="thumbnail"
            style={{
              background: `url(${element.snippet.thumbnails.high.url}) center/cover no-repeat `,
            }}
          >
            <Play Name="play_button" />
          </div>
          <VideoDetails
            title={element.snippet.title}
            time={moment(new Date(element.snippet.publishTime)).fromNow()}
            creator={element.snippet.channelTitle}
          />
        </div>
      );
    });
    setElements(data);
  }, [props.Data]);
  return elements;
};

const Frame = (props) => {
  const [id, setId] = useState("");
  viewFrame = (rec_id) => {
    props.setOpen(true);
    document.querySelector(".profile_pic").classList.add("hide");
    setId(rec_id);
  };
  closeFrame = () => {
    props.setOpen(false);
    document.querySelector(".profile_pic").classList.remove("hide");
  };
  return (
    <div className={`popUp ${props.open ? "open" : "closed"}`}>
      <div className="popUp_content">
        <iframe
          title="yt_video"
          className="popUp_frame"
          autoPlay
          allow="fullscreen;"
          width="90%"
          height="90%"
          src={
            props.open ? `https://www.youtube.com/embed/${id}?autoplay=1` : ""
          }
        ></iframe>
        <div
          onClick={() => {
            closeFrame();
          }}
        >
          <Close Name="close_btn" />
        </div>
      </div>
    </div>
  );
};
const VideoDetails = (props) => {
  return (
    <div className="video_text">
      <p className="video_title">{props.title}</p>
      <p className="video_time">{props.time}</p>
    </div>
  );
};
const autoScroll = (container) => {
  if (container.scrollLeft !== container.scrollWidth) {
    container.scrollTo(container.scrollLeft + 1, 0);
  }
};
const Youtube = (props) => {
  const [open, setOpen] = useState(false);
  const [PicUrl, setPicUrl] = useState("");
  useEffect(() => {
    let ele = document.querySelector(".page.youtube");
    let container = ele.querySelector(".youtube_main");

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          document.querySelector(".popUp").classList.contains("closed")
        ) {
          setInterval(() => {
            autoScroll(container);
          }, 50);
          ele.classList.add("visible")
          ele.classList.remove("invisible")
        
        }
        if (!entries[0].isIntersecting) {
          setOpen(false);
          ele.classList.add("invisible")
          ele.classList.remove("visible")
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(ele);
  }, []);
  useEffect(() => {
    setPicUrl(props.Pic);
  }, [props.Pic])
  return (
    <>
      <div className="youtube_main">
        <div className="youtube_videos">
          <Video Data={props.Media ? props.Media : null} />
        </div>
      </div>
      <Frame open={open} setOpen={setOpen} />
      <aside className="youtube_aside">
        <img className="profile_pic" alt="User's Profile Pic" src={PicUrl} />
        <Layers Name="yt_layers" />
      </aside>
    </>
  );
};
export default Youtube;
