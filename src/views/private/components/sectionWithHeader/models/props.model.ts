export interface Props {
  header: string,
  children: any,
  smallPadding?: boolean,
  lightBorder?: boolean,
  fitContent?: boolean,
  noMargin?: boolean,
  editable?: boolean,
  handleEdit?: () => void,
}
