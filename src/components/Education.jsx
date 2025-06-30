import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiAward, FiCalendar, FiMapPin } from 'react-icons/fi';

const EducationSection = styled.section`
  padding: 5rem 0;
  background: ${({ theme }) => theme.colors.surface};

  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

const EducationContainer = styled.div`
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

const TimelineContainer = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 100%;
    background: ${({ theme }) => theme.colors.gradient};
    border-radius: 2px;

    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    margin-left: 60px;
    align-items: flex-start;
  }

  &:nth-child(odd) {
    justify-content: flex-end;
    text-align: right;

    @media (max-width: 768px) {
      justify-content: flex-start;
      text-align: left;
    }

    .timeline-content {
      margin-right: 3rem;

      @media (max-width: 768px) {
        margin-right: 0;
      }
    }
  }

  &:nth-child(even) {
    justify-content: flex-start;
    text-align: left;

    @media (max-width: 768px) {
      justify-content: flex-start;
      text-align: left;
    }

    .timeline-content {
      margin-left: 3rem;

      @media (max-width: 768px) {
        margin-left: 0;
      }
    }
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  background: ${({ theme }) => theme.colors.gradient};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadowMedium};

  @media (max-width: 768px) {
    left: 20px;
    width: 40px;
    height: 40px;
  }

  .icon {
    color: white;
    font-size: 1.5rem;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const TimelineContent = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: 0 8px 25px ${({ theme }) => theme.colors.shadow};
  max-width: 400px;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 35px ${({ theme }) => theme.colors.shadowMedium};
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border: 10px solid transparent;

    @media (max-width: 768px) {
      display: none;
    }
  }

  ${TimelineItem}:nth-child(odd) &::before {
    right: -20px;
    border-left-color: ${({ theme }) => theme.colors.background};
  }

  ${TimelineItem}:nth-child(even) &::before {
    left: -20px;
    border-right-color: ${({ theme }) => theme.colors.background};
  }
`;

const DegreeTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.heading};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Institution = styled.h4`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  margin-bottom: 1rem;
`;

const Duration = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const Achievements = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.textLight};
    font-size: 0.9rem;

    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: ${({ theme }) => theme.colors.primary};
      font-weight: bold;
    }
  }
`;

const Education = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const educationData = [
    {
      degree: "Bachelor of Computer Science",
      institution: "Islamic University of Gaza",
      duration: "2022 - 2026",
      location: "Palestine, Gaza",
      description: "Comprehensive study of computer science fundamentals including algorithms, data structures, software development, and modern web technologies.",
      achievements: [
        "Graduated at the top of my class",
        "Specialized in full-stack web development",
        "Strong foundation in software engineering principles"
      ],
      icon: <FiAward />
    },
    {
      degree: "Bachelor of Computer Science",
      institution: "Islamic University of Gaza",
      duration: "2022 - 2026",
      location: "Palestine, Gaza",
      description: "Comprehensive study of computer science fundamentals including algorithms, data structures, software development, and modern web technologies.",
      achievements: [
        "Graduated at the top of my class",
        "Specialized in full-stack web development",
        "Strong foundation in software engineering principles"
      ],
      icon: <FiAward />
    },
    {
      degree: "Bachelor of Computer Science",
      institution: "Islamic University of Gaza",
      duration: "2022 - 2026",
      location: "Palestine, Gaza",
      description: "Comprehensive study of computer science fundamentals including algorithms, data structures, software development, and modern web technologies.",
      achievements: [
        "Graduated at the top of my class",
        "Specialized in full-stack web development",
        "Strong foundation in software engineering principles"
      ],
      icon: <FiAward />
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <EducationSection id="education" ref={sectionRef}>
      <EducationContainer>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <SectionTitle variants={itemVariants}>
            Education
          </SectionTitle>

          <TimelineContainer>
            {educationData.map((edu, index) => (
              <TimelineItem
                key={index}
                variants={itemVariants}
                custom={index}
              >
                <TimelineDot>
                  <span className="icon">{edu.icon}</span>
                </TimelineDot>
                <TimelineContent className="timeline-content">
                  <DegreeTitle>
                    {edu.degree}
                  </DegreeTitle>
                  <Institution>{edu.institution}</Institution>
                  <Duration>
                    <FiCalendar />
                    {edu.duration}
                  </Duration>
                  <Location>
                    <FiMapPin />
                    {edu.location}
                  </Location>
                  <Description>{edu.description}</Description>
                  <Achievements>
                    {edu.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </Achievements>
                </TimelineContent>
              </TimelineItem>
            ))}
          </TimelineContainer>
        </motion.div>
      </EducationContainer>
    </EducationSection>
  );
};

export default Education;
