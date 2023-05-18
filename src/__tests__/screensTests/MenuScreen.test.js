import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import MenuScreen from '../../screens/MenuScreen';
import { fetchMenu } from '../../services/ProductService';

jest.mock('../../services/ProductService', () => ({
  fetchMenu: jest.fn(),
}));

describe('MenuScreen', () => {
  test('renders menu sections', async () => {
    const mockMenuData = [
      {
        name: 'Section 1',
        img: 'https://example.com/section1.png',
        children: [
          {
            name: 'Item 1',
            categories: ['Category 1', 'Category 2'],
          },
          {
            name: 'Item 2',
            categories: ['Category 3', 'Category 4'],
          },
        ],
      },
    ];

    fetchMenu.mockResolvedValue(mockMenuData);

    const { getByText } = render(<MenuScreen />);

    await waitFor(() => {
      const section1NameElement = getByText('Section 1');
      expect(section1NameElement).toBeTruthy();

      const item1NameElement = getByText('Item 1');
      expect(item1NameElement).toBeTruthy();

      const item2NameElement = getByText('Item 2');
      expect(item2NameElement).toBeTruthy();
    });
  });
});
