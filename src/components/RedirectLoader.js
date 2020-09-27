import React, { useState, useEffect } from 'react';

const RedirectLoader = ({ path, history }) => {
    const [counter, setCounter] = useState(5);

    useEffect(() => {
        const interval = setInterval(() => {
            // decrement the counter every second
            setCounter((prevCounter) => --prevCounter);
            // redirect user to another page once counter is equal to 0
            counter === 0 && history.push(path)
        }, 1000)

        // clean the hook
        return () => clearInterval(interval);
    }, [counter, history, path])

    return (
        <div className="container-fluid p-5 text-center">
            <h4 className="text-info">Vous allez être redirigé à la page d'accueil dans {counter} minutes</h4>
        </div>
    )
};

export default RedirectLoader;
