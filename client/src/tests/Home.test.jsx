import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import HomePage from '../pages/homepage/HomePage';
import Yelp from '../utils/Yelp';

jest.mock('../utils/Yelp');

describe('HomePage Component', () => {
  test('renders search bar', () => {
    render(
      <Router> {/* Wrap HomePage with Router */}
        <HomePage />
      </Router>
    );
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  });

  test('calls searchYelp function with default parameters on mount', async () => {
    render(
      <Router> {/* Wrap HomePage with Router */}
        <HomePage />
      </Router>
    );
    await waitFor(() => {
      expect(Yelp.search).toHaveBeenCalledWith('Russian', 'Washington DC', 'best_match');
    });
  });

  test('renders businesses returned from Yelp search', async () => {
    const mockBusinesses = [
      { id: 1, name: 'Business 1', imageSrc: 'image1.jpg' },
      { id: 2, name: 'Business 2', imageSrc: 'image2.jpg' },
    ];
    Yelp.search.mockResolvedValue(mockBusinesses);

    render(
      <Router> {/* Wrap HomePage with Router */}
        <HomePage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId('card')).toHaveLength(mockBusinesses.length);
      mockBusinesses.forEach((business) => {
        expect(screen.getByText(business.name)).toBeInTheDocument();
        expect(screen.getByAltText(`Image of ${business.name}`)).toBeInTheDocument();
      });
    });
  });

  test('displays "No businesses found" message when no businesses are returned from Yelp search', async () => {
    Yelp.search.mockResolvedValue([]);

    render(
      <Router> {/* Wrap HomePage with Router */}
        <HomePage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('No businesses found')).toBeInTheDocument();
    });
  });
});
