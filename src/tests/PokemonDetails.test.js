import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <PokemonDetails />', () => {
  test('1. Testa se as informações detalhadas do pokémon selecionado são mostradas na tela ', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const nameDetails = screen.getByRole('heading', { name: /Pikachu Details/i });
    expect(nameDetails).toBeInTheDocument();
    expect(nameDetails.tagName).toBe('H2');

    const summary = screen.getByRole('heading', { name: /summary/i });
    expect(summary).toBeInTheDocument();
    expect(summary.tagName).toBe('H2');

    const paragraph = 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.';
    expect(screen.getByText(paragraph)).toBeInTheDocument();
  });
  test('2. Testa se existe na página uma seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const headingH2 = screen.getByRole('heading', { name: /Game Locations of Pikachu/i });
    expect(headingH2).toBeInTheDocument();
    expect(headingH2.tagName).toBe('H2');

    const location1 = screen.getByText(/Kanto Viridian Forest/i);
    expect(location1).toBeInTheDocument();

    const location2 = screen.getByText(/Kanto Power Plant/i);
    expect(location2).toBeInTheDocument();

    const imgsLoc = screen.getAllByAltText(/Pikachu location/i);
    expect(imgsLoc[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgsLoc[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  test('3. Testa se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const label = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(label).toBeInTheDocument();
    userEvent.click(label);
  });
});
