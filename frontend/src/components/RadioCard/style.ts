import isDarkMode from "@helpers/isDarkMode"

export const RadioStyle = {
  borderWidth: "1px",
  borderRadius: "25px",
  color: isDarkMode ? "#fff" : "#000",
  width: "100px",
  alignContent: "center",
  justifyContent: "center",
  display: "flex",
  boxShadow: "md",
  padding: "10px 5px",
}

export const RadioCheckedStyle = {
  backgroundColor: "#ED2A4A",
  borderColor: "#ED2A4A",
  color: "#fff !important",
}

export const RadioFocusStyle = {
  boxShadow: "outline",
}
