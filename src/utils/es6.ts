function checkToES6(): boolean {
  try {
    // eslint-disable-next-line no-new-func
    Function('() => {};')

    return true
  } catch (err) {
    return false
  }
}

export const isES6 = checkToES6()
