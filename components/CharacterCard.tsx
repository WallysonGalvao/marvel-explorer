import { Character } from "@/types/character";
import { getImageUrl } from "@/utils/get-image-url";
import { Platform, StyleSheet, Text, View } from "react-native";

import { Image } from "expo-image";
import { Link } from "expo-router";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";

interface CharacterCardProps {
  character: Character;
}

const AnimatedLink = Animated.createAnimatedComponent(Link);

const CharacterCard = ({ character }: CharacterCardProps) => {
  const imageUrl = getImageUrl(character.thumbnail, "detail");

  return (
    <AnimatedLink
      href={{
        pathname: `/character-details/[id]`,
        params: { id: character.id },
      }}
      className="bg-white rounded-xl overflow-hidden mx-2 mb-2 shadow-md"
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(500)}
      layout={LinearTransition.duration(500)}
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          className="w-full h-[600px]"
          contentFit="contain"
        />
      ) : (
        <View className="bg-muted flex items-center justify-center text-muted-foreground w-full h-40">
          <Text>No image</Text>
        </View>
      )}

      <View className="p-3">
        <Text className="font-bold text-base" numberOfLines={1}>
          {character.name}
        </Text>
        <Text className="text-gray-500 text-xs mt-1" numberOfLines={2}>
          {character.description || "No description available"}
        </Text>
      </View>
    </AnimatedLink>
  );
};

export default CharacterCard;

const styles = StyleSheet.create({
  image: Platform.select({
    web: {},
    default: {
      width: "100%",
      height: 400,
    },
  }),
});
