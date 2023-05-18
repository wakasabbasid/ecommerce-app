import { MenuSection, Product } from "../typeUtilities/interface";

const API_BASE_URL =
  "https://my-json-server.typicode.com/benirvingplt/products";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching products:", error);
    throw error;
  }
}

export async function fetchProductById(productId: number): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching product by ID:", error);
    throw error;
  }
}

export async function fetchMenu(): Promise<MenuSection[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/menu`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching menu:", error);
    throw error;
  }
}
