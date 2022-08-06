import React from 'react';
import '@testing-library/jest-dom';
import { waitFor, getByTestId } from '@testing-library/react';
import { WeatherCard } from '../WeatherCard';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../utils/test-utils';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('WeatherCard component tests', () => {
  describe('Render test', () => {
    it('should render card', () => {
      const { container } = renderWithProviders(
        <WeatherCard title="1" temp={25} handleDelete={jest.fn()} handleUpdate={jest.fn()} />
      );
      const card = getByTestId(container, 'card-1');
      expect(card).toBeInTheDocument();
    });

    it('should show temp with right sign', () => {
      const { container } = renderWithProviders(
        <WeatherCard title="1" temp={-25} handleDelete={jest.fn()} handleUpdate={jest.fn()} />
      );
      const tempField = getByTestId(container, 'temp-1');
      expect(tempField).toHaveTextContent('-25');
    });
  });

  describe('Functionality tests', () => {
    it('should call useNavigate hook on click on show forecast button', async () => {
      const { container } = renderWithProviders(
        <WeatherCard title="1" temp={25} handleDelete={jest.fn()} handleUpdate={jest.fn()} />
      );
      const forecastButton = getByTestId(container, 'forecast-button-1');
      userEvent.click(forecastButton);
      await waitFor(() => {
        expect(mockedUsedNavigate).toHaveBeenCalled();
      });
    });

    it('should call passed handleDelete function on click on delete button', async () => {
      const handleDeleteMock = jest.fn();
      const { container } = renderWithProviders(
        <WeatherCard title="1" temp={25} handleDelete={handleDeleteMock} handleUpdate={jest.fn()} />
      );
      const deleteButton = getByTestId(container, 'delete-button-1');
      userEvent.click(deleteButton);
      await waitFor(() => {
        expect(handleDeleteMock).toHaveBeenCalled();
      });
    });

    it('should call passed handleUpdate function on click on update button', async () => {
      const handleUpdateMock = jest.fn();
      const { container } = renderWithProviders(
        <WeatherCard title="1" temp={25} handleDelete={jest.fn()} handleUpdate={handleUpdateMock} />
      );
      const updateButton = getByTestId(container, 'update-button-1');
      userEvent.click(updateButton);
      await waitFor(() => {
        expect(handleUpdateMock).toHaveBeenCalled();
      });
    });
  });
});
