import styled from 'styled-components';

const Mercham = styled.div`
  text-align: center;
  padding: 1.5rem 1rem;
  font-size: 2rem;
  position: relative;
  top: 20px;
  font-weight: bold;
`;

const SearchContainer = styled.div`
  padding: 2.0rem;
  text-align: center;
`;

const Input = styled.input`
  padding: 0.5rem 1rem;
  margin-right: 2rem;
  text-align: left;
`;

const Select = styled.select`
  padding: 0.5rem;
`;

function SearchBar({ search, setSearch, sortCriteria, setSortCriteria }) {
  return (
    <>
    <Mercham>Reserve aqui o seu hotel ideal!</Mercham>
    <SearchContainer>
      <Input
        type="text"
        placeholder="Pesquisar Hotéis..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Select
        value={sortCriteria}
        onChange={(e) => setSortCriteria(e.target.value)}
      >
        <option value="">Ordenar por</option>
        <option value="price">Preço</option>
        <option value="rating">Classificação</option>
      </Select>
    </SearchContainer>
    </>
  );
}

export default SearchBar;
