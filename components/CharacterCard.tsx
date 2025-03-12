import { Character } from "@/types/character";
import { getImageUrl } from "@/utils/get-image-url";
import { Platform, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
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
      className="bg-white rounded-xl overflow-hidden mx-4 mb-2 shadow-md"
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(500)}
      layout={LinearTransition.duration(500)}
    >
      <View className="relative w-full h-[210px]">
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            className="h-full"
            contentFit="cover"
          />
        ) : (
          <View className="bg-muted flex items-center justify-center text-muted-foreground w-full h-40">
            <Text>No image</Text>
          </View>
        )}

        <View className="p-3 absolute z-10 bottom-0 left-0 right-0">
          <Text className="font-bold text-white text-lg" numberOfLines={1}>
            {character.name}
          </Text>
          <Text className="text-white text-xs mt-1" numberOfLines={2}>
            {character.description || "No description available"}
          </Text>
        </View>

        <LinearGradient
          colors={["transparent", "transparent", "rgba(0,0,0,0.9)"]}
          style={styles.gradient}
        />
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
      height: "100%",
    },
  }),
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    zIndex: 1,
  },
});
