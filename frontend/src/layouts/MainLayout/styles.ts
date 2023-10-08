
const WrapperStyle = {
  display: "flex",
  alignItems: "center",
  margin: "0 auto",
  width: "100%",
}

const HeaderStyle = {
  width: "100%",
  height: "35px",
  backgroundColor: `var(--chakra-colors-brand-700)`,
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
  height: `calc(100vh - 35px)`,
}

export { WrapperStyle, HeaderStyle, HeaderTextStyle, ChildrenWrapperStyle }
