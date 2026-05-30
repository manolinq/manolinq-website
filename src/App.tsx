import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Services from './components/Services';
import Packages from './components/Packages';
import Process from './components/Process';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

export default function App() {
  return (
    <div className="min-h-screen bg-[#06060c] text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Services />
        <Packages />
        <Process />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}
