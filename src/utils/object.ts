// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getIn<T = any>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: Readonly<Record<string, any>>,
  path: readonly (string | number)[]
): T | undefined {
  for (const key of path) {
    if (obj !== undefined) {
      // eslint-disable-next-line total-functions/no-array-subscript
      obj = obj[key]
    } else {
      break
    }
  }

  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  return obj as T
}

function isObject(obj: unknown): obj is Record<string, unknown> {
  return obj && typeof obj === 'object' && !Array.isArray(obj)
}

export function mergeDeep<D, S>(dest: D, source: Readonly<S>): D & S {
  type R = D & S

  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  const target: R = dest as R

  if (isObject(dest) && isObject(source)) {
    for (const [key, value] of Object.entries<S[keyof S]>(source)) {
      if (isObject(value)) {
        if (
          !Object.prototype.hasOwnProperty.call(target, key) ||
          // eslint-disable-next-line total-functions/no-unsafe-type-assertion
          !isObject(target[key as keyof R])
        ) {
          // eslint-disable-next-line total-functions/no-unsafe-type-assertion
          target[key as keyof R] = {} as R[keyof R]
        }

        // eslint-disable-next-line total-functions/no-unsafe-type-assertion
        mergeDeep(target[key as keyof R], value)
      } else {
        // eslint-disable-next-line total-functions/no-unsafe-type-assertion
        target[key as keyof R] = value as R[keyof R]
      }
    }
  }

  return target
}
