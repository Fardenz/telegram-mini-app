import { CSSProperties } from "react"

const GameSelectorGifStyle: CSSProperties = {
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  margin: '0 auto',
  overflow: 'hidden',
}

const GameSelectorContainerStyle: CSSProperties = {
  width: '40vw',
  height: '40vw',
  position: 'relative',
  overflow: 'hidden',
  margin: '0 auto',
  paddingRight: '10%',
  paddingLeft: '10%',
}

export { GameSelectorGifStyle, GameSelectorContainerStyle }
