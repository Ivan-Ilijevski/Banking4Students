import React, { useState, useRef, useEffect } from "react";
import { 
  Image, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  View, 
  Animated, 
  PanResponder,
  Dimensions,
  TextInput
} from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { ThemedView } from "@/components/ThemedView";
import VisaCard from "@/components/VisaCard";
import TransactionItem from "@/components/TransactionItem";

const { height, width } = Dimensions.get('window');
const DRAWER_MIN_HEIGHT = 100;
const DRAWER_HALF_HEIGHT = height * 0.4;
const DRAWER_MAX_HEIGHT = height * 0.8;

export default function HomeScreen() {
  // State for search query
  const [searchQuery, setSearchQuery] = useState("");
  
  // Animated value for the drawer position
  const drawerHeight = useRef(new Animated.Value(DRAWER_MIN_HEIGHT)).current;
  
  // PanResponder for dragging the drawer
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newHeight = DRAWER_MIN_HEIGHT - gestureState.dy;
        if (newHeight >= DRAWER_MIN_HEIGHT && newHeight <= DRAWER_MAX_HEIGHT) {
          drawerHeight.setValue(newHeight);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const newHeight = DRAWER_MIN_HEIGHT - gestureState.dy;
        
        let snapToHeight;
        if (newHeight < (DRAWER_MIN_HEIGHT + DRAWER_HALF_HEIGHT) / 2) {
          snapToHeight = DRAWER_MIN_HEIGHT;
        } else if (newHeight < (DRAWER_HALF_HEIGHT + DRAWER_MAX_HEIGHT) / 2) {
          snapToHeight = DRAWER_HALF_HEIGHT;
        } else {
          snapToHeight = DRAWER_MAX_HEIGHT;
        }
        
        Animated.spring(drawerHeight, {
          toValue: snapToHeight,
          useNativeDriver: false,
          friction: 8,
        }).start();
      },
    })
  ).current;

  // Expand the drawer when tapping on the header
  const expandDrawer = () => {
    Animated.spring(drawerHeight, {
      toValue: DRAWER_HALF_HEIGHT,
      useNativeDriver: false,
      friction: 8,
    }).start();
  };

  // Visa card data
  const visaCards = [
    {
      id: "1",
      type: "Visa debit Sudent",
      balance: "1000.000.000 МКД",
      limit: "100 МКД",
    },
    {
      id: "2",
      type: "Visa debit Sudent",
      balance: "1000.000.000 МКД",
      limit: "100 МКД",
    },
  ];

  // Transaction data - expanded with more transactions
  const allTransactions = [
    {
      id: "1", 
      company: "ТИНЕКС",
      location: "ДОО. Скопје",
      amount: "200 Ден.",
      date: "12 Март",
      logo: require("@/assets/images/tinex-logo.png"),
    },
    {
      id: "2", 
      company: "ТИНЕКС",
      location: "ДОО. Скопје",
      amount: "200 Ден.",
      date: "10 Март",
      logo: require("@/assets/images/tinex-logo.png"),
    },
    {
      id: "3", 
      company: "ТИНЕКС",
      location: "ДОО. Скопје",
      amount: "200 Ден.",
      date: "8 Март",
      logo: require("@/assets/images/tinex-logo.png"),
    },
    {
      id: "4", 
      company: "Аптека",
      location: "ДОО. Скопје",
      amount: "450 Ден.",
      date: "5 Март",
      logo: require("@/assets/images/tinex-logo.png"),
    },
    {
      id: "5", 
      company: "Кафе Бар",
      location: "Скопје",
      amount: "180 Ден.",
      date: "4 Март",
      logo: require("@/assets/images/tinex-logo.png"),
    },
    {
      id: "6", 
      company: "Такси",
      location: "Скопје",
      amount: "300 Ден.",
      date: "3 Март",
      logo: require("@/assets/images/tinex-logo.png"),
    },
    {
      id: "7", 
      company: "Ресторан",
      location: "Скопје",
      amount: "1200 Ден.",
      date: "1 Март",
      logo: require("@/assets/images/tinex-logo.png"),
    },
    {
      id: "8", 
      company: "Книжара",
      location: "Скопје",
      amount: "500 Ден.",
      date: "28 Фев",
      logo: require("@/assets/images/tinex-logo.png"),
    },
  ];

  // Filtered transactions based on search
  const filteredTransactions = allTransactions.filter(
    (transaction) =>
      transaction.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle split bill functionality
  const handleSplitBill = (transactionId) => {
    console.log("Split bill for transaction:", transactionId);
    // Implement split bill functionality
  };

  return (
    <ThemedView style={styles.container}>
      {/* Main Content */}
      <ScrollView style={styles.scrollView}>
        {/* Profile Circle */}
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" }}
              style={styles.profileImage}
            />
          </View>
        </View>

        {/* Cards Section */}
        <View style={styles.cardsContainer}>
          {visaCards.map((card) => (
            <VisaCard
              key={card.id}
              type={card.type}
              balance={card.balance}
              limit={card.limit}
            />
          ))}
        </View>
        
        {/* Spacer to prevent content from being hidden behind the drawer */}
        <View style={{ height: DRAWER_MIN_HEIGHT + 50 }} />
      </ScrollView>

      {/* Custom Bottom Drawer */}
      <Animated.View 
        style={[
          styles.drawer,
          { height: drawerHeight }
        ]}
      >
        {/* Drag Handle */}
        <View 
          {...panResponder.panHandlers}
          style={styles.drawerHandle}
        >
          <View style={styles.dragIndicator} />
          <TouchableOpacity onPress={expandDrawer} style={styles.drawerHeader}>
            <Text style={styles.drawerTitle}>Трансакции</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Пребарувај трансакции..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Transactions List */}
        <ScrollView style={styles.transactionList}>
          {filteredTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              id={transaction.id}
              company={transaction.company}
              location={transaction.location}
              amount={transaction.amount}
              date={transaction.date}
              logo={transaction.logo}
              onSplitBill={() => handleSplitBill(transaction.id)}
            />
          ))}
          
          {filteredTransactions.length === 0 && (
            <View style={styles.emptyResults}>
              <Text style={styles.emptyResultsText}>Нема пронајдени трансакции</Text>
            </View>
          )}
        </ScrollView>
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 24,
    marginTop: 16,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  cardsContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    padding: 8,
    marginBottom: 24,
  },
  drawer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
    overflow: "hidden",
  },
  drawerHandle: {
    width: "100%",
    alignItems: "center",
    paddingTop: 8,
  },
  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: "#ddd",
    borderRadius: 5,
    marginBottom: 5,
  },
  drawerHeader: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  searchInput: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  transactionList: {
    flex: 1,
    padding: 16,
  },
  emptyResults: {
    padding: 20,
    alignItems: "center",
  },
  emptyResultsText: {
    color: "#999",
    fontSize: 16,
  },
});