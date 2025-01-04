import React, { useState,useEffect } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View,
    ActivityIndicator,
    Modal,
    BackHandler,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { getFirestore, collection, doc, getDoc, addDoc } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';

const firestore = getFirestore();

export default function QuizHomeScreen() {
    // codes to save in firebase
    const [codes, setCodes] = useState({
        digital: '',
        software: '',
        web: '',
        app: '',
        uiux: '',
        flutter: '',
    });
    // categroies collection
    const categories = [
        { name: 'Digital Marketing', key: 'digital' },
        { name: 'Software Engineering', key: 'software' },
        { name: 'Web Development', key: 'web' },
        { name: 'App Development', key: 'app' },
        { name: 'UI/UX Design', key: 'uiux' },
        { name: 'flutter development', key: 'flutter' },

    ];
    // use state
    const [expanded, setExpanded] = useState({});
    const [loading, setLoading] = useState(false);
    const [quizData, setQuizData] = useState([]);  // Ensure quizData is an empty array initially
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [quizInProgress, setQuizInProgress] = useState(false);
    const [showScoreModal, setShowScoreModal] = useState(false);
    const [name, setName] = useState('');
    const [sirname, setSirname] = useState('');
    const [city, setCity] = useState('');
    const [course, setCourse] = useState('');
    const [cardnum, setCardnum] = useState('');

    //  toggle views
    const toggleExpand = (category) => {
        setExpanded((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };


    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            Toast.show({
                type: 'error',
                text1: 'Warning',
                text2: "You can't go back during the quiz.",
            });
            return true; // Block back navigation
        });

        return () => backHandler.remove();
    }, []);
    // get data from firebase 
    const handleCategoryPress = async (categoryKey, code) => {
        if (!code.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please enter the live quiz code.',
            });
            return;
        }

        setLoading(true);

        try {
            const collectionName = `${categoryKey}developmentQuizzes`;
            const categoryRef = doc(collection(firestore, collectionName), code);
            const categorySnapshot = await getDoc(categoryRef);

            if (categorySnapshot.exists()) {
                const categoryData = categorySnapshot.data();
                setQuizData(categoryData.questions || []);  // Ensure questions is an array
                setQuizInProgress(true);
                setCodes((prev) => ({
                    ...prev,
                    [categoryKey]: '',
                }));
                // Delay Toast so UI updates before showing the message
                Toast.show({
                    type: 'success',
                    text1: 'Code Matched!',
                    text2: 'Best of luck for yur quiz',
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Invalid Code',
                    text2: `No quiz found for the code ${code}.`,
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'An error occurred. Please try again later.',
            });
            console.error('Error fetching quiz data:', error);
        } finally {
            setLoading(false);
        }
    };

// Store the answer key (like 'a', 'b', 'c', or 'd')
    const handleAnswerSelect = (answerKey) => {
        setSelectedAnswer(answerKey); 
    };

//  next question naviagating
    const handleNextQuestion = () => {
        if (quizData[currentQuestionIndex]?.correctAnswer === selectedAnswer) {
            setScore((prevScore) => prevScore + 1);
        }

        if (currentQuestionIndex + 1 < quizData.length) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setSelectedAnswer(null);
        } else {
            setShowScoreModal(true);
        }
    };

    // save data/result of quiz to firebase
    const handleSave = async () => {
        if (!name || !sirname || !city || !course) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please fill all inputs to proceed.',
            });
            return;
        }
    
        setLoading(true);
        try {
            const db = getFirestore();
            const categoryCollection = collection(db, city); // Save to the selected city's collection
            await addDoc(categoryCollection, {
                name: name,
                sirname: sirname,
                score: score,
                course: course,
                date: new Date().toISOString(),
                cityName: city, 
                cardnum : cardnum
            });


            // Reset inputs after successful save
            setName('');
            setSirname('');
            setCity('');
            setCourse('');
    
            Toast.show({
                type: 'success',
                text1: 'Result Saved',
                text2: 'Result has been saved successfully.',
            });
    
            // Reset quiz state
            setQuizInProgress(false);
            setCurrentQuestionIndex(0);
            setScore(0);
            setSelectedAnswer(null);
            setShowScoreModal(false);


        } catch (error) {
            console.error("Error saving details:", error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please fix the error and try again.',
            });
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <SafeAreaView style={styles.container}>
            {!quizInProgress ? (
                <>
                {/* main area to enter code and check for quiz */}
                    <Text style={styles.subHeaderText}>Enter Live Quiz Code</Text>
                    <ScrollView
                        contentContainerStyle={styles.categoriesContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        {categories.map((category) => (
                            <View key={category.key} style={styles.quizCard}>
                                <TouchableOpacity
                                    style={styles.cardHeader}
                                    onPress={() => toggleExpand(category.key)}
                                >
                                    <Text style={styles.quizTitle}>{category.name}</Text>
                                    <FontAwesome
                                        name={expanded[category.key] ? 'chevron-up' : 'chevron-down'}
                                        size={20}
                                        color="#388E3C"
                                    />
                                </TouchableOpacity>

                                {/* categroeis view to check quiz in same categry */}
                                {expanded[category.key] && (
                                    <View style={styles.cardContent}>
                                        <Text style={styles.details}>30 quizzes</Text>
                                        <Text style={styles.details}>Solve timing: 30 minutes</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Enter Live Quiz Code"
                                            placeholderTextColor="#999"
                                            value={codes[category.key]}
                                            onChangeText={(text) =>
                                                setCodes((prev) => ({ ...prev, [category.key]: text }))
                                            }
                                        />
                                        <TouchableOpacity
                                            style={styles.button}
                                            onPress={() =>
                                                handleCategoryPress(category.key, codes[category.key])
                                            }
                                        >
                                            <Text style={styles.buttonText}>Start Quiz</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        ))}
                    </ScrollView>
                </>
            ) : (

                // quiz data from firebase rendering 
                <View style={styles.quizContainer}>
                    {/* <Text style={styles.caution}>Caution:Dont go back you will loose your progrees</Text> */}
                    <Text style={styles.quizQuestion}>
                        Q:{quizData[currentQuestionIndex]?.question}
                    </Text>
                    {quizData[currentQuestionIndex]?.answers && Object.keys(quizData[currentQuestionIndex]?.answers).map((key) => (
                        <TouchableOpacity
                            key={key}
                            style={[styles.option, selectedAnswer === key && styles.selectedOption]}
                            onPress={() => handleAnswerSelect(key)}
                        >
                            <Text style={styles.optionText}>Ans:{quizData[currentQuestionIndex].answers[key]}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleNextQuestion}
                        disabled={!selectedAnswer}
                    >
                        <Text style={styles.buttonTest}>
                            {currentQuestionIndex + 1 === quizData.length ? 'Finish' : 'Next'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* loading to render model */}
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#2E7D32" />
                </View>
            )}

            {/* modal to save result */}
            <Modal
                visible={showScoreModal}
                transparent
                animationType="slide"
            // onRequestClose={resetQuiz}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Quiz Completed!</Text>
                        <Text style={styles.modalScore}>Your Score: {score}/{quizData.length}</Text>

                        {/* Input for Name */}
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your name"
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />

                        {/* Input for Sirname */}
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your sirname"
                            value={sirname}
                            onChangeText={(text) => setSirname(text)}
                        />
                        
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your id card number"
                            value={cardnum}
                            onChangeText={(number) => setCardnum(number)}
                        />
                        
                        <Picker
                            selectedValue={course}
                            style={styles.picker}
                            onValueChange={(itemValue) => setCourse(itemValue)}
                        >
                            <Picker.Item label="Select your Course" value="" />
                            <Picker.Item label="Web development" value="Web development" />
                            <Picker.Item label="App development" value="App development" />
                            <Picker.Item label="Software engineering" value="Software engineering" />
                            <Picker.Item label="Digital marketing" value="Digital marketing" />
                            <Picker.Item label="Flutter" value="Flutter" />
                            <Picker.Item label="ui/ux designing" value="Ui/UX Designing" />
                        </Picker>


                        {/* City Dropdown */}
                        <Picker
                            selectedValue={city}
                            style={styles.picker}
                            onValueChange={(itemValue) => setCity(itemValue)}
                        >
                            <Picker.Item label="Select a city" value="" />
                            <Picker.Item label="Islamabad" value="islamabad" />
                            <Picker.Item label="Karachi" value="karachi" />
                            <Picker.Item label="Quetta" value="quetta" />
                            <Picker.Item label="Lahore" value="lahore" />
                            <Picker.Item label="Peshawar" value="peshawar" />
                        </Picker>

                        {/* Save Button */}
                        <TouchableOpacity style={styles.button} onPress={handleSave}>
                            {loading ? <ActivityIndicator size={50} color="#fff" /> : <Text style={styles.buttonText}>Save</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Toast />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8F5E9', 
        padding: 16,
    },
    subHeaderText: {
        fontSize: 26,
        paddingTop:20,
        fontWeight: '700',
        color: '#1B5E20', 
        marginBottom: 40,
        textAlign: 'center',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    categoriesContainer: {
        flexGrow: 1,
        paddingBottom: 80,
    },
    quizCard: {
        width: '95%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginBottom: 20,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#C5E1A5', 
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    quizTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1B5E20',
    },
    cardContent: {
        paddingVertical: 12,
    },
    details: {
        fontSize: 16,
        color: '#666666',
        lineHeight: 24,
        marginBottom: 6,
    },
    input: {
        height: 50,
        borderColor: '#81C784', 
        borderWidth: 1.5,
        borderRadius: 12,
        paddingHorizontal: 14,
        marginTop: 10,
        marginBottom: 16,
        color: '#333333',
        backgroundColor: '#F9FBE7', 
        fontSize: 16,
    },
    button: {
        backgroundColor: '#1B5E20',
        width: '100%',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
    },
    buttonTest: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        width: "20%"
    },
    buttonClose: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    quizContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    caution:{
        fontSize: 10,
        marginBottom:25,
        fontWeight: '700',
        color: '#ff0133',
        width: '100%',
        textAlign: 'center',
    },
    quizQuestion: {
        fontSize: 34,
        fontWeight: '700',
        color: '#2E7D32',
        marginBottom: 20,
        width: '100%',
        textAlign: 'center',
        paddingHorizontal: 20,
        lineHeight: 32,
    },
    option: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        paddingVertical: 14,
        paddingHorizontal: 20,
        marginBottom: 12,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#AED581', 
    },
    selectedOption: {
        backgroundColor: '#C8E6C9',
        borderColor: '#2E7D32', 
    },
    optionText: {
        fontSize: 18,
        color: '#388E3C',
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: '#388E3C',
        marginBottom: 12,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        textTransform: 'uppercase', 
    },
    modalScore: {
        fontSize: 22, 
        fontWeight: 'bold', 
        color: '#333333',
        marginBottom: 20,
        textAlign: 'center',
        textTransform: 'uppercase', 
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8, 
        padding: 12,
        marginVertical: 12,
        width: '100%',
        backgroundColor: '#f9f9f9', 
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8, 
        height: 50,
        width: '100%',
        marginVertical: 12,
        padding: 10, 
        backgroundColor: '#ffffff', 
        elevation: 2, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalContent: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 12,
        width: '90%',
        elevation: 5, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6, 
    },
});
