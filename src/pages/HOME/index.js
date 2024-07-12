import React, { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilmes() {
            try {
                const response = await api.get("movie/now_playing", {
                    params: {
                        api_key: "dfb70475e09086887517fbfce39e2581",
                        language: "pt-BR",
                        page: 1,
                    },
                });
                setFilmes(response.data.results.slice(0, 10));
                setLoading(false);
            } catch (error) {
                console.error("Error loading filmes:", error);
            }
        }

        loadFilmes();
    }, []);

    if (loading) {
        return( 
        <div className="loading">
            <h1>Carregando Filmes...</h1>
        </div>
        )
    }

    return (
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) => (
                    <article key={filme.id}>
                        <strong>{filme.title}</strong>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${filme.backdrop_path}`}
                            alt={`Capa do filme ${filme.title}`}
                        />
                        <p>{filme.overview}</p>
                        <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default Home;
