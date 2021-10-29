import * as Task from './Task';


export interface ApplicationState {
    task: Task.TaskState | undefined;
}

export const reducers = {
    task: Task.reducer,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
