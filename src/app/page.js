import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Game from './components/Game';
import Calendar from './components/Calendar';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';
import Header from "./components/Header";
import Skills from "./components/Skills";
import Stripe from "./components/Stripe"

export default function Home() {
  return (
    <>
      <Header />
      <Hero id="hero" />
      <Skills id="skills" />
      <About id="about" />
      <Projects id="projects" />
      <Calendar id="calendar" />
      <ContactForm id="contact" />
      <Game id="game" />
      <Stripe />
      <Footer />
    </>
  );
}
