import './App.css';
import { useState } from 'react';

function App() {

  const[inputs, setInputs] = useState({
    deposito: ''
  }) 
  const[operaciones, setOperaciones] = useState([]) 


  const niveles = [
    {"nivel": 1, "cashback": 0.001, "energiaMin": 0, "energiaMax": 99 },
    {"nivel": 2, "cashback": 0.0025, "energiaMin": 100, "energiaMax": 249 },
    {"nivel": 3, "cashback": 0.005, "energiaMin": 250, "energiaMax": 499 },
    {"nivel": 4, "cashback": 0.0075, "energiaMin": 500, "energiaMax": 749 },
    {"nivel": 5, "cashback": 0.01, "energiaMin": 750, "energiaMax": 1249 },
    {"nivel": 6, "cashback": 0.02, "energiaMin": 1250, "energiaMax": 1999 },
    {"nivel": 7, "cashback": 0.03, "energiaMin": 2000, "energiaMax": 2999 },
    {"nivel": 8, "cashback": 0.04, "energiaMin": 3000, "energiaMax": 999999 },
  ]

  function handleChange(e) {
    setInputs(() => {
      return {
        ...inputs,
        [e.target.name]: e.target.value,
      };
    });
  }

  function calcular() {
    let aux = []
    
    let cashback = 0
    let depositos = 0
    let energias = 0
    let nivel = 1

    let montoObjetivo = 0
    let montoDisponible = inputs.deposito

    while(cashback<8000 && depositos<=19){
      
      niveles.map((n) => {
        if((n.nivel == (nivel+1)) && (n.nivel !== 8)){
          montoObjetivo = (n.energiaMin - energias) * 100
          console.log(montoObjetivo, energias)
        }
      })

      if(montoObjetivo>montoDisponible){
        montoObjetivo=montoDisponible
      }

      console.log(montoObjetivo, energias)
      let operacion = {"operacion": depositos+1, "deposito": montoObjetivo, "cashback":niveles[nivel-1].cashback * montoObjetivo, 
      "cashbackTotal": cashback + (niveles[nivel-1].cashback * montoObjetivo), "energias": energias + (montoObjetivo/100), "nivel": nivel }
      
      
      cashback = cashback + (niveles[nivel-1].cashback * montoObjetivo)
      energias = energias + (montoObjetivo/100)
      
      niveles.map((n) => {
        if(n.energiaMin<= energias && n.energiaMax>=energias){
          nivel = n.nivel
        }
      })

      aux.push(operacion)

      montoDisponible= montoDisponible-montoObjetivo
      if(montoDisponible==0){
        montoDisponible = inputs.deposito
        montoObjetivo = inputs.deposito
        depositos++
        console.log("que onda")
      }
    }

    document.getElementById("energias").innerHTML = energias
    document.getElementById("nivel").innerHTML = nivel
    document.getElementById("cashbackTotal").innerHTML = '$' + cashback
    
    setOperaciones([...aux]);

  }
  


  return (
    <div className="App">
      <header className="App-header">
        <table>
          <thead>
            <tr>
              <th>Nivel</th>
              <th>Cashback</th>
              <th>Energia Min</th>
              <th>Energia Max</th>
            </tr>
          </thead>
          <tbody>
            { niveles.map((n)=> {
              return(
                <tr>
                  <td>{n.nivel}</td>
                  <td>{n.cashback}</td>
                  <td>{n.energiaMin}</td>
                  <td>{n.energiaMax}</td>
                </tr>
              )
            })}
          </tbody>

        </table>
        
        <div className='resumen'>
          <h4>Deposito: </h4>
          <input type="number" value={inputs.deposito} name="deposito" onChange={(e) => handleChange(e)} />
          <br/>
          <button type="submit" onClick={()=>calcular()}>Calcular</button>

          <div className="box">
            <h6>Energias:</h6>
            <label id="energias"></label>
          </div>
          <div className="box">
            <h6>Nivel:</h6>
            <label id="nivel"></label>
          </div>
          <div className="box">
            <h6>Cashback Total:</h6>
            <label id="cashbackTotal"></label>
          </div>
        </div>
        

        <table>
          <thead>
              <tr>
                <th>Operacion</th>
                <th>Deposito</th>
                <th>Cashback</th>
                <th>Cashback Total</th>
                <th>Energias</th>
                <th>Nivel</th>
              </tr>
            </thead>

            <tbody>
            {operaciones && operaciones.length > 0 ? (operaciones.map((n)=> {
              return(
                <tr>
                  <td>{n.operacion}</td>
                  <td>{n.deposito}</td>
                  <td>{n.cashback}</td>
                  <td>{n.cashbackTotal}</td>
                  <td>{n.energias}</td>
                  <td>{n.nivel}</td>
                </tr>
              )
            })):<tr></tr>}
          </tbody>
        </table>

      </header>
    </div>
  );
}

export default App;
