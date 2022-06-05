import { FC, useReducer } from 'react';
import { UiContext, uiReducer } from './';

export interface UiState {
    isMenuOpen: boolean;
}


const UI_INITIAL_STATE: UiState = {
    isMenuOpen: false,
}
 
interface Props{
    children:any
}
export const UiProvider: FC <Props>= ({ children }: any) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const toggleSideMenu = () => {
        dispatch({ type: '[UI] - ToggleMenu' });
    }


    return (
        <UiContext.Provider value={{
            ...state,

            // Methods
            toggleSideMenu,
        }}>
            {children}
        </UiContext.Provider>
    )
};