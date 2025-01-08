import React, { useState, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Image,
    Animated,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { PanGestureHandler } from "react-native-gesture-handler";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const translateY = useRef(new Animated.Value(450)).current;
    const logoTranslateY = useRef(new Animated.Value(0)).current;

    const handleSignIn = () => {
        if (email !== "" && password !== "") {
            setLoading(true);
            signInWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    Toast.show({
                        type: "success",
                        text1: "Login Successful!",
                        text2: "Welcome back to the Quiz App.",
                    });
                    await AsyncStorage.setItem("info", JSON.stringify(user.uid));
                    setEmail("");
                    setPassword("");
                    router.push("/(drawer)/");
                })
                .catch((error) => {
                    setLoading(false);
                    console.log(error);
                    Toast.show({
                        type: "error",
                        text1: "Error logging in",
                        text2: "Please check your credentials.",
                    });
                });
        } else {
            Toast.show({
                type: "error",
                text1: "Invalid Input",
                text2: "Please fill in all the fields.",
            });
        }
    };

    const toggleAnimation = () => {
        if (expanded) {
            // Collapse
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 450,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(logoTranslateY, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]).start(() => setExpanded(false));
        } else {
            // Expand
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(logoTranslateY, {
                    toValue: -250, // Move logo higher
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]).start(() => setExpanded(true));
        }
    };

    return (
        <View style={styles.background}>
            <PanGestureHandler>
                <Animated.View
                    style={[
                        styles.logoSection,
                        { transform: [{ translateY: logoTranslateY }] },
                    ]}
                >
                    <Image
                        source={require("../../assets/images/bgremovedlogo.png")}
                        style={styles.logo}
                    />
                </Animated.View>
            </PanGestureHandler>

            <Animated.View
                style={[styles.contentSection, { transform: [{ translateY }] }]}
            >
                <TouchableOpacity onPress={toggleAnimation} style={styles.iconContainer}>
                    <FontAwesome
                        name={expanded ? "chevron-down" : "chevron-up"}
                        size={30}
                        color="#000"
                    />
                </TouchableOpacity>

                <Text style={styles.heading}>Welcome Back!</Text>
                <Text style={styles.subheading}>
                    Sign in to continue your quiz journey
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#808080"
                    keyboardType="email-address"
                    onChangeText={setEmail}
                    value={email}
                />

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.inputWithIcon}
                        placeholder="Password"
                        placeholderTextColor="#808080"
                        secureTextEntry={!showPassword}
                        onChangeText={setPassword}
                        value={password}
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <FontAwesome
                            name={showPassword ? "eye-slash" : "eye"}
                            size={24}
                            color="#808080"
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.forgotPasswordLink}
                    onPress={() => router.push("/forgot-password")}
                >
                    <Text style={styles.forgotPasswordText}>
                        Forgot Password?
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                    {loading ? (
                        <ActivityIndicator size={24} color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Sign In</Text>
                    )}
                </TouchableOpacity>

                <Text style={styles.footerText}>
                    New to the Quiz App?{" "}
                    <Text
                        style={styles.linkText}
                        onPress={() => router.push("/sign-up")}
                    >
                        Create an account
                    </Text>
                </Text>
            </Animated.View>

            <Toast />
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#fff",
    },
    logoSection: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    contentSection: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 550,
        backgroundColor: "#d4d4d4",
        borderTopLeftRadius: 55,
        borderTopRightRadius: 55,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 250,
        height: 200,
        resizeMode: "contain",
    },
    iconContainer: {
        alignSelf: "center",
        marginBottom: 10,
    },
    heading: {
        fontSize: 40,
        color: "#000",
        fontWeight: "bold",
        marginBottom: 20,
    },
    subheading: {
        fontSize: 18,
        color: "#000",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        width: "100%",
        padding: 15,
        marginBottom: 20,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 8,
        color: "#000",
        backgroundColor: "#FFF",
        fontSize: 16,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: "#FFF",
        marginBottom: 15,
        paddingRight: 10,
    },
    inputWithIcon: {
        flex: 1,
        padding: 15,
        color: "#000",
        fontSize: 16,
    },
    forgotPasswordLink: {
        alignSelf: "flex-end",
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: "#000",
        fontWeight: "bold",
    },
    button: {
        width: "100%",
        paddingVertical: 15,
        backgroundColor: "#000",
        borderRadius: 25,
        alignItems: "center",
        marginVertical: 20,
    },
    buttonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
    },
    footerText: {
        fontSize: 14,
        color: "#000",
        textAlign: "center",
    },
    linkText: {
        color: "#4c9efa",
        fontWeight: "bold",
    },
});
