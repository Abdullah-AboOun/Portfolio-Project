import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

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
  color: white;
  margin-bottom: 1rem;
  min-height: 4.5rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    min-height: 3.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    min-height: 2.5rem;
  }
`;

const Cursor = styled.span`
  display: inline-block;
  background-color: white;
  width: 3px;
  animation: blink 1s infinite;

  @keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
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
  
  const texts = [
    "Hi, I'm Abdullah",
    "Full Stack Developer",
    "React Specialist",
    "UI/UX Designer"
  ];

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    const typingSpeed = isDeleting ? 50 : 100;
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
  }, [currentIndex, currentTextIndex, isDeleting, texts]);

  const handleAvatarClick = () => {
    console.log('Avatar clicked!');
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const moveX = x / 10;
    const moveY = y / 10;
    
    e.currentTarget.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translate(0px, 0px)';
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
            <Cursor />
          </TypewriterText>
          <SubTitle>
            Passionate about creating amazing web experiences with modern technologies.
            Welcome to my digital portfolio where creativity meets functionality.
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
          >
            <AvatarImage 
              src="/api/placeholder/350/350" 
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
