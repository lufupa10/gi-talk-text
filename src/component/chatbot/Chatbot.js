import React, { useState, useRef } from 'react';
import { FaWindowClose } from 'react-icons/fa';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  const chatBoxRef = useRef(null);

  const handleSendMessage = () => {
    if (!input.trim()) {
      return;
    }

    // Adiciona a mensagem do usuário ao histórico
    const userMessage = { text: input, type: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    // Simula uma resposta do chatbot após um pequeno atraso
    setTimeout(() => {
      const botMessage = { text: getChatbotResponse(input), type: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);

      // Ao enviar uma mensagem, faz scroll para o final do chatBox
      if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      }
    }, 500);
  };

  const getChatbotResponse = (userInput) => {
    // Lógica para gerar respostas do chatbot
    if (userInput.toLowerCase().includes('como faz para configurar?')) {
      return 'para configirar temos o link do pdf no menu [I]';
    } else if (userInput.toLowerCase().includes('como configura?')) {
      return 'Para configirar temos o link do pdf no menu [I]';
    }
      else if (userInput.toLowerCase().includes('como faz para legendar?')) {
        return 'para legendar segue o tutorial linl[]'
      }
        else if (userInput.toLowerCase().includes('como configurar?')) {
          return 'para configurar segue o linl[] do tutorial'
    } else {
      return 'Desculpe, não entendi. Pode reformular a pergunta?';
    }
  };

  return (
    <div style={isOpen ? styles.openContainer : styles.closedContainer}>
      {isOpen && (
        <>
          <div style={styles.header}>
            <div>Chat exclusivo para questões relacionadas à configuração da Gi.</div>
            <div style={styles.closeButton} onClick={handleToggleChat}><FaWindowClose color="black" size="2em" /></div>
            </div>
          <div ref={chatBoxRef} style={styles.chatBox}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.type}`}
                style={message.type === 'user' ? styles.userMessage : styles.botMessage}
              >
                <span style={message.type === 'user' ? styles.userLabel : styles.botLabel}>
                  {message.type === 'user' ? 'Você:' : 'Chatbot:'}
                </span>
                {message.text}
              </div>
            ))}
          </div>
          <div style={styles.inputContainer}>
            <input
              type="text"
              placeholder="Digite sua pergunta..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div style={styles.sendButton} onClick={handleSendMessage}>
              Enviar
            </div>
          </div>
        </>
      )}
      {!isOpen && (
        <div style={styles.closedButton} onClick={handleToggleChat}>
          Abrir Chat
        </div>
      )}
    </div>
  );
};

const styles = {
  openContainer: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    width: '300px',
    backgroundColor: '#fafafa',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  closedContainer: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    width: '100px',
    backgroundColor: 'white',
    color: '#fff',
    borderTopLeftRadius: '8px',
    cursor: 'pointer',
    textAlign: 'center',
  },
  header: {
    background: '#fff',
    color: 'black',
    padding: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatBox: {
    maxHeight: '200px',
    overflowY: 'auto',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column-reverse', // Inverte a ordem das mensagens para mostrar as mais recentes no topo
  },
  userMessage: {
    background: '#3498db',
    color: '#fff',
    borderRadius: '8px 8px 0 8px',
    margin: '4px 4px 4px auto',
  },
  botMessage: {
    background: '#2ecc71',
    color: '#fff',
    borderRadius: '8px 8px 8px 0',
    margin: '4px auto 4px 4px',
  },
  userLabel: {
    color: '#3498db',
    marginRight: '4px',
  },
  botLabel: {
    color: '#2ecc71',
    marginRight: '4px',
  },
  inputContainer: {
    display: 'flex',
    padding: '10px',
  },
  sendButton: {
    backgroundColor: '#2ecc71',
    color: '#fff',
    padding: '8px',
    marginLeft: '8px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  closeButton: {
    color: '#fff',
    padding: '8px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  closedButton: {
    background: 'white',
    color: 'black',
    padding: '8px',
    cursor: 'pointer',
    textAlign: 'center',
  },
};

export default Chatbot;
