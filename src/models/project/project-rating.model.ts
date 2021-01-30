interface Vote {
  id: string,
  user: {
    id: string,
    firstName: string,
    lastName: string,
  }
  value: number,
  createdAt: string,
  updatedAt: string,
}

export interface ProjectRating {
  votes: Vote[],
  value: number,
}
