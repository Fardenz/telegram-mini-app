import { WebApp } from "@grammyjs/web-app"
import isDarkMode from "@helpers/isDarkMode"

export const BackgroundModalStyle = {
  background: isDarkMode ? WebApp.themeParams.bg_color : "#ffffff",
  color: isDarkMode ? "#ffffff" : "#000000",
}

export const BorderStyle = {
  borderColor: isDarkMode ? "#30cccc" : "#33084F",
}

export const TabSelectedStyle = {
  color: "#ffffff",
  bg: isDarkMode ? "#30cccc" : "#33084F",
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
  borderRadius: "8px",
  color: "#FFFFFF",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
}
