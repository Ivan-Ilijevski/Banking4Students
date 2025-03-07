import React from "react";
import { Modal, Pressable, Image, Dimensions } from "react-native";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import QRCode from 'react-native-qrcode-svg';

interface StudentIdScreenProps {
  isVisible: boolean;
  onClose: () => void;
  studentData: {
    name: string;
    id: string;
    faculty: string;
    photoUri: string;
  };
}

const { width } = Dimensions.get("window");

const StudentIdScreen = ({ isVisible, onClose, studentData }: StudentIdScreenProps) => {
  // QR code data - typically would be a unique identifier or verification token
  const qrValue = `STUDENT:${studentData.id}:${new Date().toISOString().split('T')[0]}`;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Pressable className="flex-1 bg-black/50 justify-center items-center" onPress={onClose}>
        <Pressable onPress={(e) => e.stopPropagation()}>
          <Box className="w-full bg-gray-300 rounded-xl p-6">
            <Box className="items-center mb-4">
              <Box className="w-24 h-24 rounded-full overflow-hidden mb-4">
                <Image 
                  source={{ uri: studentData.photoUri }}
                  className="w-full h-full"
                />
              </Box>
              <Text className="text-2xl font-bold">Student ID</Text>
            </Box>
            
            <Text className="text-base text-gray-700 leading-6">
              Student id text FOR CLAUDE AI: This is just a placeholder text, your job is to fill in with an example student id
            </Text>
            
            <Box className="items-center mt-4">
              <QRCode
                value={qrValue}
                size={200}
                color="black"
                backgroundColor="white"
              />
            </Box>
          </Box>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default StudentIdScreen;