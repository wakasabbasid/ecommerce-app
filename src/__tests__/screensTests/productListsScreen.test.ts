import { useDispatch } from "react-redux";
import { addToBasket } from "../../store/actions";
import { fetchProducts } from "../../services/ProductService";
import Toast from "react-native-toast-message";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
}));

jest.mock("../services/ProductService", () => ({
  fetchProducts: jest.fn(() => Promise.resolve([])),
}));

describe("ProductListScreen", () => {
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(jest.fn());
  });

  it("renders the product list correctly", async () => {
    const mockProducts = [
      { id: 1, name: "Product 1", price: 10, info: "Info 1", img: "image1.jpg" },
      { id: 2, name: "Product 2", price: 20, info: "Info 2", img: "image2.jpg" },
    ];

    (fetchProducts as jest.Mock).mockReturnValueOnce(Promise.resolve(mockProducts));
    await Promise.resolve();

    expect(addToBasket).toHaveBeenCalledWith(mockProducts[0]);

    expect(Toast.show).toHaveBeenCalledWith({
      type: "success",
      text1: "Product has been added to the Basket",
      position: "bottom",
      visibilityTime: 1000,
    });
  });
});
