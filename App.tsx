import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./src/store/store";
import StackNavigator from "./src/navigator/StackNavigator";
import ToastContainer from "react-native-toast-message";

const App: React.FC =() => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
      <ToastContainer />
    </Provider>
  );
}

export default App;
