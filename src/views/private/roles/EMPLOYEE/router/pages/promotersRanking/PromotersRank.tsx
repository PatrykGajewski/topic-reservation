import React, {ChangeEvent, useEffect, useState} from 'react';
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
import { PromotersTable } from "./components";
import {ButtonType, Popup} from "../../../../../../components";
import {PromoterDetails} from "./components/details";

interface ExtendedPageConfig extends PageConfig {
  order: Order
}

// NOTE for backend side that logic is different
// because when order of rank is e.g 1,2,3 (ascending) rank value is descending e.g 150, 140, 130
const orderOptions: SelectOption[] = [
  {
    label: 'Malejąca',
    value: Order.ASCENDING,
  },
  {
    label: 'Rosnąca',
    value: Order.DESCENDING,
  },
];

export const PromotersRank = () => {
  const dispatch = useDispatch();
  const stateData = useSelector((state: AppState) => ({
    promoters: state.promoters,
    pageConfig: state.promotersListView,
    degrees: state.degrees,
  }));

  const [promoters, setPromoters] = useState<SimplifiedUserWithOpinions[]>([]);
  const [previewedPromoter, setPreviewedPromoter] = useState<SimplifiedUserWithOpinions | null>(null);
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

  const handlePageChange = (e: any, page: number) => {
    setPageConfig((prev: any) => ({
      ...prev,
      pageIndex: page,
      total: prev.total,
      rowsPerPage: prev.rowsPerPage,
    }));
  };

  const handleRowPerPageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPageConfig((prev) => ({
      ...prev,
      pageIndex: 0,
      total: prev.total,
      // @ts-ignore
      rowsPerPage: e.target.value as number,
    }));
  };

  const previewPromoter = (promoter: SimplifiedUserWithOpinions) => {
    setPreviewedPromoter(promoter);
  }

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
              <PromotersTable
                promoters={promoters}
                degrees={stateData.degrees}
                count={pageConfig.total}
                page={pageConfig.pageIndex}
                onChangePage={handlePageChange}
                rowsPerPage={pageConfig.rowsPerPage}
                onChangeRowsPerPage={handleRowPerPageChange}
                rowsActions={[]}
                onRowClick={previewPromoter}
              />
            ) : (
              <EmptyStateContainer>
                <div>
                  <ChatIcon />
                </div>
                <p>It seems that promoters list is empty</p>
              </EmptyStateContainer>
            )}
            {previewedPromoter !== null && (
              <Popup
                header="Promoter details"
                handleClose={() => setPreviewedPromoter(null)}
                buttonsConfig={[
                  {
                    label: 'Close',
                    disabled: false,
                    onClick: () => setPreviewedPromoter(null),
                    buttonType: ButtonType.SECONDARY,
                  },
                ]}
              >
                <PromoterDetails
                  promoter={previewedPromoter}
                  degrees={stateData.degrees}
                />
              </Popup>
            )}
          </ContentContainer>
        </ContentWrapper>
      )}
    </>
  );
};
