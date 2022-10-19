import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  test('1. Testa se a aplicação é redirecionada para a Página Principal', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('2. Testa se a aplicação é redirecionada para a página About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('3. Testa se a aplicação é redirecionada para a página de Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  test('4. Testa se a aplicação é redirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);

    const notFoundTitle = screen.getByRole('heading', { level: 1 });
    expect(notFoundTitle).toBeInTheDocument();
    history.push('/Error404');

    const { pathname } = history.location;
    expect(pathname).toBe('/Error404');
  });
});
