import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiDownload, FiUser, FiMail, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const AboutSection = styled.section`
  padding: 5rem 0;
  background: ${({ theme }) => theme.colors.surface};

  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const TextContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const AboutText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 1.5rem;

  &.expanded {
    display: block;
  }

  &.collapsed {
    display: ${({ isExpanded }) => (isExpanded ? "block" : "none")};
  }
`;

const ReadMoreButton = styled.button`
  background: none;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  margin-bottom: 2rem;
  align-self: flex-start;
  padding: 0.5rem 0;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }

  @media (max-width: 768px) {
    align-self: center;
  }
`;

const DownloadButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme, downloadState }) => {
    switch(downloadState) {
      case 'downloading': return theme.colors.textLight;
      case 'success': return '#10b981';
      case 'error': return '#ef4444';
      default: return theme.colors.gradient;
    }
  }};
  color: white;
  padding: 1rem 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  align-self: flex-start;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadowMedium};
  cursor: ${({ downloadState }) => downloadState === 'downloading' ? 'not-allowed' : 'pointer'};
  opacity: ${({ downloadState }) => downloadState === 'downloading' ? 0.7 : 1};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${({ theme }) => theme.colors.shadowLarge};
    color: white;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    align-self: center;
  }
`;

const ImageContent = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AboutImage = styled(motion.div)`
  width: 400px;
  height: 400px;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  box-shadow: 0 20px 40px ${({ theme }) => theme.colors.shadowMedium};
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.gradient};
    opacity: 0.1;
    z-index: 1;
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

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const StatsContainer = styled(motion.div)`
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
  justify-content: flex-start;

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const StatItem = styled.div`
  text-align: center;

  h3 {
    font-size: 2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${({ theme }) => theme.colors.textLight};
    font-size: 0.9rem;
    margin: 0;
  }
`;

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [downloadState, setDownloadState] = useState('idle'); // 'idle', 'downloading', 'success', 'error'
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const checkFileExists = async (url) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  };

  const handleDownload = async () => {
    setDownloadState('downloading');
    
    const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;
    
    // Check if file exists
    const fileExists = await checkFileExists(resumeUrl);
    
    if (!fileExists) {
      setDownloadState('error');
      setTimeout(() => setDownloadState('idle'), 3000);
      return;
    }
    
    try {
      const link = document.createElement("a");
      link.href = resumeUrl;
      link.download = "Abdullah_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setDownloadState('success');
      setTimeout(() => setDownloadState('idle'), 2000);
    } catch {
      setDownloadState('error');
      setTimeout(() => setDownloadState('idle'), 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <AboutSection id="about" ref={sectionRef}>
      <AboutContainer>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <SectionTitle variants={itemVariants}>About Me</SectionTitle>

          <AboutContent>
            <TextContent variants={itemVariants}>
              <AboutText className="expanded">
                Hi! I'm Abdullah, a passionate Full Stack Developer with over 5
                years of experience creating exceptional digital experiences. I
                specialize in React, Node.js, and modern web technologies.
              </AboutText>

              <AboutText
                className={isExpanded ? "expanded" : "collapsed"}
                isExpanded={isExpanded}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
                nibh nec metus facilisis faucibus egestas nec ipsum. Nunc varius
                pellentesque risus.{" "}
              </AboutText>

              <AboutText
                className={isExpanded ? "expanded" : "collapsed"}
                isExpanded={isExpanded}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </AboutText>

              <ReadMoreButton onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? "Read Less" : "Read More"}
              </ReadMoreButton>

              <StatsContainer variants={itemVariants}>
                <StatItem>
                  <h3>50+</h3>
                  <p>Projects Completed</p>
                </StatItem>
                <StatItem>
                  <h3>5+</h3>
                  <p>Years Experience</p>
                </StatItem>
                <StatItem>
                  <h3>20+</h3>
                  <p>Happy Clients</p>
                </StatItem>
              </StatsContainer>

              <DownloadButton
                href="#"
                onClick={handleDownload}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                disabled={downloadState === 'downloading'}
                downloadState={downloadState}
              >
                {downloadState === 'idle' && <FiDownload />}
                {downloadState === 'downloading' && <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><FiDownload /></motion.div>}
                {downloadState === 'success' && <FiCheckCircle />}
                {downloadState === 'error' && <FiAlertCircle />}
                
                {downloadState === 'idle' && 'Download Resume'}
                {downloadState === 'downloading' && 'Downloading...'}
                {downloadState === 'success' && 'Downloaded!'}
                {downloadState === 'error' && 'File not found'}
              </DownloadButton>
            </TextContent>

            <ImageContent variants={itemVariants}>
              <AboutImage
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Image src={`${import.meta.env.BASE_URL}images/profile/avatar.svg`} alt="About Me" />
              </AboutImage>
            </ImageContent>
          </AboutContent>
        </motion.div>
      </AboutContainer>
    </AboutSection>
  );
};

export default About;
