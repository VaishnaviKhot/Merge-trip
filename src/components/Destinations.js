import React from 'react';
import { Link } from 'react-router-dom';
import image1 from '../assests/image1.jpg';
import image2 from '../assests/image2.jpg';
import image3 from '../assests/image3.jpg';
import '../Css/Destinations.css';

const Destinations = () => {
  const Place = ({ id, name, image, price, location }) => {
    return (
      <Link to={`/destination/${id}`} className='place-card-link'>
        <div className='place-card'>
          <img
            src={image}
            alt={name}
            className='place-image'
          />
          <div className='destination-details'>
          <h3>{name}</h3>
          <p>Location: {location}</p>
          <p>Price: ${price}</p>
          </div>
        </div>
      </Link>
    );
  };

  const places = [
    {
      id: 1,
      name: 'Lonavala',
      price: 100,
      location: 'City X',
      image: image1,
    },
    {
      id: 2,
      name: 'Goa',
      price: 120,
      location: 'City Y',
      image: image2,
    },
    {
      id: 3,
      name: 'Alibag',
      price: 90,
      location: 'City Z',
      image: image3,
    },
    {
      id: 4,
      name: 'Manali',
      price: 100,
      location: 'City X',
      image: image1,
    },
    {
      id: 5,
      name: 'kerala',
      price: 120,
      location: 'City Y',
      image: image2,
    },
    {
      id: 6,
      name: 'Meghalay',
      price: 90,
      location: 'City Z',
      image: image3,
    },
    {
      id: 7,
      name: 'Madhya Pradesh',
      price: 100,
      location: 'City X',
      image: image1,
    },
    {
      id: 8,
      name: 'Andra Pradesh',
      price: 120,
      location: 'City Y',
      image: image2,
    },
    {
      id: 9,
      name: 'Orrisa',
      price: 90,
      location: 'City Z',
      image: image3,
    },
  ];

  return (
    <>
      {/* <Header/> */}
      <section className='destinations'>
        <h2>Craft Your Journey: Your Adventure, Your Way</h2>
        <div className='place-list'>
          {places.map((place) => (
            <Place
              key={place.id}
              id={place.id}
              name={place.name}
              image={place.image}
              price={place.price}
              location={place.location}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Destinations;