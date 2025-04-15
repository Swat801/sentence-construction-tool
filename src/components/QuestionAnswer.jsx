import { useMemo } from 'react';
import useAppContext from '../context/AppContext';

const QuestionAnswer = () => {
  const { questions, currentQuestion, regex, answerList, setAnswerList } = useAppContext();

  // Memoizing the word chunks of question and mapping blank indexes
  const { questionWordsArray, mappedIndex } = useMemo(() => {
    let mapIndex = 0;
    const questionWordsArray = questions[currentQuestion].question.split(' ');

    const mappedIndex =
      questionWordsArray.length > 0 &&
      questionWordsArray.reduce((acc, curr, index) => {
        if (regex.test(curr)) {
          acc.set(index, mapIndex++);
        }
        return acc;
      }, new Map());

    return { questionWordsArray, mappedIndex };
  }, [currentQuestion]);

  const optionClickHandler = (option, index) => {
    const newAnswerList = structuredClone(answerList);
    const blankIndex = newAnswerList[currentQuestion].findIndex((item) => item === null);
    newAnswerList[currentQuestion][blankIndex] = { option, index };
    setAnswerList(newAnswerList);
  };

  const fillerClickHandler = (blankIndex) => {
    const newAnswerList = structuredClone(answerList);
    newAnswerList[currentQuestion][blankIndex] = null;
    setAnswerList(newAnswerList);
  };

  return (
    <div className="flex flex-col items-center gap-y-3.5">
      <p className="text-xl font-semibold flex flex-wrap items-center gap-2 leading-12">
        {/* Question */}
        {questions.length > 0 &&
          questionWordsArray.map((word, index) =>
            regex.test(word) ? (
              <span key={index} className="flex flex-col items-center leading-none relative">
                {answerList[currentQuestion][mappedIndex.get(index)] && (
                  <button
                    onClick={() => fillerClickHandler(mappedIndex.get(index))}
                    className="py-1.5 px-2 absolute -top-5 bg-white border border-gray-400 cursor-pointer hover:bg-gray-200 transition rounded-md text-sm font-light">
                    {answerList[currentQuestion][mappedIndex.get(index)].option}
                  </button>
                )}

                <span>{`${word} `}</span>
              </span>
            ) : (
              <span key={index}>{`${word} `}</span>
            ),
          )}
      </p>

      {/* Options */}
      <div className="flex gap-3.5 flex-wrap mt-4">
        {questions.length > 0 &&
          questions[currentQuestion].options.map((option, index) => {
            const isUsed = answerList[currentQuestion]?.some((item) => item?.index === index) ?? false;

            return (
              <button
                key={index}
                onClick={() => optionClickHandler(option, index)}
                disabled={isUsed}
                className="py-1.5 px-2 bg-white border border-gray-400 cursor-pointer hover:bg-gray-200 transition rounded-md disabled:opacity-0 disabled:cursor-not-allowed">
                {option}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default QuestionAnswer;
