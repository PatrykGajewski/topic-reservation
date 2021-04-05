import { RouteComponentProps } from 'react-router-dom';

export interface Props extends RouteComponentProps {
  logoutUser: () => void
}
