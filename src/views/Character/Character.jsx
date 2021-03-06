import React, { useEffect } from "react";

import "./Character.css";

// React router
import { useParams, useHistory } from "react-router-dom";

// Custom hook
import useFetchCharacter from "../../hooks/useFetchCharacter";

import HashLoader from "react-spinners/HashLoader";
import MyButton from "../../components/MyButton/MyButton";
import ErrorLoading from "../../components/ErrorLoading/ErrorLoading";

const Character = () => {
  // Traemos el ID del personaje de la URL
  const { charId } = useParams();
  const history = useHistory();

  // Traemos los datos de los personajes
  const [loading, err, charData, fetchCharacterData] = useFetchCharacter(
    charId
  );

  // En el primer render traemos la información
  useEffect(() => {
    fetchCharacterData();

    return () => console.log("unmount");
  }, []);

  return (
    <>
      {err && !loading && <ErrorLoading></ErrorLoading>}

      {loading && !err && (
        <div className="character__spinner">
          <HashLoader size={250} color={"#ff5000"}></HashLoader>
        </div>
      )}
      <div className="character__container">
        {!loading && charData.image && (
          <div className="character__image">
            <img src={charData.image} alt={charData.name} />
          </div>
        )}

        {!loading && charData.name && (
          <div className="character__info">
            <p className="char__name">{charData.name}</p>
            <p className="char__origin">
              <b>Origin</b>: {charData.origin.name}
            </p>

            <p className="char__status">
              <b>Status</b>: {charData.status}
            </p>
            {/* <div className="character__episodes">
              <p>Episodes: </p>
              {charData.episode.slice(0, 10).map((episode, idx) => (
                <p key={idx}>
                  {episode.replace(
                    "https://rickandmortyapi.com/api/episode/",
                    ""
                  )}
                </p>
              ))}
            </div> */}
          </div>
        )}

        <div className="character__button">
          <MyButton
            label={loading ? "Cargando..." : "Volver"}
            function={history.goBack}
          ></MyButton>
        </div>
      </div>
    </>
  );
};

export default Character;
