import React from "react";
import { FaGamepad, FaLandmark, FaFutbol, FaPencilAlt } from "react-icons/fa";
import "../Css/About.css";
import { Helmet } from "react-helmet"; // ✅ Import Helmet for SEO

const About = () => {
  return (
    <div className="about-container">
      {/* ✅ SEO META TAGS START */}
      <Helmet>
        <title>About Malaviya Vidya Kendram | Uvari English Medium School</title>
        <meta
          name="description"
          content="Learn more about Malaviya Vidya Kendram, a leading English medium school in Uvari since 1995. Providing affordable quality education, cultural activities, and modern learning tools for village kids."
        />
        <meta
          name="keywords"
          content="About Malaviya Vidya Kendram, malaviyavidyakendram, Uvari school, English medium school, best school in Uvari, Tirunelveli education, affordable school fees, malaviyavidyakendramurvari, uvarimkv, AK JeyaPandi, TCS funded school"
        />
        <meta name="author" content="Malaviya Vidya Kendram School" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://malaviyavidyakendramurvari.netlify.app/about" />
        <meta property="og:title" content="About Malaviya Vidya Kendram | School in Uvari" />
        <meta
          property="og:description"
          content="Discover the journey of Malaviya Vidya Kendram, Uvari — nurturing rural education with modern facilities and dedicated teachers since 1995."
        />
        <meta property="og:image" content="https://malaviyavidyakendramurvari.netlify.app/assets/schoolback2.jpg" />
        <meta property="og:url" content="https://malaviyavidyakendramurvari.netlify.app/about" />
      </Helmet>
      {/* ✅ SEO META TAGS END */}

      {/* Who We Are Section */}
      <div className="about-content">
        <div className="about-text">
          <h2>WHO WE ARE</h2>
          <p>
            Started in 1995 (L.K.G/U.K.G-40 kids) with a motto to have an
            English medium school in the village to provide quality education
            and enlighten the needy at Uvari, a seashore village between
            Kanyakumari and Tiruchendur. Funded by various groups including TCS
            (Rs.1.5 lakhs), this school currently has 180+ students from LKG to
            VIII standard. Also has special tutors for Hindi and Computers with
            2 school vans for commuting kids from 20 nearby villages.
          </p>
          <p>
            It was started to enlighten the needy and evolved over the years and
            has a video conferencing facility which enables online teaching and
            provides a platform for anyone in the world to teach the kids right
            from their home without losing their comfort (Social service from
            home).
          </p>
          <p>
            We are progressing to give the best in class facility to our village
            kids to bring them in par with any urban kid - Trying to bridge the
            gap.
          </p>
          <p>
            <strong>Fees Structure:</strong> Pre KG - Rs.200 / LKG - Rs.250 /
            Std I to V - Rs.310 / Std VI-VIII - Rs.340 / X - Rs.350 (affordable)
          </p>
          <p>
            <strong>Address:</strong> 9/62-3, Aalamara north street, Karaichuthu
            Uvari - 627 651, Tirunelveli dist
            <br />
            <strong>Ph:</strong> 04637-210990
            <br />
            <strong>Recog OBE:</strong> 019061
            <br />
            <strong>Authorized Signatory:</strong> A.K. JeyaPandi
          </p>
        </div>
      </div>

      {/* Icons Section */}
      <div className="about-icons">
        <div className="icon-box">
          <div className="icon-circle gamepad">
            <FaGamepad size={60} />
          </div>
          <h3>Fun & Play Area</h3>
          <p>
            A dedicated playground that brings fresh air and laughter—where
            learning through play comes naturally.
          </p>
        </div>
        <div className="icon-box">
          <div className="icon-circle toys">
            <FaLandmark size={60} />
          </div>
          <h3>Creative Learning Tools</h3>
          <p>
            Books, puzzles, and a reading corner that spark curiosity and
            nurture young minds.
          </p>
        </div>
        <div className="icon-box">
          <div className="icon-circle futbol">
            <FaFutbol size={60} />
          </div>
          <h3>Cultural & Sports Activities</h3>
          <p>
            From traditional games to local cultural celebrations, activities
            connect students to their heritage.
          </p>
        </div>
        <div className="icon-box">
          <div className="icon-circle education">
            <FaPencilAlt size={60} />
          </div>
          <h3>Strong Academic Foundation</h3>
          <p>
            Small class sizes (around 1:14) with passionate female teachers
            offering personalised attention.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
