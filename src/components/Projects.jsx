import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

// Helper function to get correct image path for GitHub Pages
const getImagePath = (path) => `${import.meta.env.BASE_URL}${path.startsWith('/') ? path.slice(1) : path}`;

const ProjectsSection = styled.section`
  padding: 5rem 0;
  background: ${({ theme }) => theme.colors.surface};

  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

const ProjectsContainer = styled.div`
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  box-shadow: 0 8px 25px ${({ theme }) => theme.colors.shadow};
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px ${({ theme }) => theme.colors.shadowMedium};
  }
`;

const ProjectImage = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const ProjectOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(102, 126, 234, 0.8) 0%,
    rgba(118, 75, 162, 0.8) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  ${ProjectCard}:hover & {
    opacity: 1;
  }
`;

const OverlayButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
  padding: 0.75rem;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.1);
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.heading};
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TechTag = styled.span`
  background: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 0.8rem;
  font-weight: 500;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const LinkButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  position: relative;
  padding: 2rem 2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.textLight};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ModalBody = styled.div`
  padding: 0 2rem 2rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem 1.5rem;
  }
`;

const ImageCarousel = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const CarouselContainer = styled.div`
  position: relative;
  height: 300px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  padding: 1rem;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: translateY(-50%) scale(1.1);
  }

  &.prev {
    left: 1rem;
  }

  &.next {
    right: 1rem;
  }
`;

const CarouselDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const CarouselDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.border};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef(null);

  const projectsData = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A comprehensive e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.",
      longDescription:
        "This full-stack e-commerce platform provides a complete online shopping experience. Built with modern technologies including React for the frontend, Node.js and Express for the backend, and MongoDB for data storage. The application features secure user authentication, a responsive product catalog with advanced filtering, a seamless shopping cart experience, and integrated payment processing with Stripe.",
      image: getImagePath("images/projects/ecommerce-1.svg"),
      images: [
        getImagePath("images/projects/ecommerce-1.svg"),
        getImagePath("images/projects/ecommerce-2.svg"),
        getImagePath("images/projects/ecommerce-3.svg")
      ],
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "Stripe",
        "Redux",
        "Express",
      ],
      github: "https://github.com/",
      demo: "https://ecommerce-demo.example.com",
      features: [
        "User registration and authentication",
        "Product catalog with search and filtering",
        "Shopping cart and checkout process",
        "Payment integration with Stripe",
        "Order tracking and history",
        "Admin dashboard for inventory management",
      ],
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, team collaboration features, and intuitive drag-and-drop functionality.",
      longDescription:
        "This modern task management application helps teams stay organized and productive. Built with React and Socket.io for real-time collaboration, it features an intuitive Kanban-style interface with drag-and-drop functionality, team workspaces, and comprehensive project tracking capabilities.",
      image: getImagePath("images/projects/ecommerce-1.svg"),
      images: [
        getImagePath("images/projects/ecommerce-1.svg"),
        getImagePath("images/projects/ecommerce-2.svg"),
        getImagePath("images/projects/ecommerce-3.svg")
      ],
      technologies: [
        "React",
        "Socket.io",
        "Node.js",
        "PostgreSQL",
        "JWT",
        "Material-UI",
      ],
      github: "https://github.com/",
      demo: "https://taskmanager-demo.example.com",
      features: [
        "Real-time collaboration",
        "Kanban board interface",
        "Team workspaces",
        "Project time tracking",
        "File attachments",
        "Notification system",
      ],
    },
    {
      id: 3,
      title: "Social Media Dashboard",
      description:
        "A comprehensive social media analytics dashboard that aggregates data from multiple platforms and provides insightful visualizations.",
      longDescription:
        "This powerful dashboard provides comprehensive analytics for social media managers and content creators. It integrates with multiple social media APIs to gather data and presents it through beautiful, interactive charts and graphs. The application helps users track engagement, analyze audience demographics, and optimize their social media strategy.",
      image: getImagePath("images/projects/ecommerce-1.svg"),
      images: [
        getImagePath("images/projects/ecommerce-1.svg"),
        getImagePath("images/projects/ecommerce-2.svg"),
        getImagePath("images/projects/ecommerce-3.svg")
      ],
      technologies: [
        "React",
        "D3.js",
        "Node.js",
        "MongoDB",
        "Chart.js",
        "REST APIs",
      ],
      github: "https://github.com/",
      demo: "https://dashboard-demo.example.com",
      features: [
        "Multi-platform integration",
        "Interactive data visualizations",
        "Audience analytics",
        "Engagement tracking",
        "Automated reporting",
        "Custom dashboard widgets",
      ],
    },
    {
      id: 4,
      title: "Real Estate Platform",
      description:
        "A modern real estate platform featuring property listings, virtual tours, mortgage calculators, and agent management systems.",
      longDescription:
        "This comprehensive real estate platform revolutionizes the property buying and selling experience. Built with React and integrated with mapping services, it offers virtual property tours, detailed neighborhood information, mortgage calculations, and a complete agent management system for real estate professionals.",
      image: getImagePath("images/projects/ecommerce-1.svg"),
      images: [
        getImagePath("images/projects/ecommerce-1.svg"),
        getImagePath("images/projects/ecommerce-2.svg"),
        getImagePath("images/projects/ecommerce-3.svg")
      ],
      technologies: [
        "React",
        "Google Maps API",
        "Node.js",
        "MySQL",
        "AWS S3",
        "Stripe",
      ],
      github: "https://github.com/",
      demo: "https://realestate-demo.example.com",
      features: [
        "Property search and filtering",
        "Virtual tour integration",
        "Mortgage calculators",
        "Agent profiles and reviews",
        "Neighborhood analytics",
        "Appointment scheduling",
      ],
    },
    {
      id: 5,
      title: "Learning Management System",
      description:
        "An interactive learning platform with course creation tools, progress tracking, and video conferencing capabilities for online education.",
      longDescription:
        "This comprehensive learning management system empowers educators to create engaging online courses and provides students with an intuitive learning experience. The platform includes video streaming, interactive quizzes, progress tracking, and integrated video conferencing for live sessions.",
      image: getImagePath("images/projects/ecommerce-1.svg"),
      images: [
        getImagePath("images/projects/ecommerce-1.svg"),
        getImagePath("images/projects/ecommerce-2.svg"),
        getImagePath("images/projects/ecommerce-3.svg")
      ],
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "WebRTC",
        "AWS",
        "Socket.io",
      ],
      github: "https://github.com/",
      demo: "https://lms-demo.example.com",
      features: [
        "Course creation and management",
        "Video streaming and playback",
        "Interactive quizzes and assignments",
        "Progress tracking and analytics",
        "Live video conferencing",
        "Student discussion forums",
      ],
    },
    {
      id: 6,
      title: "Weather Forecast App",
      description:
        "A beautiful weather application with location-based forecasts, interactive maps, and weather alerts for multiple cities worldwide.",
      longDescription:
        "This elegant weather application provides accurate forecasts and weather information for locations worldwide. Built with React and integrated with multiple weather APIs, it features interactive weather maps, severe weather alerts, and detailed meteorological data with beautiful visualizations.",
      image: getImagePath("images/projects/ecommerce-1.svg"),
      images: [
        getImagePath("images/projects/ecommerce-1.svg"),
        getImagePath("images/projects/ecommerce-2.svg"),
        getImagePath("images/projects/ecommerce-3.svg")
      ],
      technologies: [
        "React",
        "Weather APIs",
        "Mapbox",
        "Chart.js",
        "PWA",
        "Service Workers",
      ],
      github: "https://github.com/",
      demo: "https://weather-demo.example.com",
      features: [
        "Location-based weather data",
        "Interactive weather maps",
        "7-day detailed forecasts",
        "Severe weather alerts",
        "Offline functionality",
        "Multiple city tracking",
      ],
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

  const openModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
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
    <ProjectsSection id="projects" ref={sectionRef}>
      <ProjectsContainer>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <SectionTitle variants={itemVariants}>My Projects</SectionTitle>

          <ProjectsGrid>
            {projectsData.map((project) => (
              <ProjectCard
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                onClick={() => openModal(project)}
              >
                <ProjectImage>
                  <img src={project.image} alt={project.title} />
                  <ProjectOverlay>
                    <OverlayButton title="View Details">👁️</OverlayButton>
                    <OverlayButton
                      as="a"
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title="View Code"
                    >
                      <FiGithub />
                    </OverlayButton>
                    <OverlayButton
                      as="a"
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title="Live Demo"
                    >
                      <FiExternalLink />
                    </OverlayButton>
                  </ProjectOverlay>
                </ProjectImage>
                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <TechStack>
                    {project.technologies.slice(0, 3).map((tech) => (
                      <TechTag key={tech}>{tech}</TechTag>
                    ))}
                    {project.technologies.length > 3 && (
                      <TechTag>+{project.technologies.length - 3} more</TechTag>
                    )}
                  </TechStack>
                  <ProjectLinks>
                    <LinkButton
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiGithub /> Code
                    </LinkButton>
                    <LinkButton
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiExternalLink /> Demo
                    </LinkButton>
                  </ProjectLinks>
                </ProjectContent>
              </ProjectCard>
            ))}
          </ProjectsGrid>
        </motion.div>
      </ProjectsContainer>

      <AnimatePresence>
        {selectedProject && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader>
                <div>
                  <h2>{selectedProject.title}</h2>
                </div>
                <CloseButton onClick={closeModal}>
                  <FiX />
                </CloseButton>
              </ModalHeader>
              <ModalBody>
                <ImageCarousel>
                  <CarouselContainer>
                    <CarouselImage
                      src={selectedProject.images[currentImageIndex]}
                      alt={selectedProject.title}
                    />
                    {selectedProject.images.length > 1 && (
                      <>
                        <CarouselButton className="prev" onClick={prevImage}>
                          <FiChevronLeft />
                        </CarouselButton>
                        <CarouselButton className="next" onClick={nextImage}>
                          <FiChevronRight />
                        </CarouselButton>
                      </>
                    )}
                  </CarouselContainer>
                  {selectedProject.images.length > 1 && (
                    <CarouselDots>
                      {selectedProject.images.map((_, index) => (
                        <CarouselDot
                          key={index}
                          active={index === currentImageIndex}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </CarouselDots>
                  )}
                </ImageCarousel>

                <p style={{ marginBottom: "1.5rem", lineHeight: 1.6 }}>
                  {selectedProject.longDescription}
                </p>

                <div style={{ marginBottom: "1.5rem" }}>
                  <h4 style={{ marginBottom: "1rem" }}>Key Features:</h4>
                  <ul style={{ paddingLeft: "1.5rem" }}>
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} style={{ marginBottom: "0.5rem" }}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <h4 style={{ marginBottom: "1rem" }}>Technologies Used:</h4>
                  <TechStack>
                    {selectedProject.technologies.map((tech) => (
                      <TechTag key={tech}>{tech}</TechTag>
                    ))}
                  </TechStack>
                </div>

                <ProjectLinks>
                  <LinkButton
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiGithub /> View Code
                  </LinkButton>
                  <LinkButton
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiExternalLink /> Live Demo
                  </LinkButton>
                </ProjectLinks>
              </ModalBody>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </ProjectsSection>
  );
};

export default Projects;
