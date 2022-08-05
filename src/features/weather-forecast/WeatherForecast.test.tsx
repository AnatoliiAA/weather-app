import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { waitFor, findAllByText } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WeatherForecast } from './WeatherForecast';
import { renderWithProviders } from '../../utils/test-utils';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    cityName: 'London',
  }),
}));

export const handlers = [
  rest.get('https://api.openweathermap.org/data/2.5/*', (req, res, ctx) => {
    return res(
      ctx.json({
        list: [
          { dt_txt: '2022-08-05 15:00:00', main: { temp: 10 } },
          { dt_txt: '2022-08-05 18:00:00', main: { temp: 10 } },
          { dt_txt: '2022-08-05 21:00:00', main: { temp: 10 } },
          { dt_txt: '2022-08-06 00:00:00', main: { temp: 10 } },
          { dt_txt: '2022-08-06 03:00:00', main: { temp: 10 } },
          { dt_txt: '2022-08-06 06:00:00', main: { temp: 10 } },
          { dt_txt: '2022-08-06 09:00:00', main: { temp: 10 } },
          { dt_txt: '2022-08-06 12:00:00', main: { temp: -10 } },
        ],
      })
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() =>
  server.listen({
    onUnhandledRequest(req) {
      console.error('Found an unhandled %s request to %s', req.method, req.url.href);
    },
  })
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('WeatherForecast component tests', () => {
  describe('Render tests', () => {
    it('should render form', async () => {
      const { container } = renderWithProviders(<WeatherForecast />);
      await waitFor(async () => {
        expect(await findAllByText(container, '+10')).toHaveLength(7);
        expect(await findAllByText(container, '-10')).toHaveLength(1);
      });
    });
  });
});
