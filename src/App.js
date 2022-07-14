import React, {useEffect, useReducer, useState} from 'react';


const initialState = null;

const reducer = (state, action) => {
    switch (action.type){
        case "SET_TODO": {
            return action.payload
        }
        case "TOGGLE_TODO": {
            return {
                ...state,
                completed: !state.completed
            }
        }
        case "RESET_TODO": {
            return null
        }
        default: {
            return state
        }
    }
}

function App() {


    const [state, dispatch] = useReducer(reducer, initialState);

    const [counter, setCounter] = useState(9);
    // const [todo, setTodo] = useState(null);

    const incCounter = () => {
        setCounter((prev) => prev + 1);
    }
    const decCounter = () => {
        setCounter((prev) => prev - 1);
    }
    const resetCounter = () => {
        setCounter(0);
        // setTodo(null);
        dispatch({ type: "RESET_TODO" })
    }


    const resetTodo = () => {
        // setTodo(null)
        dispatch({ type: "RESET_TODO" });
    }

    const toggleTodo = () => {
        // setTodo(null)
        dispatch({ type: "TOGGLE_TODO" });
    }


    useEffect(() => {
        if (counter > 0) {
            fetchData();
        } else {
            console.log("Counter:", counter)
        }
    }, [counter]);


    const fetchData = async () => {
        return fetch(`https://jsonplaceholder.typicode.com/todos/${counter}`)
            .then(value => value.json())
            .then(value => {
                dispatch({ type: "SET_TODO", payload: value});
                // setTodo(value)
            })
    }



    return (
        <div>
            <h3>Counter: {counter}</h3>
            <button disabled={counter === 200} onClick={incCounter}>Inc Counter</button>
            <button disabled={counter === 1 || counter === 0} onClick={decCounter}>Dec Counter</button>
            <button disabled={counter === 0} onClick={resetCounter}>Reset Counter</button>
            <button disabled={state === null} onClick={resetTodo}>Reset Todos</button>
            <button disabled={state === null} onClick={toggleTodo}>Toggle Todos</button>

            <div>
                {
                    state && <h3>
                        {state.id}. {state.title} - {state.completed.toString()}
                    </h3>
                }

            </div>
        </div>
    );
}

export default App;