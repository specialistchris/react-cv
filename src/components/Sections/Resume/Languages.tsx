import {FC, memo, useMemo} from 'react';

import {Language as LanguageType} from '../../../data/dataDef';

export const Languages: FC<{language: LanguageType}> = memo(({language}) => {
  const {name, level, max = 10} = language;
  const percentage = useMemo(() => Math.round((level / max) * 100), [level, max]);

  return (
    <div className="flex flex-col">
      <span className="ml-2 text-sm font-medium">{name}</span>
      <div className="h-5 w-full overflow-hidden rounded-full bg-neutral-300">
        <div className="h-full rounded-full bg-orange-400" style={{width: `${percentage}%`}} />
        
      </div>
    </div>
  );
});

Languages.displayName = 'Languages';
