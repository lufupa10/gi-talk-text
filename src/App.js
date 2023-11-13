
import "./App.css"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import { useState, useEffect } from "react";
import { FaPlay, FaStop, FaTrash, FaCopy, FaCheck, FaInfo, FaRegWindowClose, FaRegFilePdf } from 'react-icons/fa';


const App = () => {
    const [textToCopy, setTextToCopy] = useState();
    const [helpe, setHelpe] = useState();
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration: 1000
    });
    const [selectedOption, setSelectedOption] = useState('');
    const [intervalActive, setIntervalActive] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: selectedOption });
    const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();

    useEffect(() => {
        let scrollInterval;

        if (intervalActive) {
            scrollInterval = setInterval(() => {
                const windowHeight = window.innerHeight;
                window.scrollTo({
                    top: windowHeight,
                    behavior: 'smooth',
                });
            }, 10000);
        }

        return () => clearInterval(scrollInterval);
    }, [intervalActive]);

    useEffect(() => {
        const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');

        if (!hasVisitedBefore) {
            setShowPopup(true);
            localStorage.setItem('hasVisitedBefore', 'true');
        }
    }, []);

    const closePopup = () => {
        setShowPopup(false);
    };


    const toggleInterval = () => {
        setIntervalActive((prev) => !prev);
    };

    if (!browserSupportsSpeechRecognition) {
        return null
    }

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    function handlerHelpe() {
        SpeechRecognition.stopListening()
        resetTranscript();
        setIntervalActive(false);
        setHelpe("ok")
    }

    function handlerHear() {
        startListening();
        toggleInterval();
        setHelpe("")
    }

    function handlerClean() {
        setIntervalActive(true);
        setHelpe("")
        resetTranscript();
    }

    function handleraStop() {
        SpeechRecognition.stopListening();
        setIntervalActive(false);
    }

    return (
        <>
            <div className="container">
                {/* <h2>GiTalkText</h2> */}
                <div className="center-container">
                    <img className="centered-image" src="gi.png" alt="Descrição da Imagem" />
                    <div className="subtitle">Conversão de aúdio em texto.</div>
                </div>
                <br />

                <select id="options" value={selectedOption} onChange={handleChange}>
                    <option value="">Seleciona a legenda</option>
                    <option value="en-US">Inglês</option>
                    <option value="pt-br">Português</option>
                </select>
                <br />
                <div className="main-content" onClick={() => setTextToCopy(transcript)}>
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
                            entre em contato pelo e-mail: daniel.lufupa@hotmail.com, ou realize um PIX de qualquer valor para
                            a chave: 2522355425235325253."

                        </div>
                    </> : transcript}
                </div>

                <div className="btn-style">
                    <button title="Copiar" onClick={setCopied}>
                        {isCopied ? <FaCheck color="black" size="2em" /> : <FaCopy color="black" size="2em" />}
                    </button>
                    <button title="Ouvir" onClick={handlerHear}><FaPlay color="black" size="2em" /></button>
                    <button title="Parar" onClick={handleraStop}><FaStop color="black" size="2em" /></button>
                    <button title="Limpar" onClick={handlerClean}><FaTrash color="black" size="2em" /></button>
                    <button title="Informações e configurações" onClick={handlerHelpe}><FaInfo color="black" size="2em" /></button>
                </div>

                {showPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <h1>Olá</h1>
                            <p>Seja bem-vindo à plataforma Gi, o seu conversor de áudio para texto! Se esta for a sua primeira visita,
                                sugerimos que baixe o nosso tutorial para configurar a aplicação no seu computador e desfrutar
                                de todas as funcionalidades.
                            </p>
                            {/* <br/><br/> */}
                            {/* <a
                                href="/caminho-do-tutorial.pdf"  // Substitua pelo caminho real do seu tutorial
                                download="tutorial.pdf"
                                className="download-button"
                            >
                                Baixar Tutorial
                            </a> */}
                            <div className="popup-button">
                                <button title="Baixar" onClick={closePopup}><FaRegFilePdf color="black" size="2em" /></button>
                                <button title="Fechar" onClick={closePopup}><FaRegWindowClose color="black" size="2em" /></button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <footer><p className="footer-text">Desenvolvido por Daniel Lufupa - 2023</p></footer>
        </>
    );
};

export default App;