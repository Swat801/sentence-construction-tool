import { useEffect, useState } from 'react';

import useAppContext from '../context/AppContext';
import QuestionAnswer from '../components/QuestionAnswer';
import QuestionMarkBar from '../components/QuestionMarkBar';
import Timer from '../components/Timer';
import QuitTestButton from '../components/QuitTestButton';
import QuitTestModal from '../components/QuitTestModal';

const TestPage = () => {
  const { setCurrentQuestion, currentQuestion, questions, navigate, showQuitModal, answerList, setTestCompleted } =
    useAppContext();

  const [showFinish, setShowFinish] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleNext = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  const endTheTestHandler = () => {
    setTestCompleted(true);
    navigate('/result-page', { replace: true });
  };

  useEffect(() => {
    if (currentQuestion + 1 === questions.length) {
      setShowFinish(true);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (answerList.length > 0) {
      const filled = answerList[currentQuestion]?.every((item) => item !== null);
      setIsDisabled(!filled);
    }
  }, [answerList, currentQuestion]);

  return (
    <div className="h-lvh flex justify-center items-center">
      <div className="w-full max-w-4xl px-3.5 py-5 md:py-20 gap-y-10 md:px-5 bg-white shadow-md rounded-xl flex flex-col  md:min-h-[60vh]">
        {/* Timer and Quit Button */}
        <div className="flex justify-between">
          <Timer />
          <QuitTestButton />
        </div>

        {/* Question Bar */}
        <QuestionMarkBar />

        {/* Question Answer Component */}
        <p className="text-center">Select the missing words in correct order</p>
        <QuestionAnswer />

        {/* Next Question Button */}
        {!showFinish && (
          <button
            onClick={handleNext}
            disabled={isDisabled}
            className="py-1.5 w-20 self-end bg-white border border-primary text-primary 
                     hover:bg-primary-dull transition rounded-md 
                     disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed">
            Next
          </button>
        )}

        {/* End Test Button */}
        {showFinish && (
          <button
            onClick={endTheTestHandler}
            disabled={isDisabled}
            className="py-1.5 w-20 self-end bg-white border border-primary text-primary 
                     hover:bg-primary-dull transition rounded-md 
                     disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed">
            End
          </button>
        )}
      </div>

      {/* Modal to show Quit and Resume the test */}
      {showQuitModal && <QuitTestModal />}
    </div>
  );
};

export default TestPage;
