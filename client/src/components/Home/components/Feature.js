import { motion } from "framer-motion";

let icon;
const Feature = (props) => {
  icon = require(`../assets/features/${props.Name}.svg`);
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 30 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { ease: [0.6, 0.01, -0.05, 0.95], duration: 2 },
        },
      }}
      className="feature_block"
    >
      <img className="feature_icon" src={icon} alt={props.Name} />
      <p className="feature_name">{props.Name.toUpperCase()}</p>
    </motion.div>
  );
};
export default Feature;