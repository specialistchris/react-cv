import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  BuildingOffice2Icon,
  CalendarIcon,
  FlagIcon,
  MapIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

import GithubIcon from '../components/Icon/GithubIcon';
import InstagramIcon from '../components/Icon/InstagramIcon';
import LinkedInIcon from '../components/Icon/LinkedInIcon';
import StackOverflowIcon from '../components/Icon/StackOverflowIcon';
import TwitterIcon from '../components/Icon/TwitterIcon';
import heroImage from '../images/header-background.webp';
import porfolioImage1 from '../images/portfolio/portfolio-1.jpg';
import porfolioImage2 from '../images/portfolio/portfolio-2.jpg';
import porfolioImage3 from '../images/portfolio/portfolio-3.jpg';
import porfolioImage4 from '../images/portfolio/portfolio-4.jpg';
import porfolioImage5 from '../images/portfolio/portfolio-5.jpg';
import porfolioImage6 from '../images/portfolio/portfolio-6.jpg';
import porfolioImage7 from '../images/portfolio/portfolio-7.jpg';
import porfolioImage8 from '../images/portfolio/portfolio-8.jpg';
import porfolioImage9 from '../images/portfolio/portfolio-9.jpg';
import porfolioImage10 from '../images/portfolio/portfolio-10.jpg';
import porfolioImage11 from '../images/portfolio/portfolio-11.jpg';
import profilepic from '../images/profilepic.jpg';
import testimonialImage from '../images/testimonial.webp';
import {
  About,
  ContactSection,
  ContactType,
  Hero,
  HomepageMeta,
  PortfolioItem,
  SkillGroup,
  Social,
  TestimonialSection,
  TimelineItem,
} from './dataDef';

/**
 * Page meta data
 */
export const homePageMeta: HomepageMeta = {
  title: 'Chris Napier',
  description: "React me up",
};

/**
 * Section definition
 */
export const SectionId = {
  Hero: 'hero',
  About: 'about',
  Contact: 'contact',
  Portfolio: 'portfolio',
  Resume: 'resume',
  Skills: 'skills',
  Stats: 'stats',
  Testimonials: 'testimonials',
} as const;

export type SectionId = typeof SectionId[keyof typeof SectionId];

/**
 * Hero section
 */
export const heroData: Hero = {
  imageSrc: heroImage,
  name: `Christopher Napier`,
  description: (
    <>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        I'm a Switzerland based <strong className="text-stone-100">Project Manager</ strong>, currently working
        at <strong className="text-stone-100">a bank</strong> helping construct portfolios.
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        I don't have free time, I have a <strong className="text-stone-100">family</strong>,
        but sometimes I like to <strong className="text-stone-100">kaizen</strong>.
      </p>
    </>
  ),
  actions: [
    {
      href: '/assets/resume.pdf',
      text: 'Resume',
      primary: true,
      Icon: ArrowDownTrayIcon,
    },
    {
      href: `#${SectionId.Contact}`,
      text: 'Contact',
      primary: false,
    },
  ],
};

/**
 * About section
 */
export const aboutData: About = {
  profileImageSrc: profilepic,
  description: `More than 10 years of project management in various industries. I started in 
  information technology and engineering, then added MBA degree and find myself now in Swiss Banking.
  I am skilled at working in business and technical domains and bridging the gaps between them.`,
  aboutItems: [
    {label: 'Location', text: 'Switzerland', Icon: MapIcon},
    {label: 'Age', text: '39', Icon: CalendarIcon},
    {label: 'Nationality', text: 'NZ / US / CH', Icon: FlagIcon},
    {label: 'Interests', text: 'Karate, Cats, ', Icon: SparklesIcon},
    {label: 'Study', text: 'Victoria University, St Gallen Univeristy', Icon: AcademicCapIcon},
    {label: 'Employment', text: 'A swiss bank', Icon: BuildingOffice2Icon},
  ],
};

/**
 * Skills section
 */
export const skills: SkillGroup[] = [
  {
    name: 'Spoken languages',
    skills: [
      {
        name: 'English',
        level: 10,
      },
      {
        name: 'German',
        level: 8,
      },
      {
        name: 'Portuguese',
        level: 5,
      },
      {
        name: 'Japanese',
        level: 2,
      },
    ],
  },
  {
    name: 'Project Management',
    skills: [
      {
        name: 'Agile',
        level: 9,
      },
      {
        name: 'Communication',
        level: 9,
      },
      {
        name: 'Risk Planning',
        level: 7,
      },
      {
        name: 'Adaptability',
        level: 8,
      },
    ],
  },
  {
    name: 'Toolset',
    skills: [
      {
        name: 'Jira',
        level: 8,
      },
      {
        name: 'Confluence',
        level: 7,
      },
      {
        name: 'Microsoft Office',
        level: 9,
      },
      {
        name: 'Azure Dev Ops',
        level: 6,
      },
    ],
  },
  {
    name: 'Industries',
    skills: [
      {
        name: 'ICT',
        level: 7,
      },
      {
        name: 'Finance',
        level: 8,
      },
      {
        name: 'Manufacturing',
        level: 7,
      },
      {
        name: 'Automotive',
        level: 6,
      },
    ],
  },
];

/**
 * Portfolio section
 */
export const portfolioItems: PortfolioItem[] = [
  {
    title: 'Project title 1',
    description: 'Give a short description of your project here.',
    url: 'https://timbaker.me',
    image: porfolioImage1,
  },
  {
    title: 'Project title 2',
    description: 'Give a short description of your project here.',
    url: 'https://timbaker.me',
    image: porfolioImage2,
  },
  {
    title: 'Project title 3',
    description: 'Give a short description of your project here.',
    url: 'https://timbaker.me',
    image: porfolioImage3,
  },
  {
    title: 'Project title 4',
    description: 'Give a short description of your project here.',
    url: 'https://timbaker.me',
    image: porfolioImage4,
  },
  {
    title: 'Project title 5',
    description: 'Give a short description of your project here.',
    url: 'https://timbaker.me',
    image: porfolioImage5,
  },
  {
    title: 'Project title 6',
    description: 'Give a short description of your project here.',
    url: 'https://timbaker.me',
    image: porfolioImage6,
  },
  {
    title: 'Project title 7',
    description: 'Give a short description of your project here.',
    url: 'https://timbaker.me',
    image: porfolioImage7,
  },
  {
    title: 'Project title 8',
    description: 'Give a short description of your project here.',
    url: 'https://timbaker.me',
    image: porfolioImage8,
  },
  {
    title: 'Project title 9',
    description: 'Give a short description of your project here.',
    url: 'https://timbaker.me',
    image: porfolioImage9,
  },
  {
    title: 'Project title 10',
    description: 'Give a short description of your project here.',
    url: 'https://timbaker.me',
    image: porfolioImage10,
  },
  {
    title: 'Project title 11',
    description: 'Give a short description of your project here.',
    url: 'https://timbaker.me',
    image: porfolioImage11,
  },
];

/**
 * Resume section -- TODO: Standardize resume contact format or offer MDX
 */
export const education: TimelineItem[] = [
  {
    date: '2012',
    location: 'University of St. Gallen',
    title: 'Masters of Business and Administration',
    content: <p>Majored in Entrepreneurship and Project Management</p>,
  },
  {
    date: '2006',
    location: 'Victoria University of Wellington',
    title: 'Bachelor of Information Technology',
    content: <p>Graduated with first class honours majoring in Computer Systems Engineering</p>,
  },
];

export const experience: TimelineItem[] = [
  {
    date: 'January 2018 - Present',
    location: 'Swiss Bank',
    title: 'Business Project Manager',
    content: (
      <p>
        IT Program management for apps and other developments in the Digital Offering Program
        Client technical integration management for an enterprise platform solution
        Agile Product Owner working with JIRA, Confluence and ADO
        Facilitating between product management, UX, sales and development teams
        Providing regular status updates to clients and stakeholders
      </p>
    ),
  },
  {
    date: 'August 2012 - October 2017',
    location: 'Hexagon Manufacturing Intelligence',
    title: 'Project Manager',
    content: (
      <p>
        Managed an integrated robotic automation project with a budget of €15M
        Coordinated between multiple international teams with a total of over 30 employees working in a matrix organization
        Reported progress regularly to a Steering Committee and other stakeholders
        Introduced Agile processes and methodology to the development teams

      </p>
    ),
  },
  {
    date: 'January 2009 - August 2011',
    location: 'Intact Integrated Services',
    title: 'Network Engineer, Service Team Leader',
    content: (
      <p>
        Cisco Certified Network Professional (CCNP)
        Team leader for the Support Service Desk
      </p>
    ),
  },
  {
    date: 'August 2006 - September 2008',
    location: 'Harmonic Limited',
    title: 'Technology Analyst',
    content: (
      <p>
        Project management and technical responsibilities in ICT projects
        Brought together subject experts, government and business industry leaders

      </p>
    ),
  },
];

/**
 * Testimonial section
 */
export const testimonial: TestimonialSection = {
  imageSrc: testimonialImage,
  testimonials: [
    {
      name: 'Albert Einstein',
      text: 'A human being is part of the whole called by us universe, a part limited in time and space. He experiences himself, his thoughts and feelings as something separated from the rest - a kind of optical delusion of his consciousness. This delusion is a kind of prison for us, restricting us to our personal desires and to affection.',
      image: 'https://www.jtg.sjrdesign.net/media/people_einstein.jpg',
    },
    {
      name: 'Charles Darwin',
      text: 'In the struggle for survival, the fittest win out at the expense of their rivals because they succeed in adapting themselves best to their environment.',
      image: 'http://descubriendogalapagos.ec/wp-content/uploads/2013/07/darwin-182x182.png',
    },
    {
      name: 'Someone else',
      text: 'Add several of these, and keep them as fresh as possible, but be sure to focus on quality testimonials with strong highlights of your skills/work ethic.',
      image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/69.jpg',
    },
  ],
};

/**
 * Contact section
 */

export const contact: ContactSection = {
  headerText: 'Get in touch.',
  description: 'Here is a good spot for a message to your readers to let them know how best to reach out to you.',
  items: [
    {
      type: ContactType.Email,
      text: 'reachout@timbaker.me',
      href: 'mailto:reachout@timbaker.me',
    },
    {
      type: ContactType.Location,
      text: 'Victoria BC, Canada',
      href: 'https://www.google.ca/maps/place/Victoria,+BC/@48.4262362,-123.376775,14z',
    },
    {
      type: ContactType.Instagram,
      text: '@tbakerx',
      href: 'https://www.instagram.com/tbakerx/',
    },
    {
      type: ContactType.Github,
      text: 'tbakerx',
      href: 'https://github.com/tbakerx',
    },
  ],
};

/**
 * Social items
 */
export const socialLinks: Social[] = [
  {label: 'Github', Icon: GithubIcon, href: 'https://github.com/tbakerx'},
  {label: 'Stack Overflow', Icon: StackOverflowIcon, href: 'https://stackoverflow.com/users/8553186/tim-baker'},
  {label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/in/timbakerx/'},
  {label: 'Instagram', Icon: InstagramIcon, href: 'https://www.instagram.com/tbakerx/'},
  {label: 'Twitter', Icon: TwitterIcon, href: 'https://twitter.com/TimBakerx'},
];
