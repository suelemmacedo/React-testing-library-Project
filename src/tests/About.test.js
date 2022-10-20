import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Testa o componente <About.js />', () => {
  test('1.Testa se a página contém um heading h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);

    const headingH2 = screen.getByRole('heading', { name: /About Pokédex/i });

    expect(headingH2).toBeInTheDocument();
    expect(headingH2.tagName).toBe('H2');
    expect(headingH2.textContent).toBe('About Pokédex');
  });
  test('2.Testa se a página contém dois paragraph com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const paragraph1 = 'This application simulates a Pokédex, a digital encyclopedia containing all Pokémons';
    const paragraph2 = 'One can filter Pokémons by type, and see more details for each one of them';

    expect(screen.getByText(paragraph1)).toBeInTheDocument();
    expect(screen.getByText(paragraph2)).toBeInTheDocument();
  });

  test('3.Testa se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image.tagName).toBe('IMG');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
