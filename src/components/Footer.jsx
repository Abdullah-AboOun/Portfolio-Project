import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiHeart, FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUp } from 'react-icons/fi';

const FooterSection = styled.footer`
  background: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 3rem 0 1rem;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const FooterSection1 = styled.div`
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.heading};
    margin-bottom: 1rem;
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    color: ${({ theme }) => theme.colors.textLight};
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textLight};
  border-radius: 50%;
  font-size: 1.1rem;
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.gradient};
    color: white;
    transform: translateY(-4px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.colors.shadowMedium};
  }
`;

const QuickLinks = styled.div`
  h4 {
    font-size: 1.2rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.heading};
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: ${({ theme }) => theme.colors.textLight};
    text-decoration: none;
    transition: color 0.3s ease;
    display: inline-block;
    position: relative;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      transform: translateX(4px);
    }

    &::before {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 1px;
      background: ${({ theme }) => theme.colors.primary};
      transition: width 0.3s ease;
    }

    &:hover::before {
      width: 100%;
    }
  }
`;

const ContactInfo = styled.div`
  h4 {
    font-size: 1.2rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.heading};
    margin-bottom: 1rem;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.textLight};

  @media (max-width: 768px) {
    justify-content: center;
  }

  .icon {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.primary};
    min-width: 16px;
  }

  span {
    font-size: 0.9rem;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .heart {
    color: #ff6b6b;
    animation: beat 1.5s ease-in-out infinite;
  }

  @keyframes beat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

const BackToTopButton = styled(motion.button)`
  background: ${({ theme }) => theme.colors.gradient};
  border: none;
  color: white;
  padding: 0.75rem;
  border-radius: 50%;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadowMedium};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${({ theme }) => theme.colors.shadowLarge};
  }

  @media (max-width: 768px) {
    order: -1;
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: <FiGithub />, href: 'https://github.com/Abdullah-AboOun', label: 'GitHub' },
    { icon: <FiLinkedin />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FiTwitter />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <FiMail />, href: 'mailto:abdullah.h.oun@gmail.com', label: 'Email' }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <FooterSection>
      <FooterContainer>
        <FooterContent>
          <FooterSection1>
            <h3>Abdullah</h3>
            <p>
              Full Stack Developer passionate about creating amazing web experiences. 
              Let's build something incredible together!
            </p>
            <SocialLinks>
              {socialLinks.map((social, index) => (
                <SocialLink
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -4 }}
                  whileTap={{ y: 0 }}
                >
                  {social.icon}
                </SocialLink>
              ))}
            </SocialLinks>
          </FooterSection1>

          <QuickLinks>
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href.substring(1));
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </QuickLinks>

          <ContactInfo>
            <h4>Contact Info</h4>
            <ContactItem>
              <span className="icon">
                <FiMail />
              </span>
              <span>abdullah.h.oun@gmail.com</span>
            </ContactItem>
            <ContactItem>
              <span className="icon">
                <FiGithub />
              </span>
              <span>https://github.com/Abdullah-AboOun</span>
            </ContactItem>
            <ContactItem>
              <span className="icon">
                <FiLinkedin />
              </span>
              <span>linkedin.com</span>
            </ContactItem>
          </ContactInfo>
        </FooterContent>

        <FooterBottom>
          <Copyright>
            © {currentYear} Abdullah. Made with{' '}
            <FiHeart className="heart" />
            using React & Styled Components
          </Copyright>
          
          <BackToTopButton
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            aria-label="Back to top"
          >
            <FiArrowUp />
          </BackToTopButton>
        </FooterBottom>
      </FooterContainer>
    </FooterSection>
  );
};

export default Footer;
