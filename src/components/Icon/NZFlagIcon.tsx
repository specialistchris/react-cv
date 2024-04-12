import {FC, memo} from 'react';

import Icon, {IconProps} from './Icon';

const NZFlagIcon: FC<IconProps> = memo(props => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 128">
    <path fill="#00247d" d="M0 0h85.33v42.667H0z"/>
    <path fill="#ffcc00" d="M0 85.333h85.33V128H0z"/>
    <path fill="#ffcc00" d="M170.667 85.333h85.333V128H170.667z"/>
    <path fill="#00247d" d="M170.667 0h85.333v42.667H170.667z"/>
    <path fill="#cc142b" d="M0 42.667h256v42.666H0z"/>
    </svg>
    
  </Icon>
));

export default NZFlagIcon;
