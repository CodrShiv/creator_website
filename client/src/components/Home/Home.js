import "./styles/Home.css";
import Layers from "./assets/Layers";
import { motion } from "framer-motion";
import Feature from "./components/Feature";
import Social from "./components/Social"


const Home = (props) => {
  return (
    <>
      <aside>
        <Layers className="bg_decor right top" />
        <Layers className="bg_decor left bottom" />
      </aside>
      <div className="home_main_container">
      <main className="home_main">
        <motion.img
          initial="initial"
          animate="animate"
          className="logo_main link"
          variants={{
            initial: { opacity: 0, y: -20, zIndex: 3 },
            animate: {
              opacity: 1,
              zIndex: 3,
              y: 0,
              transition: {
                duration: 1.5,
                ease: [0.6, 0.01, -0.05, 0.95],
                delay: 1.5,
              },
            },
          }}
          src={`${process.env.PUBLIC_URL}/assets/logo.jpg`}
          alt={`${props.Name}'s Logo`}
        />
        <motion.div
          className="title link"
          initial="initial"
          animate="animate"
          variants={{
            initial: { opacity: 0, y: -300, zIndex: 0, scale: 0.1 },
            animate: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 2.5,
                ease: [0.6, 0.01, -0.05, 0.95],
                delay: 2,
              },
            },
          }}
        >
          {props.Name}
        </motion.div>
        <motion.div
          className="info_bar"
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.5,
                delayChildren: 3,
              },
            },
          }}
        >
          <Feature Name="lifestyle" />
          <Feature Name="travel" />
          <Feature Name="spirituality" />
        </motion.div>
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            initial: { opacity: 0, y: 10 },
            animate: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, delay: 6 },
            },
          }}
          className="email_box"
        >
          <a href={`mailto:${props.Email}`} className="email">
            {props.Email.toLowerCase()}
          </a>
        </motion.div>
        <div className="socials_box">
          <Social Count={props.count.ig} Url={`https://instagram.com/${props.Name.toLowerCase()}`} Name="Instagram" Term="Followers" />
          <Social Count={props.count.yt} Url={`https://youtube.com/c/${props.Name.toLowerCase()}`} Name="Youtube" Term="Subscribers" />
          <Social Count={props.count.twitter} Url={`https://twitter.com/${props.Name.toLowerCase()}`} Name="Twitter" Term="Followers" />
        </div>
      </main>
      </div>
    </>
  );
};
export default Home;
