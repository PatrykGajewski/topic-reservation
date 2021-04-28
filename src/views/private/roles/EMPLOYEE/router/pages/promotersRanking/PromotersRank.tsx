import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import { Button, Grid } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import { AppState } from '../../../../../../../store/appState';
import { ViewState } from '../../../../../../../models/other';
import {
  _fetPromotersRanking, Order, PromotersRankingResponse, SimplifiedUserWithOpinions,
} from './services';
import { PageConfig } from '../projectList';
import { StyledContainer } from '../../../../STUDENT/router/pages/ownedProjectList';
import {
  BarContainer, BarElement, ContentContainer, ContentWrapper,
} from '../../../../../../components/contentWithBar';
import { SimpleSelect } from '../../../../../../components/forms';
import { SelectOption } from '../../../../../../../models/forms';
import { EmptyStateContainer } from '../../../../../components/initialDataError/styles';
import { UpdatePromotersListView } from '../../../../../../../store/actions';
import { StyledPromotersList, StyledPromoterItem, StyledListHeader} from "./styles";

interface ExtendedPageConfig extends PageConfig {
  order: Order
}

const orderOptions: SelectOption[] = [
  {
    label: 'Rosnąca',
    value: Order.ASCENDING,
  },
  {
    label: 'Malejąca',
    value: Order.DESCENDING,
  },
];

export const PromotersRank = () => {
  const dispatch = useDispatch();
  const stateData = useSelector((state: AppState) => ({
    promoters: state.promoters,
    pageConfig: state.promotersListView,
  }));

  const [promoters, setPromoters] = useState<SimplifiedUserWithOpinions[]>([]);
  const [viewState, setViewState] = useState<ViewState>(ViewState.LOADING);
  const [pageConfig, setPageConfig] = useState<ExtendedPageConfig>({
    pageIndex: stateData.pageConfig.pageIndex,
    total: stateData.pageConfig.total,
    rowsPerPage: stateData.pageConfig.rowsPerPage,
    order: stateData.pageConfig.order,
  });

  const fetchPromotersRanking = () => {
    setViewState(ViewState.LOADING);
    _fetPromotersRanking({
      limit: pageConfig.rowsPerPage,
      skip: pageConfig.rowsPerPage * pageConfig.pageIndex,
      order: pageConfig.order,
    }).then((res: PromotersRankingResponse) => {
      setPromoters(res.entries);
      setPageConfig((prev) => ({ ...prev, total: res.total }));
      setViewState(ViewState.OK);
    })
      .catch((err) => {
        setViewState(ViewState.ERROR);
      });
  };

  useEffect(() => {
    fetchPromotersRanking();
  }, []);

  const handleFiltersSubmit = () => {
    fetchPromotersRanking();
  };

  const handleRemoveFilters = () => {
    dispatch({
      ...new UpdatePromotersListView({
        ...pageConfig,
      }),
    });
  };

  const filtersNotSubmitted: boolean = stateData.pageConfig.order !== pageConfig.order;

  return (
    <>
      {viewState === ViewState.LOADING && (
        <StyledContainer>
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} // 3 secs
          />
        </StyledContainer>
      )}
      {viewState === ViewState.OK && (
        <ContentWrapper>
          <BarContainer>
            <Grid container alignContent="flex-start">
              <BarElement item xs={12}>
                <SimpleSelect
                  id="direction"
                  labelId="directionLabel"
                  label="Select ranking direction"
                  selectedOption={orderOptions.find((option: SelectOption) => option.value === pageConfig.order) as SelectOption}
                  handleChange={(value: string) => {
                    setPageConfig((prev) => ({ ...prev, order: value as Order }));
                  }}
                  options={orderOptions}
                />
              </BarElement>
              <BarElement item xs={12}>
                <Button
                  onClick={handleFiltersSubmit}
                  variant="outlined"
                  color="primary"
                >Apply filters
                </Button>
              </BarElement>
              <BarElement item xs={12}>
                {filtersNotSubmitted && (
                  <Button
                    onClick={handleRemoveFilters}
                    variant="outlined"
                  >Remove filters
                  </Button>
                )}
              </BarElement>
            </Grid>
            <Grid item container xs={12} alignItems="flex-end">
              {/* actions buttons here */}
            </Grid>
          </BarContainer>
          <ContentContainer>
            {promoters.length > 0 ? (
              <StyledPromotersList>
                <StyledListHeader>
                  <div>Photo</div>
                  <div>FirstName</div>
                  <div>LastName</div>
                  <div>Email</div>
                  <div>Position</div>
                  <div>Opinions number</div>
                  <div>Rating</div>
                </StyledListHeader>
                {promoters.map((promoter: SimplifiedUserWithOpinions) => (
                  <StyledPromoterItem>{promoter.firstName}</StyledPromoterItem>
                ))}
              </StyledPromotersList>
            ) : (
              <EmptyStateContainer>
                <div>
                  <ChatIcon />
                </div>
                <p>It seems that promoters list is empty</p>
              </EmptyStateContainer>
            )}
          </ContentContainer>
        </ContentWrapper>
      )}
    </>
  );
};
