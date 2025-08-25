// app/portfolio/components/hero/Hero.tsx
import "./hero.scss";
import { motion } from "framer-motion";
import { dmSans } from "@/lib/fonts";

const textVariants = {
  initial: {
    x: -500,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
  scrollButton: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};
const sliderVariants = {
  initial: {
    x: 0,
  },
  animate: {
    x: "-220%",
    transition: {
      repeat: Infinity,
      repeatType:"mirror" as const,
      duration: 20,
    },
  },
};

const Hero = () => {
  return (
    <div className={`hero ${dmSans.className}`}>
      <div className="wrapper">
        <motion.div
          className="textContainer"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <motion.h2 variants={textVariants}>PRADEEP CHANDRA GAJENDRA</motion.h2>
          <motion.h1 variants={textVariants}>
            Full Stack Java Developer NextJS Developer
          </motion.h1>
          <motion.div variants={textVariants} className="buttons">
            <motion.button variants={textVariants}>
              See the Latest Works
            </motion.button>
            <motion.button variants={textVariants}>Contact Me</motion.button>
          </motion.div>
          <motion.img
            variants={textVariants}
            animate="scrollButton"
            src="/Portfolio/scroll.png"
            alt=""
          />
        </motion.div>
      </div>
      <motion.div
        className="slidingTextContainer"
        variants={sliderVariants}
        initial="initial"
        animate="animate"
      >
        Writer Designer Developer 
      </motion.div>
      <div className="imageContainer">
        <img src="/Portfolio/pradeep.png" alt="" />
      </div>
    </div>
  );
};

export default Hero;