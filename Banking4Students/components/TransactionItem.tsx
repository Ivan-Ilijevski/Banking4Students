import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";

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
    <Box style={styles.container}>
      <HStack space="md">
        {/* Logo */}
        <Box style={styles.logoContainer}>
          <Image 
            source={logo}
            style={styles.logo}
            resizeMode="contain"
          />
        </Box>
        
        {/* Transaction details */}
        <VStack style={styles.detailsContainer}>
          <Text style={styles.amount}>{amount}</Text>
          <Text style={styles.location}>
            {company} {location}
          </Text>
          {date && <Text style={styles.date}>{date}</Text>}
        </VStack>
        
        {/* Split bill button */}
        <TouchableOpacity 
          style={styles.splitButton}
          onPress={onSplitBill}
        >
          <Text style={styles.splitButtonText}>Split bill</Text>
        </TouchableOpacity>
      </HStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logo: {
    width: 25,
    height: 25,
  },
  detailsContainer: {
    flex: 1,
  },
  amount: {
    fontSize: 16,
    fontWeight: '500',
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  splitButton: {
    backgroundColor: 'black',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: 'center',
  },
  splitButtonText: {
    color: 'white',
    fontSize: 12,
  }
});

export default TransactionItem;