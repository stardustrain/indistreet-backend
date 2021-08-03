import { getPaginationInfo, getPaginationResponse } from '../pagination'

describe('pagination.ts', () => {
  describe('getPaginationInfo(params: GetPaginationInfoParams)', () => {
    test('should return pagination info of normal cases.', () => {
      expect(
        getPaginationInfo({
          totalCount: 100,
          currentEntitiesLength: 11,
          currentPage: 1,
          pageSize: 10,
        }),
      ).toEqual({
        nextPage: 2,
        previousPage: null,
        hasNextPage: true,
        hasPreviousPage: false,
      })

      expect(
        getPaginationInfo({
          totalCount: 9,
          currentEntitiesLength: 0,
          currentPage: 2,
          pageSize: 10,
        }),
      ).toEqual({
        nextPage: null,
        previousPage: 1,
        hasNextPage: false,
        hasPreviousPage: true,
      })

      expect(
        getPaginationInfo({
          totalCount: 9,
          currentEntitiesLength: 0,
          currentPage: 3,
          pageSize: 10,
        }),
      ).toEqual({
        nextPage: null,
        previousPage: null,
        hasNextPage: false,
        hasPreviousPage: false,
      })

      expect(
        getPaginationInfo({
          totalCount: 31,
          currentEntitiesLength: 11,
          currentPage: 3,
          pageSize: 10,
        }),
      ).toEqual({
        nextPage: 4,
        previousPage: 2,
        hasNextPage: true,
        hasPreviousPage: true,
      })
    })

    test('should return pagination info of edge cases.', () => {
      expect(
        getPaginationInfo({
          totalCount: 19,
          currentEntitiesLength: 0,
          currentPage: 3,
          pageSize: 10,
        }),
      ).toEqual({
        nextPage: null,
        previousPage: 2,
        hasNextPage: false,
        hasPreviousPage: true,
      })

      expect(
        getPaginationInfo({
          totalCount: 19,
          currentEntitiesLength: 0,
          currentPage: 4,
          pageSize: 10,
        }),
      ).toEqual({
        nextPage: null,
        previousPage: null,
        hasNextPage: false,
        hasPreviousPage: false,
      })

      expect(
        getPaginationInfo({
          totalCount: 91,
          currentEntitiesLength: 0,
          currentPage: 11,
          pageSize: 10,
        }),
      ).toEqual({
        nextPage: null,
        previousPage: 10,
        hasNextPage: false,
        hasPreviousPage: true,
      })
    })
  })

  describe('getPaginationResponse(params: GetPaginationResponseParams<T>)', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    expect(
      getPaginationResponse({
        data,
        currentPage: 1,
        currentEntitiesLength: data.length,
        totalCount: 20,
        pageSize: 8,
      }),
    ).toEqual({
      data: [1, 2, 3, 4, 5, 6, 7, 8],
      pageInfo: {
        nextPage: 2,
        previousPage: null,
        hasNextPage: true,
        hasPreviousPage: false,
        totalCount: 20,
      },
    })

    expect(
      getPaginationResponse({
        data,
        currentPage: 2,
        currentEntitiesLength: data.length,
        totalCount: 20,
        pageSize: 15,
      }),
    ).toEqual({
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      pageInfo: {
        nextPage: null,
        previousPage: 1,
        hasNextPage: false,
        hasPreviousPage: true,
        totalCount: 20,
      },
    })
  })
})
