/*import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import StackCarousel from '@/components/StackCarousel';


export default function HomeScreen() {
  return (
    <>
    <StackCarousel>

    </StackCarousel>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
*/
import React from "react";
import {
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  View,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import StackCarousel from "@/components/StackCarousel";

export default function HomeScreen() {
  const cardsData = [
    {
      title: "Visa Debit Student",
      balanceLabel: "Расположливи средства",
      balance: "100,000 MKD",
      limitLabel: "Тековен лимит",
      limit: "1,000 MKD",
    },
    {
      title: "Mastercard Platinum",
      balanceLabel: "Расположливи средства",
      balance: "250,000 MKD",
      limitLabel: "Тековен лимит",
      limit: "5,000 MKD",
    },
  ];

  const transactions = [
    {
      id: 1,
      icon: "https://via.placeholder.com/30",
      amount: "200 Ден.",
      merchant: "ТИНЕКС DOO. Skopje",
    },
    {
      id: 2,
      icon: "https://via.placeholder.com/30",
      amount: "450 Ден.",
      merchant: "Starbucks DOO. Skopje",
    },
  ];

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/60" }}
            style={styles.userSilhouette}
          />
          <View style={styles.headerText}>
            <ThemedText style={styles.headerTitle}>Hello, Student</ThemedText>
            <ThemedText style={styles.headerSubtitle}>Welcome back!</ThemedText>
          </View>
        </View>

        {/* Cards Carousel */}
        <StackCarousel data={cardsData} />

        {/* Transactions List */}
        <View style={styles.transactionsWrapper}>
          <ThemedText style={styles.transactionsTitle}>Трансакции</ThemedText>
          {transactions.map((tx) => (
            <View key={tx.id} style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <Image source={{ uri: tx.icon }} style={styles.transactionIcon} />
                <View>
                  <ThemedText style={styles.transactionAmount}>{tx.amount}</ThemedText>
                  <ThemedText style={styles.transactionMerchant}>{tx.merchant}</ThemedText>
                </View>
              </View>
              <View style={styles.splitButton}>
                <ThemedText style={styles.splitButtonText}>Split Bill</ThemedText>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  userSilhouette: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  headerText: {
    marginLeft: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  transactionsWrapper: {
    padding: 16,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  transactionItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  transactionAmount: {
    fontWeight: "600",
  },
  transactionMerchant: {
    fontSize: 12,
    color: "#999",
  },
  splitButton: {
    backgroundColor: "#007AFF",
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  splitButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
});

