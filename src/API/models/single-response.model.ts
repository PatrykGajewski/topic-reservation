export interface SingleResponse<T> {
  data: {
    entry: T,
  },
  embedded: any,
}
