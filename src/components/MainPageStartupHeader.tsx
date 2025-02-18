import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const scrambleText = (text: string, progress: number) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return text
    .split("")
    .map((char, i) => {
      if (progress * text.length > i) return char; // Reveal the correct character
      return chars[Math.floor(Math.random() * chars.length)];
    })
    .join("");
};

export default function MainPageStartupHeader() {
  const messages = [
    "Hello, World!",
    "Code is Poetry.",
    "Designing the Future.",
    "Crafting Digital Dreams.",
    "Building the Impossible.",
    "Engineering Tomorrow, Today.",
    "Innovation Starts Here.",
    "Where Code Meets Creation.",
    "Transforming Ideas into Code.",
  ];

  const originalText = "Hello, World!";
  const [randomWord, setRandomWord] = useState<string>("");
  const [displayText, setDisplayText] = useState(originalText);
  const [progress, setProgress] = useState(0);
  const [scramble, setScramble] = useState<boolean>(true);
  const [padding, setPadding] = useState(30);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    setRandomWord(messages[Math.floor(Math.random() * messages.length)]);
  }, []);

  useEffect(() => {
    if (!scramble) return;
    setProgress(0);

    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) {
          clearInterval(interval);
          return 1;
        }
        return prev + 0.01;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [scramble]);

  useEffect(() => {
    setDisplayText(scrambleText(randomWord, progress));
  }, [progress]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setPadding(30 + scrollY * 0.1);
      setOpacity(Math.max(1 - scrollY * 0.001, 0));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="relative p-6 text-4xl font-black">
        <div
          onClick={() => {
            setRandomWord(
              messages[Math.floor(Math.random() * messages.length)]
            );
            setScramble(false);
            setTimeout(() => setScramble(true), 10);
          }}
          className="relative text-nowrap flex justify-center items-center text-lg sm:text-xl md:text-2xl lg:text-4xl font-black cursor-pointer"
          style={{ padding, opacity }}
        >
          {displayText}
          <div
            className="absolute w-3/4 h-3/4 border-t-4 border-l-4 border-blue-200 top-0 left-0"
            style={{ opacity }}
          ></div>
          <div
            className="absolute w-3/4 h-3/4 border-b-4 border-r-4 border-blue-200 bottom-0 right-0"
            style={{ opacity }}
          ></div>
          <div className="absolute w-8 h-8 bg-neutral-900 top-0 left-0 transform translate-x-[-50%] translate-y-[-50%]"></div>
          <div className="absolute w-8 h-8 bg-neutral-900 bottom-0 right-0 transform translate-x-[50%] translate-y-[50%]"></div>
          <div
            className="absolute w-4 h-4 bg-blue-200 top-0 left-0 transform translate-x-[-50%] translate-y-[-50%] rounded-sm"
            style={{ opacity }}
          ></div>
          <div
            className="absolute w-4 h-4 bg-blue-200 bottom-0 right-0 transform translate-x-[50%] translate-y-[50%] rounded-sm"
            style={{ opacity }}
          ></div>
        </div>
      </div>
      <div className="absolute bottom-10 animate-bounce">
        <FaChevronDown
          size={48}
          style={{ opacity }}
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
          }}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}
