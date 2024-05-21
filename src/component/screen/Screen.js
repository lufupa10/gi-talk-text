import { useEffect, useRef, useState } from "react";
import "../../App.css";
import ReactGA4 from "react-ga4";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const AutoScrollDown = ({ text }) => {
  const scrollContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  useEffect(() => {
    scrollContainerRef.current.scrollTop =
      scrollContainerRef.current.scrollHeight;
  }, [text]);

  const psConfig = {
    wheelPropagation: false, // Impede a rolagem com a roda do mouse
    suppressScrollX: true, // Oculta a barra de rolagem horizontal
  };

  return (
    <PerfectScrollbar
      containerRef={(ref) => (scrollContainerRef.current = ref)}
      options={psConfig}
      style={{
        width: isMobile ? "" : "730px",
        fontSize: "27px",
        height: "400px",
      }}
    >
      {text}
    </PerfectScrollbar>
  );
};

const Screen = ({ setTextToCopy, transcript, helpe }) => {
  useEffect(() => {
    ReactGA4.initialize("G-DCS1W7GQLT");
    ReactGA4.send({
      hitType: "pageview",
      page: window.location.pathname + window.location.search,
    });
  }, []);

  return (
    <>
      <div className="main-content">
        {helpe === "ok" ? (
          <>
            <div className="helpe-text">
              <h3>Sobre</h3>
              Gitalktext, a barreira entre o áudio e o texto é quebrada. Surdos
              de todo o mundo podem agora acessar aulas ao vivo, palestras e
              qualquer tipo de áudio transcritos em tempo real para texto.
              <h3>Manual</h3>
              Configurar a Gi no seu computador é fácil e descomplicado. Confira o nosso manual
              com passo a passo:{" "}
              <a href="/manual_gitaltext.pdf" download="Manual_GiTalkText">
              baixar o PDF
              </a>
              <h3>Apoio</h3>A Gi é uma aplicação totalmente gratuita. Se deseja
              contribuir para a sustentabilidade do projeto, entre em contato
              pelo nosso instagram:{" "} 
              <a
                href="https://www.instagram.com/gitalktext?igsh=MTZwYmFvd2U0c2NtMQ=="
                target="_blank"
                rel="noopener noreferrer"
              >
                @gitalktext
              </a>{" "}
              ou realize um PIX de qualquer valor para a chave:
              gitalktext@hotmail.com
            </div>
          </>
        ) : (
          <AutoScrollDown text={transcript} />
        )}
      </div>
    </>
  );
};

export default Screen;
