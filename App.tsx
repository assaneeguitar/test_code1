/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
  RefreshControl,
} from 'react-native';

interface Question {
  question: string;
  answers: number[];
  correctIndex: number;
}

const generateQuestions = (): Question[] => {
  let questions: Question[] = [];
  for (let i = 0; i < 20; i++) {
    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    const correctAnswer = num1 * num2;

    let answers = new Set<number>();
    answers.add(correctAnswer);
    while (answers.size < 4) {
      const wrongAnswer = Math.floor(Math.random() * 81) + 1;
      answers.add(wrongAnswer);
    }

    let answersArray: number[] = Array.from(answers);
    answersArray.sort(() => 0.5 - Math.random());

    const correctIndex = answersArray.indexOf(correctAnswer);

    questions.push({
      question: `ข้อที่ ${i + 1}:       ${num1} x ${num2} = ?`,
      answers: answersArray,
      correctIndex,
    });
  }
  return questions;
};
const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    reloadQuestions();
  }, []);

  const handleAnswer = (index: number, correctIndex: number): void => {
    if (index === correctIndex) {
      Alert.alert('ผลลัพธ์', 'คำตอบถูกต้อง!');
    } else {
      Alert.alert('ผลลัพธ์', 'คำตอบผิด!');
    }
  };

  const reloadQuestions = () => {
    setRefreshing(true);
    const newQuestions = generateQuestions();
    setQuestions(newQuestions);
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{padding: 20, backgroundColor: '#cfc9c4'}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={reloadQuestions} />
        }>
        {questions.map((q, qIndex) => (
          <View key={qIndex} style={{marginBottom: 20}}>
            <Text>{q.question}</Text>
            {q.answers.map((a, aIndex) => (
              <TouchableOpacity
                key={aIndex}
                onPress={() => handleAnswer(aIndex, q.correctIndex)}
                style={[
                  styles.card,
                  {
                    backgroundColor:
                      //aIndex === q.correctIndex ? '#4CAF50' : '#f0f0f0',
                      aIndex === q.correctIndex ? '#f0f0f0' : '#f0f0f0',
                  },
                ]}>
                <Text>
                  {String.fromCharCode(65 + aIndex)}. {a}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// สไตล์ใหม่สำหรับ card
const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginTop: 5,
    borderRadius: 10, // มุมมน
    shadowColor: '#af4c6f', // เงา
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // เงาสำหรับ Android
  },
});

export default App;
