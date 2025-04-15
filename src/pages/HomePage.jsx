import instructions from '../assets/instructions';
import useAppContext from '../context/AppContext';

const HomePage = () => {
  const { navigate, testCompleted, quit } = useAppContext();

  return (
    <div className="flex flex-col items-center mt-25 gap-y-10">
      {/* logo */}
      <img src="./src/assets/images/Icons.png" alt="logo" />

      {/* Heading and Description */}
      <div className="text-center space-y-3.5">
        <h1 className="text-2xl sm:font-medium  md:font-stretch-120% md:font-semibold md:text-3xl lg:text-4xl">
          Sentence Construction
        </h1>
        <p className="text-gray-400 text-center font-medium">
          User have to contract a sentence with random words by placing it in a correct order.
        </p>
      </div>

      {/* Instructions for small screen */}
      <div className="md:hidden flex w-full text-center my-10">
        {instructions.smallScreen.map(({ question, answer }, index) => (
          <div
            key={index}
            className={`flex-1 px-1.5 space-y-2.5 ${
              index + 1 < instructions.smallScreen.length && 'border-r border-gray-300'
            }`}>
            <h3 className="font-medium text-lg">{question}</h3>
            <p className="text-gray-400">{answer}</p>
          </div>
        ))}
      </div>

      {/* Instructions for large screnn */}
      <div className="hidden md:flex w-full max-w-[1100px] text-center my-10 ">
        {instructions.largeScreen.map(({ question, answer }, index) => (
          <div
            key={index}
            className={`flex-1 space-y-5 py-3 ${
              index + 1 < instructions.largeScreen.length && 'border-r border-gray-300'
            }`}>
            <h3 className="font-medium text-xl font-stretch-120%">{question}</h3>
            <p className="text-gray-400 font-stretch-120%">{answer}</p>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex w-full max-w-96 justify-between gap-x-5 px-2">
        <button
          onClick={() => {
            navigate('/');
          }}
          className="py-1.5 w-40 bg-white border border-primary text-primary cursor-pointer hover:bg-primary-dull transition rounded-md">
          Back
        </button>

        {!testCompleted && !quit && (
          <button
            onClick={() => {
              navigate('test-page');
            }}
            className="py-1.5 w-40 bg-primary border border-primary text-white cursor-pointer hover:bg-primary/90 transition rounded-md">
            Start
          </button>
        )}

        {testCompleted && !quit && (
          <button
            onClick={() => {
              navigate('result-page');
            }}
            className="py-1.5 w-40 bg-primary border border-primary text-white cursor-pointer hover:bg-primary/90 transition rounded-md">
            Result
          </button>
        )}

        {quit && (
          <button disabled className="py-1.5 w-40 bg-amber-400 border  text-white cursor-pointer rounded-md">
            Quited
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
