import { CSSProperties } from "react"

export const WrapperStyle = {
  alignItems: "center",
  margin: "0 auto",
  height: "100%",
  paddingLeft: "10%",
  paddingRight: "10%",
}

export const ContainerButtonStyle = {
  width: "100%",
  height: "100%",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
}

const GameSelectorGifStyle: CSSProperties = {
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "contain",
  margin: "0 auto",
  overflow: "hidden",
}

const GameSelectorContainerStyle: CSSProperties = {
  width: "40vw",
  height: "40vw",
  position: "relative",
  overflow: "hidden",
  margin: "0 auto",
  paddingRight: "10%",
  paddingLeft: "10%",
}

const roundedButtonStyle: CSSProperties = {
  display: "inline-block",
  width: "35vw",
  padding: "10px 20px",
  backgroundColor: "var(--chakra-colors-brand-400)",
  border: "none",
  borderRadius: "8px",
  color: "#FFFFFF",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
}

export { GameSelectorGifStyle, GameSelectorContainerStyle, roundedButtonStyle }
