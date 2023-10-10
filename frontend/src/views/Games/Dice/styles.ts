import { WebApp } from "@grammyjs/web-app"

const { text_color } = WebApp.themeParams

const WrapperStyle = {
  align: "center",
  maxW: { xl: "1200px" },
  margin: "0 auto",
  height: "100%",
  paddingRight: "10%",
  paddingLeft: "10%",
}
const DiceContainerStyle = {
  width: "100%",
  height: "65%",
  color: text_color,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}
const OptionsContainerStyle = {
  width: "100%",
  height: "30%",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}
const StackStyle = {
  spacing: [1, 5],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
}

export { WrapperStyle, DiceContainerStyle, OptionsContainerStyle, StackStyle }
