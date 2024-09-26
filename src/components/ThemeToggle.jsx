import styled from 'styled-components';
import { LuMoon, LuSun } from 'react-icons/lu';

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Sun = styled(LuSun)`
  color: ${({ theme }) => theme.text};
`;

function ThemeToggle({ toggleTheme, theme }) {
  return (
    <ToggleButton onClick={toggleTheme}>
      {theme === 'light' ? <LuMoon /> : <Sun />}
    </ToggleButton>
  );
}

export default ThemeToggle;
