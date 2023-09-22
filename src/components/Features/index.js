import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'rekalogika/file',
    link: 'file',
    description: (
      <>
        High-level file abstraction library built on top of Flysystem.
      </>
    ),
  },
  {
    title: 'rekalogika/file-bundle',
    link: 'file-bundle',
    description: (
      <>
        Symfony bundle to easily integrate <b>rekalogika/file</b> and related
        packages within a Symfony application.
      </>
    ),
  },
  {
    title: 'rekalogika/domain-event',
    link: 'domain-event',
    description: (
      <>
        Domain event pattern implementation for Symfony and Doctrine.
      </>
    ),
  },
  {
    title: 'rekalogika/reconstitutor',
    link: 'reconstitutor',
    description: (
      <>
        Augments Doctrine's reconstitution/hydration with your logic in a concise and expressive class.
      </>
    ),
  },
  {
    title: 'rekalogika/temporary-url-bundle',
    link: 'temporary-url-bundle',
    description: (
      <>
        Symfony bundle for creating temporary URLs to your resources.
      </>
    ),
  },
  {
    title: 'rekalogika/direct-property-access',
    link: 'direct-property-access',
    description: (
      <>
        Implementation of PropertyAccessor that reads & writes directly into
        properties, bypassing getters & setters.
      </>
    ),
  },
  {
    title: 'rekalogika/psr-16-simple-cache-bundle',
    link: 'psr-16-simple-cache-bundle',
    description: (
      <>
        Enables PSR-16 Simple Cache services in Symfony projects.
      </>
    ),
  },
];

function Feature({ title, description, link }) {
  return (
    <article className="col col--6 margin-bottom--lg">
      <Link className={clsx('card padding--lg', styles.cardContainer)} to={`${link}`}>
        <h2>{title}</h2>
        <p class="">{description}</p>
      </Link>
    </article>
  );
}

export default function Features() {
  return (
    <div class="margin--lg">
      <section className="row">
        {FeatureList.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </section>
    </div>
  );
}
