import React from "react";
import { Pressable, Image } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";

interface TransactionItemProps {
  id: string;
  company: string;
  location: string;
  amount: string;
  logo: any;
  date?: string;
  onSplitBill?: () => void;
}

export const TransactionItem = ({
  id,
  company,
  location,
  amount,
  logo,
  date,
  onSplitBill
}: TransactionItemProps) => {
  return (
    <Box className="border-b border-gray-200 py-3">
      <HStack space="md">
        {/* Logo */}
        <Box className="w-10 h-10 rounded-full bg-black justify-center items-center overflow-hidden">
          <Image 
            source={logo}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </Box>
        
        {/* Transaction details */}
        <VStack className="flex-1">
          <Text className="text-base font-medium">{amount}</Text>
          <Text className="text-sm text-gray-600">
            {company} {location}
          </Text>
          {date && <Text className="text-xs text-gray-500 mt-0.5">{date}</Text>}
        </VStack>
        
        {/* Split bill button */}
        <Pressable 
          className="bg-black px-3 py-1.5 rounded self-center"
          onPress={onSplitBill}
        >
          <Text className="text-white text-xs">Split bill</Text>
        </Pressable>
      </HStack>
    </Box>
  );
};

export default TransactionItem;