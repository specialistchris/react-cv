import {FC, memo} from 'react';

import Icon, {IconProps} from './Icon';

const NZFlagIcon: FC<IconProps> = memo(props => (
  <Icon {...props}>
    <svg width="200" height="200" viewBox="0 0 24 24"></svg>
      <path
      d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
      fill="currentColor"></path>
      </svg>
  </Icon>
));

export default NZFlagIcon;
