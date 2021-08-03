import { getQueryObject, getQueryString } from '../url'

describe('url.ts', () => {
  describe('getQueryObject(url: string)', () => {
    test('should return Record<string, any> from query string.', () => {
      expect(getQueryObject('?page=1&page_size=1&removed=true')).toEqual({
        page: 1,
        page_size: 1,
        removed: true,
      })

      expect(
        getQueryObject('?q=%EC%9E%AC%EB%AF%B8%26nest&ids=1%2C2%2C3%2C4%2C5'),
      ).toEqual({
        q: '재미&nest',
        ids: '1,2,3,4,5',
      })
    })
  })

  describe('getQueryString(queryObject: Record<string, string | number | boolean>)', () => {
    expect(
      getQueryString({
        page: 1,
        page_size: 1,
        removed: true,
      }),
    ).toBe('page=1&page_size=1&removed=true')

    expect(
      getQueryString({
        q: '재미&nest',
        ids: '1,2,3,4,5',
      }),
    ).toBe('q=%EC%9E%AC%EB%AF%B8%26nest&ids=1%2C2%2C3%2C4%2C5')
  })
})
