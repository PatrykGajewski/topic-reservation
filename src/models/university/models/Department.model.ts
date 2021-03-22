import { CathedralModel } from './Cathedral.model';

export interface DepartmentModel {
  id: string
  namePL: {
    short: string,
    full: string,
  },
  nameEN: {
    short: string,
    full: string,
  },
  headquarter: {
    city: string,
    zip: string,
    streetName: string,
    buildingNumber: string,
  },
  links: {
    website: string
  },
  cathedrals: CathedralModel[]
  createdAt: string,
  updatedAt: string,
}
