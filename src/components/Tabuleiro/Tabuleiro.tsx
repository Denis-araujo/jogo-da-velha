import { FC, useState } from "react"
import Jogo from "../Jogo/Jogo"

const Tabuleiro: FC = () => {
  const jogoInicial = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]

  const [jogo, setJogo] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ])
  const [simboloAtual, setSimboloAtual] = useState('X')
  const [jogando, setJogando] = useState(true)

  const BtnJogarNovamente = () => {
    if (!jogando) {
      return <button onClick={() => reiniciar()}>Jogar Novamente</button>
    }
  }

  const verificarVitoria = () => {
    //linhas
    let pontos: number = 0
    let vitoria: boolean = false
    for (let l: number = 0; l < 3; l++) {
      pontos = 0
      for (let c: number = 0; c < 3; c++) {
        if (jogo[l][c] === simboloAtual) {
          pontos++
        }
      }
      if (pontos === 3) {
        vitoria = true
        break
      }
    }

    //colunas
    for (let c: number = 0; c < 3; c++) {
      pontos = 0
      for (let l: number = 0; l < 3; l++) {
        if (jogo[c][l] === simboloAtual) {
          pontos++
        }
      }
      if (pontos === 3) {
        vitoria = true
        break
      }
    }

    // Diagonais
    pontos = 0
    for (let d: number = 0; d < 3; d++) {
      if (jogo[d][d] === simboloAtual) {
        pontos++
      }
    }
    if (pontos === 3) {
      vitoria = true
    }
    pontos = 0
    let l = 0
    for (let c: number = 2; c >= 0; c--) {
      if (jogo[l][c] === simboloAtual) {
        pontos++
      }
      l++
    }
    if (pontos === 3) {
      vitoria = true
    }
    return vitoria
  }

  const trocaJogador = () => {
    simboloAtual === 'X' ? setSimboloAtual('O') : setSimboloAtual('X')
  }

  const retPos = (e: any): number [] => {
    const p = e.target.getAttribute('data-col')
    const pos = [parseInt(p.substring(0, 1)), parseInt(p.substring(1, 2))]
    return pos
  }

  const verificaEspacoVazio = (e : any) : boolean => {
    if (jogo[retPos(e)[0]][retPos(e)[1]] === '') {
      return true
    } else {
      return false
    }
  }

  const jogar = (e : any) : void => {
    if (jogando) {
      if (verificaEspacoVazio(e)) {
        jogo[retPos(e)[0]][retPos(e)[1]] = simboloAtual
        trocaJogador()
        if (verificarVitoria()) {
          trocaJogador()
          alert(`Jogador ${simboloAtual} Venceu!`)
          setJogando(false)
        }
      }
    } else {
      alert('Este espaço já esta preenchido, escolha outro')
    }
  }

  const reiniciar = (): void => {
    setJogando(true)
    setJogo(jogoInicial)
    setSimboloAtual('X')
  }

  const tabuleiro = (j : any): JSX.Element => {
    return (
      <Jogo>
        <div className="column">
        <span className="square" data-col="00" onClick={e => jogar(e)}>
            {j[0][0]}
          </span>
          <span className="square" data-col="01" onClick={e => jogar(e)}>
            {j[0][1]}
          </span>
          <span className="square" data-col="02" onClick={e => jogar(e)}>
            {j[0][2]}
          </span>
        </div>
        <div className="column">
        <span className="square" data-col="10" onClick={e => jogar(e)}>
            {j[1][0]}
          </span>
          <span className="square" data-col="11" onClick={e => jogar(e)}>
            {j[1][1]}
          </span>
          <span className="square" data-col="12" onClick={e => jogar(e)}>
            {j[1][2]}
          </span>
        </div>
        <div className="column">
        <span className="square" data-col="20" onClick={e => jogar(e)}>
            {j[2][0]}
          </span>
          <span className="square" data-col="21" onClick={e => jogar(e)}>
            {j[2][1]}
          </span>
          <span className="square" data-col="22" onClick={e => jogar(e)}>
            {j[2][2]}
          </span>
        </div>
      </Jogo>
    )
  }

  return (
    <>
      <div>
        <p>Quem joga: {simboloAtual}</p>
      </div>
      <div>{tabuleiro(jogo)}</div>
      <div>{BtnJogarNovamente()}</div>
    </>
  )
}

export default Tabuleiro