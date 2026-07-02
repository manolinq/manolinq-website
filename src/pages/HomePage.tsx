import { useSeo } from '../hooks/useSeo';
import Hero from '../components/Hero';
import Problem from '../components/Problem';
import Services from '../components/Services';
import Packages from '../components/Packages';
import Process from '../components/Process';
import CTA from '../components/CTA';
import Contact from '../components/Contact';

export default function HomePage() {
  useSeo({
    title: 'Manolinq | Websites & AI Systems for Businesses',
    description:
      'Manolinq builds premium websites, landing pages and AI assistants for businesses that want more leads, bookings and clients.',
    path: '',
  });

  return (
    <>
      <Hero />
      <Problem />
      <Services />
      <Packages />
      <Process />
      <CTA />
      <Contact />
    </>
  );
}
