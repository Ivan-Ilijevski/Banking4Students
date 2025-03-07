import * as React from "react";
import { View, Dimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { Box } from "@/components/ui/box";
import VisaCard from "./VisaCard";

const width = Dimensions.get("window").width;

interface VisaCardData {
  id: string;
  type: string;
  balance: string;
  limit: string;
}

interface VisaCardCarouselProps {
  cards: VisaCardData[];
}

function VisaCardCarousel({ cards }: VisaCardCarouselProps) {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  // Calculate how many pages we need based on showing 2 cards per page
  const groupedCards = [];
  for (let i = 0; i < cards.length; i += 2) {
    groupedCards.push(cards.slice(i, i + 2));
  }

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({ count: index - progress.value, animated: true });
  };

  return (
    <Box className="w-full">
      <Carousel
        ref={ref}
        width={width * 0.9}
        height={180}
        data={groupedCards}
        loop={false}
        onProgressChange={progress}
        style={{ alignSelf: "center" }}
        renderItem={({ item }) => (
          <View className="flex-1 gap-2">
            {item.map((card) => (
              <VisaCard
                key={card.id}
                type={card.type}
                balance={card.balance}
                limit={card.limit}
              />
            ))}
          </View>
        )}
      />

      <Pagination.Basic
        progress={progress}
        data={groupedCards}
        dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />
    </Box>
  );
}

export default VisaCardCarousel;