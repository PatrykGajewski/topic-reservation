import React from 'react';
import { ContainerWithHeader, ContainerWithHeaderRow } from 'pages/components';
import { CurrentUniversityValues, FinishedUniversityValues } from '../models';

interface CurrentUniversity {
  id: string,
  name: {
    full: string,
    shortcut: string,
  },
  department: {
    id: string,
    full: string,
    shortcut: string,
  },
  direction: {
    full: string,
    shortcut: string,
  },
  location: {
    country: string,
  },
  startDate: string,
}

interface FinishedUniversity extends CurrentUniversity {
  degree: {
    id: string,
    full: string,
    shortcut: string,
  }
  endDate: string,
}

export interface EducationSectionDataShape {
  finishedUniversities: FinishedUniversity[],
  currentUniversities: CurrentUniversity[]
}

interface Props {
  data: EducationSectionDataShape
  onFinishedUniversityEditOpen: (data: FinishedUniversityValues) => void,
  onCurrentUniversityEditOpen: (data: CurrentUniversityValues) => void,
}

export const EducationDataSection = (props: Props) => (
  <ContainerWithHeader
    header="Education"
  >
    {props.data.finishedUniversities.map((university: FinishedUniversity) => (
      <div>
        <button onClick={() => props.onFinishedUniversityEditOpen({
          universityId: university.id,
          departmentId: university.department.id,
          startDate: university.startDate,
          endDate: university.endDate,
          degreeId: university.degree.id,
        })}
        > Edit
        </button>
        <ContainerWithHeaderRow header="Name" content={university.name.full} />
        <ContainerWithHeaderRow header="Department" content={university.department.full} />
        <ContainerWithHeaderRow header="Obtained title" content={university.department.full} />
        <ContainerWithHeaderRow header="Country" content={university.location.country} />
        <ContainerWithHeaderRow header="Start Date" content={university.endDate} />
        <ContainerWithHeaderRow header="End Date" content={university.endDate} />
      </div>
    ))}
    <hr />
    {props.data.currentUniversities.map((university: CurrentUniversity) => (
      <div>
        <button onClick={() => props.onCurrentUniversityEditOpen({
          universityId: university.id,
          departmentId: university.department.id,
          startDate: university.startDate,
        })}
        > Edit
        </button>
        <ContainerWithHeaderRow header="Name" content={university.name.full} />
        <ContainerWithHeaderRow header="Department" content={university.department.full} />
        <ContainerWithHeaderRow header="Country" content={university.location.country} />
        <ContainerWithHeaderRow header="Start date" content={university.startDate} />
      </div>
    ))}
  </ContainerWithHeader>
);
