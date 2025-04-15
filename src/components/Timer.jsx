import { useEffect, useState, useRef } from 'react';
import useAppContext from '../context/AppContext';

const Timer = () => {
  const { currentQuestion, setCurrentQuestion } = useAppContext();
  const [timer, setTimer] = useState(30);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimer(30);
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          setTimeout(() => {
            setCurrentQuestion((q) => q + 1);
          }, 0);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [currentQuestion]);

  return (
    <div>
      <p>
        <span>00:</span>
        <span>{timer < 10 ? `0${timer}` : timer}</span>
      </p>
    </div>
  );
};

export default Timer;
