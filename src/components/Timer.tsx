import Container from './UI/Container.tsx';
import { type Timer as TimerProps } from "../store/timer-context.tsx";


export default function Timer({name,duration}:TimerProps) {
  return (
    <Container as="article">
      <h2>{name}</h2>
      <h2>{duration}</h2>
    </Container>
  );
}
