import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { BasketItem } from "../typeUtilities/interface";
import { removeFromBasket, updateQuantity } from "../store/actions";
import { AppState } from "../store/reducers";

const BasketScreen: React.FC = () => {
  const dispatch = useDispatch();
  const basketItems = useSelector((state: AppState) => state.basketItems);

  const handleRemoveItem = (item: BasketItem) => {
    dispatch(removeFromBasket(item.id));
  };

  const handleQuantityChange = (item: BasketItem, newQuantity: number) => {
    dispatch(updateQuantity(item.id, newQuantity));
  };

  const renderBasketItem = ({ item }: { item: BasketItem }) => (
    <View style={styles.basketItemContainer}>
      <Text style={styles.itemName}>Name: {item.name}</Text>
      <Text style={styles.itemPrice}>Price: ${item.totalPrice}</Text>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityLabel}>Quantity: </Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(item, item.quantity - 1)}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(item, item.quantity + 1)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveItem(item)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <Text style={styles.header}>Basket</Text>
      <FlatList
        data={basketItems}
        renderItem={renderBasketItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  basketItemContainer: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: "#f2f2f2",
  },
  itemName: {
    fontSize: 18,
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 16,
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  quantityLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
  removeButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default BasketScreen;
