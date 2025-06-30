import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiCalendar,
  FiMapPin,
  FiExternalLink,
} from "react-icons/fi";

const ExperienceSection = styled.section`
  padding: 5rem 0;
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

const ExperienceContainer = styled.div`
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
    content: "";
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
  background: ${({ theme }) => theme.colors.surface};
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
    content: "";
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
    border-left-color: ${({ theme }) => theme.colors.surface};
  }

  ${TimelineItem}:nth-child(even) &::before {
    left: -20px;
    border-right-color: ${({ theme }) => theme.colors.surface};
  }
`;

const JobTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.heading};
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Company = styled.h4`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CompanyLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
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

const JobType = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const Responsibilities = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;

  li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.textLight};
    font-size: 0.9rem;

    &::before {
      content: "▶";
      position: absolute;
      left: 0;
      color: ${({ theme }) => theme.colors.primary};
      font-size: 0.7rem;
    }
  }
`;

const Technologies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const TechTag = styled.span`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const experienceData = [
    {
      title: "Software Developer",
      company: "Startup X",
      companyUrl: "#",
      duration: "TBD",
      location: "TBD",
      type: "Full-time",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nibh nec metus facilisis faucibus egestas nec ipsum. Nunc varius pellentesque risus.",
      responsibilities: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      ],
      technologies: ["React", "JavaScript", "Node.js", "HTML5", "CSS"],
    },
    {
      title: "Software Developer",
      company: "Startup X",
      companyUrl: "#",
      duration: "TBD",
      location: "TBD",
      type: "Full-time",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nibh nec metus facilisis faucibus egestas nec ipsum. Nunc varius pellentesque risus.",
      responsibilities: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      ],
      technologies: ["React", "JavaScript", "Node.js", "HTML5", "CSS"],
    },
    {
      title: "Software Developer",
      company: "Startup X",
      companyUrl: "#",
      duration: "TBD",
      location: "TBD",
      type: "Full-time",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nibh nec metus facilisis faucibus egestas nec ipsum. Nunc varius pellentesque risus.",
      responsibilities: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      ],
      technologies: ["React", "JavaScript", "Node.js", "HTML5", "CSS"],
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <ExperienceSection id="experience" ref={sectionRef}>
      <ExperienceContainer>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <SectionTitle variants={itemVariants}>Work Experience</SectionTitle>

          <TimelineContainer>
            {experienceData.map((exp, index) => (
              <TimelineItem key={index} variants={itemVariants} custom={index}>
                <TimelineDot>
                  <span className="icon">
                    <FiBriefcase />
                  </span>
                </TimelineDot>
                <TimelineContent className="timeline-content">
                  <JobTitle>{exp.title}</JobTitle>
                  <Company>
                    <CompanyLink
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {exp.company}
                      <FiExternalLink size={14} />
                    </CompanyLink>
                  </Company>
                  <Duration>
                    <FiCalendar />
                    {exp.duration}
                  </Duration>
                  <Location>
                    <FiMapPin />
                    {exp.location}
                  </Location>
                  <JobType>{exp.type}</JobType>
                  <Description>{exp.description}</Description>
                  <Responsibilities>
                    {exp.responsibilities.map((responsibility, idx) => (
                      <li key={idx}>{responsibility}</li>
                    ))}
                  </Responsibilities>
                  <Technologies>
                    {exp.technologies.map((tech, idx) => (
                      <TechTag key={idx}>{tech}</TechTag>
                    ))}
                  </Technologies>
                </TimelineContent>
              </TimelineItem>
            ))}
          </TimelineContainer>
        </motion.div>
      </ExperienceContainer>
    </ExperienceSection>
  );
};

export default Experience;
