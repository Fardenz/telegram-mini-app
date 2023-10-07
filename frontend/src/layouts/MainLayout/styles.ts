import { WebApp } from "@grammyjs/web-app"

const {
  bg_color,
  button_color,
  button_text_color,
  hint_color,
  link_color,
  secondary_bg_color,
  text_color,
} = WebApp.themeParams

const WrapperStyle = {
  display: "flex",
  alignItems: "center",
  margin: "0 auto",
  width: "100%",
}

const HeaderStyle = {
  width: "100%",
  height: "64px",
  backgroundColor: bg_color,
  color: text_color,
  paddingLeft: "10%",
  paddingRight: "10%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}

const HeaderTextStyle = {
  fontSize: "medium",
  fontWeight: "bold",
  color: text_color,
}

const ChildrenWrapperStyle = {
  width: "100%",
  height: `calc(100vh - 64px)`,
}

export { WrapperStyle, HeaderStyle, HeaderTextStyle, ChildrenWrapperStyle }
