import React from "react";
import { Image } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";

interface VisaCardProps {
  type: string;
  balance: string;
  limit: string;
}

export const VisaCard = ({ type, balance, limit }: VisaCardProps) => {
  return (
    <Box className="bg-gray-200 rounded-lg p-4 my-1 w-full">
      <HStack space="md">
        {/* Card image - green with Mastercard logo */}
        <Box className="w-20 h-16 rounded-md bg-green-500 p-2 overflow-hidden relative">
          <Box className="absolute right-1 top-1">
            <Image
              source={require("@/assets/images/mastercard-logo.png")}
              style={{ width: 20, height: 16 }}
              resizeMode="contain"
            />
          </Box>
          
          <Text className="text-[8px] text-white absolute bottom-1 left-1">
            **** **** **** 7890
          </Text>
        </Box>
        
        {/* Card details */}
        <VStack className="flex-1">
          <Text className="text-sm">{type}</Text>
          <HStack space="md">
            <Text className="text-xs text-gray-600">Расположиви средства</Text>
            <Text className="text-xs ml-auto">{balance}</Text>
          </HStack>
          <HStack space="md">
            <Text className="text-xs text-gray-600">Тековен лимит</Text>
            <Text className="text-xs ml-auto">{limit}</Text>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default VisaCard;