import { useEffect, useState } from 'react';
import useAppContext from '../context/AppContext';
import { Link } from 'react-router';

// Regex to match blanks
const regex = /_{10,}/;

// Fill blanks with answers
const fillBlanks = (question, answers) => {
  let idx = 0;
  let filled;
  return question.split(' ').map((word, i) => {
    if (regex.test(word)) {
      if (answers[idx] !== null && typeof answers[idx] === 'object') {
        filled = answers[idx++].option;
      } else {
        filled = answers?.[idx++] || '__________';
      }

      return <span key={i}> {filled} </span>;
    }
    return <span key={i}> {word} </span>;
  });
};

// Check if user answer is correct
const checkCorrect = (userAnswer, correct) => {
  return userAnswer.length === correct.length && userAnswer.every(({ option }, i) => option === correct[i]);
};

const ResultPage = () => {
  const { answerList, questions } = useAppContext();
  const [score, setScore] = useState(0);

  useEffect(() => {
    const correctCount = questions.reduce((count, q, i) => {
      return checkCorrect(answerList[i], q.correctAnswer) ? count + 1 : count;
    }, 0);
    setScore(correctCount * 10); // 10 marks per question
  }, [answerList, questions]);

  const getColor = () => {
    if (score < 50) return 'text-red-500 stroke-red-500';
    if (score <= 85) return 'text-green-500 stroke-green-500';
    return 'text-green-700 stroke-green-700';
  };

  const totalQuestions = questions.length;

  return (
    <div className="space-y-8">
      {/* Score Circle */}
      <header className="text-center shadow-md mt-3.5 flex justify-between px-3.5 gap-x-2">
        <p className="text-sm md:text-2xl lg:text-3xl font-bold py-3">{`Total Question: ${questions.length}`}</p>
        <p className="text-sm md:text-2xl lg:text-3xl font-bold py-3">{`Obtained Marks: ${score}`}</p>
      </header>

      {/* Question-wise Results */}
      {questions.map(({ question, correctAnswer }, index) => {
        const userAnswer = answerList[index];
        const isCorrect = checkCorrect(userAnswer, correctAnswer);

        return (
          <div key={index} className="border rounded-xl overflow-hidden shadow bg-white">
            {/* Top Half - Correct Answer */}
            <div className="bg-white p-4 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <div className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded">Prompt</div>
                <div className="text-gray-500 font-semibold">
                  {String(index + 1).padStart(2, '0')}/{totalQuestions}
                </div>
              </div>
              <div className="text-black text-base leading-relaxed">{fillBlanks(question, correctAnswer)}</div>
            </div>

            {/* Bottom Half - User Answer */}
            <div className="bg-gray-100 p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-700 font-medium">Your Response</div>
                <span className={`font-semibold ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                  {isCorrect ? 'Correct' : 'Incorrect'}
                </span>
              </div>
              <div className="text-black text-base leading-relaxed">{fillBlanks(question, userAnswer)}</div>
            </div>
          </div>
        );
      })}

      <div className="mb-3.5 border w-max px-2.5 cursor-pointer bg-blue-700 text-white py-1 mx-auto">
        <Link to={'/'}>Home</Link>
      </div>
    </div>
  );
};

export default ResultPage;
