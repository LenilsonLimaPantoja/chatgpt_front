import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { SiOpenai } from "react-icons/si";
import ReactLoading from "react-loading";
function App() {
  const [mensagem, setMensagem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pesquisar, setPesquisar] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .post(
        "https://web-production-9d95.up.railway.app/open-ai",
        { texto: pesquisar },
        requestOptions
      )
      .then((response) => {
        setMensagem([
          ...mensagem,
          {
            pergunta: pesquisar,
            texto: response.data.retorno.response,
          },
        ]);
        setPesquisar("");
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
        backgroundColor: "#fff",
        height: "100vh",
        maxHeight: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          backgroundColor: "#444654",
          flexGrow: 1,
          padding: 20,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          maxHeight: "80vh",
          rowGap: 30,
        }}
      >
        <p
          style={{
            padding: 5,
            textAlign: "center",
            color: "#fff",
          }}
        >
          Desenvolvido por Lenilson Lima Pantoja
        </p>
        {loading ? (
          <div
            style={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ReactLoading type={"spinningBubbles"} color={"#fff"} />
          </div>
        ) : (
          mensagem?.map((item, index) => (
            <p
              key={index}
              style={{
                textAlign: "justify",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <strong style={{ textTransform: "uppercase" }}>
                {index + 1} - {item.pergunta}
              </strong>
              <br />
              <p
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  columnGap: 5,
                  marginLeft: 15,
                }}
              >
                <SiOpenai
                  size={30}
                  style={{
                    backgroundColor: "#19c37d",
                    padding: 5,
                    borderRadius: 2,
                    minWidth: 35,
                    minHeight: 35,
                  }}
                />
                {item?.texto}
              </p>
            </p>
          ))
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100vw",
          background: "#343541",
          height: "20vh",
          padding: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          bottom: 0,
        }}
      >
        <input
          type="text"
          name="mensagem"
          placeholder="Digite seu texto aqui"
          value={pesquisar}
          onChange={(e) => setPesquisar(e.target.value)}
          style={{
            height: 40,
            padding: 10,
            border: "solid 1px gray",
            borderRadius: 5,
            outline: "none",
            flexGrow: 1,
            maxWidth: 700,
            height: 50,
          }}
        />
      </form>
    </div>
  );
}

export default App;
