import { useState } from "react";
import supabase from "../../supabaseClient";
// import axios from "axios";
import "./Form.css";

const Chatbot = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [close, setClose] = useState(false);
  const [closeForms, setCloseForms] = useState(true);
  const [formMsg, setFormMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || message === "") {
      setFormMsg("Preencha todos os campos");
      timeButton();
    } else {
      const { data, error } = await supabase
        .from("enderecos")
        .insert([{ name, email, message }]);

      // Reset form after submission
      setName("");
      setEmail("");
      setMessage("");
      setCloseForms(false);
      time();
    }
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
    setClose(!close);
  };

  // const handleSubmit = async () => {
  //   if (name === "" || email === "" || message === "") {
  //     setFormMsg("Preencha todos os campos");
  //     timeButton();
  //   } else {
  //     try {
  //       await axios.post(
  //         "https://gitalk-back-email-1.onrender.com/send-email",
  //         {
  //           name,
  //           email,
  //           message,
  //         }
  //       );

  //       setName("");
  //       setEmail("");
  //       setMessage("");
  //       setCloseForms(false);
  //       time();

  //       console.log("Mensagem enviada com sucesso!");
  //     } catch (error) {
  //       console.error("Erro ao enviar mensagem:", error);
  //     }
  //   }
  // };

  function time() {
    setTimeout(() => {
      toggleForm();
      setCloseForms(true);
    }, 5000);
  }

  function timeButton() {
    setTimeout(() => {
      setFormMsg("");
    }, 3000);
  }

  return (
    <div className="container">
      <div className={`form-container ${isFormOpen ? "open" : ""}`}>
        {close === false ? (
          <div className="form-toggle" onClick={toggleForm}>
            Atendimento GiTalkText
          </div>
        ) : (
          <div className="form-toggle" onClick={toggleForm}>
            Fechar X
          </div>
        )}

        <div className="form-popup">
          <span className="close" onClick={toggleForm}>
            &times;
          </span>
          {closeForms === true ? (
            <form>
              <h4 className="formTitle">O que podemos ajudar?</h4>
              <label>
                Nome:
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>

              <label>
                E-mail:
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <label>
                Escreva Algo:
                <textarea
                  style={{ height: "100px" }}
                  name="problem"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </label>
              {formMsg.length ? (
                <div>{formMsg}</div>
              ) : (
                <div onClick={handleSubmit} className="formSend">
                  Enviar
                </div>
              )}
            </form>
          ) : (
            <>
              <div className="formSuccess">
                <h4>'Mensagem enviada com sucesso!'</h4>
              </div>
              <div className="formMsgTime">
                Em breve, entraremos em contato.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
