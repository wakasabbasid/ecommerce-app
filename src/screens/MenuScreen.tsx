import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { fetchMenu } from "../services/ProductService";
import { MenuSection } from "../typeUtilities/interface";

const MenuScreen: React.FC = () => {
  const [menuData, setMenuData] = useState<MenuSection[]>([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const data = await fetchMenu();
        setMenuData(data);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };
    fetchMenuData();
  }, []);
  const renderSection = ({ item }: { item: MenuSection }) => {
    return (
      <View style={{ marginBottom: 16 }}>
        <Image
          source={{ uri: item.img }}
          style={{ width: "100%", height: 200 }}
        />
        <Text style={{ fontSize: 25, fontWeight: "bold", marginVertical: 8 }}>
          {item.name}
        </Text>
        <FlatList
          data={item.children}
          renderItem={({ item }) => (
            <View style={{ marginLeft: 16 }}>
              <Text style={{ fontSize: 16, marginBottom: 4 }}>{item.name}</Text>
              <FlatList
                data={item.categories}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      borderWidth: 2,
                      borderColor: "gray",
                      width: "50%",
                      marginTop: 5,
                      backgroundColor: "gray",
                    }}
                  >
                    <Text style={{ marginLeft: 16 }}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
              />
            </View>
          )}
          keyExtractor={(item) => item.name}
        />
      </View>
    );
  };

  return (
    <FlatList
      data={menuData}
      renderItem={renderSection}
      keyExtractor={(item) => item.name}
    />
  );
};

export default MenuScreen;
