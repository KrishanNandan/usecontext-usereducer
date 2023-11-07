import { useEffect, useState, useRef } from 'react';

import Container from './UI/Container.tsx';
import { type Timer as TimerProps } from "../store/timer-context.tsx";
import { useTimerContext } from '../store/timer-context.tsx';


export default function Timer({ name, duration }: TimerProps) {

  const { isRunning } = useTimerContext()

  const [remainingTime, setRemainigTime] = useState(duration * 1000);

  const interval = useRef<number | null>(null);

  if (remainingTime <= 0 && interval.current) {
    clearInterval(interval.current)
  }

  useEffect(() => {
    let timer: number;
    if (isRunning) {
      timer = setInterval(() => {
        setRemainigTime(prev => {
          if (prev <= 0) {
            return prev;
          }
          return prev - 50;
        });
      }, 50);
      interval.current = timer;
    } else if (interval.current) {
      clearInterval(interval.current);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);


  return (
    <Container as="article">
      <h2>{name}</h2>
      <p><progress max={duration * 1000} value={remainingTime} /></p>
      <p>{formattedRemainingTime}</p>
    </Container>
  );
}
