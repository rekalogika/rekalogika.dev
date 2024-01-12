import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'rekalogika/mapper',
    link: 'mapper',
    tags: ['symfony', 'php'],
    description: (
      <>
        An object mapper for PHP and Symfony. Maps an object to another object. Primarily used for transforming an entity to a DTO and vice versa.
      </>
    ),
  },
  {
    title: 'rekalogika/file',
    link: 'file',
    tags: ['php'],
    description: (
      <>
        High-level file abstraction library built on top of Flysystem.
      </>
    ),
  },
  {
    title: 'rekalogika/file-bundle',
    link: 'file-bundle',
    tags: ['symfony', 'doctrine'],
    description: (
      <>
        Symfony bundle to easily integrate <b>rekalogika/file</b> and related
        packages within a Symfony application.
      </>
    ),
  },
  {
    title: 'rekalogika/gotenberg-pdf-bundle',
    link: 'gotenberg-pdf-bundle',
    tags: ['symfony'],
    description: (
      <>
        Symfony Bundle for generating PDF using Gotenberg.
      </>
    ),
  },
  {
    title: 'rekalogika/domain-event',
    link: 'domain-event',
    tags: ['symfony', 'doctrine'],
    description: (
      <>
        Domain event pattern implementation for Symfony and Doctrine.
      </>
    ),
  },
  {
    title: 'rekalogika/reconstitutor',
    link: 'reconstitutor',
    tags: ['doctrine'],
    description: (
      <>
        Augments Doctrine's reconstitution/hydration with your logic in a concise and expressive class.
      </>
    ),
  },
  {
    title: 'rekalogika/doctrine-collections-decorator',
    link: 'doctrine-collections-decorator',
    tags: ['doctrine'],
    description: (
      <>
        Lets you easily create decorator classes to modify the behaviors of Doctrine
Collection objects, including the collection objects used by Doctrine ORM in
your entities.
      </>
    ),
  },
  {
    title: 'rekalogika/temporary-url-bundle',
    link: 'temporary-url-bundle',
    tags: ['symfony'],
    description: (
      <>
        Symfony bundle for creating temporary URLs to your resources.
      </>
    ),
  },
  {
    title: 'rekalogika/direct-property-access',
    link: 'direct-property-access',
    tags: ['php'],
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
    tags: ['symfony'],
    description: (
      <>
        Enables PSR-16 Simple Cache services in Symfony projects.
      </>
    ),
  },
];

function Feature({ title, description, link, tags }) {
  return (
    <article className="col col--6 margin-bottom--lg">
      <Link className={clsx('card padding--lg', styles.cardContainer)} to={`${link}`}>
        <h2>{title}</h2>
        <p class="">{description}</p>
        <p class="">
          {tags.map((tag) => 
            <span class="badge badge--secondary margin-right--sm">#{tag}</span>
          )}
        </p>
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
