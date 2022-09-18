import './App.css';
import { Component } from 'react'

class howLong extends Component {
  constructor(){
    super();

    this.state = {
      foundMatch: false,
      inputNumbers: '',
      selectedNumbers: [],
      tries: 0,
    }
  }

  verifyInput() {
    const { inputNumbers } = this.state;
    const arrayStr = inputNumbers.split(' ');
    const numbers = arrayStr.map((e) => Number(e));
    const arrayFiltrado = [];
    numbers.forEach((n) => {
      if (n < 1 || n > 60 || typeof n !== 'number') {
        return this.setState({...this.state, inputNumbers: ''})
      }
      if (arrayFiltrado.includes(n)){
        return this.setState({...this.state, inputNumbers: ''})
      }
      arrayFiltrado.push(n);
    })
      if (arrayFiltrado.length === 6) {
        this.setState({
          ...this.state,
          inputNumbers:'',
          selectedNumbers: arrayFiltrado.sort((a, b) => b < a),
        })
      }
    else {
      alert(
        `Input inválido - Lembre-se: \n
        - Apenas números entre 1 e 60; \n
        - Não pode número repetido; \n
        - Todos separados por espaço; \n
        - Deve-se escolher exatamente seis numeros;
      `)
      this.setState({
        ...this.state,
        selectedNumbers: [],
        inputNumbers: '',
      })
    }
  }

  render() {
    const { inputNumbers, foundMatch, selectedNumbers, tries } = this.state;
    return (
      foundMatch ? console.log('match') : 
      <div>
        <header>
          <h1>Quanto tempo para você ficar milionário?</h1>
          <h3>Proposta:</h3>
          <p>
            Após inúmeras tentativas de ficar rico e nunca conseguir
            acertar mais que <em>três</em> números na <strong>Mega-Sena</strong>,
            decidi criar esta aplicação que faz centenas de tentativas por segundo
            até você acertar as seis dezenas inseridas.
          </p>
          <h3>Instruções:</h3>
          <p>
            Escolha seis dezenas entre 01 e 60 e clique em sortear. Cada sorteio gera aleatoriamente um resultado - semelhante à <span>famigerada</span> queridíssima <strong>Mega-Sena</strong>.
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
                onChange={(e) => this.setState({...this.state, inputNumbers: e.target.value})}
              />
              <button
                type="reset"
                name="selectedNumbers"
                onClick={() => this.setState({...this.state, inputNumbers: ''})}
              >
                Limpar
              </button>
              <button
                type="submit"
                name="selectedNumbers"
                onClick={ () => this.verifyInput() }
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
                <button onClick={() => this.setState({ ...this.state, selectedNumbers:'' })}>
                  Escolher outros números
                </button>
                <button>
                  <strong>Iniciar o jogo!</strong>
                </button>
              </>
            }
          </div>
        </body>
      </div>
    )
  }
}

export default howLong;
