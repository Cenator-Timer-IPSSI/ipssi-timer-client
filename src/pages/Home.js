import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import logo from '../assets/logo.png';

const Home = () => {
    const { state } = useContext(AuthContext);
	return (
    <div>
        <div className="text-center">
          <button className="btn btn-raised btn-secondary" style={{ width:"50%" }}>
            Voir les équipes
          </button>
          <button className="btn btn-raised btn-secondary" style={{ width:"50%" }}>
            Voir les projets
          </button>
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
            <p> aaaaaaaaaaaaaaaa </p>
         </div>
         <hr/>
  		</div>
    </div>
	);
};

export default Home;
