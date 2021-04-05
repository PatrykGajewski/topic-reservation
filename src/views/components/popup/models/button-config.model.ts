import {ButtonType} from "./button-type.model";

export interface ButtonConfig {
  label: string
  disabled: boolean,
  onClick: () => void,
  buttonType: ButtonType
}
