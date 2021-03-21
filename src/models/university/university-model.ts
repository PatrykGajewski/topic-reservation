import { UniversityAddress } from './university-address.model';
import { UniversityDepartment } from './university-department.model';

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
  departments: any[],
  createdAt: string,
  updatedAt: string,
}
