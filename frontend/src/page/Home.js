import React, { useState } from 'react';
import { Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ProductCard from '../component/ProductCard';

const Home = ({ products, searchTerm }) => {
  const [expanded, setExpanded] = useState(false);
  const sortedProducts = products.sort((a, b) => new Date(b.postedTime) - new Date(a.postedTime));
  const navigate = useNavigate();

  const handleViewAllProducts = () => {
    navigate('/allproducts');
  };

  const slideshowProducts = sortedProducts
    .filter(product => product.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
    .slice(0, 8);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // 5 seconds
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Introduction content
const introduction = (
  <Container maxWidth="md" style={{ textAlign: 'center', padding: '20px', marginBottom: '20px' }}>
    <Typography variant="h4" gutterBottom>
      Welcome to Script Sync Shop
    </Typography>
    {/* Trimmed content */}
    {!expanded && (
      <div>
        <Typography variant="body1" paragraph>
          Your premier destination for pharmaceutical and cosmetic products online. As a proud establishment under the ownership of Pharmacy Isabelle Lagarde, located in La Bastide de Serou, southern France, we're committed to offering a curated selection of French pharmaceutical and cosmetic items renowned for their natural essence and European organic certifications, such as Cosmebio, Ecocert, and Nature & Progres.
        </Typography>
        <Typography variant="body2" paragraph>
          Specializing in organic and natural products, Script Sync Shop collaborates with meticulously chosen laboratories renowned for their commitment to producing high-quality organic goods. Situated in the scenic surroundings of southern France, these laboratories operate in close proximity to our pharmacy, embodying an eco-conscious ethos that prioritizes human well-being, environmental stewardship, and nature preservation.
        </Typography>
        <Button variant="outlined" onClick={() => setExpanded(true)}>
          Show More
        </Button>
      </div>
    )}
    {/* Full content */}
    {expanded && (
      <div>
        <Typography variant="body1" paragraph>
          Your premier destination for pharmaceutical and cosmetic products online. As a proud establishment under the ownership of Pharmacy Isabelle Lagarde, located in La Bastide de Serou, southern France, we're committed to offering a curated selection of French pharmaceutical and cosmetic items renowned for their natural essence and European organic certifications, such as Cosmebio, Ecocert, and Nature & Progres.
        </Typography>
        <Typography variant="body2" paragraph>
          Specializing in organic and natural products, Script Sync Shop collaborates with meticulously chosen laboratories renowned for their commitment to producing high-quality organic goods. Situated in the scenic surroundings of southern France, these laboratories operate in close proximity to our pharmacy, embodying an eco-conscious ethos that prioritizes human well-being, environmental stewardship, and nature preservation.
        </Typography>
        <Typography variant="subtitle1" paragraph>
          At Script Sync Shop, we understand the growing preference for natural remedies and supplements. That's why we've meticulously curated our collection to cater to the discerning needs of our clientele. In today's health-conscious era, more individuals are gravitating towards natural medications for their perceived health benefits. We've handpicked the finest products available on the market to meet the evolving demands of our valued customers.
        </Typography>
        <Typography variant="subtitle2" paragraph>
          Distinguishing between traditional medications and biological medicines, the latter derives its active substances from living sources, offering enhanced specificity and quality compared to chemically synthesized counterparts.
        </Typography>
        <Typography variant="body1" paragraph>
          We recognize the paramount importance of trust and reliability when it comes to online pharmacies. Rest assured, Script Sync Shop is affiliated with Pharmacy Isabelle Lagarde, a licensed pharmacy approved by the Regional Health Agency and registered with the National Council of the Order of Pharmacists. Our commitment to transparency and adherence to French regulations ensures a seamless and secure online shopping experience for our customers.
        </Typography>
        <Typography variant="body2" paragraph>
          Choosing Script Sync Shop offers unparalleled convenience. Our online platform operates 24/7, allowing you to browse and purchase pharmaceutical products at your convenience. With categorized listings and a user-friendly search bar, finding the right medication has never been easier. We prioritize the confidentiality and security of your information, guaranteeing a safe and discreet shopping environment.
        </Typography>
        <Typography variant="subtitle1" paragraph>
          At Script Sync Shop, we believe in accessibility. Our extensive range of natural and organic medicines ensures that you'll find the perfect solution for your health needs, with swift delivery options available across France, Europe, Switzerland, Australia, and the United States.
        </Typography>
        <Typography variant="subtitle2" paragraph>
          Experience the same level of personalized service online as you would in person. Our team of pharmacists is available for assistance via phone and email, ensuring that your queries are promptly addressed.
        </Typography>
        <Typography variant="body1" paragraph>
          Discover the convenience and quality of Script Sync Shop—an online pharmacy dedicated to your well-being.
        </Typography>
        <Button variant="outlined" onClick={() => setExpanded(false)}>
          Show Less
        </Button>
      </div>
    )}
  </Container>
);


  return (
    <div>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrTu1lFLN0gJ8Lf6KrCCJNr60W3ho4_YAeIEWqqWUq&s" alt="Banner" style={{ width: '100%', maxHeight: '200px' }} />
      
      {introduction}

      {/* Slider */}
      <Slider {...settings}>
        {slideshowProducts.map(product => (
          <div key={product.id}>
            {/* Using modified ProductCard component */}
            <ProductCard product={product} />
          </div>
        ))}
      </Slider>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '70px' }}>
        <Button variant="contained" onClick={handleViewAllProducts} style={{ backgroundColor: "#333" }}>
          All products
        </Button>
      </div>
    </div>
  );
};

export default Home;
