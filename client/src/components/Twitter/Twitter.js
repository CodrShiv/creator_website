import "./styles/twitter.css";
import Layers from "./assets/Layers";
import { useState, useEffect } from "react";
import { v4 } from "uuid";
import moment from "moment";
import getIcons from "./assets/getIcons";
const Profile = (props) => {
  return (
    <div className="profile">
      <div className="profile_container">
        <img
          className="twitter_logo"
          src={props.logo_url}
          alt={`${props.user_name}'s Logo`}
        />
        <div>
          <div className="user_name_box">
            <h1>{props.user_name}</h1>
            {getIcons("verified")}
          </div>
          <p className="user_handle_box">
            {props.user_handle} • {props.time}
          </p>
        </div>
      </div>
    </div>
  );
};
let media = -1,
  nomedia = -1;
const Tweet = (props) => {
  props.corresponding_url ? (media += 1) : (nomedia += 1);
  return (
    <article
      key={v4()}
      className={`tweet _${props.corresponding_url ? media : nomedia} ${
        props.corresponding_url ? "media" : "nomedia"
      }`}
    >
      <Profile
        user_name={props.name}
        tweetID={props.tweetID}
        time={props.time}
        user_handle={`@${props.name}`}
        logo_url={props.PicUrl}
      />
      <p className="tweet_text">
        {props.text}{" "}
        <a className="redirect_link" target="_blank" href={props.tweetID}>
          {getIcons("redirect")}
        </a>
      </p>
      {props.corresponding_url ? (
        <img
          alt={`${props.name}'s Twitter Post`}
          src={props.corresponding_url.url}
        />
      ) : (
        <></>
      )}
    </article>
  );
};

const ParseData = (props) => {
  const [elements, setElements] = useState({ array: [] });
  useEffect(() => {
    if (!props.Data) return;
    props.Data.data.forEach((ele) => {
      let corresponding_url;
      ele.text = ele.text.replace(
        /(?:(?:https?|ftp):\/\/)?[\w/\-?=%.]+\.[\w/\-&?=%.]+/g,
        ""
      );
      const renderText = (txt) =>
        txt.split(" ").map((part) =>
          /@[A-Za-z0-9_.]/g.test(part) ? (
            <a href={`https://twitter.com/${part}`} target="_blank">
              {part}{" "}
            </a>
          ) : (
            part + " "
          )
        );
      ele.text = renderText(ele.text);
      ele.created_at = moment(new Date(ele.created_at)).fromNow();
      // if (ele.attachments) {
      //   corresponding_url = props.Data.includes.media.find(
      //     (part) => ele.attachments.media_keys[0] === part.media_key || false
      //   );

      //   setElements((prevState) => ({
      //     array: [
      //       ...prevState.array,
      //       <Tweet
      //         key={v4()}
      //         tweetID={`https://twitter.com/${props.Name.toLowerCase()}/status/${ele.id}`}
      //         time={ele.created_at}
      //         corresponding_url={corresponding_url}
      //         text={ele.text}
      //         name={props.Name}
      //         PicUrl={props.PicUrl}
      //       />,
      //     ],
      //   }));
      //   media += 1;
      // } else {
      setElements((prevState) => ({
        array: [
          ...prevState.array,
          <Tweet
            key={v4()}
            tweetID={`https://twitter.com/${props.Name.toLowerCase()}/status/${
              ele.id
            }`}
            time={ele.created_at}
            corresponding_url={null}
            name={props.Name}
            text={ele.text}
            PicUrl={props.PicUrl}
          />,
        ],
      }));
      // }
    });
  }, [props.Data]);

  return elements.array;
};
const autoScroll = (container) => {
  if (container.scrollLeft !== container.scrollWidth) {
    container.scrollTo(container.scrollLeft + 1, 0);
  }
};
const Twitter = (props) => {
  useEffect(() => {
    let ele = document.querySelector(".page.twitter");
    let container = ele.querySelector(".twitter_main");

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          ele.classList.add("visible")
          ele.classList.remove("invisible")
          setInterval(() => {
            autoScroll(container);
          }, 50);
        } else {
          ele.classList.remove("visible")
          ele.classList.add("invisible")
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(ele);
  }, []);
  return (
    <>
      <aside className="twitter_aside">
        <Layers Name="layers_twitter" />
      </aside>
      <div className="twitter_main_container">
      <div className="twitter_main">
        <ParseData
          Name={props.Name}
          PicUrl={props.PicUrl}
          Data={props.Media ? props.Media : { data: [] }}
        />
      </div>
      </div>
    </>
  );
};

export default Twitter;
