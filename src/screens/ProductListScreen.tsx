import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useDispatch } from "react-redux";
import { Product } from "../typeUtilities/interface";
import { addToBasket } from "../store/actions";
import { fetchProducts } from "../services/ProductService";
import Toast from "react-native-toast-message";

const ProductListScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };
    fetchProductData();
  }, []);

  const handleAddToBasket = (product: Product) => {
    dispatch(addToBasket(product));
    Toast.show({
      type: "success",
      text1: "Product has been added to the Basket",
      position: "bottom",
      visibilityTime: 1000,
    });
  };

  const renderProductItem = ({ item }: { item: Product }) => {
    return (
      <TouchableOpacity
        onPress={() => handleAddToBasket(item)}
        style={{ backgroundColor: "gray", marginTop: 10 }}
      >
        <View>
          <Text>Name: {item.name}</Text>
          <Text>Price: {item.price}</Text>
          <Text>Info: {item.info}</Text>
          <Image
            source={{ uri: item.img }}
            style={{ width: 100, height: 100 }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, alignSelf: "center" }}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item, index) => item.id?.toString()}
      />
    </View>
  );
};

export default ProductListScreen;
