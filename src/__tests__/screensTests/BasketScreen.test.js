import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BasketScreen from '../../screens/BasketScreen';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';


describe('BasketScreen', () => {
  const mockDispatch = jest.fn();
  const mockStore = configureStore();
  jest.mock('react-redux', () => ({
    useDispatch: () => mockDispatch,
    useSelector: jest.fn(),
  }));

  const store = mockStore({
    basketItems: [
      {
        id: 1,
        name: 'Item 1',
        totalPrice: 10,
        quantity: 2,
      },
      {
        id: 2,
        name: 'Item 2',
        totalPrice: 5,
        quantity: 1,
      },
    ],
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the header', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BasketScreen />
      </Provider>
    );
    const headerElement = getByText('Basket');
    expect(headerElement).toBeTruthy();
  });

  // test that basket items were rendered
  test('renders the basket items', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BasketScreen />
      </Provider>
    );
    const item1NameElement = getByText('Name: Item 1');
    const item2NameElement = getByText('Name: Item 2');
    expect(item1NameElement).toBeTruthy();
    expect(item2NameElement).toBeTruthy();
  });


  // test that item can be removed from basket
  test('handles item removal', () => {
    const { getByText, getAllByText } = render(
      <Provider store={store}>
        <BasketScreen />
      </Provider>
    );
    const removeButton = getAllByText('Remove');
    fireEvent.press(removeButton[0]);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });


  // test that quantity can be changed
  test('handles quantity change', () => {
    const { getByText, getAllByText } = render(
      <Provider store={store}>
        <BasketScreen />
      </Provider>
    );
    const minusButton = getAllByText('-');
    const plusButton = getAllByText('+');
    fireEvent.press(minusButton[0]);
    fireEvent.press(plusButton[0]);
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });
});
