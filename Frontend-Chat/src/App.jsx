import { useState } from "react";

function App() {

  const [mensaje, setMensaje] = useState("");
  const [chats, setChats] = useState([]); 
  const [estaEscribiendo, setEstaEscribiendo] = useState(false);

  const chat = async (e, mensaje) =>{
    e.preventDefault();

    if (!mensaje) return;
    setEstaEscribiendo(true);

    let mensajes = chats;
    mensajes.push({ role: "user", content: mensaje});
    setChats(mensajes);
    scrollTo(0, 1e10);

    setMensaje('');

    fetch('http://localhost:8080/', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body:  JSON.stringify({
        chats,
      }),
    })
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      mensajes.push(data.output);
      setChats(mensajes);
      setEstaEscribiendo(false);
      scrollTo(0, 1e10);
    })
    .catch((err)=>{
      console.log('Ha ocurrido un error: ' + err)
    })
  };

  return(
    <main>
      <h1>FullStack Chat</h1>

      <section>
        {
          chats && chats.length ? (
            chats.map((chat, index)=>(
              <p key={index} className={chat.role === "user" ? "msg-usuario" : ""}>
                <span>
                  <b>
                    {chat.role.toUpperCase()}
                  </b>
                </span>
                <span>:</span>
                <span>
                  {chat.content}
                </span>
              </p>
            ))
          ) : ""
        }
      </section>

      <div className={estaEscribiendo ? "" : "esconder"}>
        <p>
          <i>{estaEscribiendo ? "Escribiendo" : ""}</i>
        </p>
      </div>


      <form action="" onSubmit={(e) => chat(e, mensaje)}>
        <input 
          type="text" 
          name='mensaje' 
          value={mensaje} 
          placeholder="Escriba su mensaje y presione enter" 
          onChange={e => setMensaje(e.target.value)}
        />
      </form>
    </main>
  )
}

export default App;
