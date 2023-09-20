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
import porfolioImage12 from '../images/portfolio/portfolio-12.jpg';
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
        at <strong className="text-stone-100">a bank</strong> helping to construct portfolios.
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        I don't have free time, I have a <strong className="text-stone-100">family</strong>,
        and, whenever I can, I like to <strong className="text-stone-100">kaizen</strong>.
      </p>
    </>
  ),
  actions: [
    {
      href: '/assets/NapierChristopher-CVen.pdf',
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
  description: `More than 10 years of project management in various industries. I started with 
  information technology and engineering, then added an MBA degree and now find myself in Swiss Banking.
  I am skilled at working in business and technical domains and bridging the gaps between them.`,
  aboutItems: [
    {label: 'Location', text: 'Switzerland', Icon: MapIcon},
    {label: 'Age', text: '39', Icon: CalendarIcon},
    {label: 'Nationality', text: 'NZ / US / CH', Icon: FlagIcon},
    {label: 'Interests', text: 'Karate, Cats, Reading', Icon: SparklesIcon},
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
    title: 'DIY',
    description: 'I am a project manager. I always have a project on the go. This is also true at home.',
    url: 'https://timbaker.me',
    image: porfolioImage1,
  },
  {
    title: 'Wireless',
    description: 'CCNP qualified once, I still love wireless communication.',
    url: 'https://timbaker.me',
    image: porfolioImage2,
  },
  {
    title: 'Virtual Reality',
    description: 'I like the potential of VR. I follow the news.',
    url: 'https://timbaker.me',
    image: porfolioImage3,
  },
  {
    title: 'Vertical Farming',
    description: 'This is my retirement plan. Would love to own a fully automated vertical farm. Or ten.',
    url: 'https://timbaker.me',
    image: porfolioImage4,
  },
  {
    title: 'Skateboarding',
    description: 'My current personal challenge - learn to skateboard.',
    url: 'https://timbaker.me',
    image: porfolioImage5,
  },
  {
    title: 'Robotics',
    description: 'Since my university days, I have been playing with robots.',
    url: 'https://timbaker.me',
    image: porfolioImage6,
  },
  {
    title: 'Real Estate',
    description: 'My passive income experiment.',
    url: 'https://timbaker.me',
    image: porfolioImage7,
  },
  {
    title: 'Gardening',
    description: 'Total amateur but really enjoy getting my hands dirty.',
    url: 'https://timbaker.me',
    image: porfolioImage8,
  },
  {
    title: 'Technology',
    description: 'Subscribed to all the newsletters.',
    url: 'https://timbaker.me',
    image: porfolioImage9,
  },
  {
    title: 'Electric Cars',
    description: 'Definitely the future. Would love to by more hands-on myself.',
    url: 'https://timbaker.me',
    image: porfolioImage10,
  },
  {
    title: 'Martial Arts',
    description: 'Bit of this, bit of that. Currently learning Karate.',
    url: 'https://timbaker.me',
    image: porfolioImage11,
  },
  {
    title: 'Photograpy',
    description: 'Budding photographer.',
    url: 'https://timbaker.me',
    image: porfolioImage12,
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
    content: <p>Graduated with first class honours, majoring in Computer Systems Engineering</p>,
  },
];

export const experience: TimelineItem[] = [
  {
    date: 'January 2022 - Present',
    location: 'Swiss Bank',
    title: 'IT Program Manager',
    content: (
      <p>
        IT Program management of apps and other critical software component projects.
        Successfully on-boarded a new development into the Bank's SDLC process
        Portfolio construction from SAA to Template
      </p>
    ),
  },
  {
    date: 'January 2018 - December 2021',
    location: 'Swiss Bank',
    title: 'Business Project Manager',
    content: (
      <p>
        Client integration manager for an enterprise platform solution.
        Agile Product Owner working with JIRA, Confluence and ADO.
        Facilitating between business project owners, UX, sales and development teams.
        Providing regular status updates to clients and stakeholders.
      </p>
    ),
  },
  {
    date: 'August 2012 - October 2017',
    location: 'Hexagon Manufacturing Intelligence',
    title: 'Project Manager',
    content: (
      <p>
        Managed an integrated robotic automation project with a budget of €15M.
        Coordinated between multiple international teams with a total of over 30 employees working in a matrix organization.
        Reported progress regularly to a Steering Committee and other stakeholders.
        Introduced Agile processes and methodology to the development teams.

      </p>
    ),
  },
  {
    date: 'January 2009 - August 2011',
    location: 'Intact Integrated Services',
    title: 'Network Engineer, Service Team Leader',
    content: (
      <p>
        Team leader for the 24/7 Support Service Desk.
        Cisco Certified Network Professional (CCNP) qualified.
        Both German and UK clients over telephone and email for voice and network related problems.
      </p>
    ),
  },
  {
    date: 'August 2006 - September 2008',
    location: 'Harmonic Limited',
    title: 'Technology Analyst',
    content: (
      <p>
        Project management and technical responsibilities in ICT projects.
        Brought together subject experts, government and business industry leaders.
        Technical documentation and editing, website and wikipage development and maintenance, and software development (C++).
        It also required hardware and software problem diagnosis and resolution as well as network and server administration for a small company.
      </p>
    ),
  },
  {
    date: 'February 2004 - June 2006',
    location: 'Victoria University of Wellington',
    title: 'Computer Programming Tutor',
    content: (
      <p>
        Tutor of java, C++ and MIPS programming languages.
        Working with students in the computer labs.
        Clarifying concepts and demonstrating how to complete tasks on the computers in weekly workshops.
      </p>
    ),
  },
  {
    date: 'July 2005 - December 2005',
    location: 'Disneyland Resort Anaheim',
    title: 'Street Vendor',
    content: (
      <p>
        Multiple responsibilities in the food and beverage department including cashier, steward, busser, waiter and back-of-house.
        This position taught me valuable communication and customer service skills.
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
      image: 'https://soulinamind.com/wp-content/uploads/2021/01/charles-darwin.png',
    },
    {
      name: 'T. E. Lawrence',
      text: 'All men dream but not equally. Those who dream by night in the dusty recesses of their minds wake in the day to find that is was vanity. But the dreamers of the day are dangerous men, for they may act on their dreams with open eyes, to make it possible.',
      image: 'https://www.wumingfoundation.com/images/TELawrence.jpg',
    },    
    {
      name: 'Hunter S. Thompson',
      text: 'Buy the ticket. Take the ride.',
      image: 'https://www.phrases.org.uk/famous-last-words/images/hunter-s-thompson-m.jpg',
    },
    {
      name: 'Franklin D. Roosevelt',
      text: 'Above all, try something.',
      image: 'https://www.dicocitations.com/images_auteur/3857.jpg',
    },
    {
      name: 'Abraham Lincoln',
      text: 'In the end its not the years in your life that count its the life in your years.',
      image: 'https://2.bp.blogspot.com/-hXiGVvhi6xc/ULoR83l9LCI/AAAAAAAAAEA/fvjGCm-2tMg/s1600/Abraham+Lincoln.jpg',
    },
    {
      name: 'Ghandi',
      text: 'Action expresses priorities',
      image: 'https://www.droominfo.nl/img/beroemd/ghandi.jpg',
    },
    {
      name: 'Dale Carnegie',
      text: 'Every day is a new life to a wise man.',
      image: 'https://www.groovehq.com/blog/wp-content/uploads/2018/09/dale-carnegie.jpg',
    },
  ],
};

/**
 * Contact section
 */

export const contact: ContactSection = {
  headerText: 'Get in touch with me.',
  description: 'Email works. Not so active elsewhere.',
  items: [
    {
      type: ContactType.Email,
      text: 'contact@christophernapier.com',
      href: 'mailto:contact@christophernapier.com',
    },
    {
      type: ContactType.Location,
      text: 'Basel, Switzerland',
      href: 'https://www.google.ch/maps/place/Basel/@47.55465,7.5532046,13z',
    },
    {
      type: ContactType.Instagram,
      text: '@instagram',
      href: 'https://www.instagram.com/',
    },
    {
      type: ContactType.Github,
      text: 'github',
      href: 'https://github.com/',
    },
  ],
};

/**
 * Social items
 */
export const socialLinks: Social[] = [
  {label: 'Github', Icon: GithubIcon, href: 'https://github.com/'},
  {label: 'Stack Overflow', Icon: StackOverflowIcon, href: 'https://stackoverflow.com/'},
  {label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/in/christophernapier/'},
  {label: 'Instagram', Icon: InstagramIcon, href: 'https://www.instagram.com/'},
  {label: 'Twitter', Icon: TwitterIcon, href: 'https://twitter.com/'},
];
