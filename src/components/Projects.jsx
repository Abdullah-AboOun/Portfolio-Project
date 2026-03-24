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
const getImagePath = (path) =>
  `${import.meta.env.BASE_URL}${path.startsWith("/") ? path.slice(1) : path}`;

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
      title: "CertifyChain",
      description:
        "A decentralized certificate issuance and verification platform built with Next.js, Ethereum smart contracts, and tRPC.",
      longDescription:
        "CertifyChain is a decentralized certificate management platform built on blockchain technology. It allows organizations to issue, store, and verify tamper-proof digital certificates — eliminating fraud and enabling instant, trustless verification. Features Web3 authentication via MetaMask, on-chain certificate issuance, public verification, and a revocation system.",
      image: getImagePath("images/projects/ecommerce-1.svg"),
      images: [
        getImagePath("images/projects/ecommerce-1.svg"),
      ],
      technologies: [
        "Next.js",
        "TypeScript",
        "Solidity",
        "tRPC",
        "Prisma",
        "Tailwind CSS",
        "Hardhat",
        "Ethers.js",
      ],
      github: "https://github.com/Abdullah-AboOun/CertifyChain",
      demo: null,
      features: [
        "Web3 authentication with MetaMask wallet",
        "Certificate issuance on the Ethereum blockchain",
        "Public tamper-proof certificate verification",
        "Entity management with admin approval workflow",
        "On-chain certificate revocation system",
        "Responsive dark/light mode UI",
      ],
    },
    {
      id: 2,
      title: "Paste-Bin (Reading List Dashboard)",
      description:
        "A modern full-stack web app for managing your reading list. Save articles, track reading progress, and organize content — with Docker support.",
      longDescription:
        "A full-stack reading list dashboard built with Next.js 15 and TypeScript. Users can save articles with titles and URLs, mark them as read/unread, and toggle dark mode. The app uses tRPC for type-safe APIs, Drizzle ORM with PostgreSQL, and is fully containerized with Docker Compose for easy deployment.",
      image: getImagePath("images/projects/ecommerce-2.svg"),
      images: [
        getImagePath("images/projects/ecommerce-2.svg"),
      ],
      technologies: [
        "Next.js",
        "TypeScript",
        "tRPC",
        "PostgreSQL",
        "Drizzle ORM",
        "Docker",
        "Tailwind CSS",
        "Bun",
      ],
      github: "https://github.com/Abdullah-AboOun/Paste-Bin",
      demo: "http://157.245.239.229:3000/",
      features: [
        "Save articles with titles and URLs",
        "Mark articles as read/unread",
        "Dark/light mode toggle",
        "Real-time UI updates via tRPC",
        "Full Docker Compose containerization",
        "Built-in health monitoring endpoint",
      ],
    },
    {
      id: 3,
      title: "BlockChainFinalProject",
      description:
        "A decentralized certificate registry with a separate Express backend, Next.js frontend, and Solidity smart contracts — featuring JWT authentication.",
      longDescription:
        "A full-stack blockchain application for issuing and verifying digital certificates. Consists of a Solidity smart contract (Hardhat), a Node.js/Express REST API with JWT authentication, and a Next.js 15 frontend. Supports entity registration, certificate minting on-chain, tamper-proof verification by hash, and document storage via IPFS hashes.",
      image: getImagePath("images/projects/ecommerce-3.svg"),
      images: [
        getImagePath("images/projects/ecommerce-3.svg"),
      ],
      technologies: [
        "Node.js",
        "Express",
        "TypeScript",
        "Next.js",
        "Solidity",
        "Hardhat",
        "Ethers.js",
        "JWT",
      ],
      github: "https://github.com/Abdullah-AboOun/BlockChainFinalProject",
      demo: null,
      features: [
        "JWT-based REST API authentication",
        "On-chain certificate issuance with metadata",
        "Tamper-proof verification by certificate hash",
        "Entity/organization registration workflow",
        "IPFS document hash attachment support",
        "Admin approval system for issuers",
      ],
    },
    {
      id: 4,
      title: "Library Management System",
      description:
        "A Java-based library management system for managing books, members, and borrowing records.",
      longDescription:
        "A desktop library management application built in Java. The system allows librarians to manage book inventory, register members, and track borrowing and return records. Implements core object-oriented design patterns and provides a clean interface for day-to-day library operations.",
      image: getImagePath("images/projects/ecommerce-1.svg"),
      images: [
        getImagePath("images/projects/ecommerce-1.svg"),
      ],
      technologies: [
        "Java",
      ],
      github: "https://github.com/Abdullah-AboOun/Library-Management-System",
      demo: null,
      features: [
        "Book inventory management (add, update, delete)",
        "Member registration and management",
        "Borrowing and return record tracking",
        "Search books by title, author, or ISBN",
        "Overdue tracking for borrowed books",
        "Object-oriented design with clean architecture",
      ],
    },
    {
      id: 5,
      title: "Block-Chain (C#)",
      description:
        "A blockchain implementation from scratch in C#, demonstrating core blockchain concepts including proof-of-work and chain validation.",
      longDescription:
        "A ground-up blockchain implementation in C# that demonstrates the fundamental concepts behind blockchain technology. Implements block creation, SHA-256 hashing, proof-of-work mining, chain integrity validation, and a simple transaction model. A great educational project for understanding how blockchains work at the core level.",
      image: getImagePath("images/projects/ecommerce-2.svg"),
      images: [
        getImagePath("images/projects/ecommerce-2.svg"),
      ],
      technologies: [
        "C#",
        ".NET",
      ],
      github: "https://github.com/Abdullah-AboOun/Block-Chain",
      demo: null,
      features: [
        "Block creation with SHA-256 hashing",
        "Proof-of-work consensus mechanism",
        "Chain integrity validation",
        "Simple transaction model",
        "Genesis block initialization",
        "Educational implementation of blockchain fundamentals",
      ],
    },
    {
      id: 6,
      title: "FastAPI Project",
      description:
        "A RESTful API backend built with Python and FastAPI, showcasing modern async API development practices.",
      longDescription:
        "A backend REST API project built with Python and FastAPI. Demonstrates modern Python API development including async endpoints, request validation with Pydantic, automatic OpenAPI documentation generation, and clean project structure. Ideal for learning how to build fast, production-ready Python APIs.",
      image: getImagePath("images/projects/ecommerce-3.svg"),
      images: [
        getImagePath("images/projects/ecommerce-3.svg"),
      ],
      technologies: [
        "Python",
        "FastAPI",
        "Pydantic",
      ],
      github: "https://github.com/Abdullah-AboOun/fastapi_project",
      demo: null,
      features: [
        "Async RESTful API endpoints",
        "Request/response validation with Pydantic",
        "Auto-generated OpenAPI (Swagger) documentation",
        "Clean project structure and routing",
        "Modern Python type hints throughout",
        "CORS and middleware configuration",
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
                    {project.demo && (
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
                    )}
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
                    {project.demo && (
                      <LinkButton
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FiExternalLink /> Demo
                      </LinkButton>
                    )}
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
                  {selectedProject.demo && (
                    <LinkButton
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiExternalLink /> Live Demo
                    </LinkButton>
                  )}
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
