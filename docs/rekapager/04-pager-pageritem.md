---
title: Pager and PagerItem
---

A `PagerInterface` represents navigation through a collection of items. A view
layer can use it to render a pagination control. 

A pager works at a higher level than a `PageableInterface`. It needs to be able
to determine the current page from the context of the request, and to be able to
generate URLs for each page. A framework integration will give you a way to
transform a `PageableInterface` object into a `PagerInterface` object.

A pager has many pager items. A pager item is an extended page object that
contains a URL.

import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

<ThemedImage
  alt="File classes"
  sources={{
    light: useBaseUrl('/diagrams/light/rekapager-pager.svg'),
    dark: useBaseUrl('/diagrams/dark/rekapager-pager.svg'),
  }}
  width="100%"
/>

