export const size = {
  mobile: "425px",
  tablet: "768px",
  desktop: "1024px",
}

export const device = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(min-width: ${size.tablet}) and (max-width: ${size.desktop})`,
  desktop: `(min-width: ${size.desktop})`,
}
