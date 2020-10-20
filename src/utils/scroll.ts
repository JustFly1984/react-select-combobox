export function scrollToElement(element: HTMLElement | null): void {
  if (element !== null && element.parentElement !== null) {
    const parent = element.parentElement
    const first = parent.firstChild

    if (first instanceof HTMLElement) {
      if (
        first.offsetTop + parent.scrollTop > element.offsetTop ||
        first.offsetTop + parent.scrollTop + parent.offsetHeight <
          element.offsetTop + element.offsetHeight
      ) {
        parent.scrollTop =
          element.offsetTop +
          element.offsetHeight / 2 -
          parent.offsetHeight / 2 -
          first.offsetTop
      }
    }
  }
}
