import React, { useRef, useState, useEffect } from "react";
import {
  Animated,
  Pressable,
  Dimensions,
  Image,
  BackHandler,
  Platform,
  View,
  TouchableOpacity,
} from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import QRCode from "react-native-qrcode-svg";
import * as ScreenOrientation from 'expo-screen-orientation';

const { width, height } = Dimensions.get("window");

interface AnimatedStudentIdProps {
  isVisible: boolean;
  onClose: () => void;
  profilePictureRef: any;
  profilePicturePosition: { x: number; y: number; width: number; height: number };
  studentData: {
    name: string;
    id: string;
    faculty: string;
    department: string;
    issueDate: string;
    expiryDate: string;
    photoUri: string;
  };
}

const AnimatedStudentId = ({
  isVisible,
  onClose,
  profilePicturePosition,
  studentData,
}: AnimatedStudentIdProps) => {
  const [expanded, setExpanded] = useState(false);
  const [landscapeMode, setLandscapeMode] = useState(false);
  
  // Animation values
  const animation = useRef(new Animated.Value(0)).current;
  const landscapeOpacity = useRef(new Animated.Value(0)).current;
  
  // Handle back button on Android
  useEffect(() => {
    const backAction = () => {
      if (landscapeMode) {
        handleBackFromLandscape();
        return true;
      } else if (expanded) {
        onClose();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [expanded, landscapeMode]);

  // Handle visibility changes
  useEffect(() => {
    if (isVisible) {
      setExpanded(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setExpanded(false);
        if (landscapeMode) {
          setLandscapeMode(false);
          resetOrientation();
        }
      });
    }
  }, [isVisible]);

  // Lock screen orientation when in landscape mode
  const lockLandscapeOrientation = async () => {
    if (Platform.OS !== 'web') {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    }
  };

  // Reset orientation
  const resetOrientation = async () => {
    if (Platform.OS !== 'web') {
      await ScreenOrientation.unlockAsync();
    }
  };

  const handleRotateToLandscape = async () => {
    // Lock to landscape orientation
    await lockLandscapeOrientation();
    
    // Start fade animation
    setLandscapeMode(true);
    Animated.timing(landscapeOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleBackFromLandscape = async () => {
    // Start fade out animation
    Animated.timing(landscapeOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(async () => {
      setLandscapeMode(false);
      await resetOrientation();
    });
  };

  // Calculate animations
  const cardStyle = {
    position: "absolute",
    width: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [profilePicturePosition.width, width * 0.9],
    }),
    height: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [profilePicturePosition.height, height * 0.4],
    }),
    borderRadius: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [profilePicturePosition.width / 2, 8],
    }),
    left: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [profilePicturePosition.x, width * 0.05],
    }),
    top: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [profilePicturePosition.y, height * 0.15],
    }),
    backgroundColor: "white",
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: expanded ? 999 : -1,
  };

  // Content opacity animation
  const contentOpacity = animation.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [0, 0, 1],
  });

  // Profile picture fade out animation
  const profileOpacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 0],
  });

  // QR code value
  const qrValue = `STUDENT:${studentData.id}:${studentData.issueDate}`;

  if (!isVisible && !expanded) {
    return null;
  }

  return (
    <>
      {/* Portrait mode ID */}
      <Animated.View style={cardStyle}>
        <Pressable onPress={handleRotateToLandscape}>
          {/* Profile picture (fades out during animation) */}
          <Animated.View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              opacity: profileOpacity,
              borderRadius: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [profilePicturePosition.width / 2, 8],
              }),
              overflow: "hidden",
              zIndex: 1,
            }}
          >
            <Image
              source={{ uri: studentData.photoUri }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </Animated.View>

          {/* ID Card Content */}
          <Animated.View
            style={{
              opacity: contentOpacity,
              width: "100%",
              height: "100%",
              padding: 12,
            }}
          >
            <VStack className="h-full">
              {/* Header with University name */}
              <HStack className="justify-between items-start mb-1">
                <VStack className="w-3/4">
                  <Text className="text-[10px] font-bold text-red-800">РЕПУБЛИКА СЕВЕРНА МАКЕДОНИЈА</Text>
                  <Text className="text-[12px] font-bold text-red-800">УНИВЕРЗИТЕТ „СВ. КИРИЛ И МЕТОДИЈ" - СКОПЈЕ</Text>
                  <Text className="text-[9px] text-gray-500 italic">(име и седиште на единицата)</Text>
                </VStack>
                <View className="w-14 h-14">
                  <Image 
                    source={require("@/assets/images/ukim-logo.png")} 
                    className="w-full h-full"
                    resizeMode="contain"
                  />
                </View>
              </HStack>

            
              {/* Student ID details */}

              <Text className="text-lg font-bold text-center text-red-800 mb-2">СТУДЕНТСКА ЛЕГИТИМАЦИЈА</Text>

              <HStack className="mb-2">
                <VStack className="w-3/5">
                  <HStack className="items-center mb-1">
                    <Text className="text-xs text-gray-600">Година на издавање: </Text>
                    <Text className="text-xs">{studentData.issueDate}</Text>
                  </HStack>
                  <HStack className="items-center mb-1">
                    <Text className="text-xs text-gray-600">Година на истекување: </Text>
                    <Text className="text-xs">{studentData.expiryDate}</Text>
                  </HStack>
                </VStack>
                <VStack className="w-2/5">
                  <Text className="text-xs text-gray-600">Студентски иденти-</Text>
                  <Text className="text-xs text-gray-600">фикациски број</Text>
                  <Text className="text-sm font-bold text-center">{studentData.id}</Text>
                </VStack>
              </HStack>

              <HStack className="items-start">
                <VStack className="w-3/5">
                  <Text className="text-xs text-gray-600 italic">(име и презиме)</Text>
                  <Text className="text-base font-bold mb-1">{studentData.name}</Text>
                  
                  <Text className="text-xs text-gray-600 italic">(датум на раѓање)</Text>
                  <Text className="text-sm mb-1">15.05.1999</Text>
                  
                  <Text className="text-xs text-gray-600 italic mt-auto mb-1">(потпис на овластено лице)</Text>
                  <View className="h-6 border-b border-gray-400" />
                </VStack>
                
                <VStack className="w-2/5 items-center">
                  <Text className="text-xs text-gray-600 self-end">фотографија</Text>
                  <View className="w-20 h-24 border border-gray-400 justify-center items-center">
                    <Image
                      source={{ uri: studentData.photoUri }}
                      style={{ width: "90%", height: "90%" }}
                      resizeMode="cover"
                    />
                  </View>
                </VStack>
              </HStack>
              
              <Text className="text-xs text-gray-400 italic text-center mt-auto">
                Tap to rotate
              </Text>
            </VStack>
          </Animated.View>
        </Pressable>
      </Animated.View>

      {/* Landscape Mode (rotated 90 degrees) */}
      {landscapeMode && (
        <Animated.View
          style={{
            position: "absolute",
            width: height * 0.9,
            height: width * 0.7,
            top: (width - (width * 0.7)) / 2,
            left: (height - (height * 0.9)) / 2,
            backgroundColor: "white",
            borderRadius: 8,
            padding: 16,
            opacity: landscapeOpacity,
            zIndex: 1000,
            elevation: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
          }}
        >
          <HStack className="h-full">
            {/* Left side (header and personal info) */}
            <VStack className="w-3/5 justify-between">
              {/* University header */}
              <VStack>
                <HStack className="items-start">
                  <Image 
                    source={require("@/assets/images/ukim-logo.png")} 
                    style={{ width: 40, height: 40 }}
                    resizeMode="contain"
                  />
                  <VStack className="ml-2">
                    <Text className="text-xs font-bold text-red-800">РЕПУБЛИКА СЕВЕРНА МАКЕДОНИЈА</Text>
                    <Text className="text-sm font-bold text-red-800">УНИВЕРЗИТЕТ „СВ. КИРИЛ И МЕТОДИЈ" - СКОПЈЕ</Text>
                  </VStack>
                </HStack>
                <Text className="text-lg font-bold text-red-800 mt-2 mb-3">СТУДЕНТСКА ЛЕГИТИМАЦИЈА</Text>
              </VStack>

              {/* Student Info */}
              <VStack className="flex-1 justify-evenly">
                <HStack>
                  <Text className="text-sm font-medium w-1/2">Име и презиме:</Text>
                  <Text className="text-sm font-bold">{studentData.name}</Text>
                </HStack>
                <HStack>
                  <Text className="text-sm font-medium w-1/2">Студентски број:</Text>
                  <Text className="text-sm font-bold">{studentData.id}</Text>
                </HStack>
                <HStack>
                  <Text className="text-sm font-medium w-1/2">Факултет:</Text>
                  <Text className="text-sm">{studentData.faculty}</Text>
                </HStack>
                <HStack>
                  <Text className="text-sm font-medium w-1/2">Насока:</Text>
                  <Text className="text-sm">{studentData.department}</Text>
                </HStack>
                <HStack>
                  <Text className="text-sm font-medium w-1/2">Важи до:</Text>
                  <Text className="text-sm">{studentData.expiryDate}</Text>
                </HStack>
              </VStack>
              
              {/* Back button */}
              <TouchableOpacity 
                onPress={handleBackFromLandscape}
                className="bg-gray-200 rounded-lg py-2 px-4 self-start mt-2"
              >
                <HStack className="items-center">
                  <Text className="text-sm font-medium">Back</Text>
                </HStack>
              </TouchableOpacity>
            </VStack>

            {/* Right side (photo and QR) */}
            <VStack className="w-2/5 items-center justify-between">
              {/* Photo */}
              <View className="w-32 h-36 border border-gray-400 mt-2">
                <Image
                  source={{ uri: studentData.photoUri }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              </View>
              
              {/* QR Code */}
              <VStack className="items-center mb-4">
                <QRCode
                  value={qrValue}
                  size={110}
                  color="black"
                  backgroundColor="white"
                />
                <Text className="text-xs text-gray-500 mt-1">
                  Scan for verification
                </Text>
              </VStack>
            </VStack>
          </HStack>
        </Animated.View>
      )}
    </>
  );
};

export default AnimatedStudentId;