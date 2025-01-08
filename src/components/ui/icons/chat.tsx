import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const Chat = ({ color = 'black', ...props }: SvgProps) => (
  <Svg width={25} height={24} fill="none" viewBox="0 0 25 24" {...props}>
    <Path
      d="M12.5 4C7.81 4 4 7.13 4 11c0 1.84.8 3.54 2.12 4.87a1 1 0 0 1 .25.97l-.88 3.18c-.2.72.54 1.36 1.22 1.04l3.11-1.37a1 1 0 0 1 .8-.04A11.9 11.9 0 0 0 12.5 18c4.69 0 8.5-3.13 8.5-7s-3.81-7-8.5-7Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.5 11h8M8.5 8h4"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
