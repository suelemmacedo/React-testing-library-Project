import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <Pokemon.js />', () => {
  test('1. Testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toHaveTextContent(/pikachu/i);

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toHaveTextContent(/electric/i);

    const averageWeight = screen.getByTestId('pokemon-weight');
    expect(averageWeight).toHaveTextContent(/average weight: 6.0 kg/i);

    const img = screen.getByRole('img');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img.alt).toBe('Pikachu sprite');
  });
  test('2. Testa se ao clicar no link de navegação do pokémon, é feito o redirecionamento da aplicação para a página de detalhes de pokémon e testa se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do pokémon cujos detalhes se deseja ver', () => {
    renderWithRouter(<App />);
    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toHaveTextContent(/pikachu/i);

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toHaveTextContent(/electric/i);

    const averageWeight = screen.getByTestId('pokemon-weight');
    expect(averageWeight).toHaveTextContent(/average weight: 6.0 kg/i);

    const img = screen.getByRole('img');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img.alt).toBe('Pikachu sprite');

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    expect(moreDetails.href).toBe('http://localhost/pokemons/25');
  });

  test('3. Testa se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    const pokfavorite = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(pokfavorite).toBeInTheDocument();
    userEvent.click(pokfavorite);
    const starPokemon = screen.getByAltText('Pikachu is marked as favorite');
    expect(starPokemon).toBeInTheDocument();
    expect(starPokemon.src).toBe('http://localhost/star-icon.svg');
  });
});
