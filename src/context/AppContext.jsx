import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const regex = /_{10,}/;

  const [showQuitModal, setShowQuitModal] = useState(false);
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerList, setAnswerList] = useState([]);
  const [testCompleted, setTestCompleted] = useState(false);
  const [quit, setQuit] = useState(false);

  const fetchQuestions = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/response');
      if (data.status === 'SUCCESS') {
        setQuestions([...data.data.questions]);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const list = questions.reduce((acc, { correctAnswer }) => {
        acc.push(new Array(correctAnswer.length).fill(null));
        return acc;
      }, []);
      setAnswerList(list);
    }
  }, [questions]);

  return (
    <AppContext.Provider
      value={{
        regex,
        navigate,
        questions,
        currentQuestion,
        setCurrentQuestion,
        answerList,
        setAnswerList,
        showQuitModal,
        setShowQuitModal,
        testCompleted,
        setTestCompleted,
        quit,
        setQuit,
      }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;
