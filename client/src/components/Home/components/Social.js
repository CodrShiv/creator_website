import getLogo from "../assets/getLogo";
import { motion } from "framer-motion";

const Social = (props) => {
    return (
        <a href={props.Url} className={`${props.Name}_box social_container`}>
            <motion.div
                initial="initial"
                animate="animate"
                variants={{
                    initial: { opacity: 0, x: 50 },
                    animate: { opacity: 1, x: 0, transition: { duration: 1, delay: 5 } },
                }}
                className={`logo ${props.Name}`}
            >
                {getLogo(props.Name)}
            </motion.div>
            <motion.div
                initial="initial"
                animate="animate"
                variants={{
                    initial: { opacity: 0, x: -10 },
                    animate: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 1, delay: 5.5 },
                    },
                }}
                className="logo_text"
            >
                <h2 className="fan_count">
                    <span>
                        {new Intl.NumberFormat("en-GB", {
                            notation: "compact",
                            compactDisplay: "short",
                        }).format(props.Count)}
                    </span>
                    +
                </h2>
                <p className="fan_call">{props.Term}</p>
            </motion.div>
        </a>
    );
};
export default Social;  