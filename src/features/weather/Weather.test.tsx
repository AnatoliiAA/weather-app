import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  waitFor,
  getByTestId,
  fireEvent,
  findByText,
  findByTestId,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Weather } from './Weather';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../utils/test-utils';

export const handlers = [
  rest.get('https://api.openweathermap.org/*', (req, res, ctx) => {
    const cityName = req.url.searchParams.get('q');
    return res(ctx.status(200), ctx.json({ name: cityName, id: 1, main: { temp: 20 } }));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Weather component tests', () => {
  describe('Render test', () => {
    it('should render form', () => {
      const { container } = renderWithProviders(<Weather />);
      const component = getByTestId(container, 'weather-component');
      expect(component).toBeInTheDocument();
    });
  });

  describe('Functionality test', () => {
    it('should change input search value', async () => {
      const { container } = renderWithProviders(<Weather />);
      const searchbar = getByTestId(container, 'searchbar');
      userEvent.type(searchbar, 'CityName');
      await waitFor(() => {
        expect(searchbar).toHaveValue('CityName');
      });
    });

    it('should render card on search and delete on click on delete button', async () => {
      const { container } = renderWithProviders(<Weather />);
      const searchbar = getByTestId(container, 'searchbar');
      const searchButton = getByTestId(container, 'search-button');
      fireEvent.change(searchbar, {
        target: {
          value: 'London',
        },
      });
      userEvent.click(searchButton);
      const card = await findByText(container, 'London');
      expect(card).toBeInTheDocument();

      const deleteButton = getByTestId(container, 'delete-button-London');
      userEvent.click(deleteButton);
      await waitFor(() => {
        expect(card).not.toBeInTheDocument();
      });
    });

    it('should show notification if city was not found', async () => {
      server.use(
        rest.get('https://api.openweathermap.org/*', (req, res, ctx) => {
          return res(
            ctx.status(404),
            ctx.json({
              errorMessage: 'City not found',
            })
          );
        })
      );
      const { container } = renderWithProviders(<Weather />);
      const searchbar = getByTestId(container, 'searchbar');
      const searchButton = getByTestId(container, 'search-button');
      fireEvent.change(searchbar, {
        target: {
          value: 'sdsd',
        },
      });
      userEvent.click(searchButton);
      const notification = await findByTestId(container, 'notification');
      expect(notification).toBeInTheDocument();

      const notificationClose = await findByTestId(container, 'notification-close');
      userEvent.click(notificationClose);
      await waitFor(() => {
        expect(notification).not.toBeInTheDocument();
      });
    });

    it('should render cities from local storage', async () => {
      localStorage.setItem('cities', 'London');
      const { container } = renderWithProviders(<Weather />);
      const card = await findByText(container, 'London');
      expect(card).toBeInTheDocument();
    });
  });
});
