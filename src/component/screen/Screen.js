
import "../../App.css"

const Screen = ({
    setTextToCopy,
    transcript,
    helpe
}) => {

    return (
        <>

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
        </>
    )
};

export default Screen;