import React from 'react';
import { ContainerWithHeader, ContainerWithHeaderRow } from 'pages/components';
import { CurrentUniversityValues, FinishedUniversityValues } from '../models';
import { FinishedUniversity, CurrentUniversity} from "models/university";

export interface EducationSectionData {
  finishedUniversities: FinishedUniversity[],
  currentUniversities: CurrentUniversity[]
}

interface Props {
  data: EducationSectionData
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
        <ContainerWithHeaderRow header="Department" content={university.department.name.full} />
        <ContainerWithHeaderRow header="Obtained title" content={university.department.name.full} />
        <ContainerWithHeaderRow header="Country" content={university.location.country.name} />
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
        <ContainerWithHeaderRow header="Department" content={university.department.name.full} />
        <ContainerWithHeaderRow header="Country" content={university.location.country.name} />
        <ContainerWithHeaderRow header="Start date" content={university.startDate} />
      </div>
    ))}
  </ContainerWithHeader>
);
