import { pipe, split, fromPairs, toPairs, last, map, join } from 'ramda'

import type { KeyValuePair } from 'ramda'
import type { Maybe } from './typeUtility'

const parseValue = (value: string): ValueFromQueryString => {
  if (value.trim().length === 0) {
    return value
  }

  if (!Number.isNaN(parseInt(value, 10)) && !value.includes(',')) {
    return parseInt(value, 10)
  }

  if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
    return value.toLowerCase() === 'true'
  }

  return value
}

type ValueFromQueryString = string | number | boolean

const isKeyValuePair = (
  x: ValueFromQueryString[][],
): x is KeyValuePair<string, ValueFromQueryString>[] =>
  Array.isArray(x) &&
  x.every(
    ([key, value]) =>
      typeof key === 'string' &&
      (typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'),
  )

export const getQueryObject = (
  url: string,
): Maybe<Record<string, ValueFromQueryString>> =>
  pipe(
    split('?'),
    last,
    split('&'),
    map((qs) => {
      const [key, value] = qs.split('=')
      return [key, parseValue(decodeURIComponent(value))]
    }),
    (qs) => (isKeyValuePair(qs) ? fromPairs(qs) : null),
  )(url)

export const getQueryString = (
  queryObject: Record<string, ValueFromQueryString>,
): string =>
  pipe(
    toPairs,
    map<[string, ValueFromQueryString], string>(([key, value]) =>
      [key, encodeURIComponent(value)].join('='),
    ),
    join('&'),
  )(queryObject)
