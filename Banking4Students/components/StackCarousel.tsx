import * as React from "react";
import { Dimensions, Text, View, StyleSheet } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

const width = Dimensions.get("window").width;

interface StackCarouselProps {
  data: {
    title: string;
    balanceLabel: string;
    balance: string;
    limitLabel: string;
    limit: string;
  }[];
}

function StackCarousel({ data }: StackCarouselProps) {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({ count: index - progress.value, animated: true });
  };

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        ref={ref}
        width={width * 0.9}
        height={200}
        data={data}
        loop={false}
        onProgressChange={progress}
        style={{ alignSelf: "center" }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.label}>{item.balanceLabel}</Text>
            <Text style={styles.value}>{item.balance}</Text>
            <Text style={styles.label}>{item.limitLabel}</Text>
            <Text style={styles.value}>{item.limit}</Text>
          </View>
        )}
      />

      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    padding: 16,
    justifyContent: "center",
    height: 180,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginBottom: 6,
  },
});

export default StackCarousel;
