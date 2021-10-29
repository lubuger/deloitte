import { Action, Reducer } from 'redux';

export interface TaskState {
    username: string;
    code: string;
}

export interface AddTaskAction { type: 'ADD_TASK', payload: TaskState }

export type KnownAction = AddTaskAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    addTask: (username: string, code: string) => ({
        type: 'ADD_TASK', payload: {
            username,
            code
        }
    } as AddTaskAction),
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<TaskState> = (state: TaskState | undefined, incomingAction: Action): TaskState => {
    if (state === undefined) {
        return {
            username: '',
            code: '',
        };
    }

    const action = incomingAction as KnownAction;

    switch (action.type) {
        case 'ADD_TASK':
            return {
                username: action.payload.username,
                code: action.payload.code
            };
        default:
            return state;
    }
};