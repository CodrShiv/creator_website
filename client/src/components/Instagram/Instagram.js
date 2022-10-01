import "./styles/instagram.css";
import Corner from "./assets/Corner";
import Logo from "./assets/Logo";
import { useState, useEffect } from "react";
import { v4 } from "uuid";
import "swiper/css";

const Posts = (props) => {
  const [elements, setElements] = useState(null);
  useEffect(() => {
    setElements(
      <>
        {props.Data.map((element) => {
          return (
            <article className="post" key={v4()}>
              <img src={element.media_url} alt="Instagram Post Picture" width="10rem" />
            </article>
          );
        })}
      </>
    );
    let ele = document.querySelector(".page.instagram");
    let container = ele.querySelector(".posts");

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInterval(() => {
            autoScroll(container);
          }, 50);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(ele);
  }, [props.Data]);
  return elements;
};
const autoScroll = (container) => {
  if (container.scrollLeft !== container.scrollWidth) {
    container.scrollTo(container.scrollLeft + 1, 0);
  }
};
const Instagram = (props) => {
  return (
    <>
      <aside>
        <Corner className="corner top left" />
        <Logo className="corner top right instagram_logo" />
      </aside>

      <div className="ig_main">
        <div className="profile_container_ig">
          <img
            alt={`${props.Name}'s Logo`}
            src={`${process.env.PUBLIC_URL}/assets/logo.jpg`}
          />
          <h1 className="handle">{props.Name}</h1>
        </div>
        <div className="posts_container">
          <div className="overlay-left"></div>
          <div className="posts">
            <Posts Data={props.Media ? props.Media : []} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Instagram;
