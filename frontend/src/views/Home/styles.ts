import { WebApp } from "@grammyjs/web-app"
import { CSSProperties } from "react"

const { text_color } = WebApp.themeParams

const GameSelectorGifStyle: CSSProperties = {
  alignContent: "center",
  maxHeight: "48vh",
  maxWidth: "48vw",
  margin: "0 auto",
  height: "100%",
  paddingRight: "10%",
  paddingLeft: "10%",
  overflow: 'auto'
}

export { GameSelectorGifStyle }
