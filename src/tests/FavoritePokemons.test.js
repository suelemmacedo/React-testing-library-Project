import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('1. Teste se é exibida na tela a mensagem "No favorite pokemon found", caso a pessoa não tenha pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  test('2. Teste se são exibidos todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const btnDragon = screen.getByRole('button', { name: /Dragon/i });
    expect(btnDragon).toBeInTheDocument();
    userEvent.click(btnDragon);

    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);

    const label = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(label).toBeInTheDocument();

    userEvent.click(label);
    act(() => {
      history.push('/favorites');
    });

    const dragonair = screen.getByText(/Dragonair/i);
    expect(dragonair).toBeInTheDocument();
  });
});
