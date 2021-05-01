export interface UserDegree {
  id: string,
  en : {
    full: string,
    short: string | null,
  }
  pl: {
    full: string,
    short: string | null,
  }
  priority: string,
}
