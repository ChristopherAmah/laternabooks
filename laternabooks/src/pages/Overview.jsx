import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Images
import Laternalogo from "../assets/laterna.png";
import Emoji1 from "../assets/Emoji5.jpeg";
import Emoji2 from "../assets/Emoji2.jpeg";
import Emoji3 from "../assets/Emoji7.jpeg";
import Emoji4 from "../assets/Emoji4.jpeg";
import Emoji5 from "../assets/Emoji6.jpeg";
import Emoji6 from "../assets/Emoji3.jpeg";
import Emoji7 from "../assets/Emoji8.jpeg";
import Emoji8 from "../assets/Emoji1.jpeg";

// --- Emoji data ---
const EMOJIS = [
  { src: Emoji1, bg: "#FFD1DC", size: 45 },
  { src: Emoji2, bg: "#B5EAD7", size: 50 },
  { src: Emoji3, bg: "#C7CEEA", size: 45 },
  { src: Emoji4, bg: "#FFDAC1", size: 50 },
  { src: Emoji5, bg: "#E2F0CB", size: 45 },
  { src: Emoji6, bg: "#FFB7B2", size: 50 },
  { src: Emoji7, bg: "#AEC6CF", size: 45 },
  { src: Emoji8, bg: "#F1CBFF", size: 50 },
];

// --- EmojiItem Component ---
const EmojiItem = ({ src, bg, size, index, total }) => {
  const angle = (index / total) * 2 * Math.PI;
  const radius = 120;

  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <motion.div
      className="absolute flex items-center justify-center rounded-full shadow-sm"
      style={{
        backgroundColor: bg,
        width: size,
        height: size,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, x, y }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 200,
      }}
      whileHover={{ scale: 1.25 }}
    >
      <img
        src={src}
        alt=""
        className="w-[85%] h-[85%] object-contain"
      />
    </motion.div>
  );
};

// --- Main Overview Component ---
const Overview = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTimer = setTimeout(() => setIsLoaded(true), 300);
    const redirectTimer = setTimeout(() => navigate("/products"), 3000);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-white">
      
      {/* Center Logo */}
      <motion.div
        className="z-20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: isLoaded ? 1 : 0.8, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <img
          src={Laternalogo}
          alt="Laterna logo"
          className="w-[200px] h-[100px] object-contain p-5"
        />
      </motion.div>

      {/* Rotating Emojis */}
      <motion.div
        className="absolute flex h-[300px] w-[300px] items-center justify-center"
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{
          rotate: { duration: 10, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {EMOJIS.map((emoji, index) => (
          <EmojiItem
            key={index}
            index={index}
            total={EMOJIS.length}
            {...emoji}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Overview;
