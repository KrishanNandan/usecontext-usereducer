import { useRef } from 'react';
import { useTimerContext } from '../store/timer-context.tsx';


import Button from './UI/Button.tsx';
import Form, { FormHandle } from './UI/Form.tsx';
import Input from './UI/Input.tsx';

export default function AddTimer() {
  const { addTimer } = useTimerContext();
  const form = useRef<FormHandle>(null);

  function handleSaveTimer(data: unknown) {
    const extractedData = data as { name: string; duration: string };
    addTimer({ name: extractedData.name, duration: +extractedData.duration });
    form.current?.clear();
  }

  return (
    <Form ref={form} onSave={handleSaveTimer} id="add-timer">
      <Input type="text" label="Name" id="name" />
      <Input type="number" label="Duration" id="duration" />
      <p>
        <Button>Add Timer</Button>
      </p>
    </Form>
  );
}
