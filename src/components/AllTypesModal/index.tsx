import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { $Wrapper } from './style';
import color from '@Data/color';
import theme from '@Styles/theme';

const defaultLabelStyle = {
  fontSize: '4px',
  fontFamily: "'Noto Sans KR', sans-serif",
};

const AllTypesModal = () => {
  return (
    <$Wrapper>
      <PieChart
        data={color.map(({ name, textColor }) => ({
          title: name,
          color: textColor,
          value: 1,
        }))}
        label={({ dataEntry }) => dataEntry.title}
        labelStyle={(index) => ({
          ...defaultLabelStyle,
          fill: index > 6 ? 'white' : theme.gray[900],
        })}
        labelPosition={75}
      />
    </$Wrapper>
  );
};

export default AllTypesModal;
