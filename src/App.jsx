import './App.css'
import { Routes, Route } from "react-router-dom";
import Header from './Components/Header';
import Home from './Pages/Home';
import Management from './Pages/Management';
import History from './Pages/History';
import Contact from './Pages/Contact';
import About from './Pages/About';
import Footer from './Components/Footer';
import Donate from './Pages/Donate';
import DonorDetails from './Pages/DonerDetails.jsx';
import DonorFailure from './Pages/DonorFailure.jsx'
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  return (
    <div>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
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
  )
}

export default App;
