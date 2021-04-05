import { ButtonConfig } from './button-config.model';

export interface PopupProps {
  children: any,
  header: string,
  handleClose: () => void;
  buttonsConfig: ButtonConfig[];
}
