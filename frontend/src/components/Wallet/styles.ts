import { WebApp } from "@grammyjs/web-app"
import isDarkMode from "@helpers/isDarkMode"

export const BackgroundModalStyle = {
  background: isDarkMode ? WebApp.themeParams.bg_color : "#ffffff",
  color: isDarkMode ? "#ffffff" : "#000000",
}

export const BorderStyle = {
  borderColor: "#30cccc",
}

export const TabSelectedStyle = {
  color: "#ffffff",
  bg: "#30cccc",
}

export const InputStyle = {
  color: isDarkMode ? "#ffffff" : "#000000",
  borderColor: "#30cccc",
}

export const FocusInputStyle = {
  borderColor: "#30cccc",
  boxShadow: "0 0 0 1px #30cccc",
}

export const ButtonRoundedStyle = {
  display: "inline-block",
  width: "35vw",
  padding: "10px 20px",
  backgroundColor: "var(--chakra-colors-brand-400)",
  border: "none",
  borderRadius: "25px",
  color: "#FFFFFF",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
}
