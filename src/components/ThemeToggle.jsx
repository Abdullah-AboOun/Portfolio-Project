import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';

const ToggleContainer = styled(motion.div)`
  position: fixed;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  z-index: 1001;
  
  @media (max-width: 768px) {
    right: 1rem;
  }
`;

const ToggleButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px ${({ theme }) => theme.colors.shadowMedium};
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const IconContainer = styled(motion.div)`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const ThemeToggle = ({ toggleTheme, darkMode }) => {
  return (
    <ToggleContainer
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <ToggleButton
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        <IconContainer
          key={darkMode ? 'moon' : 'sun'}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {darkMode ? <FiMoon /> : <FiSun />}
        </IconContainer>
      </ToggleButton>
    </ToggleContainer>
  );
};

export default ThemeToggle;
