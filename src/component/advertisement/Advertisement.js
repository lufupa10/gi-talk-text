import React, { useState, useEffect } from 'react';

const advertisementImages = [
  '/gi.jpg',
  '/tiger-jpg.jpg',
];

const Advertisement = () => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % advertisementImages.length);
    }, 5000); // Altera a imagem a cada 5 segundos (ajuste conforme necessário)

    return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    <div style={styles.container}>
      <img src={advertisementImages[imageIndex]} alt="Advertisement" style={styles.image} />
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: 10,
    right: 10,
    maxWidth: '200px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adiciona uma sombra para estilo
    borderRadius: '8px',
    overflow: 'hidden', // Garante que a borda arredondada se aplique corretamente
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px', // Borda arredondada para suavizar as extremidades
  },
};

export default Advertisement;
