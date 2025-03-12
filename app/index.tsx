import { Text, TextInput, TouchableOpacity, View } from "react-native";

import response from "../response.json";
import CharacterCard from "@/components/CharacterCard";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { Character } from "@/types/character";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  // const { data, isLoading, refetch } = useQuery({
  //   queryKey: ["characters", searchQuery],
  //   queryFn: () =>
  //     getCharacters({
  //       nameStartsWith: searchQuery || undefined,
  //       limit: 20,
  //       offset: 0,
  //     }),
  // });

  const renderItem = ({ item }: { item: Character }) => (
    <CharacterCard character={item} />
  );

  const renderEmpty = () => {
    return (
      <View className="flex-1 justify-center items-center p-10">
        <Text className="text-lg text-gray-500 text-center">
          No characters found. Try a different search.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      className="flex-1 bg-gray-50 container self-center"
      edges={["top"]}
    >
      <View className="px-4 pt-4 pb-2">
        <View className="space-y-2 text-center">
          <Text className="text-3xl md:text-5xl font-bold tracking-tight text-center">
            Discover Marvel Characters
          </Text>
          <Text className="text-lg text-muted-foreground max-w-2xl mx-auto text-center">
            Explore the vast universe of Marvel superheroes and villains with
            our elegantly designed browser
          </Text>
        </View>

        <View className="flex-row items-center my-4 bg-white rounded-full px-4 p-2 border border-gray-200">
          <Ionicons name="search" size={20} color="#777" />
          <TextInput
            className="flex-1 p-2 pl-2 text-base"
            placeholder="Search characters..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#777" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlashList
        data={response.data.results}
        renderItem={renderItem}
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={onRefresh}
        //     colors={["#ED1D24"]}
        //   />
        // }
        ListEmptyComponent={renderEmpty}
      />
    </SafeAreaView>
  );
}
