import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 350px; 
  margin: 0.5rem auto; 
  background: ${({ theme }) => theme.cardBackground};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 3px 5px 8px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 1rem; 
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const FieldForm = styled.div`
  margin-bottom: 0.5rem; 
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.25rem;
  display: block;
  font-size: 0.75rem; 
`;

const Input = styled.input`
  padding: 0.4rem; 
  width: 100%;
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 4px;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-size: 0.8rem; 
`;

const TextArea = styled.textarea`
  padding: 0.4rem; 
  width: 100%;
  height: 50px; 
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 4px;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-size: 0.8rem; 
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between; 
  margin-top: 0.5rem; 
`;

const Button = styled.button`
  padding: 0.4rem;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem; 

  &:hover {
    background: #0069d9;
  }
`;

const Cancel = styled(Button)`
  background: #ccc; 
  color: #000;
  
  &:hover {
    background: #bbb;
  }
`;

function Register() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [data, setData] = useState({
    name: '',
    image: '',
    rating: 1,
    city: '',
    state: '',
    price: '',
    description: '',
    images: [],
  });

  useEffect(() => {
    if (isEditMode) {
      const stored = JSON.parse(localStorage.getItem('hotels')) || [];
      const toEdit = stored.find((h) => h.id === id);
      if (toEdit) {
        setData(toEdit);
      } else {
        navigate('/');
      }
    }
  }, [id, isEditMode, navigate]);

  const fieldChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const updateImages = (e) => {
    const imagesArray = e.target.value.split(',').map((img) => img.trim());
    if (imagesArray.length > 4) {
      toast.error('Você pode adicionar só até 4 imagens adicionais.');
    } else {
      setData({
        ...data,
        images: imagesArray,
      });
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    const price = parseFloat(data.price);
    const rating = parseInt(data.rating, 10);

    if (isNaN(price)) {
      toast.error('Por favor, insira um valor válido para o preço da diária.');
      return;
    }
    if (isNaN(rating)) {
      toast.error('Por favor, insira um valor válido para a classificação.');
      return;
    }

    data.price = price;
    data.rating = rating;

    if (price < 0) {
      toast.error('O preço da diária não pode ser negativo.');
      return;
    }
    if (rating < 1 || rating > 5) {
      toast.error('A classificação deve ser entre 1 e 5.');
      return;
    }

    const stored = JSON.parse(localStorage.getItem('hotels')) || [];

    if (isEditMode) {
      const updated = stored.map((h) =>
        h.id === id ? { ...data } : h
      );
      localStorage.setItem('hotels', JSON.stringify(updated));
      toast.success('Hotel atualizado com sucesso!');
    } else {
      const newHotel = { ...data, id: Date.now().toString() };
      stored.push(newHotel);
      localStorage.setItem('hotels', JSON.stringify(stored));
      toast.success('Hotel adicionado com sucesso!');
    }

    navigate('/');
  };

  return (
    <Container>
      <Title>{isEditMode ? 'Editar Hotel' : 'Adicionar Hotel'}</Title>
      <Form onSubmit={submitForm}>
        <FieldForm>
          <Label>Nome</Label>
          <Input
            type="text"
            name="name"
            value={data.name}
            onChange={fieldChange}
            required
          />
        </FieldForm>
        <FieldForm>
          <Label>Imagem Principal (URL)</Label>
          <Input
            type="text"
            name="image"
            value={data.image}
            onChange={fieldChange}
            required
          />
        </FieldForm>
        <FieldForm>
          <Label>Classificação</Label>
          <Input
            type="number"
            name="rating"
            value={data.rating}
            onChange={fieldChange}
            min="1"
            max="5"
            required
          />
        </FieldForm>
        <FieldForm>
          <Label>Cidade</Label>
          <Input
            type="text"
            name="city"
            value={data.city}
            onChange={fieldChange}
            required
          />
        </FieldForm>
        <FieldForm>
          <Label>Estado</Label>
          <Input
            type="text"
            name="state"
            value={data.state}
            onChange={fieldChange}
            required
          />
        </FieldForm>
        <FieldForm>
          <Label>Preço da Diária</Label>
          <Input
            type="number"
            name="price"
            value={data.price}
            onChange={fieldChange}
            required
          />
        </FieldForm>
        <FieldForm>
          <Label>Descrição</Label>
          <TextArea
            name="description"
            value={data.description}
            onChange={fieldChange}
            required
          />
        </FieldForm>
        <FieldForm>
          <Label>Imagens Adicionais (URLs separadas por vírgula)</Label>
          <TextArea
            name="images"
            value={data.images.join(', ')}
            onChange={updateImages}
          />
        </FieldForm>
        <ButtonContainer>
          <Button type="submit">{isEditMode ? 'Atualizar' : 'Adicionar'}</Button>
          <Cancel type="button" onClick={() => navigate('/')}>Cancelar</Cancel>
        </ButtonContainer>
      </Form>
    </Container>
  );
}

export default Register;
