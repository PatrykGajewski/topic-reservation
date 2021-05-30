import React from 'react';
import { shallow } from 'enzyme';
import { Popup } from './Popup';
import { StyledHeader, FooterButton } from './styles';
import { ButtonConfig, ButtonType } from './models';

const popupHeader: string = 'Popup example';

const buttonConfig: ButtonConfig = {
  label: 'Label example',
  disabled: false,
  onClick: () => {},
  buttonType: ButtonType.PRIMARY,
};

const popup = shallow(<Popup
  header={popupHeader}
  handleClose={() => {}}
  buttonsConfig={[buttonConfig]}
>
  <div>children example</div>
</Popup>);

it('should render <Popup />', () => {
  expect(popup);
});

it('should contains one children', () => {
  expect(popup.children().length).toBe(1);
});

it('should have correct header content', () => {
  expect(popup.find(StyledHeader).text()).toBe(popupHeader);
});

it('should render correct button label', () => {
  expect(popup.find(FooterButton).text()).toBe(buttonConfig.label);
});

it('should render correct button state', () => {
  expect(popup.find(FooterButton).getElement().props.disabled).toBe(buttonConfig.disabled);
})
