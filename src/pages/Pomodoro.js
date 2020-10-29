import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import pomodoro from '../assets/pomodoro.png';

const Home = () => {
    const { state } = useContext(AuthContext);
	return (
    <div>
      <div className="container pt-5">
        <div className="text-center h4">
            <p>"La technique Pomodoro est une technique de gestion du temps développée par Francesco Cirillo à la fin des années 1980. 
                Cette méthode se base sur l'usage d'un minuteur permettant de respecter des périodes de 25 minutes appelées pomodori (qui signifie en italien « tomates »). 
                Ces différentes périodes de travail sont séparées par de courtes pauses. Proches des concepts de cycles itératifs et des méthodes de développement agiles, 
                utilisées dans le développement de logiciel, la méthode est utilisée pour la programmation en binôme. 
                La méthode a pour principale prétention que des pauses régulières favorisent l'agilité intellectuelle. 
                Certains bénéfices des temps de repos sur la consolidation de la mémoire peuvent être observés expérimentalement."</p>
            <p><a href="https://fr.wikipedia.org/wiki/Technique_Pomodoro">-Wikipédia</a></p>
         </div>
         <div className="text-center h1">
              Comment ça marche ?
              <img src={pomodoro} alt="pomodoro user guide" style={{ height: "20rem" }}/>
         </div>
         <hr/>
  		</div>
    </div>
	);
};

export default Home;



