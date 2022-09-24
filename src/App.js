import './App.css';
import { React, useState } from 'react'

function HowLong () {
  const [game, setGame] = useState(false);
  const [foundMatch, setFoundMatch] = useState(false);
  const [inputNumbers, setInputNumbers] = useState('');
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [startTime, setStartTime] = useState();
  const [tries, setTries] = useState(0);

  function verifyInput() {
    const arrayStr = inputNumbers.split(' ');
    const numbers = arrayStr.map((e) => Number(e));
    const arrayFiltrado = [];
    numbers.forEach((n) => {
      if (n < 1 || n > 60 || typeof n !== 'number') {
        return setInputNumbers('')
      }
      if (arrayFiltrado.includes(n)){
        return setInputNumbers('')
      }
      arrayFiltrado.push(n);
    })
      if (arrayFiltrado.length === 6) {
        setInputNumbers('');
        setSelectedNumbers(arrayFiltrado.sort((a, b) => b < a))
      }
    else {
      alert(
        `Input inválido - Lembre-se: \n
        - Apenas números entre 1 e 60; \n
        - Não pode número repetido; \n
        - Todos separados por espaço; \n
        - Deve-se escolher exatamente seis numeros;
      `)
      setSelectedNumbers([]);
      setInputNumbers('');
    }
  }

  function checkArrays(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i += 1) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  function generateArray() {
    let array = [];
    let min = Math.ceil(1);
    let max = Math.floor(61);
    for(let i = 0; i < 6; i += 1) {
      array.push(Math.floor(Math.random() * (max - min) + min))
    }
    return array;
  }

  async function startTheGame() {
    if (game) return setGame(!game)
    setStartTime(Date.now())
    let generatedArray = generateArray();

    while(Date.now() - startTime < 10000) {
      if (checkArrays(generatedArray, selectedNumbers)) {
        return setFoundMatch(true);
      }
        setTries((tries + 1))
        // generatedArray = generateArray();
        generatedArray = selectedNumbers
      }
      // return alert(
      //   `É uma pena! \n
      //     Após ${tries} tentativas, não conseguimos acertar tudo \n
      //     Tente quantas vezes quiser ;) \n
      //   - Tempo gasto: ${Math.floor((Date.now() - startTime) / 1000)} segundos \n
      // `)
  }

  return(
      foundMatch ? 
      <div className='matchBody'>
      <h1>Finalmente!</h1>
      <h3>Você acertou após apenas <span>{tries}</span> tentativas :)</h3>
      <h3>Toda esta brincadeira levou apenas {Math.floor((Date.now() - startTime) / 1000)} segundos</h3>
      </div> : 
      <div className='allBody'>
        <header>
          <h1>Quanto tempo para você ficar milionário?</h1>
          <h3>Proposta:</h3>
          <p>
            Após inúmeras tentativas de ficar rico e nunca conseguir
            acertar mais que <em>três</em> números na <strong>Mega-Sena</strong>,
            decidi criar esta aplicação que faz milhares de tentativas por segundo
            até você acertar as seis dezenas inseridas.
          </p>
          <h3>Instruções:</h3>
          <p>
            Escolha seis dezenas entre 01 e 60 e clique em sortear. Cada sorteio gera aleatoriamente um resultado - semelhante à <span className='famigerada'>famigerada</span> queridíssima <strong>Mega-Sena</strong>.
            Veja quantas tentativas e quanto tempo leva para um <em>computador</em> acertar as mesmas dezenas que você selecionou.
          </p>
          <h2><em>Divirta-se!</em></h2>
        </header>
        <body>
          { selectedNumbers.length < 6 &&
            <div>
              <p>Insira aqui seis números, entre 1 e 60, separados por espaço.</p>
              <input
                type="text"
                name="selectedNumbers"
                maxLength={17}
                id="selectedNumbersInput"
                placeholder="Insira seis números" 
                value={ inputNumbers }
                onChange={(e) => setInputNumbers(e.target.value)}
              />
              <button
                type="reset"
                name="selectedNumbers"
                onClick={() => setInputNumbers('')}
              >
                Limpar
              </button>
              <button
                type="submit"
                name="selectedNumbers"
                onClick={ () => verifyInput() }
              >
                <strong>Salvar</strong>
              </button>
            </div>
          }
          <div>
            {selectedNumbers.length === 6 && 
              <>
                <h3>Seus números são:
                  { selectedNumbers[0] },
                  { selectedNumbers[1] },
                  { selectedNumbers[2] },
                  { selectedNumbers[3] },
                  { selectedNumbers[4] },
                  { selectedNumbers[5] }.
                </h3>
                <h3>Boa Sorte!</h3>
                { !game && 
                <button onClick={() => setSelectedNumbers('')}>
                  Escolher outros números
                </button>
                }
                <button onClick={() => startTheGame()}>
                  { game ? 'Parar!' : 'Iniciar o jogo!' }
                </button>
              </>
            }
          </div>
          { game && 
          <div>
            <h1>It's time!</h1>
            <h2>Tentativas: <span>{ tries }</span></h2>
          </div>
          }
        </body>
      </div>
    )
  }

export default HowLong;
