import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FiMail,
  FiCode,
  FiDatabase,
  FiGlobe,
  FiLayers,
} from "react-icons/fi";
import { FaReact, FaNodeJs, FaDocker, FaJava, FaPython } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiSolidity, SiPostgresql } from "react-icons/si";

const SkillsSection = styled.section`
  padding: 5rem 0;
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

const SkillsContainer = styled.div`
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

const SkillsContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const SkillsLeft = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SkillItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const SkillName = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
`;

const SkillIcon = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
`;

const SkillPercentage = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.9rem;
`;

const SkillBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const SkillBar = styled(motion.div)`
  height: 100%;
  background: ${({ theme }) => theme.colors.gradient};
  border-radius: 4px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 2px;
    background: rgba(255, 255, 255, 0.8);
    animation: shine 2s infinite ease-in-out;
  }

  @keyframes shine {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
  z-index: 10;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: ${({ theme }) => theme.colors.surface};
  }

  ${SkillBarContainer}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;

const SkillsRight = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SkillsDescription = styled.div`
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.heading};
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.textLight};
    margin-bottom: 1.5rem;
  }
`;

const ContactButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  padding: 1rem 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  align-self: flex-start;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadowMedium};

  &:hover {
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

const TechStack = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const TechItem = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.colors.shadowMedium};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  .icon {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 0.5rem;
  }

  .name {
    font-size: 0.9rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState(false);
  const sectionRef = useRef(null);

  const skills = [
    {
      name: "Frontend Development",
      icon: <FiCode />,
      percentage: 85,
      description: "React, Next.js, TypeScript, Tailwind CSS",
    },
    {
      name: "Backend Development",
      icon: <FiDatabase />,
      percentage: 80,
      description: "Node.js, Express, FastAPI, tRPC",
    },
    {
      name: "Blockchain Development",
      icon: <FiLayers />,
      percentage: 75,
      description: "Solidity, Hardhat, Ethers.js, Smart Contracts",
    },
    {
      name: "Database & DevOps",
      icon: <FiGlobe />,
      percentage: 70,
      description: "PostgreSQL, Docker, Drizzle ORM, Prisma",
    },
  ];

  const techStack = [
    { name: "React", icon: <FaReact /> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "Solidity", icon: <SiSolidity /> },
    { name: "Python", icon: <FaPython /> },
    { name: "Java", icon: <FaJava /> },
    { name: "Node.js", icon: <FaNodeJs /> },
    { name: "PostgreSQL", icon: <SiPostgresql /> },
    { name: "Docker", icon: <FaDocker /> },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setAnimatedSkills(true), 500);
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

  const handleContactClick = () => {
    window.location.href = "mailto:Abdullah.h.oun@gmail.com";
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
    <SkillsSection id="skills" ref={sectionRef}>
      <SkillsContainer>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <SectionTitle variants={itemVariants}>My Skills</SectionTitle>

          <SkillsContent>
            <SkillsLeft variants={itemVariants}>
              {skills.map((skill, index) => (
                <SkillItem
                  key={skill.name}
                  variants={itemVariants}
                  custom={index}
                >
                  <SkillHeader>
                    <SkillName>
                      <SkillIcon>{skill.icon}</SkillIcon>
                      {skill.name}
                    </SkillName>
                    <SkillPercentage>{skill.percentage}%</SkillPercentage>
                  </SkillHeader>
                  <SkillBarContainer>
                    <SkillBar
                      initial={{ width: 0 }}
                      animate={
                        animatedSkills
                          ? { width: `${skill.percentage}%` }
                          : { width: 0 }
                      }
                      transition={{
                        duration: 1.5,
                        delay: index * 0.2,
                        ease: "easeOut",
                      }}
                      whileHover={{
                        boxShadow: "0 0 20px rgba(102, 126, 234, 0.5)",
                      }}
                    />
                    <Tooltip>{skill.description}</Tooltip>
                  </SkillBarContainer>
                </SkillItem>
              ))}
            </SkillsLeft>

            <SkillsRight variants={itemVariants}>
              <SkillsDescription>
                <h3>Technical Expertise</h3>
                <p>
                  I work across the full stack — from building responsive
                  frontends with React and Next.js to crafting robust backends
                  with Node.js and FastAPI. I also have strong experience in
                  blockchain development using Solidity and Hardhat.
                </p>
                <p>
                  My toolkit includes TypeScript, PostgreSQL, Docker, and
                  multiple ORMs. I'm always learning and enjoy tackling
                  challenging technical problems.
                </p>
              </SkillsDescription>

              <ContactButton
                href="mailto:Abdullah.h.oun@gmail.com"
                onClick={handleContactClick}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <FiMail />
                Contact Me
              </ContactButton>

              <TechStack>
                {techStack.map((tech, index) => (
                  <TechItem
                    key={tech.name}
                    variants={itemVariants}
                    custom={index}
                    whileHover={{ y: -4 }}
                  >
                    <div className="icon">{tech.icon}</div>
                    <div className="name">{tech.name}</div>
                  </TechItem>
                ))}
              </TechStack>
            </SkillsRight>
          </SkillsContent>
        </motion.div>
      </SkillsContainer>
    </SkillsSection>
  );
};

export default Skills;
