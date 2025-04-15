import useAppContext from '../context/AppContext';

const QuitTestButton = () => {
  const { setShowQuitModal } = useAppContext();
  return (
    <button
      onClick={() => setShowQuitModal(true)}
      className="py-1.5 w-20 bg-white border border-primary text-primary cursor-pointer hover:bg-primary-dull transition rounded-md">
      Quit
    </button>
  );
};

export default QuitTestButton;
