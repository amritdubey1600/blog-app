import Hero from '@/sections/Hero';
import Features from '@/sections/Features';
import CTA from '@/sections/CTA';
import Footer from '@/sections/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* CTA Section */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  );
}