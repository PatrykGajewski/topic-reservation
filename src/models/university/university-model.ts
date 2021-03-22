import { DepartmentModel } from './models';

export interface University {
  id: string,
  namePL: {
    full: string,
    short: string,
  },
  nameEN: {
    full: string,
    short: string,
  },
  headquarter: {
    country: {
      name: string,
      code: string,
    },
    region: {
      name: string,
      code: string,
    },
    city: string,
    zip: string,
    streetName: string,
    buildingNumber: string
  },
  establishmentDate: string
  links: {
    website: string,
    facebookProfile?: string,
    youtubeProfile?: string,
    linkedinProfile?: string,
    instagramProfile?: string,
  },
  departments: DepartmentModel[],
  createdAt: string,
  updatedAt: string,
}
