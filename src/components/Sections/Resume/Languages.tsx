import {FC, memo, PropsWithChildren} from 'react';

import {Language as LanguageType, LanguageList as LanguageListType} from '../../../data/dataDef';


export const LanguageList: FC<PropsWithChildren<{languageList: LanguageListType}>> = memo(({languageList}) => {

  const {name, languages} = languageList;

  return (
    <div className="flex flex-col">
      <span className="text-center text-lg font-bold">{name}
        {languages.map((language, index) => (
          <Language key={`${language.label}-${index}`} language={language} />
      ))}
      </span> 
    </div>
  );
});

LanguageList.displayName = 'Languages';

export const Language: FC<{language: LanguageType}> = memo(({language}) => {

  const {label, text, Icon} = language;

  return (
    <>
    <span className="text-sm font-bold">
      {Icon && <Icon className="h-5 w-5" />} {label}: {text}
    </span>  
    {/* <span className="text-sm">{text}</span> */}
    </>
  );
});

Language.displayName = 'Language';