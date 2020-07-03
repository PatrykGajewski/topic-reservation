enum AcademicTitleFull {
  // licencjat
  BACHELERS = "Bacheler's Degree",
  // licencjat nauki humanistyczne ( BA )
  ART_BACHELERS = "Bacheler's of Art",
  // licencjat nauki ścisłe ( BSc)
  SCIENCE_BACHELERS = "Bacheler's of Science",
  // magister
  MASTER = "Master's Degree",
  // magister nuaki humanistyczne
  ART_MASTER = "Master of Art",
  // magister nauki ścisłe
  SCIENCE_MASTER = "Master of Science",
  // magister inżynier
  ENGINERING_MASTER = "Master of Engineering",
  // doktor
  DOCTOR = "Doctorate",
  // doktor inżynier
  ENGINERING_DOCTOR = "Doctor of Engineering",
  // doktor nauk humanistycznych
  PHILOSOPHY_DOCTOR = "Doctor of Philosophy",
  // profesor
  PROFESSOR = "Professor",
}

enum AcademicTitleNames {
  "BACHELOR" = 'BACHELOR',
  "BACHELOR_ENGINEERING" = "BACHELOR_ENGINEERING",
  "MASTER" = 'MASTER',
  "MASTER_ENGINEERING" = "MASTER_ENGINEERING",
  "DOCTOR" = "DOCTOR",
  "DOCTOR_ENGINEERING" = "DOCTOR_ENGINEERING",
  "PROFESSOR" = "PROFESSOR"
}

enum ScienceTypes {
  "EDUCATION" = "EDUCATION",
  "SCIENCE" = "SCIENCE",
  "ART" = "ART",
  "IT" = "IT",
}

enum AcademicTitleRanking {
  "BACHELOR",
  "MASTER",
  "DOCTOR",
  "PROFESSOR"
}

interface AcademicTitle {
  name: AcademicTitleNames,
  scienceType: ScienceTypes,
  ranking: AcademicTitleRanking,
  full: AcademicTitleFull
}

enum UserRole {
  PROMOTER = 'PROMOTER',
  STUDENT = 'STUDENT',
}

interface Address {
  country: {
    name: string,
    a2Code: string,
  },
  region: {
    id: string,
    name: string,
  },
  city: {
    id: string,
    name: string,
  },
  zip: string,
  streetName: string,
  buildingNumber: number,
}

interface UserAddress extends Address {
  flatNumber?: number,
}

interface DepartmentSubject {
  id: string,
  name: string,
  subjectLevel: string,
}

interface UniversityDepartment {
  id: string,
  name: string,
  website: string,
  subjects: DepartmentSubject[],
}

interface University {
  id: string,
  name: string,
  fullName: string,
  headquarter: Address,
  website: string,
  departments: UniversityDepartment[],
}

interface ActualUniversity extends University {
  startDate: string,
}

interface FinishedUniversity extends ActualUniversity {
  endDate: string,
  academicTitle: AcademicTitle
}

export interface UserModel {
  id: string,
  email: string,
  // TODO add role during registration process
  roles: UserRole[],
  firstName: string,
  lastName: string | null,
  birthDate: string | null,
  accountExpirationDate: string,
  accountCreationDate: string,
  address: UserAddress | null,
  phoneNumber: string | null,
  finishedUniversities: FinishedUniversity[],
  actualUniversities: ActualUniversity[],
}
