export interface CathedralModel{
  id: string
  namePL: string,
  nameEN: string,
  consecutiveNumber: string,
  links: {
    website?: string,
  },
  headquarter: {
    city: string,
    zip: string,
    streetName: string,
    buildingNumber: string,
  }
};
