---
title: Simple Batch Command
---

Create a console command for processing batch jobs.

In most cases, we will create a console command to run our batch jobs. So, it
makes sense to make this process as streamlined as possible, with as many common
features built-in as possible.

## Requirements

This feature uses Symfony Console. Therefore, you need the [Symfony integration](../framework-integration/symfony)
or [API Platform integration](../framework-integration/api-platform), or both.

## Features

* Easy to create. You provide the `PageableInterface` object, and the logic to
  process each item. The framework takes care of the rest.
* Informative UI. You get time elapsed and memory usage on each page, as well as
  statistics every 15 seconds.
* Resumable. The UI provides the information about page identifiers on every
  opportunity, and you can use the `--resume` or `-r` option to resume the
  process from the specified page identifier.
* Override the page size (the number of items on each batch) using the
  `--page-size` or `-p` command line option.
* Progress file. Specify the progress file using the `--progress-file` or `-f`
  command line option. The command will store the last page identifier to this
  file. The next invocation of the command will resume from this page.
* Time limit. Runs the batch up to the duration specified using the
  `--time-limit` or `-t` command line option.
* Signal handling. The command listens to the `SIGINT` signal (Ctrl+C) and
  `SIGTERM`. It will finish the current page before exiting, so your job will
  have a consistent state.

## Quick Start

Creating a console command for processing batch jobs is as easy as:

```php
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Common\Collections\Criteria;
use Doctrine\Common\Collections\Order;
use Rekalogika\Contracts\Rekapager\PageableInterface;
use Rekalogika\Rekapager\Batch\Event\AfterPageEvent;
use Rekalogika\Rekapager\Batch\Event\ItemEvent;
use Rekalogika\Rekapager\Doctrine\Collections\SelectableAdapter;
use Rekalogika\Rekapager\Keyset\KeysetPageable;
use Rekalogika\Rekapager\Symfony\Batch\SimpleBatchCommand;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @extends SimpleBatchCommand<int,Post>
 */
#[AsCommand(
    name: 'app:postbatch',
    description: 'Simple batch command for processing the Post entities'
)]
class AppSimpleBatchCommand extends SimpleBatchCommand
{
    public function __construct(
        private readonly PostRepository $postRepository,
        private readonly EntityManagerInterface $entityManager,
    ) {
        parent::__construct();
    }

    #[\Override]
    protected function configure(): void
    {
        // set up the command arguments and options here, just like any other
        // Symfony console command
    }

    #[\Override]
    protected function getPageable(): PageableInterface {
        // procure a pageable object here, you can get the input arguments or
        // options from $this->getInput()

        $adapter = new SelectableAdapter(
            selectable: $this->postRepository,
            criteria: Criteria::create()->orderBy(['id' => Order::Ascending])
        );

        return new KeysetPageable($adapter);
    }

    #[\Override]
    public function processItem(ItemEvent $itemEvent): void
    {
        $item = $itemEvent->getItem();

        // do something with $item here
    }

    #[\Override]
    public function afterPage(AfterPageEvent $event): void
    {
        // do something after each page here

        $this->entityManager->flush(); // if required
        $this->entityManager->clear();
    }
}
```

The complete list of the hooks you can override:

* `beforeProcess()` - called before processing the first page.
* `beforePage()` - called before processing each page.
* `processItem()` - called for each item.
* `afterPage()` - called after processing each page.
* `afterProcess()` - called after processing the last page.
* `onInterrupt()` - called when the command is interrupted by the user, like when
  the user presses Ctrl+C.
* `onTimeLimit()` - called when the time limit is reached.