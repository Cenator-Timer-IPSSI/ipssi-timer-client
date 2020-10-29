import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import logo from '../assets/logo.png';

const Home = () => {
    const { state } = useContext(AuthContext);
    return (
    <div>
        <div className="text-center">
          <a href="./teams" className="btn btn-raised btn-secondary" style={{ width:"34%" }}>
            Voir les équipes
          </a>
          <a href="./projects" className="btn btn-raised btn-secondary" style={{ width:"33%" }}>Voir les projets</a>
            <a href="./pomodoro" className="btn btn-raised btn-danger" style={{ width:"33%" }}>
              Pomodoro
            </a>
        </div>
          <div className="container pt-5">
             <div className="jumbotron text-center h1">
                  Welcome to Cenator Timer Manager
             </div>
             <hr/>
              {/* {JSON.stringify(state.user)} */}
          </div>
      <div className="container pt-5">
         <div className="text-center h1">
              La création du logo
              <img src={logo} alt="Cenator Timer logo" style={{ height: "20rem" }}/>
         </div>
         <div className="text-center h4">
            <p> Le superbe logo : ) </p>
         </div>
         <hr/>
          </div>
    </div>
    );
};

export default Home;