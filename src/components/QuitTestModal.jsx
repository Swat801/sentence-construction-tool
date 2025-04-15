import { replace } from 'react-router';
import useAppContext from '../context/AppContext';

const QuitTestModal = () => {
  const { navigate, setShowQuitModal, setQuit } = useAppContext();

  return (
    <div
      onClick={() => setShowQuitModal(false)}
      className="absolute h-[100%] w-[100%] bg-gray-300/70 flex justify-center items-center">
      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-white shadow-md w-sm md:w-md  flex flex-col justify-center items-center text-center p-4 gap-3 rounded-md">
        <h4 className="text-lg font-semibold">Are you sure to quit the Test?</h4>
        <p>If you quit the test, marks will not be provided and you will not be able to take the test in the future.</p>
        <div className="space-x-4">
          <button
            onClick={() => setShowQuitModal(false)}
            className="text-white px-2 py-1 rounded-md bg-green-600 cursor-pointer hover:bg-green-700 transition">
            Resume
          </button>
          <button
            onClick={() => {
              setQuit(true);
              navigate('/', { replace: true });
              setShowQuitModal(false);
            }}
            className="text-white px-2 py-1 rounded-md bg-red-600 cursor-pointer hover:bg-red-700 transition">
            Quit
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuitTestModal;
