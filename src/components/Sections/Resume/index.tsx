import {FC, memo} from 'react';

import {education, experience, languagelist, SectionId, skills} from '../../../data/data';
import Section from '../../Layout/Section';
import ResumeSection from './ResumeSection';
import {SkillGroup} from './Skills';
import TimelineItem from './TimelineItem';


const Resume: FC = memo(() => {  
  const {name, languages} = languagelist;
  return (
    <Section className="bg-neutral-100" sectionId={SectionId.Resume}>
      <div className="flex flex-col divide-y-2 divide-neutral-300">
        <ResumeSection title="Education">
          {education.map((item, index) => (
            <TimelineItem item={item} key={`${item.title}-${index}`} />
          ))}
        </ResumeSection>
        <ResumeSection title="Work">
          {experience.map((item, index) => (
            <TimelineItem item={item} key={`${item.title}-${index}`} />
          ))}
        </ResumeSection>
        <ResumeSection title="Skills">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {skills.map((skillgroup, index) => (
              <SkillGroup key={`${skillgroup.name}-${index}`} skillGroup={skillgroup} />
            ))}
          </div>
        </ResumeSection>
        <ResumeSection title="Languages">
          <div className="flex flex-col gap-y-2">
            <p className="prose prose-sm text-gray-300 sm:prose-base">{name}</p>
          </div>
            <ul className="grid grid-cols-1 gap-4">
              {languages.map(({label, text, Icon}, idx) => (
                <li className="col-span-1 flex  items-start gap-x-2" key={idx}>
                  {Icon && <Icon className="h-5 w-5" />}
                  <span className="text-sm font-bold">{label}:</span>
                  <span className=" text-sm">{text}</span>
                </li>
              ))}
          </ul>
        </ResumeSection>
      </div>
    </Section>
  );
});

Resume.displayName = 'Resume';
export default Resume;
