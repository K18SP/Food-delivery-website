import React from 'react';
import { assets } from '../../assets/assets';
import './AboutUs.css'; 

const AboutUs = () => {
  return (
    <div className='main-aboutus'>
      <div className='aboutus-container'>
        <div className="image-container">
          <div className="overlay-content">
            <h2>We bring people</h2>
            <h2>Together</h2>
          </div>
          <img src={assets.food_image} alt="" className="background-image"/>
        </div>
        <div className="vertical-line"></div>
      </div>

      <div className="elementaor-section">
        <div className="features-container">
          <div className="feature">
            <img src={assets.free_shipping_image} alt="Free Shipping" />
            <p className='shipping-paragraph'>Free Shipping on First Order</p>
          </div>
          <div className="feature">
            <img src={assets.variety_image} alt="Variety" />
            <p>Variety</p>
          </div>
          <div className="feature">
            <img src={assets.delivery_image} alt="30-Minute Delivery" />
            <p>30-Minute Delivery</p>
          </div>
        </div>
      </div>    

      <div className="aboutus-container">
        <div className="image-container">
            <img src={assets.food_image2} alt="" className="background-image"/>
            <div className='overlay-content'>
                <h1>WELCOME TO CRAVIO</h1>
                <p>At CRAVIO, we believe that food is not just about sustenance 
                    it's about bringing people together, experiencing diverse cultures,
                    and creating unforgettable moments. Our mission is to deliver delicious meals right to your doorstep, making quality dining convenient and accessible.</p>
            </div>
        </div>
      </div>

      <div className="aboutus-container">
        <div className="image-container">
            <img src={assets.food_image3} alt="" className="background-image"/>
            <div className="overlay-content">
                <h1>Our Commitment to Sustainability</h1>
                <p>At CRAVIO, we are committed to sustainability and minimizing our environmental impact. We use eco-friendly packaging, promote waste reduction, and support restaurants that source ingredients responsibly. Our goal is to not only provide delicious meals but also contribute to a healthier planet.</p>
                <hr />
                <h1 className='heading'>Join Our Community</h1>
                <p>We are more than just a food delivery service; we are a community of food lovers. Follow us on social media, subscribe to our newsletter, and be part of our journey as we continue to bring joy through food.</p>
                <hr />
                <p className='paragraph'>"Thank you for choosing CRAVIO. We look forward to serving you!"</p>    
            </div>
        </div>
      </div>

    </div>
  );
}

export default AboutUs;
