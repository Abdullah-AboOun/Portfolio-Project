import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const NavbarContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${({ scrolled, theme }) =>
    scrolled ? `${theme.colors.background}f5` : "rgba(255, 255, 255, 0.05)"};
  backdrop-filter: ${({ scrolled }) => (scrolled ? "blur(20px)" : "blur(5px)")};
  border-bottom: ${({ scrolled, theme }) =>
    scrolled ? `1px solid ${theme.colors.border}50` : "1px solid transparent"};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: background-color, transform;
  transform: translateY(${({ visible }) => (visible ? "0" : "-100%")});
`;

const ScrollProgress = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: ${({ theme }) => theme.colors.gradient};
  width: 100%;
  transform-origin: left;
  transform: scaleX(${({ progress }) => progress / 100});
  transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.colors.background}f8;
    backdrop-filter: blur(20px);
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border}50;
    box-shadow: 0 8px 32px ${({ theme }) => theme.colors.shadow};
    z-index: 999;
    border-radius: 0 0 1rem 1rem;
  }
`;

const NavLink = styled(motion.a)`
  color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.text};
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: color 0.3s ease;
  position: relative;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 50%;
    width: 80%;
    height: 2px;
    background: ${({ theme }) => theme.colors.gradient};
    transform: translateX(-50%) scaleX(${({ active }) => (active ? "1" : "0")});
    transform-origin: center;
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border-radius: 1px;
    will-change: transform;
  }

  &:hover::after {
    transform: translateX(-50%) scaleX(1);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navVisible, setNavVisible] = useState(true);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Testimonials", href: "#customers" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    let ticking = false;
    let lastProgress = 0;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Hide/show navbar based on scroll direction
          if (currentScrollY > 100) {
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
              // Scrolling down
              setNavVisible(false);
            } else if (currentScrollY < lastScrollY) {
              // Scrolling up
              setNavVisible(true);
            }
          } else {
            // Always show navbar at top
            setNavVisible(true);
          }

          setLastScrollY(currentScrollY);

          const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          const progress = Math.min((currentScrollY / totalHeight) * 100, 100);

          // Only update if progress changed by more than 0.1% to reduce jitter
          if (Math.abs(progress - lastProgress) > 0.1) {
            setScrollProgress(progress);
            lastProgress = progress;
          }

          setScrolled(currentScrollY > 50);

          const sections = [
            "home",
            "about",
            "skills",
            "education",
            "experience",
            "projects",
            "customers",
            "contact",
          ];
          let currentSection = "home";

          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              if (rect.top <= 120 && rect.bottom >= 120) {
                currentSection = section;
              }
            }
          }
          setActiveSection(currentSection);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <NavbarContainer
      scrolled={scrolled}
      visible={navVisible}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ScrollProgress progress={scrollProgress} />
      <NavContent>
        <Logo
          onClick={scrollToTop}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Portfolio
        </Logo>

        <NavLinks isOpen={isOpen}>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              active={activeSection === item.href.substring(1)}
              onClick={() => scrollToSection(item.href)}
              whileTap={{ y: 0 }}
            >
              {item.name}
            </NavLink>
          ))}
        </NavLinks>

        <MobileMenuButton onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✕" : "☰"}
        </MobileMenuButton>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar;
