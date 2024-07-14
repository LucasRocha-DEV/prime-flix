import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './favoritos.css';

export default function Favoritos() {
    const [filmesFavoritos, setFilmesFavoritos] = useState([]);

    useEffect(() => {
        const filmesSalvos = localStorage.getItem('filmes');
        setFilmesFavoritos(JSON.parse(filmesSalvos) || []);
    }, []);

    return (
        <div className="container">
            <h1>Meus Filmes Favoritos</h1>
            <div className="lista-filmes">
                {filmesFavoritos.length > 0 ? (
                    filmesFavoritos.map((filme) => (
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                        </article>
                    ))
                ) : (
                    <p>Você não tem nenhum filme salvo.</p>
                )}
            </div>
        </div>
    );
}