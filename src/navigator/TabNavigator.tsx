import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BasketScreen from "../screens/BasketScreen";
import MenuScreen from "../screens/MenuScreen";
import ProductListScreen from "../screens/ProductListScreen";

const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Product" component={ProductListScreen} />
      <Tab.Screen name="Basket" component={BasketScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
