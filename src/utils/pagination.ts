const DEFAULT_PAGE_SIZE = 20

export const getPaginationOption = (page = 1) => ({
  skip: (page - 1) * DEFAULT_PAGE_SIZE,
  take: DEFAULT_PAGE_SIZE,
})
