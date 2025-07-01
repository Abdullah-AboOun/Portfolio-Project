import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { lightTheme, darkTheme } from "./styles/themes";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Customers from "./components/Customers";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ThemeToggle from "./components/ThemeToggle";

const AppContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

function App() {
  "use memo";

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme !== null ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <AppContainer>
        <GlobalStyles />
        <ThemeToggle toggleTheme={toggleTheme} darkMode={darkMode} />
        <Navbar />
        <Header />
        <About />
        <Skills />
        <Education />
        <Experience />
        <Projects />
        <Customers />
        <ContactUs />
        <Footer />
        <ScrollToTopButton />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
