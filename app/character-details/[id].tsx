import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";

import response from "../../response.json";
import { Ionicons } from "@expo/vector-icons";
import { useLayoutEffect } from "react";
import { Image } from "expo-image";

const isLoading = false;

export default function CharacterDetails() {
  const navigation = useNavigation();
  const router = useRouter();
  const { id: characterId } = useLocalSearchParams<{ id: string }>();

  // const { data, isLoading } = useQuery({
  //   queryKey: ["character", characterId],
  //   queryFn: () => getCharacterById(characterId),
  // });

  const character = response.data.results.find(
    (character) => character.id.toString() === characterId
  );

  useLayoutEffect(() => {
    if (!character) {
      return;
    }
    navigation.setOptions({
      headerTitle: character.name,
      headerRight: () => (
        <TouchableOpacity className="bg-black/30 rounded-full p-2 web:mr-4">
          <Ionicons name="heart-outline" size={20} color="white" />
        </TouchableOpacity>
      ),
    });
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#ED1D24" />
      </View>
    );
  }

  if (!character) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-lg text-center">Character not found</Text>
        <TouchableOpacity
          className="mt-4 bg-marvel-red px-4 py-2 rounded-lg"
          onPress={router.back}
        >
          <Text className="text-white font-semibold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="bg-white">
      <View>
        <Image
          source={{
            uri: `${character.thumbnail.path}.${character.thumbnail.extension}`,
          }}
          style={styles.image}
          className="w-full h-[600px]"
          contentFit="cover"
        />
      </View>

      <View className="p-4">
        <Text className="text-3xl font-bold text-gray-900">
          {character.name}
        </Text>

        <View className="mt-4">
          <Text className="text-lg font-semibold text-gray-800">
            Description
          </Text>
          <Text className="mt-2 text-gray-600 leading-6">
            {character.description ||
              "No description available for this character."}
          </Text>
        </View>

        <View className="mt-6">
          <Text className="text-lg font-semibold text-gray-800">Comics</Text>
          <Text className="text-gray-500 mt-1">
            {character.comics.available} comics available
          </Text>

          {character.comics.items.length > 0 ? (
            <View className="mt-2">
              {character.comics.items.slice(0, 5).map((comic, index) => (
                <View key={index} className="bg-gray-100 p-3 mb-2 rounded-lg">
                  <Text className="text-gray-800">{comic.name}</Text>
                </View>
              ))}
              {character.comics.items.length > 5 && (
                <Text className="text-marvel-red font-semibold mt-2">
                  + {character.comics.items.length - 5} more comics
                </Text>
              )}
            </View>
          ) : (
            <View className="bg-gray-100 p-4 my-2 rounded-lg">
              <Text className="text-gray-500 text-center">
                No comics available
              </Text>
            </View>
          )}
        </View>

        <View className="mt-6">
          <Text className="text-lg font-semibold text-gray-800">Series</Text>
          <Text className="text-gray-500 mt-1">
            {character.series.available} series available
          </Text>

          {character.series.items.length > 0 ? (
            <View className="mt-2">
              {character.series.items.slice(0, 3).map((series, index) => (
                <View key={index} className="bg-gray-100 p-3 mb-2 rounded-lg">
                  <Text className="text-gray-800">{series.name}</Text>
                </View>
              ))}
              {character.series.items.length > 3 && (
                <Text className="text-marvel-red font-semibold mt-2">
                  + {character.series.items.length - 3} more series
                </Text>
              )}
            </View>
          ) : (
            <View className="bg-gray-100 p-4 my-2 rounded-lg">
              <Text className="text-gray-500 text-center">
                No series available
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: Platform.select({
    web: {},
    default: {
      width: "100%",
      //height: 256,
      height: 400,
    },
  }),
});
