import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <Pokedex.js />', () => {
  test('1. Testa se a página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const headingH2 = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(headingH2).toBeInTheDocument();
    expect(headingH2.tagName).toBe('H2');
  });

  test('2. Testa se é exibido o próximo pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();

    const btnNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(btnNext).toBeInTheDocument();
    userEvent.click(btnNext);

    const otherPokemon = screen.getByText(/charmander/i);
    expect(otherPokemon).toBeInTheDocument();
  });

  test('3. Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const btnFilters = screen.getAllByTestId('pokemon-type-button');
    expect(btnFilters).toHaveLength(7);

    const btnElectric = screen.getByRole('button', { name: /electric/i });
    expect(btnElectric).toBeInTheDocument();

    const btnFire = screen.getByRole('button', { name: /fire/i });
    expect(btnFire).toBeInTheDocument();

    const btnBug = screen.getByRole('button', { name: /bug/i });
    expect(btnBug).toBeInTheDocument();

    const btnPoison = screen.getByRole('button', { name: /poison/i });
    expect(btnPoison).toBeInTheDocument();

    const btnPsychic = screen.getByRole('button', { name: /psychic/i });
    expect(btnPsychic).toBeInTheDocument();

    const btnNormal = screen.getByRole('button', { name: /normal/i });
    expect(btnNormal).toBeInTheDocument();

    const btnDragon = screen.getByRole('button', { name: /dragon/i });
    expect(btnDragon).toBeInTheDocument();
  });

  test('4. Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const btnBug = screen.getByRole('button', { name: /bug/i });
    expect(btnBug).toBeInTheDocument();
    userEvent.click(btnBug);

    const caterpie = screen.getByText(/caterpie/i);
    expect(caterpie).toBeInTheDocument();

    const btnPoison = screen.getByRole('button', { name: /poison/i });
    expect(btnPoison).toBeInTheDocument();
    userEvent.click(btnPoison);

    const ekans = screen.getByText(/ekans/i);
    expect(ekans).toBeInTheDocument();

    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toBeInTheDocument();
    userEvent.click(allBtn);
  });
});
