import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [mensagem, setMensagem] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData);

    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .post(
        "https://web-production-9d95.up.railway.app/open-ai",
        { texto: formValues.mensagem },
        requestOptions
      )
      .then((response) => {
        setMensagem([
          ...mensagem,
          {
            pergunta: formValues?.mensagem,
            texto: response.data.retorno.response,
          },
        ]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  };
  return (
    <div
      style={{
        backgroundColor: "#f2f2f2",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <p>carregando</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            width: 700,
            display: "flex",
            flexDirection: "column",
            rowGap: 20,
          }}
        >
          <input
            type="text"
            name="mensagem"
            placeholder="Digite seu texto aqui"
            style={{
              height: 40,
              padding: 10,
              border: "solid 1px gray",
              borderRadius: 5,
              outline: "none",
            }}
          />
          {mensagem?.map((item, index) => (
            <p key={index} style={{ textAlign: "justify" }}>
              <strong style={{ textTransform: "uppercase" }}>
                {item.pergunta}
              </strong>
              <br />
              {item?.texto}
            </p>
          ))}
        </form>
      )}
    </div>
  );
}

export default App;
