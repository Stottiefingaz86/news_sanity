/** App base path — keep in sync with `next.config.ts`. */
export const BASE_PATH = "/news";

export function assetPath(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}
