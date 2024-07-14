import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./filme.css";
import api from "../../api";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    const [salvo, setSalvo] = useState(false);

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
                navigate("/", { replace: true });
                return;
            }
        }

        loadFilme();

        return () => {
            console.log("COMPONENTE DESMONTADO");
        };
    }, [navigate, id]);

    function salvaFilme() {
        const minhaLista = localStorage.getItem("filmes");
        
        let filmesSalvos = JSON.parse(minhaLista) || [];
    
        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);
        if (hasFilme) {
            Swal.fire({
                title: 'Erro!',
                text: 'Você já possui esse filme salvo.',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#E50914',
            });
            return;
        }
    
        filmesSalvos.push(filme);
        localStorage.setItem("filmes", JSON.stringify(filmesSalvos));
        Swal.fire({
            title: 'Sucesso!',
            text: 'Filme salvo com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#E50914',
        });
    }

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

            <div className="area-buttons">
            <button onClick={salvaFilme}>Salvar</button>
                <a href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`} target="_blank" rel="external">Trailer</a>
            </div>

            <strong>Avaliação: {filme.vote_average.toFixed(1)} / 10</strong>

        </div>
    );
}

export default Filme;
