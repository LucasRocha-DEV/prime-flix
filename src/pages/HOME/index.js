// Importa o React, o hook useEffect para efeitos colaterais, useState para gerenciar estado local, e Link do react-router-dom para navegação
import React, { useEffect, useState } from "react";
// Importa a instância da API configurada para fazer requisições HTTP
import api from "../../api";
// Importa o componente Link para permitir navegação entre componentes
import "./home.css"; // Importa o CSS específico para este componente

// Define o componente funcional Home
function Home() {
    // Define o estado 'filmes' para armazenar os filmes e 'loading' para controlar a exibição do carregamento
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect é usado para executar a função loadFilmes quando o componente é montado
    useEffect(() => {
        // Declara a função assíncrona loadFilmes
        async function loadFilmes() {
            try {
                // Faz uma requisição GET para a API para buscar os filmes que estão em cartaz
                const response = await api.get("movie/now_playing", {
                    params: {
                        api_key: "dfb70475e09086887517fbfce39e2581", // Chave da API
                        language: "pt-BR", // Define o idioma dos dados retornados
                        page: 1, // Especifica a página dos resultados a ser retornada
                    },
                });
                // Atualiza o estado 'filmes' com os primeiros 10 filmes da resposta
                setFilmes(response.data.results.slice(0, 10));
                // Define o estado 'loading' como false, indicando que o carregamento foi concluído
                setLoading(false);
            } catch (error) {
                // Em caso de erro na requisição, exibe o erro no console
                console.error("Error loading filmes:", error);
            }
        }

        // Chama a função loadFilmes
        loadFilmes();
    }, []); // O array vazio como segundo argumento indica que o efeito não depende de nenhum estado ou prop e deve ser executado apenas uma vez

    // Se 'loading' for true, retorna a marcação para exibição do estado de carregamento
    if (loading) {
        return( 
        <div className="loading">
            <h1>Carregando Filmes...</h1>
        </div>
        )
    }

    // Retorna a marcação HTML quando os filmes são carregados
    return (
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) => (
                    // Para cada filme, retorna um artigo contendo título, imagem, descrição e um link para detalhes
                    <article key={filme.id}>
                        <strong>{filme.title}</strong> // Título do filme
                        <img
                            src={`https://image.tmdb.org/t/p/w500${filme.backdrop_path}`} // URL da imagem do filme
                            alt={`Capa do filme ${filme.title}`} // Texto alternativo para a imagem
                        />
                        <p>{filme.overview}</p> // Descrição do filme
                        <Link to={`/filme/${filme.id}`}>Ver detalhes</Link> // Link para a página de detalhes do filme
                    </article>
                ))}
            </div>
        </div>
    );
}

// Exporta o componente Home para ser usado em outros lugares da aplicação
export default Home;