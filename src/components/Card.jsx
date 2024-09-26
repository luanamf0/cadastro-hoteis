import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Card = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 1rem;
  width: 280px;
  text-align: center;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.03);
  }
`;

const FavButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 1.5rem;
  color: red;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const Info = styled.div`
  padding: 1rem;
`;

const Name = styled.h3`
  margin: 0.5rem 0;
`;

const MoreInfos = styled.div`
  margin: 0.25rem 0;
  color: ${({ theme }) => theme.textSecondary || '#666'};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StarIcon = styled(FaStar)`
  color: #FFD700; 
  margin-right: 2px;
`;

function CardHotel({ hotel, isFavorite, onFavorite }) {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(isFavorite);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorite(favorites.includes(hotel.id));
  }, [hotel.id]);

  const cardClick = () => {
    navigate(`/details/${hotel.id}`);
  };

  const toggleFav = (e) => {
    e.stopPropagation();
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.includes(hotel.id)) {
      favorites = favorites.filter((favId) => favId !== hotel.id);
      toast.info('Hotel removido dos favoritos.');
      onFavorite(hotel.id); 
    } else {
      favorites.push(hotel.id);
      toast.success('Hotel adicionado aos favoritos!');
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setFavorite(!favorite);
  };

  return (
    <Card onClick={cardClick}>
      <FavButton onClick={toggleFav}>
        {favorite ? <FaHeart /> : <FaRegHeart />}
      </FavButton>
      <Image src={hotel.image} alt={hotel.name} />
      <Info>
        <Name>{hotel.name}</Name>
        <MoreInfos>
          {Array.from({ length: hotel.rating }, (_, index) => (
            <StarIcon key={index} />
          ))}
        </MoreInfos>
        <MoreInfos>
          {hotel.city}, {hotel.state}
        </MoreInfos>
        <MoreInfos>R$ {hotel.price.toFixed(2)}</MoreInfos>
      </Info>
    </Card>
  );
}

export default CardHotel;
