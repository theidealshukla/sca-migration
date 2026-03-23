import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Chatbot from '../../components/Chatbot';
import FloatingSocials from '../../components/FloatingSocials';

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <FloatingSocials />
      <Chatbot />
    </>
  );
}

