
import "./App.css"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import { useState, useEffect } from "react";
import { FaPlay, FaStop, FaTrash, FaCopy, FaCheck, FaInfo } from 'react-icons/fa';
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
    const [intervalActive, setIntervalActive] = useState(false);
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
                <div onClick={() => setTextToCopy(transcript)}>
                { transcript || helpe ? (
                    <Screen setTextToCopy={setTextToCopy} transcript={transcript} helpe={helpe}></Screen>
                ): null}
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
                <Popup></Popup>
                <Chatbot></Chatbot>
            </div>
            <footer><p className="footer-text">Desenvolvido por Daniel Lufupa - 2023</p></footer>
        </>
    );
};

export default App;