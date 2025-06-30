import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';

const CustomersSection = styled.section`
  padding: 5rem 0;
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

const CustomersContainer = styled.div`
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

const CarouselContainer = styled.div`
  position: relative;
  max-width: 900px;
  margin: 0 auto;
`;

const TestimonialsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const TestimonialCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: 0 8px 25px ${({ theme }) => theme.colors.shadow};
  border: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px ${({ theme }) => theme.colors.shadowMedium};
  }

  &::before {
    content: '"';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 4rem;
    color: ${({ theme }) => theme.colors.primary};
    font-family: serif;
    line-height: 1;
  }
`;

const CustomerImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 1.5rem;
  border: 4px solid ${({ theme }) => theme.colors.primary};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadowMedium};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TestimonialText = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 1.5rem;
  font-style: italic;
`;

const CustomerName = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.heading};
  margin-bottom: 0.5rem;
`;

const CustomerTitle = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 1rem;
`;

const StarRating = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 1rem;
`;

const Star = styled(FiStar)`
  color: ${({ filled, theme }) => filled ? '#ffd700' : theme.colors.border};
  font-size: 1.2rem;
  fill: ${({ filled }) => filled ? '#ffd700' : 'none'};
`;

const CarouselControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const CarouselButton = styled.button`
  background: ${({ theme }) => theme.colors.gradient};
  border: none;
  color: white;
  padding: 1rem;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadowMedium};

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px ${({ theme }) => theme.colors.shadowLarge};
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const CarouselDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const CarouselDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.border};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const PageIndicator = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
  margin: 0 1rem;
`;

const Customers = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const sectionRef = useRef(null);

  const testimonialsData = [
    {
      id: 1,
      name: "Sarah Abdullahson",
      title: "CEO, TechStart Inc.",
      image: "/api/placeholder/80/80",
      rating: 5,
      testimonial: "Abdullah delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise made the entire process smooth and enjoyable. The final product was exactly what we envisioned."
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Product Manager, DigitalCorp",
      image: "/api/placeholder/80/80",
      rating: 5,
      testimonial: "Working with Abdullah was a fantastic experience. He understood our requirements perfectly and delivered a robust task management application. His communication skills and professionalism are top-notch."
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "Marketing Director, CreativeHub",
      image: "/api/placeholder/80/80",
      rating: 5,
      testimonial: "Abdullah's portfolio website design is absolutely stunning. He created a perfect blend of aesthetics and functionality. The website has significantly improved our online presence and client engagement."
    },
    {
      id: 4,
      name: "David Thompson",
      title: "Founder, StartupLab",
      image: "/api/placeholder/80/80",
      rating: 5,
      testimonial: "The chat application Abdullah developed for us is incredible. Real-time messaging works flawlessly, and the user interface is intuitive. He delivered on time and within budget."
    },
    {
      id: 5,
      name: "Lisa Wang",
      title: "Operations Manager, FitnessPro",
      image: "/api/placeholder/80/80",
      rating: 4,
      testimonial: "Abdullah created an amazing fitness tracking app for our gym. The features are comprehensive, and our members love using it. His technical skills and creativity are impressive."
    },
    {
      id: 6,
      name: "Robert Brown",
      title: "CTO, WeatherTech",
      image: "/api/placeholder/80/80",
      rating: 5,
      testimonial: "The weather dashboard Abdullah built is exactly what we needed. The data visualization and user experience are outstanding. He's a true professional who delivers quality work."
    }
  ];

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const totalPages = Math.ceil(testimonialsData.length / itemsPerPage);
  const currentTestimonials = testimonialsData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} filled={index < rating} />
    ));
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
    <CustomersSection id="customers" ref={sectionRef}>
      <CustomersContainer>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <SectionTitle variants={itemVariants}>
            What Clients Say
          </SectionTitle>

          <CarouselContainer>
            <TestimonialsGrid
              key={currentPage}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {currentTestimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                >
                  <CustomerImage>
                    <img src={testimonial.image} alt={testimonial.name} />
                  </CustomerImage>
                  <TestimonialText>
                    {testimonial.testimonial}
                  </TestimonialText>
                  <CustomerName>{testimonial.name}</CustomerName>
                  <CustomerTitle>{testimonial.title}</CustomerTitle>
                  <StarRating>
                    {renderStars(testimonial.rating)}
                  </StarRating>
                </TestimonialCard>
              ))}
            </TestimonialsGrid>

            {totalPages > 1 && (
              <CarouselControls>
                <CarouselButton onClick={prevPage} disabled={currentPage === 0}>
                  <FiChevronLeft />
                </CarouselButton>
                
                <CarouselDots>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <CarouselDot
                      key={index}
                      active={index === currentPage}
                      onClick={() => goToPage(index)}
                    />
                  ))}
                </CarouselDots>
                
                <PageIndicator>
                  {currentPage + 1} of {totalPages}
                </PageIndicator>
                
                <CarouselButton onClick={nextPage} disabled={currentPage === totalPages - 1}>
                  <FiChevronRight />
                </CarouselButton>
              </CarouselControls>
            )}
          </CarouselContainer>
        </motion.div>
      </CustomersContainer>
    </CustomersSection>
  );
};

export default Customers;
