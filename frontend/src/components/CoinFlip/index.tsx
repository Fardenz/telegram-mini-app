// Code adapted from https://codesandbox.io/s/coin-flip-react-example-01j7q?file=/src/App.js
import { useEffect, useState } from "react"
import "./style.scss"
import isDarkMode from "@helpers/isDarkMode"

interface CoinFlipInterface {
  result: "Heads" | "Tails" | ""
}

const CoinFlip = ({ result }: CoinFlipInterface) => {
  const [animationClass, setAnimationClass] = useState("")

  useEffect(() => {
    if (result) {
      setAnimationClass("")
      setTimeout(() => {
        setAnimationClass(result)
      }, 50)
    }
  }, [result])

  return (
    <div id="coin" className={animationClass}>
      <div className={`side-a${isDarkMode ? "-dark" : ""}`}>
        <h2>TAIL</h2>
      </div>
      <div className="side-b">
        <h2>HEAD</h2>
      </div>
    </div>
  )
}

export default CoinFlip
