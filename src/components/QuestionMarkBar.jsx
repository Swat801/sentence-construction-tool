import useAppContext from "../context/AppContext";

const QuestionMarkBar = () => {
  const { currentQuestion, questions } = useAppContext();

  return (
    <div className="flex justify-evenly">
      {new Array(questions.length).fill("").map((_, index) => {
        return (
          <div
            key={index}
            className={`w-6 md:w-12 lg:w-18 h-1.5 rounded-full ${
              index <= currentQuestion ? "bg-amber-500" : "bg-gray-500"
            }`}
          ></div>
        );
      })}
    </div>
  );
};

export default QuestionMarkBar;
