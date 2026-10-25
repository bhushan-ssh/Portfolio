// Respect Vite's base path, including repository-based GitHub Pages deployments.
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
