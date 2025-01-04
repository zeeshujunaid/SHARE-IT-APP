import React from "react";
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import Header from "@/components/Header";
import { useRouter } from "expo-router"; // Import useRouter

export default function QuizHomeScreen() {
  const router = useRouter(); // Initialize router

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Main content */}
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>Practice Quizzes</Text>

          {/* Row 1 */}
          <View style={styles.cardRow}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push('./(auth)/marketingquiz')} // Use router.push here
            >
              <Image
              source={require('../../assets/images/digitalmarketing.png')} // Use local image
                style={styles.cardImage}
              />
              <Text style={styles.cardText}>Digital Marketing Quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push('./(auth)/softwarequiz')} // Navigate using router.push
            >
              <Image
               source={require('../../assets/images/softwareEngeneering.jpg')} // Use local image
                style={styles.cardImage}
              />
              <Text style={styles.cardText}>Software Engeneering Quiz</Text>
            </TouchableOpacity>
          </View>

          {/* Row 2 */}
          <View style={styles.cardRow}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push('./(auth)/webdevquiz')} // Navigate using router.push
            >
              <Image
              source={require('../../assets/images/webdevelopment.png')} // Use local image
                style={styles.cardImage}
              />
              <Text style={styles.cardText}>Web Development Quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push('./(auth)/appdevquiz')} // Navigate using router.push
            >
              <Image
            source={require('../../assets/images/app.png')} // Use local image
                style={styles.cardImage}
              />
              <Text style={styles.cardText}>App Development Quiz</Text>
            </TouchableOpacity>
          </View>

          {/* Row 3 */}
          <View style={styles.cardRow}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push('./(auth)/designquiz')} // Navigate using router.push
            >
              <Image
                source={require('../../assets/images/uiuxdesign.webp')} // Use local image
                style={styles.cardImage}
              />
              <Text style={styles.cardText}>UI-UX Quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push('/LiveQuiz')} // Navigate using router.push
            >
              <Image
               source={require('../../assets/images/livequiz.png')} // Use local image
                style={styles.cardImage}
              />
              <Text style={styles.cardText}>Enter Live Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9", // Soft pastel background
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 70, // Add extra space at the bottom to avoid last item hiding under tab bar
  },
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 16,
    marginBottom: 25,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    width: "48%", // Take up half the width in the row
    padding: 20,
    borderRadius: 12,
    elevation: 5, // For Android shadow effect
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20, // Space between the cards
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  cardText: {
    marginTop: 10, // Gap between the image and text
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
});
