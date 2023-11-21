
import { useEffect, useRef } from "react";
import "../../App.css"
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

const AutoScrollDown = ({ text }) => {
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }, [text]);

    const psConfig = {
        wheelPropagation: false, // Impede a rolagem com a roda do mouse
        suppressScrollX: true, // Oculta a barra de rolagem horizontal
    };

    return (
        <PerfectScrollbar
            containerRef={(ref) => (scrollContainerRef.current = ref)}
            options={psConfig}
            style={{ width: '730px', fontSize: '27px', height: '400px'}}
            
        >
            {text}
        </PerfectScrollbar>
    );
};

const Screen = ({
    setTextToCopy,
    transcript,
    helpe
}) => {

    return (
        <>
            <div className="main-content">
                {helpe === "ok" ? <>

                    <div>
                        <h3>Sobre</h3>
                        A Gi é um site dedicado à rápida conversão de áudio para texto.
                        Consciente da importância da acessibilidade, desenvolvi esta aplicação para oferecer auxílio às pessoas.
                        Atualmente na versão 0.0.1 e encorajo você a explorar ao máximo essa ferramenta.

                        <h3>Ajuda</h3>
                        Configurar a Gi no seu computador é fácil e descomplicado.
                        Confira nosso tutorial no YouTube para um guia passo a passo: [LINK]."

                        <h3>Doação</h3>
                        A Gi é uma aplicação totalmente gratuita. Se deseja contribuir para a sustentabilidade do projeto,
                        entre em contato pelo nosso instagram<a href='https://instagram.com/gi.talktext?igshid=NzZlODBkYWE4Ng==' target="_blank" rel="noopener noreferrer">
                        @gitalktext</a> ou realize um PIX de qualquer valor para a chave: 2522355425235325253."

                    </div>
                </> : <AutoScrollDown text={transcript} />}
            </div>
        </>
    )
};

export default Screen;