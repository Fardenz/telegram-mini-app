// https://codesandbox.io/s/coin-flip-react-example-01j7q?file=/src/App.js
import { useEffect, useState } from "react"
import "./style.scss"

interface CoinFlipInterface {
  result: "Heads" | "Tails" | ""
}

const CoinFlip = ({ result }: CoinFlipInterface) => {
  return (
    <div className="App">
      <div id="coin" className={result} key={+new Date()}>
        <div className="side-a">
          <h2>TAIL</h2>
        </div>
        <div className="side-b">
          <h2>HEAD</h2>
        </div>
      </div>
    </div>
  )
}

export default CoinFlip
