import { expect } from "jest";
import { render } from "@testing-library/react-native";
import ProductListScreen from "../../screens/ProductListScreen";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe("ProductListScreen", () => {
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
        name: 'Product 1',
        totalPrice: 10,
        quantity: 2,
        price: 10
      },
      {
        id: 2,
        name: 'Product 2',
        totalPrice: 5,
        quantity: 1,
        price: 10
      },
    ],
  });
  // render the component
  const { getByText } = render(<Provider store={store}><ProductListScreen /></Provider>);

  it("should render correctly", () => {
    expect(getByText("Name: Product 1")).toBeInTheDocument();
    expect(getByText("Price: $10")).toBeInTheDocument();
    expect(getByText("Info: This is product 1")).toBeInTheDocument();
  });

  // test that the component renders the correct number of product items
  it("should render the correct number of product items", () => {
    expect(getByText("Name: Product 3")).toBeFalsy();
  });

  // test that the product items are rendered correctly
  it("should render the product items correctly", () => {
    expect(getByText("Name: Product 1").textContent).toBe("Name: Product 1");
    expect(getByText("Price: $10").textContent).toBe("Price: $10");
    expect(getByText("Info: This is product 1").textContent).toBe("Info: This is product 1");
  });
});
