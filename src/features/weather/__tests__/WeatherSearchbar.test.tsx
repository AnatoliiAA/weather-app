import React from 'react';
import { waitFor, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WeatherSearchbar } from '../WeatherSearchbar';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../utils/test-utils';

describe('WeatherSearchbar component tests', () => {
  describe('Render test', () => {
    it('should render searchbar', () => {
      const { container } = renderWithProviders(
        <WeatherSearchbar value="1" handleInput={jest.fn()} handleSearch={jest.fn()} />
      );
      const searchbar = getByTestId(container, 'searchbar');
      expect(searchbar).toBeInTheDocument();
    });
  });

  describe('Functionality test', () => {
    it('should display passed value', () => {
      const value = 'City';
      const { container } = renderWithProviders(
        <WeatherSearchbar value={value} handleInput={jest.fn()} handleSearch={jest.fn()} />
      );
      const searchbar = getByTestId(container, 'searchbar');
      expect(searchbar).toHaveValue(value);
    });

    it('should call passed handleInput function on change', async () => {
      const handleInputMock = jest.fn();
      const handleSearchMock = jest.fn();
      const { container } = renderWithProviders(
        <WeatherSearchbar value="1" handleInput={handleInputMock} handleSearch={handleSearchMock} />
      );
      const searchbar = getByTestId(container, 'searchbar');
      userEvent.type(searchbar, 'London');
      await waitFor(() => {
        expect(handleInputMock).toHaveBeenCalled();
      });
    });

    it('should call passed handleSearch function on click on search button', async () => {
      const handleInputMock = jest.fn();
      const handleSearchMock = jest.fn();
      const { container } = renderWithProviders(
        <WeatherSearchbar value="1" handleInput={handleInputMock} handleSearch={handleSearchMock} />
      );
      const searchbar = getByTestId(container, 'searchbar');
      const searchButton = getByTestId(container, 'search-button');
      userEvent.type(searchbar, 'London');
      userEvent.click(searchButton);
      await waitFor(() => {
        expect(handleSearchMock).toHaveBeenCalled();
      });
    });
  });
});
