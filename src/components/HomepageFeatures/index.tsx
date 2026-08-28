import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  label: string;
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    label: 'AI Studios',
    title: 'Revolutionary Text to Video Production',
    Svg: require('@site/static/img/aistudios_icon.svg').default,
    description: (
      <>
        The fastest, most natural, and easiest-to-use AI Video Generator.<br/>
        Fully licensed models ready to be deployed.
      </>
    ),
    link: 'aistudioV3/getting-started',
  },
  {
    label: 'AI Human',
    title: 'Omnichannel Experience',
    Svg: require('@site/static/img/aihuman_icon.svg').default,
    description: (
      <>
      AI Humans are virtual employees that interact with natural language processing.<br/>
      Brand Ambassadors, Bankers, Retail Assistants, Tutors, News Anchors, and more.
      </>
    ),
    link: 'aihuman/web-sdk',
  },
  {
    label: 'AI Kiosk',
    title: 'Smart investment for client relations',
    Svg: require('@site/static/img/aikiosk_icon.svg').default,
    description: (
      <>
        Natural language understanding and processing with active conversation and 24/7/365 user support.
      </>
    ),
    link: 'https://www.aistudios.com/company/contact',
  },
];

function Feature({label, title, Svg, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.featureCol)}>
      <a href={link} className={styles.card}>
        <div className={styles.iconWrap}>
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <span className={styles.cardLabel}>{label}</span>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDesc}>{description}</p>
        <span className={styles.learnMore}>Learn more →</span>
      </a>
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
