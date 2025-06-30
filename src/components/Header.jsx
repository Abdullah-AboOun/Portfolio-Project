import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const blinkCursor = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const popOut = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const HeaderContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.backgroundGradient};
  background-size: 300% 300%;
  animation: ${gradientAnimation} 8s ease infinite;
  position: relative;
  overflow: hidden;
`;

const HeaderContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
    padding: 0 1rem;
  }
`;

const LeftContent = styled(motion.div)`
  z-index: 2;
`;

const TypewriterText = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.heading};
  margin-bottom: 1rem;
  min-height: 4rem;
  position: relative;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    min-height: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    min-height: 2.5rem;
  }

  &::after {
    content: '|';
    color: ${({ theme }) => theme.colors.primary};
    animation: ${blinkCursor} 1s infinite;
    margin-left: 2px;
  }
`;

const SubTitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const RightContent = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AvatarContainer = styled(motion.div)`
  position: relative;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  }

  &:active {
    animation: ${popOut} 0.6s ease;
  }

  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
  }

  @media (max-width: 480px) {
    width: 250px;
    height: 250px;
  }
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const AvatarOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, 
    rgba(102, 126, 234, 0.2) 0%, 
    rgba(118, 75, 162, 0.2) 50%, 
    rgba(240, 147, 251, 0.2) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const Header = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const texts = [
      "Hi, I'm Abdullah",
      "Full Stack Developer", 
      "React Specialist",
      "UI/UX Designer",
      "Problem Solver"
    ];
    
    const currentText = texts[currentTextIndex];
    const typingSpeed = isDeleting ? 75 : 150;
    const pauseTime = isDeleting ? 500 : 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting && currentIndex < currentText.length) {
        setDisplayText(currentText.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else if (isDeleting && currentIndex > 0) {
        setDisplayText(currentText.substring(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      } else if (!isDeleting && currentIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && currentIndex === 0) {
        setIsDeleting(false);
        setCurrentTextIndex((currentTextIndex + 1) % texts.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentIndex, currentTextIndex, isDeleting]);

  const handleAvatarClick = () => {
    // Create a fun pop-out effect with a temporary message
    const message = document.createElement('div');
    message.textContent = '👋 Hello there!';
    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(45deg, #667eea, #764ba2);
      color: white;
      padding: 1rem 2rem;
      border-radius: 50px;
      font-size: 1.2rem;
      font-weight: 600;
      z-index: 10000;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      animation: fadeInOut 2s ease forwards;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        30% { transform: translate(-50%, -50%) scale(1); }
        70% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(message);
    
    setTimeout(() => {
      document.body.removeChild(message);
      document.head.removeChild(style);
    }, 2000);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / 20;
    const y = (e.clientY - centerY) / 20;
    
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <HeaderContainer id="home">
      <HeaderContent>
        <LeftContent
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <TypewriterText>
            {displayText}
          </TypewriterText>
          <SubTitle>
            Passionate about creating amazing web experiences with modern technologies.
            Welcome to my digital portfolio.
          </SubTitle>
        </LeftContent>

        <RightContent
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <AvatarContainer
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleAvatarClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              x: mousePosition.x,
              y: mousePosition.y
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <AvatarImage 
              src={`${import.meta.env.BASE_URL}images/profile/avatar.svg`}
              alt="Profile Avatar"
            />
            <AvatarOverlay />
          </AvatarContainer>
        </RightContent>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
