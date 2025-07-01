import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";

const ScrollButtonContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999;

  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1.5rem;
  }
`;

const ScrollButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradient};
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadowMedium};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px ${({ theme }) => theme.colors.shadowLarge};
  }

  &:active {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 1.25rem;
  }
`;

const ProgressRing = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
`;

const ProgressCircle = styled.circle`
  fill: none;
  stroke: rgba(255, 255, 255, 0.3);
  stroke-width: 3;
`;

const ProgressBar = styled.circle`
  fill: none;
  stroke: white;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: ${({ circumference }) => circumference};
  stroke-dashoffset: ${({ circumference, progress }) =>
    circumference - (progress / 100) * circumference};
  transition: stroke-dashoffset 0.1s ease;
`;

const ArrowIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: inherit;
  z-index: 1;
`;

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const radius = 26;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setIsVisible(currentScrollY > 100);

      const progress = (currentScrollY / scrollHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17,
      },
    },
    exit: {
      opacity: 0,
      scale: 0,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const arrowVariants = {
    hover: {
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      y: 0,
      scale: 0.95,
    },
  };

  return (
    <ScrollButtonContainer>
      <AnimatePresence>
        {isVisible && (
          <ScrollButton
            onClick={scrollToTop}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover="hover"
            whileTap="tap"
            aria-label="Scroll to top"
          >
            <ProgressRing>
              <ProgressCircle cx="30" cy="30" r={radius} />
              <ProgressBar
                cx="30"
                cy="30"
                r={radius}
                circumference={circumference}
                progress={scrollProgress}
              />
            </ProgressRing>
            <ArrowIcon variants={arrowVariants}>
              <FiArrowUp />
            </ArrowIcon>
          </ScrollButton>
        )}
      </AnimatePresence>
    </ScrollButtonContainer>
  );
};

export default ScrollToTopButton;
