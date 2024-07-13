import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./filme.css";
import api from "../../api";
import { Link } from 'react-router-dom';

function Filme() {
    const { id } = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            try {
                const response = await api.get(`/movie/${id}`, {
                    params: {
                        api_key: "dfb70475e09086887517fbfce39e2581",
                        language: "pt-BR",
                    },
                });
                setFilme(response.data);
                setLoading(false);
            } catch (error) {
                console.log("FILME NAO ENCONTRADO");
            }
        }

        loadFilme();

        return () => {
            console.log("COMPONENTE DESMONTADO");
        };
    }, [id]);

    if (loading) {
        return (
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        );
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/w500${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <Link className="botao-salvar" to="/salvar">Salvar</Link>
            
            <Link className="botao-trailer" to="/trailer">Trailer</Link>

            <strong>Avaliação: {filme.vote_average.toFixed(1)} / 10</strong>

        </div>
    );
}

export default Filme;
