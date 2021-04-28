export interface MultiResponse<T> {
  data: {
    entries: T[],
    embedded: any,
  },
}
