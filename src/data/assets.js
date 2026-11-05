// Respect Vite's base path, including repository-based GitHub Pages deployments.
export const asset = (path) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export const projectImageSrcSet = (project) => project.image.endsWith(".webp")
  ? [480, 640].map((width) => `${asset(project.image.replace(".webp", `-${width}.webp`))} ${width}w`)
    .concat(`${asset(project.image)} ${project.width}w`).join(", ")
  : undefined;
