import { dropLast } from 'ramda'

const DEFAULT_PAGE_SIZE = 10

export const getPaginationOption = (
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
) => ({
  skip: (page - 1) * pageSize,
  take: pageSize,
})

const isPreviousPage = (
  maybePreviousPage: number,
  totalCount: number,
  pageSize: number,
) => {
  if (maybePreviousPage === 1) {
    return true
  }

  return (
    maybePreviousPage > 0 &&
    Math.ceil(totalCount / pageSize) >= maybePreviousPage
  )
}

type GetPaginationInfoParams = {
  currentPage: number
  currentEntitiesLength: number
  totalCount: number
  pageSize: number
}
export const getPaginationInfo = ({
  currentPage,
  currentEntitiesLength,
  totalCount,
  pageSize,
}: GetPaginationInfoParams) => {
  const hasNextPage = currentEntitiesLength > pageSize
  const maybePreviousPage = currentPage - 1
  const hasPreviousPage = isPreviousPage(
    maybePreviousPage,
    totalCount,
    pageSize,
  )

  return {
    nextPage: hasNextPage ? currentPage + 1 : null,
    previousPage: hasPreviousPage ? maybePreviousPage : null,
    hasNextPage,
    hasPreviousPage,
  }
}

type GetPaginationResponseParams<T> = {
  data: T[]
} & GetPaginationInfoParams
export const getPaginationResponse = <T>({
  data,
  currentPage,
  currentEntitiesLength,
  totalCount,
  pageSize,
}: GetPaginationResponseParams<T>) => {
  return {
    pageInfo: {
      ...getPaginationInfo({
        currentPage,
        currentEntitiesLength,
        totalCount,
        pageSize,
      }),
      totalCount,
    },
    data: currentEntitiesLength > pageSize ? dropLast(1, data) : data,
  }
}
