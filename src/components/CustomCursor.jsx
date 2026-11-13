
import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";

export default function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const cursorX = useSpring(mouseX, {
    damping: 25,
    stiffness: 300,
    mass: 0.5,
  });

  const cursorY = useSpring(mouseY, {
    damping: 25,
    stiffness: 300,
    mass: 0.5,
  });

  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const media = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    const update = () => setEnabled(media.matches);

    update();
    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!enabled) return;

    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);

      const target = e.target;
      const isInteractive =
        target instanceof Element &&
        target.closest(
          "a, button, input, select, textarea, [role='button']"
        );

      setHovering(Boolean(isInteractive));
    };

    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move);
    document.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.7 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className={`h-3 w-3 rounded-full transition-colors duration-200 ${
            hovering ? "bg-white" : "bg-[#71845d]"
          }`}
        />
      </motion.div>

      {/* Outer cursor ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99998]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? 0.7 : 0,
          scale: hovering ? 2.4 : 3.2,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="h-3 w-3 rounded-full border border-[#71845d]/70" />
      </motion.div>
    </>
  );
}
