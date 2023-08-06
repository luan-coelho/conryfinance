export function getStyleForPath(activePathName: string, pathName: string): string {
  return activePathName == pathName ? "active-menu-item" : "menu-item";
}
