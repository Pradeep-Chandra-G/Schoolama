'use client'

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";

// Cursor Component
const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <motion.div
      className="fixed w-12 h-12 border border-white rounded-full z-[999] pointer-events-none hidden md:block"
      animate={{ x: position.x + 10, y: position.y + 10 }}
    />
  );
};

// Toggle Button Component
const ToggleButton = ({ setOpen }) => {
  return (
    <button 
      onClick={() => setOpen((prev) => !prev)}
      className="fixed z-[999] w-12 h-12 rounded-full top-6 left-6 bg-transparent border-none cursor-pointer"
    >
      <svg width="23" height="23" viewBox="0 0 23 23">
        <motion.path
          strokeWidth="3"
          stroke="black"
          strokeLinecap="round"
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <motion.path
          strokeWidth="3"
          stroke="black"
          strokeLinecap="round"
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
        />
        <motion.path
          strokeWidth="3"
          stroke="black"
          strokeLinecap="round"
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </svg>
    </button>
  );
};

// Links Component
const Links = () => {
  const items = ["Homepage", "Services", "Portfolio", "Contact"];

  const variants = {
    open: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
    },
    closed: {
      y: 50,
      opacity: 0,
    },
  };

  return (
    <motion.div className="absolute w-full h-full flex flex-col items-center justify-center gap-5" variants={variants}>
      {items.map((item) => (
        <motion.a
          href={`#${item}`}
          key={item}
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-4xl md:text-xl"
        >
          {item}
        </motion.a>
      ))}
    </motion.div>
  );
};

// Sidebar Component
const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const variants = {
    open: {
      clipPath: "circle(1200px at 50px 50px)",
      transition: {
        type: "spring",
        stiffness: 20,
      },
    },
    closed: {
      clipPath: "circle(30px at 50px 50px)",
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  return (
    <motion.div className="flex flex-col items-center justify-center bg-white text-black" animate={open ? "open" : "closed"}>
      <motion.div 
        className="fixed z-[999] top-0 left-0 bottom-0 w-96 md:w-48 bg-white" 
        variants={variants}
      >
        <Links />
      </motion.div>
      <ToggleButton setOpen={setOpen} />
    </motion.div>
  );
};

// Navbar Component
const Navbar = () => {
  return (
    <div className="h-24">
      <Sidebar />
      <div className="max-w-6xl mx-auto flex items-center justify-between md:justify-end h-full px-5 md:px-0">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="font-bold hidden md:block"
        >
          Development Hell
        </motion.span>
        <div className="flex gap-5">
          <a href="https://github.com/Pradeep-Chandra-G" target="_blank" rel="noopener noreferrer">
            <img src="/Portfolio/github-logo.png" alt="GitHub" className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/pradeep-chandra-g/" target="_blank" rel="noopener noreferrer">
            <img src="/Portfolio/linkedin.png" alt="LinkedIn" className="w-5 h-5" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="/Portfolio/instagram.png" alt="Instagram" className="w-5 h-5" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src="/Portfolio/dribbble.png" alt="Dribbble" className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

// Hero Component
const Hero = () => {
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
        repeatType: "mirror",
        duration: 20,
      },
    },
  };

  return (
    <div className="h-[calc(100vh-100px)] overflow-hidden bg-gradient-to-b from-[#0c0c1d] to-[#111132] relative">
      <div className="max-w-6xl h-full mx-auto">
        <motion.div
          className="w-1/2 md:w-full h-full md:h-1/2 flex flex-col justify-center gap-10 md:gap-5 md:items-center md:text-center"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <motion.h2 variants={textVariants} className="text-3xl text-purple-600 tracking-[10px]">
            PRADEEP CHANDRA GAJENDRA
          </motion.h2>
          <motion.h1 variants={textVariants} className="text-8xl md:text-4xl">
            Full Stack Java Developer NextJS Developer
          </motion.h1>
          <motion.div variants={textVariants} className="flex gap-5">
            <motion.button 
              variants={textVariants}
              className="px-5 py-5 border border-white rounded-lg bg-transparent text-white cursor-pointer font-light"
            >
              See the Latest Works
            </motion.button>
            <motion.button 
              variants={textVariants}
              className="px-5 py-5 border border-white rounded-lg bg-transparent text-white cursor-pointer font-light"
            >
              Contact Me
            </motion.button>
          </motion.div>
          <motion.img
            variants={textVariants}
            animate="scrollButton"
            src="/scroll.png"
            alt="Scroll"
            className="w-12"
          />
        </motion.div>
      </div>
      <motion.div
        className="absolute text-[50vh] bottom-[-120px] whitespace-nowrap text-white/[0.04] w-1/2 font-bold"
        variants={sliderVariants}
        initial="initial"
        animate="animate"
      >
        Writer Designer Developer
      </motion.div>
      <div className="h-full absolute top-0 right-0 md:h-1/2 md:w-full md:top-auto md:bottom-0">
        <img src="/Portfolio/pradeep.png" alt="Pradeep" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

// Parallax Component
const Parallax = ({ type }) => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "500%"]);
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      className="w-full h-full relative flex items-center justify-center overflow-hidden"
      ref={ref}
      style={{
        background:
          type === "services"
            ? "linear-gradient(180deg, #111132, #0c0c1d)"
            : "linear-gradient(180deg, #111132, #505064)",
      }}
    >
      <motion.h1 style={{ y: yText }} className="text-8xl md:text-6xl md:text-center">
        {type === "services" ? "What We Do?" : "What We Did?"}
      </motion.h1>
      <motion.div className="absolute w-full h-full z-30 bg-cover bg-bottom bg-[url('/mountains.png')] md:bg-contain md:bg-no-repeat" />
      <motion.div
        className="absolute w-full h-full z-20 bg-cover bg-bottom md:bg-contain md:bg-no-repeat"
        style={{
          y: yBg,
          backgroundImage: `url(${type === "services" ? "/planets.png" : "/sun.png"})`,
        }}
      />
      <motion.div 
        style={{ x: yBg }} 
        className="absolute w-full h-full z-10 bg-[url('/stars.png')] bg-cover bg-bottom" 
      />
    </div>
  );
};

// Services Component
const Services = () => {
  const ref = useRef();

  const variants = {
    initial: {
      x: -500,
      y: 100,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="bg-gradient-to-b from-[#0c0c1d] to-[#111132] h-full flex flex-col justify-between"
      variants={variants}
      initial="initial"
      ref={ref}
      animate="animate"
    >
      <motion.div className="flex-1 self-end flex items-center gap-5 md:self-center md:text-center md:flex-col" variants={variants}>
        <p className="font-light text-xl text-gray-400 text-right">
          I focus on helping your brand grow
          <br /> and move forward
        </p>
        <hr className="w-[500px] md:w-[300px] border-none border-t-[0.5px] border-gray-400" />
      </motion.div>

      <motion.div className="flex-[2] flex flex-col items-center md:w-full" variants={variants}>
        <div className="flex items-center gap-12 md:flex-col md:text-center md:gap-5">
          <img src="/Portfolio/people.webp" alt="People" className="w-[300px] h-24 md:w-48 md:h-12 rounded-[50px] object-cover" />
          <h1 className="text-8xl md:text-4xl font-light">
            <motion.b whileHover={{ color: "orange" }}>Unique</motion.b> Ideas
          </h1>
        </div>
        <div className="flex items-center gap-12 md:flex-col md:text-center md:gap-5">
          <h1 className="text-8xl md:text-4xl font-light">
            <motion.b whileHover={{ color: "orange" }}>For Your</motion.b> Business.
          </h1>
          <button className="w-[300px] h-24 md:w-36 md:h-12 rounded-[50px] bg-orange-500 border-none text-2xl md:text-base cursor-pointer">
            WHAT WE DO?
          </button>
        </div>
      </motion.div>

      <motion.div className="flex-[2] flex max-w-6xl mx-auto md:flex-col md:w-full" variants={variants}>
        {[1, 2, 3, 4].map((item) => (
          <motion.div
            key={item}
            className="p-12 md:p-2 border-[0.5px] border-gray-400 md:border-none flex flex-col justify-between md:items-center md:gap-5"
            whileHover={{ background: "lightgray", color: "black" }}
          >
            <h2 className="text-xl">Branding</h2>
            <p className="md:hidden">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              libero enim nisi aliquam consectetur expedita magni eius ex corrupti
              animi! Ad nam pariatur assumenda quae mollitia libero repellat
              explicabo maiores?
            </p>
            <button className="p-2 bg-orange-500 border-none cursor-pointer md:bg-transparent md:border md:border-orange-500 md:rounded md:text-orange-500 md:w-1/2">
              Go
            </button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

// Portfolio Components
const portfolioItems = [
  {
    id: 1,
    title: "SchooLama LMS",
    img: "/Portfolio/schoolama.png",
    desc: "SchooLama AI LMS empowers students and educators with intelligent tools for seamless learning. Adaptive courses, instant feedback, and smart analytics ensure growth, while AI-driven insights simplify teaching. Engaging, scalable, and efficient, it transforms education into a guided, personalized journey.",
  },
  {
    id: 2,
    title: "SchooLama Blog",
    img: "/Portfolio/blog.png",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.",
  },
  {
    id: 3,
    title: "Vanilla JS App",
    img: "https://images.pexels.com/photos/6894528/pexels-photo-6894528.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.",
  },
  {
    id: 4,
    title: "Music App",
    img: "https://images.pexels.com/photos/18540208/pexels-photo-18540208/free-photo-of-wood-landscape-water-hill.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ab id ad nesciunt quo aut corporis modi? Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.",
  },
];

const Single = ({ item }) => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  return (
    <section className="h-screen snap-center">
      <div className="flex items-center justify-center w-full h-full overflow-hidden">
        <div className="max-w-6xl h-full mx-auto flex items-center justify-center gap-12 md:flex-col">
          <div className="flex-1 h-1/2 md:w-full md:max-h-[300px]" ref={ref}>
            <img 
              src={item.img} 
              alt={item.title} 
              className="w-full h-full object-cover object-center md:object-contain" 
            />
          </div>
          <motion.div 
            className="flex-1 flex flex-col gap-8 md:transform-none md:p-2 md:items-center md:text-center" 
            style={{ y }}
          >
            <h2 className="text-6xl md:text-4xl">{item.title}</h2>
            <p className="text-gray-400 text-xl md:text-base">{item.desc}</p>
            <button className="bg-orange-500 border-none rounded-lg p-2 w-48 cursor-pointer">
              See Demo
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className="relative" ref={ref}>
      <div className="sticky top-0 left-0 pt-12 md:pt-[calc(100vh-100px)] text-center text-orange-500 text-4xl md:text-2xl">
        <h1>Featured Works</h1>
        <motion.div style={{ scaleX }} className="h-2 bg-white" />
      </div>
      {portfolioItems.map((item) => (
        <Single item={item} key={item.id} />
      ))}
    </div>
  );
};

// Contact Component
const Contact = () => {
  const ref = useRef();
  const formRef = useRef();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const isInView = useInView(ref, { margin: "-100px" });

  const variants = {
    initial: {
      y: 500,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const sendEmail = (e) => {
    e.preventDefault();
    // EmailJS implementation would go here
    console.log("Form submitted");
    setSuccess(true);
  };

  return (
    <motion.div
      ref={ref}
      className="h-full max-w-6xl mx-auto flex items-center gap-12 md:w-full md:p-2 md:flex-col"
      variants={variants}
      initial="initial"
      whileInView="animate"
    >
      <motion.div className="flex-1 flex flex-col gap-10 md:gap-5 md:text-center md:items-center md:mt-16" variants={variants}>
        <motion.h1 variants={variants} className="text-8xl md:text-4xl leading-[88px]">
          Let's work together
        </motion.h1>
        <motion.div className="flex flex-col" variants={variants}>
          <h2 className="text-xl">Mail</h2>
          <span className="font-light">pradeepchandragajendra@gmail.com</span>
        </motion.div>
        <motion.div className="flex flex-col" variants={variants}>
          <h2 className="text-xl">Address</h2>
          <span className="font-light">Guntur, Andhra Pradesh</span>
        </motion.div>
        <motion.div className="flex flex-col" variants={variants}>
          <h2 className="text-xl">Phone</h2>
          <span className="font-light">+91 9182136412</span>
        </motion.div>
      </motion.div>

      <div className="flex-1 relative md:p-12 md:w-full">
        <motion.div
          className="absolute mx-auto z-[-1] stroke-orange-500"
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 0 }}
          transition={{ delay: 3, duration: 2 }}
        >
          <svg width="450px" height="450px" viewBox="0 0 32.666 32.666">
            <motion.path
              strokeWidth={0.2}
              fill="none"
              initial={{ pathLength: 0 }}
              animate={isInView && { pathLength: 1 }}
              transition={{ duration: 3 }}
              d="M28.189,16.504h-1.666c0-5.437-4.422-9.858-9.856-9.858l-0.001-1.664C23.021,4.979,28.189,10.149,28.189,16.504z M16.666,7.856L16.665,9.52c3.853,0,6.983,3.133,6.981,6.983l1.666-0.001C25.312,11.735,21.436,7.856,16.666,7.856z M16.333,0 C7.326,0,0,7.326,0,16.334c0,9.006,7.326,16.332,16.333,16.332c0.557,0,1.007-0.45,1.007-1.006c0-0.559-0.45-1.01-1.007-1.01 c-7.896,0-14.318-6.424-14.318-14.316c0-7.896,6.422-14.319,14.318-14.319c7.896,0,14.317,6.424,14.317,14.319 c0,3.299-1.756,6.568-4.269,7.954c-0.913,0.502-1.903,0.751-2.959,0.761c0.634-0.377,1.183-0.887,1.591-1.529 c0.08-0.121,0.186-0.228,0.238-0.359c0.328-0.789,0.357-1.684,0.555-2.518c0.243-1.064-4.658-3.143-5.084-1.814 c-0.154,0.492-0.39,2.048-0.699,2.458c-0.275,0.366-0.953,0.192-1.377-0.168c-1.117-0.952-2.364-2.351-3.458-3.457l0.002-0.001 c-0.028-0.029-0.062-0.061-0.092-0.092c-0.031-0.029-0.062-0.062-0.093-0.092v0.002c-1.106-1.096-2.506-2.34-3.457-3.459 c-0.36-0.424-0.534-1.102-0.168-1.377c0.41-0.311,1.966-0.543,2.458-0.699c1.326-0.424-0.75-5.328-1.816-5.084 c-0.832,0.195-1.727,0.227-2.516,0.553c-0.134,0.057-0.238,0.16-0.359,0.24c-2.799,1.774-3.16,6.082-0.428,9.292 c1.041,1.228,2.127,2.416,3.245,3.576l-0.006,0.004c0.031,0.031,0.063,0.06,0.095,0.09c0.03,0.031,0.059,0.062,0.088,0.095 l0.006-0.006c1.16,1.118,2.535,2.765,4.769,4.255c4.703,3.141,8.312,2.264,10.438,1.098c3.67-2.021,5.312-6.338,5.312-9.719 C32.666,7.326,25.339,0,16.333,0z"
            />
          </svg>
        </motion.div>
        <motion.form
          ref={formRef}
          onSubmit={sendEmail}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
          className="flex flex-col gap-5"
        >
          <input 
            type="text" 
            required 
            placeholder="Name" 
            name="name"
            className="p-5 md:p-2 bg-transparent border border-white text-white rounded"
          />
          <input 
            type="email" 
            required 
            placeholder="Email" 
            name="email"
            className="p-5 md:p-2 bg-transparent border border-white text-white rounded"
          />
          <textarea 
            rows={8} 
            placeholder="Message" 
            name="message"
            className="p-5 md:p-2 bg-transparent border border-white text-white rounded"
          />
          <button className="p-5 md:p-2 border-none bg-orange-500 cursor-pointer font-medium">
            Submit
          </button>
          {error && <span className="text-red-500">Error</span>}
          {success && <span className="text-green-500">Success</span>}
        </motion.form>
      </div>
    </motion.div>
  );
};

// Main Portfolio Page Component
export default function PortfolioPage() {
  return (
    <div className="font-['DM_Sans'] bg-[#0c0c1d] text-gray-300 min-h-screen">
      <style jsx global>{`
        html {
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
        }
        
        section {
          height: 100vh;
          width: 100vw;
          scroll-snap-align: center;
          overflow: hidden;
        }
      `}</style>
      
      <Cursor />
      
      <section id="Homepage" className="h-screen w-screen overflow-hidden scroll-snap-align-center">
        <Navbar />
        <Hero />
      </section>
      
      <section id="Services" className="h-screen w-screen overflow-hidden scroll-snap-align-center">
        <Parallax type="services" />
      </section>
      
      <section className="h-screen w-screen overflow-hidden scroll-snap-align-center">
        <Services />
      </section>
      
      <section id="Portfolio" className="h-screen w-screen overflow-hidden scroll-snap-align-center">
        <Parallax type="portfolio" />
      </section>
      
      <Portfolio />
      
      <section id="Contact" className="h-screen w-screen overflow-hidden scroll-snap-align-center">
        <Contact />
      </section>
    </div>
  );
}