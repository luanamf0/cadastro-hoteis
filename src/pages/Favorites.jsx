import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';

const Container = styled.div`
  max-width: 1200px;
  margin: 3rem auto; 
  padding: 0 1rem;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const Hotels = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

function Favorites() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('hotels')) || [];
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favorite = stored.filter((hotel) =>
      favorites.includes(hotel.id)
    );
    setHotels(favorite);
  }, []);

  const deleteFavorite = (hotelId) => {
    const updated = hotels.filter(hotel => hotel.id !== hotelId);
    setHotels(updated);

    const updatedFavorites = updated.map(hotel => hotel.id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <Container>
      <Title>Hotéis Favoritos</Title>
      {hotels.length > 0 ? (
        <Hotels>
          {hotels.map((hotel) => (
            <Card 
              key={hotel.id} 
              hotel={hotel} 
              isFavorite={true}
              onFavorite={deleteFavorite} 
            />
          ))}
        </Hotels>
      ) : (
        <p style={{textAlign: 'center'}}>Você não tem hotéis favoritos.</p>
      )}
    </Container>
  );
}

export default Favorites;
