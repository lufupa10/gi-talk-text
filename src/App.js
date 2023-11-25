
import { useState, useEffect } from "react";
import "./App.css"
import ReactGA  from 'react-ga';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import copy from 'clipboard-copy';
import { FaPlay, FaTrash, FaCopy, FaCheck, FaInfo } from 'react-icons/fa';
import Popup from "./component/popup/Popup.js";
import Chatbot from "./component/chatbot/Chatbot.js";
import Screen from "./component/screen/Screen.js";

const App = () => {
    const [textToCopy, setTextToCopy] = useState();
    const [helpe, setHelpe] = useState();
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration: 1000
    });
    const [selectedOption, setSelectedOption] = useState('pt-br');
    const [selectedOptionScreen, setSelectedOptionScreen] = useState();
    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: selectedOption });
    const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();

    useEffect(() => {
        ReactGA.initialize('G-DCS1W7GQLT');
        // Rastrear a visualização inicial da página
        ReactGA.pageview(window.location.pathname + window.location.search);
      }, []);

    useEffect(() => {
       let chooseText = setInterval(() => {
        selectedOptionScreen === 'noRunningTexthHistory' && resetTranscript() ;       
        }, 10000);
        return () => clearInterval(chooseText);
    }, [selectedOptionScreen]);

      const handleCopyClick = () => {
        copy(transcript);
        setCopied(true);
      };

    if (!browserSupportsSpeechRecognition) {
        return null
    }

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleChangeScreen = (e) => {
        setSelectedOptionScreen(e.target.value);
        resetTranscript();
    };

    function handlerHelpe() {
        SpeechRecognition.stopListening()
        resetTranscript();
        setHelpe("ok")
    }

    function handlerHear() {
        startListening();
        setHelpe("")
    }

    function handlerClean() {
        setHelpe("")
        resetTranscript();
    }

    return (
        <>
            <div className="container">
                <div className="center-container">
                    <img className="centered-image" src="gi.png" alt="Descrição da Imagem" />
                    <div className="subtitle">GITALKTEXT</div>
                    <p className="description">Conversão de aúdio em texto.</p>
                </div>
                <br />
                
                <select id="options" value={selectedOption} onChange={handleChange}>
                    <option value="" disabled selected>Seleciona a conversão</option>
                    <option value="es-ES">Espanhol</option>
                    <option value="fr-FR">Francês</option>
                    <option value="en-US">Inglês</option>
                    <option value="pt-br">Português</option>
                    
                </select>
                <select id="options" value={selectedOptionScreen} onChange={handleChangeScreen}>
                    <option value="" disabled selected>Opção de visualização</option>
                    <option value="runningText">Com texto corrido</option>
                    <option value="noRunningTexthHistory">Sem texto corrido</option>
                </select>
                <br />
                <div onClick={() => setTextToCopy(transcript)}>
                    <Screen setTextToCopy={setTextToCopy} transcript={transcript} helpe={helpe}></Screen>
                </div>
                <div className="btn-style">
                    <button title="Copiar" onClick={handleCopyClick}>
                        {isCopied ? <FaCheck color="black" size="2em" /> : <FaCopy color="black" size="2em" />}
                    </button>
                    <button title="Começar" onClick={handlerHear}><FaPlay color="black" size="2em" /></button>
                    {/* <button title="Parar" onClick={handleraStop}><FaStop color="black" size="2em" /></button> */}
                    <button title="Excluir" onClick={handlerClean}><FaTrash color="black" size="2em" /></button>
                    <button title="Informações e configurações" onClick={handlerHelpe}><FaInfo color="black" size="2em" /></button>
                </div>
                <Popup></Popup>
                <Chatbot></Chatbot>
            </div>
            <footer><p className="footer-text">Desenvolvido por Daniel Lufupa - 2023</p></footer>
        </>
    );
};

export default App;