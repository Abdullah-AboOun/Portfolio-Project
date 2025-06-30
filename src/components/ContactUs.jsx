import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMail, FiUser, FiMessageSquare, FiSend, FiMapPin, FiPhone, FiLinkedin, FiGithub } from 'react-icons/fi';

const ContactSection = styled.section`
  padding: 5rem 0;
  background: ${({ theme }) => theme.colors.surface};

  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

const ContactContainer = styled.div`
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

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InfoTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.heading};
  margin-bottom: 1rem;
`;

const InfoDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 2rem;
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContactDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(8px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
  }

  .icon {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.primary};
    min-width: 24px;
  }

  .content {
    flex: 1;

    h4 {
      font-size: 1rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.heading};
      margin-bottom: 0.25rem;
    }

    p {
      font-size: 0.9rem;
      color: ${({ theme }) => theme.colors.textLight};
      margin: 0;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  border-radius: 50%;
  font-size: 1.2rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadowMedium};

  &:hover {
    transform: translateY(-4px) scale(1.1);
    box-shadow: 0 8px 25px ${({ theme }) => theme.colors.shadowLarge};
  }
`;

const ContactForm = styled(motion.form)`
  background: ${({ theme }) => theme.colors.background};
  padding: 2.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: 0 15px 35px ${({ theme }) => theme.colors.shadow};
  border: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1.1rem;
  z-index: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid ${({ theme, error }) => error ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
    transform: translateY(-2px);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid ${({ theme, error }) => error ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
    transform: translateY(-2px);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.8rem;
  margin-top: 0.5rem;
  display: block;
  animation: shake 0.3s ease-in-out;

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;

const CharacterCounter = styled.div`
  text-align: right;
  font-size: 0.8rem;
  color: ${({ theme, isNearLimit }) => isNearLimit ? theme.colors.warning : theme.colors.textLight};
  margin-top: 0.25rem;
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadowMedium};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.colors.shadowLarge};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: ${({ theme }) => theme.colors.success}20;
  color: ${({ theme }) => theme.colors.success};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid ${({ theme }) => theme.colors.success};
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 500;
`;

const DraftSavedIndicator = styled.div`
  position: absolute;
  top: -0.5rem;
  right: 0;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 0.7rem;
  opacity: ${({ show }) => show ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const ContactUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showDraftSaved, setShowDraftSaved] = useState(false);
  
  const sectionRef = useRef(null);
  const maxMessageLength = 500;

  useEffect(() => {
    const savedDraft = localStorage.getItem('contactFormDraft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.length > maxMessageLength) {
      newErrors.message = `Message must be less than ${maxMessageLength} characters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }

    localStorage.setItem('contactFormDraft', JSON.stringify(newFormData));
    
    setShowDraftSaved(true);
    setTimeout(() => setShowDraftSaved(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setFormData({ name: '', email: '', message: '' });
      localStorage.removeItem('contactFormDraft');
      setIsSubmitted(true);
      
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <ContactSection id="contact" ref={sectionRef}>
      <ContactContainer>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <SectionTitle variants={itemVariants}>
            Get In Touch
          </SectionTitle>

          <ContactContent>
            <ContactInfo variants={itemVariants}>
              <div>
                <InfoTitle>Let's work together!</InfoTitle>
                <InfoDescription>
                  I'm always excited to work on new projects and collaborate with 
                  amazing people. Whether you have a project in mind or just want 
                  to chat about web development, feel free to reach out.
                </InfoDescription>
              </div>

              <ContactDetails>
                <ContactDetail>
                  <div className="icon">
                    <FiMail />
                  </div>
                  <div className="content">
                    <h4>Email</h4>
                    <p>Abdullah.h.oun@gmail.com</p>
                  </div>
                </ContactDetail>

                <ContactDetail>
                  <div className="icon">
                    <FiPhone />
                  </div>
                  <div className="content">
                    <h4>Phone</h4>
                    <p>+1 234 5678</p>
                  </div>
                </ContactDetail>

                <ContactDetail>
                  <div className="icon">
                    <FiMapPin />
                  </div>
                  <div className="content">
                    <h4>Location</h4>
                    <p>San Francisco, CA</p>
                  </div>
                </ContactDetail>
              </ContactDetails>

              <div>
                <h4 style={{ marginBottom: '1rem', color: '#666' }}>Follow me on</h4>
                <SocialLinks>
                  <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <FiLinkedin />
                  </SocialLink>
                  <SocialLink href="https://github.com/Abdullah-AboOun" target="_blank" rel="noopener noreferrer">
                    <FiGithub />
                  </SocialLink>
                  <SocialLink href="Abdullah.h.oun@gmail.com">
                    <FiMail />
                  </SocialLink>
                </SocialLinks>
              </div>
            </ContactInfo>

            <ContactForm variants={itemVariants} onSubmit={handleSubmit}>
              <DraftSavedIndicator show={showDraftSaved}>
                Draft saved
              </DraftSavedIndicator>

              {isSubmitted && (
                <SuccessMessage
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  Thank you! Your message has been sent successfully. I'll get back to you soon.
                </SuccessMessage>
              )}

              <FormGroup>
                <Label htmlFor="name">Name *</Label>
                <InputContainer>
                  <InputIcon>
                    <FiUser />
                  </InputIcon>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    error={errors.name}
                  />
                </InputContainer>
                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email *</Label>
                <InputContainer>
                  <InputIcon>
                    <FiMail />
                  </InputIcon>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    error={errors.email}
                  />
                </InputContainer>
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="message">Message *</Label>
                <InputContainer>
                  <InputIcon>
                    <FiMessageSquare />
                  </InputIcon>
                  <TextArea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project or just say hello..."
                    error={errors.message}
                  />
                </InputContainer>
                <CharacterCounter isNearLimit={formData.message.length > maxMessageLength * 0.8}>
                  {formData.message.length}/{maxMessageLength}
                </CharacterCounter>
                {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
              </FormGroup>

              <SubmitButton
                type="submit"
                disabled={isSubmitting}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      ⟳
                    </motion.div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend />
                    Send Message
                  </>
                )}
              </SubmitButton>
            </ContactForm>
          </ContactContent>
        </motion.div>
      </ContactContainer>
    </ContactSection>
  );
};

export default ContactUs;
