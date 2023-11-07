import { type ReactNode, createContext, useContext, useReducer } from "react";

type TimersState = {
    isRunning: boolean;
    timers: Timer[];
};

type TimersContextValue = TimersState & {
    addTimer: (timerData: Timer) => void,
    startTimers: () => void,
    stopTimers: () => void,
}

type TimersContextProviderProps = {
    children: ReactNode
}

type StartTimersAction = {
    type: 'START_TIMER'
}

type StopTimersAction = {
    type: 'STOP_TIMER'
}

type AddTimerAction = {
    type: 'ADD_TIMER';
    payload: Timer
}

type Action = StartTimersAction | StopTimersAction | AddTimerAction;

export type Timer = {
    name: string;
    duration: number;
}


/*Context defination */
const TimerContext = createContext<TimersContextValue | null>(null);

export function useTimerContext() {
    const timerCon = useContext(TimerContext)
    if (timerCon === null) {
        throw new Error("Something went wrong");
    }
    else {
        return timerCon;
    }

}



/*Managing the state for different methods using useReducer */

const initialState: TimersState = {
    isRunning: true,
    timers: []
}

/**Reducer function */
function timersReducer(state: TimersState, action: Action): TimersState {

    switch (action.type) {
        case "START_TIMER": {
            return { ...state, isRunning: true };
        }
        case "STOP_TIMER": {
            return { ...state, isRunning: false };
        }
        case "ADD_TIMER": {
            return {
                ...state, timers: [
                    ...state.timers, {
                        duration: action.payload.duration,
                        name: action.payload.name
                    }
                ]
            };
        }
        default: return state;
    }
}

/**Context provider component */
export default function TimersContextProvider({ children }: TimersContextProviderProps) {
    const [timersState, dispatch] = useReducer(timersReducer, initialState);
    const ctx: TimersContextValue = {
        timers: timersState.timers,
        isRunning: timersState.isRunning,
        addTimer(timerData) {
            dispatch({
                type: 'ADD_TIMER',
                payload: timerData
            });
        },
        startTimers() {
            dispatch({
                type: 'START_TIMER'
            });

        },
        stopTimers() {
            dispatch({
                type: 'STOP_TIMER'
            });
        }

    }
    return <TimerContext.Provider value={ctx}>{children}</TimerContext.Provider>
}