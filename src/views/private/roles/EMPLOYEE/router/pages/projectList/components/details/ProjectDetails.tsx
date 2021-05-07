import React from 'react';
import { Props } from './models';
import {SectionRow, SectionWithHeader} from '../../../../../../../components';
import { SimplifiedUser, UserDegree } from '../../../../../../../../../models/user';
import {
  mapDegreesIdsToDegrees, presentDate,
  mapProjectDegreeToText,
  mapProjectTypeToText,
  mapProjectStatusToText,
} from '../../../../../../../../../utils/mappers';
import { getHighestDegree } from '../../../../../../../../../utils/getters';
import {Tag} from "../../../../../../../../../models/tags";

export const ProjectDetails = (props: Props) => {
  const promoterDegrees: UserDegree[] = mapDegreesIdsToDegrees(props.project.promoter.degrees, props.degrees);
  const highestPromoterDegree: UserDegree | null = getHighestDegree(promoterDegrees);

  const creationDate: string | null = presentDate(props.project.createdAt);
  const updateDate: string | null = presentDate(props.project.updatedAt);

  return (
    <div>
      <SectionWithHeader header="Basic information">
        <SectionRow header="Topic" content={props.project.topic} />
        <SectionRow header="Description" content={props.project.description} />
        <SectionRow header="Degree" content={mapProjectDegreeToText(props.project.degree)} />
        <SectionRow header="Type" content={mapProjectTypeToText(props.project.type)} />
        <SectionRow header="Is group project" content={props.project.groupProject ? 'Tak' : 'Nie'} />
        <SectionRow header="Status" content={mapProjectStatusToText(props.project.status)} />
        {props.project.tags.length > 0 && (
          <SectionRow header="Tags" content={props.project.tags.map((tag: Tag) => tag.labelPL).join(', ')} />
        )}
      </SectionWithHeader>
      <SectionWithHeader header="Ownership" >
        {highestPromoterDegree ? (
          highestPromoterDegree.pl.short
            ? (<SectionRow header="Promoter" content={`${highestPromoterDegree.pl.short} ${props.project.promoter.firstName} ${props.project.promoter.lastName}`} />)
            : (<SectionRow header="Promoter" content={`${highestPromoterDegree.pl.full} ${props.project.promoter.firstName} ${props.project.promoter.lastName}`} />)
        ) : (
          <SectionRow header="Promoter" content={`${props.project.promoter.firstName} ${props.project.promoter.lastName}`} />
        )}
        {props.project.owners.map((owner: SimplifiedUser): JSX.Element => {
          const ownerDegrees: UserDegree[] = mapDegreesIdsToDegrees(owner.degrees, props.degrees);
          const highestOwnerTitle: UserDegree | null = getHighestDegree(ownerDegrees);

          return highestOwnerTitle ? (
            highestOwnerTitle.pl.short
              ? (<SectionRow header="Owner" content={`${highestOwnerTitle.pl.short} ${owner.firstName} ${owner.lastName}`} />)
              : (<SectionRow header="Owner" content={`${highestOwnerTitle.pl.full} ${owner.firstName} ${owner.lastName}`} />)
          ) : (
            <SectionRow header="Owner" content={`${owner.firstName} ${owner.lastName}`} />
          );
        })}
        {props.project.reviewers.map((reviewer: SimplifiedUser, index: number): JSX.Element => {
          const reviewerDegrees: UserDegree[] = mapDegreesIdsToDegrees(reviewer.degrees, props.degrees);
          const highestReviewerTitle: UserDegree | null = getHighestDegree(reviewerDegrees);

          return highestReviewerTitle ? (
            highestReviewerTitle.pl.short
              ? (
                <SectionRow
                  header={`Reviewer ${index + 1}`}
                  content={`${highestReviewerTitle.pl.short} ${reviewer.firstName} ${reviewer.lastName}`}
                />
              )
              : (
                <SectionRow
                  header={`Reviewer ${index + 1}`}
                  content={`${highestReviewerTitle.pl.full} ${reviewer.firstName} ${reviewer.lastName}`}
                />
              )
          ) : (
            <SectionRow
              header={`Reviewer ${index + 1}`}
              content={`${reviewer.firstName} ${reviewer.lastName}`}
            />
          );
        })}
        <SectionRow header="Department" content={props.project.department.namePL.full} />
        <SectionRow header="Cathedral" content={props.project.cathedral.namePL} />
      </SectionWithHeader>
      <SectionWithHeader header="Timeline">
        {creationDate && (
          <SectionRow header="Creation date" content={creationDate} />
        )}
        {updateDate && (
          <SectionRow header="Last update date" content={updateDate} />
        )}
      </SectionWithHeader>
    </div>
  );
};
