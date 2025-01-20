import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Header from "@/components/Header";

export default function QuizHomeScreen() {
  const posts = [
    {
      id: 1,
      profilePic: "https://via.placeholder.com/50",
      name: "John Doe",
      date: "January 19, 2025",
      content: "This is the content of the first post. It’s a small paragraph with some meaningful text.",
    },
    {
      id: 2,
      profilePic: "https://via.placeholder.com/50",
      name: "Jane Smith",
      date: "January 18, 2025",
      content: "This is the content of the second post. It’s a small paragraph with more meaningful text.",
    },
    {
      id: 3,
      profilePic: "https://via.placeholder.com/50",
      name: "Michael Brown",
      date: "January 17, 2025",
      content: "The content of this post is also a small paragraph. It’s designed to show how posts will look.",
    },
    {
      id: 4,
      profilePic: "https://via.placeholder.com/50",
      name: "Emily Davis",
      date: "January 16, 2025",
      content: "Here’s another example of a post with a profile picture, name, date, and a short paragraph.",
    },
    {
      id: 5,
      profilePic: "https://via.placeholder.com/50",
      name: "Emily Davis",
      date: "January 16, 2025",
      content: "Here’s another example of a post with a profile picture, name, date, and a short paragraph.",
    },
  ];

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {posts.map((post) => (
          <View key={post.id} style={styles.postContainer}>
            <View style={styles.profileSection}>
              <Image source={{ uri: post.profilePic }} style={styles.profilePic} />
              <View style={styles.profileDetails}>
                <Text style={styles.profileName}>{post.name}</Text>
                <Text style={styles.postDate}>{post.date}</Text>
              </View>
            </View>
            <Text style={styles.postContent}>{post.content}</Text>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>👍 Like</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>💬 Comment</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b1b0f4",
  },
  scrollContent: {
    paddingTop: 110,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  postContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  postDate: {
    fontSize: 12,
    color: "#aaa",
  },
  postContent: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    marginBottom: 15,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 6,
    backgroundColor: "#007BFF",
    shadowColor: "#007BFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
});
