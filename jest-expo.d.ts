declare module "jest-expo" {
    import { RenderAPI } from "react-native";
  
    const render: (component: React.ReactElement<any>) => RenderAPI;
  
    export { render };
  }
  