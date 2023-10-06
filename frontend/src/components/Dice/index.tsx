// Code adapdet from https://codepen.io/danncortes
import { useEffect, useState } from "react"
import "./style.scss"

export interface DiceInterface {
  triggerRoll: boolean
  outputDice: number
}

const Dice = ({ triggerRoll, outputDice }: DiceInterface) => {
  const FACES = 6

  const [intrvl, setIntrvl] = useState<any>()
  const [diceFace, setDiceFace] = useState<any>(4)

  useEffect(() => {
    if (!triggerRoll) {
      clearInterval(intrvl)
      setDiceFace(outputDice)
    }
  })

  useEffect(() => {
    if (triggerRoll) rollDice()
  }, [triggerRoll])

  function rollDice() {
    clearInterval(intrvl)
    const interval = setInterval(() => {
      setDiceFace(Math.floor(Math.random() * FACES) + 1)
    }, 200)
    setIntrvl(interval)
  }

  const dice = (
    <div className="dice-container">
      <div className={`dice face-${diceFace}`}>
        <div className="face-1">
          <div className="dot-container">
            <div className="dot"></div>
          </div>
        </div>
        <div className="face-3">
          <div className="dot-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
        <div className="face-4">
          <div className="dot-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
        <div className="face-2">
          <div className="dot-container">
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
        <div className="face-5">
          <div className="dot-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
        <div className="face-6">
          <div className="dot-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      </div>
    </div>
  )

  return <div className="main-dice-container">{dice}</div>
}

export default Dice
