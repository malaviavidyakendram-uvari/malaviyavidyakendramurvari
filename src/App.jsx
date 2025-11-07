import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './Components/Header';
import Home from './Pages/Home';
import Management from './Pages/Management.jsx';
import Staffs from './Pages/Staffs.jsx';
import History from './Pages/History';
import Contact from './Pages/Contact';
import About from './Pages/About';
import Footer from './Components/Footer';
import Donate from './Pages/Donate';
import DonorDetails from './Pages/DonerDetails.jsx';
import DonorFailure from './Pages/DonorFailure.jsx';
import ScrollToTop from "./Components/ScrollToTop";
import { Helmet, HelmetProvider } from "react-helmet-async"; // ✅ SEO imports

function App() {
  return (
    <HelmetProvider>
      <div>
        {/* ✅ Global SEO Meta Tags */}
        <Helmet>
          <title>Malaviya Vidyalaya Kendram Uvari | Rural English Medium School</title>
          <meta
            name="description"
            content="Malaviya Vidyalaya Kendram, Uvari — a rural English medium school in Tirunelveli district offering quality education, cultural learning, and social development for underprivileged children."
          />
          <meta
            name="keywords"
            content="Malaviya Vidyalaya Kendram, Uvari school, English medium school, Tirunelveli education, Tamil Nadu schools, donate for education, rural development, school charity, village school, social service, help children study"
          />
          <meta name="author" content="Malaviya Vidyalaya Kendram, Uvari" />
          <meta name="robots" content="index, follow" />

          {/* ✅ Open Graph (for better sharing preview) */}
          <meta property="og:title" content="Malaviya Vidyalaya Kendram Uvari - Educating Rural India" />
          <meta
            property="og:description"
            content="Support Malaviya Vidyalaya Kendram, Uvari — empowering rural children through education and community support."
          />
          <meta property="og:image" content="/assets/Blue and Brown Illustrative School Logo.png" />
          <meta property="og:url" content="https://malaviyavidyakendramurvari.netlify.app/" />
          <meta property="og:type" content="website" />

          {/* ✅ Favicon and Canonical URL */}
          <link rel="icon" href="/assets/Blue and Brown Illustrative School Logo.png" type="image/png" />
          <link rel="canonical" href="https://malaviyavidyakendramurvari.netlify.app/" />

          {/* ✅ Geo and Language Meta for local ranking */}
          <meta name="geo.region" content="IN-TN" />
          <meta name="geo.placename" content="Uvari, Tirunelveli, Tamil Nadu, India" />
          <meta name="language" content="en-IN" />
        </Helmet>

        {/* Website Layout */}
        <Header />
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Staffs" element={<Staffs />} />
          <Route path="/management" element={<Management />} />
          <Route path="/history" element={<History />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Donate" element={<Donate />} />
          <Route path="/DonorDetails" element={<DonorDetails />} />
          <Route path="/DonorFailure" element={<DonorFailure />} />
        </Routes>

        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
