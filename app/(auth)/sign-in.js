import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Image,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import Toast from 'react-native-toast-message';

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleSignIn() {
        if (email !== "" && password !== "") {
            setLoading(true);
            signInWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    Toast.show({
                        type: 'success',
                        text1: 'Login Successful!',
                        text2: 'Welcome back to the Quiz App.',
                    });
                    await AsyncStorage.setItem("info", JSON.stringify(user.uid));
                    setEmail("");
                    setPassword("");
                    router.push("/(tabs)");
                })
                .catch((error) => {
                    setLoading(false);
                    console.log(error);
                    Toast.show({
                        type: 'error',
                        text1: 'Error logging in',
                        text2: 'Please check your credentials.',
                    });
                });
        } else {
            Toast.show({
                type: 'error',
                text1: 'Invalid Input',
                text2: 'Please fill in all the fields.',
            });
        }
    }

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Image
                    source={{ uri: 'https://quiz.saylaniwelfare.com/images/smit.png' }} // Replace with your logo URL
                    style={styles.logo}
                />
                <Text style={styles.heading}>Welcome Back!</Text>
                <Text style={styles.subheading}>Sign in to continue your quiz journey</Text>

                {/* Email Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#808080"
                    keyboardType="email-address"
                    onChangeText={setEmail}
                    value={email}
                />

                {/* Password Input with Eye Icon */}
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.inputWithIcon}
                        placeholder="Password"
                        placeholderTextColor="#808080"
                        secureTextEntry={!showPassword}
                        onChangeText={setPassword}
                        value={password}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <FontAwesome
                            name={showPassword ? "eye-slash" : "eye"}
                            size={24}
                            color="#808080"
                        />
                    </TouchableOpacity>
                </View>

                {/* Forgot Password Link */}
                <TouchableOpacity style={styles.forgotPasswordLink} onPress={() => router.push("/forgot-password")}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* Sign-In Button */}
                <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                    {loading ? <ActivityIndicator size={50} color="#fff" /> : <Text style={styles.buttonText}>Sign In</Text>}
                </TouchableOpacity>

                {/* Social Login
                <View style={styles.socialLoginContainer}>
                    <Text style={styles.socialText}>Or sign in with</Text>
                    <View style={styles.socialIcons}>
                        <TouchableOpacity>
                            <Image
                                source={{ uri: 'https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png' }} // Google logo URL
                                style={styles.socialIcon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={{ uri: 'https://static.vecteezy.com/system/resources/previews/018/930/476/non_2x/facebook-logo-facebook-icon-transparent-free-png.png' }} // Facebook logo URL
                                style={styles.socialIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View> */}

                {/* Footer Text */}
                <Text style={styles.footerText}>
                    New to the Quiz App?{" "}
                    <Text style={styles.linkText} onPress={() => router.push("/sign-up")}>
                        Create an account
                    </Text>
                </Text>
            </View>

            <Toast />
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E8F5E9", // Light green background
        padding: 20,
    },
    container: {
        width: "100%",
        maxWidth: 400,
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 15,
        // backgroundColor: "#FFF",
        // elevation: 5,
    },
    logo: {
        width: 150, // Adjust the width of the logo
        height: 100, // Adjust the height of the logo
        resizeMode: "contain", // Ensures the logo maintains its aspect ratio
        marginBottom: 20, // Adds some space between the logo and the heading
        padding: 20,
        alignSelf: "center",
    },
    heading: {
        fontSize: 30,
        color: "#33CC33",
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    subheading: {
        fontSize: 18,
        color: "#555555",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        width: "100%",
        padding: 15,
        marginBottom: 15,
        borderColor: "#33CC33",
        borderWidth: 1,
        borderRadius: 8,
        color: "#333333",
        backgroundColor: "#FFF",
        fontSize: 16,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        borderColor: "#33CC33",
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: "#FFF",
        marginBottom: 15,
        paddingRight: 10,
    },
    inputWithIcon: {
        flex: 1,
        padding: 15,
        color: "#333333",
        fontSize: 16,
    },
    forgotPasswordLink: {
        alignSelf: "flex-end",
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: "#33CC33",
        fontWeight: "bold",
    },
    button: {
        width: "100%",
        paddingVertical: 15,
        backgroundColor: "#33CC33",
        borderRadius: 25,
        alignItems: "center",
        marginVertical: 20,
    },
    buttonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
    },
    // socialLoginContainer: {
    //     alignItems: "center",
    //     marginBottom: 20,
    // },
    // socialText: {
    //     fontSize: 14,
    //     color: "#555",
    //     marginBottom: 10,
    // },
    // socialIcons: {
    //     flexDirection: "row",
    //     justifyContent: "center",
    // },
    // socialIcon: {
    //     width: 50,
    //     height: 50,
    //     margin: 10,
    //     resizeMode: "contain",
    // },
    footerText: {
        fontSize: 14,
        color: "#000",
        textAlign: "center",
    },
    linkText: {
        color: "#33CC33",
        fontWeight: "bold",
    },
});
