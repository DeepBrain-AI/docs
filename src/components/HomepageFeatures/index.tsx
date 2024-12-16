import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Revolutionary Text to Video Production',
    Svg: require('@site/static/img/aistudios_logo.svg').default,
    description: (
      <>
        The fastest, most natural, and easiest-to-use AI Video Generator.<br/>
        Fully licensed models ready to be deployed.
      </>
    ),
    link: 'aistudios/getting-started',
  },
  {
    title: 'Omnichannel Experience',
    Svg: require('@site/static/img/aihuman_logo.svg').default,
    description: (
      <>
      AI Humans are virtual employees that interact with natural language processing.<br/>
      Brand Ambassadors, Bankers, Retail Assistants, Tutors, News Anchors, and more.
      </>
    ),
    link: 'aihuman/web-sdk',
  },
  {
    title: 'Smart investment for client relations',
    Svg: require('@site/static/img/aikiosk_logo.svg').default,
    description: (
      <>
        Natural language understanding and processing with active conversation and 24/7/365 user support.
      </>
    ),
    link: 'https://www.aistudios.com/company/contact',
  },
];

function Feature({title, Svg, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <a href={link}>
          <Svg className={styles.featureSvg} role="img" />
        </a>
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
