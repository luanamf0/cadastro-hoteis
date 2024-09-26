import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import Search from '../components/Search';

const Hotels = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

function Home() {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('hotels')) || [];
    setHotels(stored);
  }, []);

  const filtered = hotels
    .filter((hotel) =>
      hotel.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === 'price') {
        return a.price - b.price;
      }
      if (sortCriteria === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });

  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
      />
      <Hotels>
        {filtered.map((hotel) => (
          <Card key={hotel.id} hotel={hotel} />
        ))}
      </Hotels>
    </div>
  );
}

export default Home;
