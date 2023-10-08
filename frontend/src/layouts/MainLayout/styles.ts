import isDarkMode from "../../helpers/isDarkMode"

const WrapperStyle = {
  display: "flex",
  alignItems: "center",
  margin: "0 auto",
  width: "100%",
}

const HeaderStyle = {
  width: "100%",
  height: "8vh",
  backgroundColor: isDarkMode ? `var(--chakra-colors-brand-700)` : `var(--chakra-colors-brand-300)`,
  color: 'var(--chakra-colors-brand-100)',
  paddingLeft: "10%",
  paddingRight: "10%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}

const HeaderTextStyle = {
  fontSize: "medium",
  fontWeight: "bold",
  color: 'var(--chakra-colors-brand-100)',
}

const ChildrenWrapperStyle = {
  width: "100%",
  height: `calc(100vh - 8vh)`,
}

export { WrapperStyle, HeaderStyle, HeaderTextStyle, ChildrenWrapperStyle }
