import React, { useState, useRef, useEffect } from "react";
import { 
  Image, 
  ScrollView, 
  Pressable, 
  View, 
  Animated, 
  PanResponder,
  Dimensions,
  TextInput
} from "react-native";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { ThemedView } from "@/components/ThemedView";
import VisaCardCarousel from "@/components/VisaCardCarousel";
import TransactionItem from "@/components/TransactionItem";
import AnimatedStudentId from "@/components/AnimatedStudentId";

const { height } = Dimensions.get('window');
const DRAWER_MIN_HEIGHT = 100;
const DRAWER_HALF_HEIGHT = height * 0.4;
const DRAWER_MAX_HEIGHT = height * 0.8;

export default function HomeScreen() {
  // State for search query
  const [searchQuery, setSearchQuery] = useState("");
  
  // State for student ID 
  const [studentIdVisible, setStudentIdVisible] = useState(false);
  const [profilePosition, setProfilePosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  
  // Refs
  const profileRef = useRef(null);
  const scrollViewRef = useRef(null);
  
  // Animated values
  const drawerHeight = useRef(new Animated.Value(DRAWER_MIN_HEIGHT)).current;
  const cardsPosition = useRef(new Animated.Value(0)).current;
  
  // Move cards down when ID is expanded
  useEffect(() => {
    if (studentIdVisible) {
      Animated.timing(cardsPosition, {
        toValue: 100,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(cardsPosition, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [studentIdVisible]);
  
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

  // Get profile picture position for animation
  const measureProfilePosition = () => {
    if (profileRef.current) {
      profileRef.current.measureInWindow((x, y, width, height) => {
        setProfilePosition({ x, y, width, height });
        setStudentIdVisible(true);
      });
    }
  };

  // Student data
  const studentData = {
    name: "Петар Петровски",
    id: "12345/2022",
    faculty: "Факултет за информатички науки и компjутерско инженерство",
    department: "Компјутерски науки",
    issueDate: "2022",
    expiryDate: "2026",
    photoUri: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
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
    {
      id: "3",
      type: "Visa Premium",
      balance: "500.000 МКД",
      limit: "250 МКД",
    },
    {
      id: "4",
      type: "Visa Credit",
      balance: "2000.000 МКД",
      limit: "1000 МКД",
    },
  ];

  // Transaction data
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
  };

  return (
    <ThemedView className="flex-1 bg-gray-100">
      {/* Animated Student ID */}
      <AnimatedStudentId 
        isVisible={studentIdVisible}
        onClose={() => setStudentIdVisible(false)}
        profilePictureRef={profileRef}
        profilePicturePosition={profilePosition}
        studentData={studentData}
      />
      
      {/* Main Content */}
      <ScrollView 
        ref={scrollViewRef}
        className="flex-1 p-4"
      >
        {/* Profile Circle */}
        <Box className="items-center mb-6 mt-4">
          <Pressable 
            ref={profileRef}
            className="w-24 h-24 rounded-full overflow-hidden"
            onPress={measureProfilePosition}
          >
            <Image
              source={{ uri: studentData.photoUri }}
              className="w-full h-full"
            />
          </Pressable>
        </Box>

        {/* Cards Section - slide down when ID is shown */}
        <Animated.View 
          style={{
            marginTop: cardsPosition,
            backgroundColor: "#f0f0f0",
            borderRadius: 12,
            padding: 8,
            marginBottom: 24,
          }}
        >
          <VisaCardCarousel cards={visaCards} />
        </Animated.View>
        
        {/* Spacer */}
        <View className="h-32" />
      </ScrollView>

      {/* Custom Bottom Drawer - slide down when ID is shown */}
      <Animated.View 
        style={[
          { 
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: drawerHeight,
            transform: [{ translateY: cardsPosition }],
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 10,
            overflow: "hidden",
          }
        ]}
      >
        {/* Drag Handle */}
        <View 
          {...panResponder.panHandlers}
          className="w-full items-center pt-2"
        >
          <View className="w-10 h-1 bg-gray-300 rounded mb-1" />
          <Pressable onPress={expandDrawer} className="w-full px-4 py-2 flex-row items-center justify-between border-b border-gray-200">
            <Text className="text-lg font-bold">Трансакции</Text>
          </Pressable>
        </View>

        {/* Search Bar */}
        <Box className="p-4 border-b border-gray-200">
          <TextInput
            className="bg-gray-100 rounded-lg p-2 text-base"
            placeholder="Пребарувај трансакции..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </Box>

        {/* Transactions List */}
        <ScrollView className="flex-1 p-4">
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
            <Box className="p-5 items-center">
              <Text className="text-gray-500 text-base">Нема пронајдени трансакции</Text>
            </Box>
          )}
        </ScrollView>
      </Animated.View>
    </ThemedView>
  );
}