import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <SEO
        title="404 - Sahifa topilmadi"
        description="Siz qidirayotgan sahifa mavjud emas."
        url={location.pathname}
      />
      <div className="container py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-primary/20 mb-4">404</h1>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Sahifa topilmadi</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki o'chirilgan bo'lishi mumkin.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/" className="flex items-center gap-2">
                <Home size={18} />
                Bosh Sahifaga Qaytish
              </Link>
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.history.back()}>
              <ArrowLeft size={18} className="mr-2" />
              Orqaga Qaytish
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
