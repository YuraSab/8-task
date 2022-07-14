import React, {useEffect, useState} from 'react';

function App() {

    const [counter, setCounter] = useState(9);
    const [todo, setTodo] = useState(null);

    const incCounter = () => {
        setCounter((prev) => prev + 1);
    }
    const decCounter = () => {
        setCounter((prev) => prev - 1);
    }
    const resetCounter = () => {
        setCounter(0);
        setTodo(null);
    }

    const resetTodo = () => {
        setTodo(null)
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
                setTodo(value)
            })
    }



    return (
        <div>
            <h3>Counter: {counter}</h3>
            <button disabled={counter === 200} onClick={incCounter}>Inc Counter</button>
            <button disabled={counter === 1 || counter === 0} onClick={decCounter}>Dec Counter</button>
            <button disabled={counter === 0} onClick={resetCounter}>Reset Counter</button>
            <button disabled={todo === null} onClick={resetTodo}>Reset Todos</button>

            <div>
                {
                    todo && <h3>
                        {todo.id}. {todo.title}
                    </h3>
                }

            </div>
        </div>
    );
}

export default App;