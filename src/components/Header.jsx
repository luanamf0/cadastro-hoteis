import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LiaHotelSolid } from "react-icons/lia"; 
import { FiMenu } from "react-icons/fi"; 
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.cardBackground};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 2.2rem;
  color: ${({ theme }) => theme.primary};
`;

const Nav = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    display: none; 
  }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;

  a {
    margin: 0 2rem;
    font-size: 1.2rem;
    text-decoration: none;
    color: ${({ theme }) => theme.text};

    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

const MobileIcon = styled(FiMenu)`
  font-size: 2rem;
  display: none;

  @media (max-width: 768px) {
    display: block;
    cursor: pointer;
  }
`;

const MobileMenu = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 60px;
  right: 10px;
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid #ccc;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 1000;

  a {
    margin: 1rem 0;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

function Header({ toggleTheme, theme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <HeaderContainer>
      <Logo>
        <LiaHotelSolid />
      </Logo>
      <Nav>
        <NavLinks>
          <Link to="/">Home</Link>
          <Link to="/add">Cadastrar Hotel</Link>
          <Link to="/favorites">Favoritos</Link>
        </NavLinks>
      </Nav>
      <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
      <MobileIcon onClick={() => setMenuOpen(!menuOpen)} />
      {menuOpen && (
        <MobileMenu>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/add" onClick={() => setMenuOpen(false)}>Cadastrar Hotel</Link>
          <Link to="/favorites" onClick={() => setMenuOpen(false)}>Favoritos</Link>
        </MobileMenu>
      )}
    </HeaderContainer>
  );
}

export default Header;