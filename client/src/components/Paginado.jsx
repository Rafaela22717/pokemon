import React from 'react';
import "../Styles.css/Paginado.css";

function Paginado({pokemonsPerPage, allPokemons, paginado}) {
    
    const pageNumbers = [];
    for(var i = 1; i <= Math.ceil(allPokemons /pokemonsPerPage); i++) {
        pageNumbers.push(i)
    };

    return(
        <div >
        <nav>
            <ul className="paginado">{/* renderiza los num de paginado */}
                {
                    pageNumbers &&
                    pageNumbers.map(number => (
                        <li key={i}>
                            <a href onClick={() => paginado(number)}>{number}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
        </div>
    );
};

export default Paginado;