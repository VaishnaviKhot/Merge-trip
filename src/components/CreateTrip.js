import React, { useState } from 'react';
import hotelImage1 from '../assests/hotel-img1.jpg'; // Adjust the path accordingly
import hotelImage2 from '../assests/hotel-img2.jpg';
import hotelImage3 from '../assests/hotel-img3.jpg';
import Header from './Header';
import '../Css/Scroll.css';
import '../Css/CreateTrip.css'


import GoogleSearch from "../components/GoogleSearch"


const Hotel = ({ name, price, location, image, onSelect }) => {
    return (
      <div className='hotel'>
      <img src={image} alt={name} onClick={onSelect} className='hotel-image' style={{ width: '180px', height: '150px', borderRadius: '10px' }} />
      <h3>{name}</h3>
        <h3>{name}</h3>
        <p>Price: ${price} per night</p>
        <p>Location: {location}</p>
        <button onClick={onSelect}>Select Hotel</button>
      </div>
  );
};

const CreateTrip = () => {
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [numNights, setNumNights] = useState(1);
    const [includeBreakfast, setIncludeBreakfast] = useState(false);
  
    const hotels = [
      {
        id: 1,
        name: 'Hotel A',
        price: 100,
        location: 'City X',
        image: hotelImage1,
      },
      {
        id: 2,
        name: 'Hotel B',
        price: 120,
        location: 'City Y',
        image: hotelImage2,
      },
      {
        id: 3,
        name: 'Hotel C',
        price: 90,
        location: 'City Z',
        image: hotelImage3,
      },
    ];
  
    const handleHotelSelect = (hotelId) => {
      const hotel = hotels.find((h) => h.id === hotelId);
      setSelectedHotel(hotel);
    };
  
    const handleNumNightsChange = (e) => {
      setNumNights(parseInt(e.target.value, 10));
    };
  
    const handleIncludeBreakfastChange = () => {
      setIncludeBreakfast(!includeBreakfast);
    };
  
    return (
      <>
      <GoogleSearch/>
      {/* <Header/> */}
      <div className='create-trip'>
        <h2>Hotels</h2>
        <div className='hotel-list'>
          {hotels.map((hotel) => (
            <Hotel
              key={hotel.id}
              name={hotel.name}
              price={hotel.price}
              location={hotel.location}
              image={hotel.image}
              onSelect={() => handleHotelSelect(hotel.id)}
            />
          ))}
        </div>
        {selectedHotel && (
          <div className='selected-hotel'>
            <h3>Selected Hotel</h3>
            <img src={selectedHotel.image} alt={selectedHotel.name} />
            {Object.entries(selectedHotel).map(([key, value]) => (
              <p key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
              </p>
            ))}
            <div className='options'>
              <label>
                Number of Nights:
                <input
                  type='number'
                  min='1'
                  value={numNights}
                  onChange={handleNumNightsChange}
                />
              </label>
              <label>
                Include Breakfast:
                <input
                  type='checkbox'
                  checked={includeBreakfast}
                  onChange={handleIncludeBreakfastChange}
                />
              </label>
            </div>
          </div>
        )}
      </div>
      <div className="scrollmenu">
        <h1>Handpicked Collections for You</h1>
        <a href="#home">
          <div className="scrolling-content">
            <img
              src="https://hblimg.mmtcdn.com/content/hubble/img/collections/m_beach44_p_540_417.jpg?im=Resize=(400,462)"
              alt=""
            />
            <h6>
              <span>Top</span>
            </h6>
            <h7>
              <span>Stay around
                 Island </span>
            </h7>
          </div>
        </a>
        <a href="#news">
          <img
            src="https://hblimg.mmtcdn.com/content/hubble/img/bangalore_hotel_tiow/mmt/activities/m_Waterwoods%20Lodges%20&%20Resorts_Kabini_l_550_821.jpg?im=Resize=(400,462)"
            alt=""
          />
          <h6>Top</h6>
          <h7>
            <span>Eye Catchy Villas</span>
          </h7>
        </a>
        <a href="#contact">
          <img
            src="https://hblimg.mmtcdn.com/content/hubble/img/delhi_hotels_tiow/mmt/activities/m_Le%20ROI%20Floating%20Huts_Eco%20Rooms_Tehri_Uttarakhand_l_550_821.jpg?im=Resize=(400,462)"
            alt=""
          />
          <h6>Top</h6>
          <h7>
            <span>Seaside Cabana</span>
          </h7>
        </a>
        <a href="#about">
          <img src="https://hblimg.mmtcdn.com/content/hubble/img/seo_img/mmt/activities/m_Radisson_blu_image_seo_l_550_821.jpg?im=Resize=(400,462)" alt="" />
          <h6>Text</h6>
          <h7>
            <span>Peace</span>
          </h7>
        </a>
        <a href="#support">
          <img src="https://hblimg.mmtcdn.com/content/hubble/img/collections/m_weekend44_p_540_417.jpg?im=Resize=(400,462)" alt="" />
          <h6>Top</h6>
          <h7>
            <span>Scenery </span>
          </h7>
        </a>
        <a href="#blog">
          <img src="https://hblimg.mmtcdn.com/content/hubble/img/collections/m_hill_stations11_p_540_417.jpg?im=Resize=(400,462)" alt="" />
          <h6>Top</h6>
          <h7>
            <span>Snowy Serenity</span>
          </h7>
        </a>
        <a href="#tools">
          <img src="https://hblimg.mmtcdn.com//content/hubble/img/dhanaulti/mmt/destination/m_Destination_Dhanaulti_l_534_801.jpg?im=Resize=(400,462)" alt="" />
          <h6>Top</h6>
          <h7>
            <span>Between Mountains</span>
          </h7>
        </a>
        <a href="#base">
          <img src="https://hblimg.mmtcdn.com//content/hubble/img/yelagiri/mmt/destination/m_destination_yelagiri_landscape_l_340_544.jpg?im=Resize=(400,462)" alt="" />
          <h6>Text</h6>
          <h7>
            <span>WhispersOfNature</span>
          </h7>
        </a>
        <a href="#custom">
          <img src="https://hblimg.mmtcdn.com//content/hubble/img/panchmarhi/mmt/destination/m_Destination_Panchmarhi_l_464_696.jpg?im=Resize=(400,462)" alt="" />
          <h6>Top</h6>
          <h7>
            <span>Laps of Earth</span>
          </h7>
        </a>
        <a href="#more">
          <img src="https://hblimg.mmtcdn.com//content/hubble/img/dandeli/mmt/destination/m_Destination_Dandeli_l_536_804.jpg?im=Resize=(400,462)" alt="" />
          <h6>Top</h6>
          <h7>
            <span>Sounds of Waterfall</span>
          </h7>
        </a>
        <a href="#logo">
          <img src="https://hblimg.mmtcdn.com//content/hubble/img/vellore/mmt/destination/m_destination-vellore-landscape_l_400_640.jpg?im=Resize=(400,462)"alt="" />
          <h6>Top</h6>
          <h7>
            <span>Riverside Reverie</span>
          </h7>
        </a>
        <a href="#friends">
          <img src="https://hblimg.mmtcdn.com//content/hubble/img/dandeli/mmt/destination/m_Destination_Dandeli_l_536_804.jpg?im=Resize=(400,462)" alt="" />
          <h6>Top</h6>
          <h7>
            <span></span>
          </h7>
        </a>
        <a href="#partners">
          <img src={hotelImage1} alt="" />
          <h6>Text</h6>
          <h7>
            <span>Great stays</span>
          </h7>
        </a>
      </div>
      </>
    );
  };

export default CreateTrip;