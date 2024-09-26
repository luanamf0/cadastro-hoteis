import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';
import { toast } from 'react-toastify';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto; 
  padding: 0 1rem;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
`;

const Image = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
`;

const InfoField = styled.div`
  margin: 1.5rem 0;
`;

const InfoItem = styled.p`
  font-size: 1.1rem;
  margin: 0.5rem 0;
  color: ${({ theme }) => theme.textSecondary || '#666'};
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
  }
`;

const Star = styled.div`
  display: flex;
  align-items: center;
`;

const StarIcon = styled(FaStar)`
  color: #FFD700;
  margin-right: 0.2rem;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
`;

const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;

  img {
    margin: 0.5rem;
    width: calc(50% - 1rem);
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const ButtonField = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  button {
    margin: 0 0.5rem;
    padding: 0.75rem 1.5rem;
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background: #0069d9;
    }

    &:nth-child(2) {
      background: #dc3545;

      &:hover {
        background: #c82333;
      }
    }
  }
`;

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('hotels')) || [];
    const found = stored.find((h) => h.id === id);
    if (found) {
      setHotel(found);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const Delete = () => {
    const confirmDelete = window.confirm('Deseja excluir este hotel?');
    if (confirmDelete) {
      const stored = JSON.parse(localStorage.getItem('hotels')) || [];
      const updated = stored.filter((h) => h.id !== id);
      localStorage.setItem('hotels', JSON.stringify(updated));
      toast.success('Hotel excluído com sucesso!');
      navigate('/');
    }
  };

  return hotel ? (
    <Container>
      <Title>{hotel.name}</Title>
      <Image src={hotel.image} alt={hotel.name} />
      <InfoField>
        <InfoItem>
          <FaStar /> Classificação:
          <Star>
            {Array.from({ length: hotel.rating }, (_, index) => (
              <StarIcon key={index} />
            ))}
          </Star>
        </InfoItem>
        <InfoItem>
          <FaMapMarkerAlt /> Localização: {hotel.city}, {hotel.state}
        </InfoItem>
        <InfoItem>
          <MdAttachMoney /> Preço da diária: R$ {hotel.price.toFixed(2)}
        </InfoItem>
      </InfoField>
      <Description>{hotel.description}</Description>
      {hotel.images && hotel.images.length > 0 && (
        <>
          <h2>Imagens adicionais</h2>
          <ImagesContainer>
            {hotel.images.map((img, index) => (
              <img key={index} src={img} alt={`${hotel.name} ${index + 1}`} />
            ))}
          </ImagesContainer>
        </>
      )}
      <ButtonField>
        <button onClick={() => navigate(`/edit/${hotel.id}`)}>Editar</button>
        <button onClick={Delete}>Excluir</button>
      </ButtonField>
    </Container>
  ) : (
    <p style={{ textAlign: 'center' }}>Carregando</p>
  );
}

export default Details;
