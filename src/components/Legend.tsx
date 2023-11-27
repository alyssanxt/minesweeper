import React, { FC } from 'react';
import styled from '@emotion/styled';

// export interface LegendProps {
//   /**
//    * Feature that should be activated after first+second actions
//    */
//   feature: string;
//   /**
//    * First action
//    */
//   firstAction: string;
//   /**
//    * Second action
//    */
//   secondAction?: string;
// }

export const Legend: FC = () => (
  <Parent>
    <strong>flag: </strong>
    <FlagComboParent>
    <Key> Ctrl: </Key> + <Click>Click</Click>
    </FlagComboParent>
  </Parent>
);

const FlagComboParent = styled.code`
  background:#e3e3e3; 
`;

 const Parent = styled.legend`
  font-size: 1em;
  margin: 0 auto 2vw;
  line-height: 1.25em;
`;

const Key = styled.span`
  color: #ec433c;
`;

const Click = styled.span`
  color: #2a48ec;
`;
