
import "./Popup.css"
import { useState, useEffect } from "react";
import { FaRegWindowClose, FaRegFilePdf } from 'react-icons/fa';


const Popup = () => {
    const [showPopup, setShowPopup] = useState(false);

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

    return (
        <>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h1>Olá</h1>
                        <p>Seja bem-vindo à plataforma GiTalkText, o seu conversor de áudio para texto! Se esta for a sua primeira visita,
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
        </>
    );
};

export default Popup;