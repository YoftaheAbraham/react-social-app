import { useReducer, createContext } from 'react'
import { INITIAL_STATE, reducer } from './reducer'


export const Store = createContext(null)

const Context = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    return (
        <Store.Provider value={{state, dispatch}}>
            {children}
        </Store.Provider>
    )
}

export default Context