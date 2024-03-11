---
title: Outbox Installation & Configuration
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

To use the transactional outbox pattern to publish your events on the event bus,
there are additional steps you need to take.

:::warning

These steps are optional, and only necessary if you want to use the
`AsPublishedDomainEventListener` strategy.

:::

## Installation

Make sure Composer is installed globally, as explained in the
[installation chapter](https://getcomposer.org/doc/00-intro.md)
of the Composer documentation.

<Tabs>
<TabItem value="flex" label="With Symfony Flex">

Open a command console, enter your project directory and execute:

```bash
composer require rekalogika/domain-event-outbox
```
</TabItem>

<TabItem value="noflex" label="Without Symfony Flex">

Step 1: Download the Bundle

Open a command console, enter your project directory, and execute the
following command to download the latest stable version of this bundle:

```bash
composer require rekalogika/domain-event-outbox
```

Step 2: Enable the Bundle

Then, enable the bundle by adding it to the list of registered bundles
in the `config/bundles.php` file of your project:

```php title="config/bundles.php"
return [
    // ...
    Rekalogika\DomainEvent\Outbox\RekalogikaDomainEventOutboxBundle::class => ['all' => true],
];
```
</TabItem>
</Tabs>

## Symfony Messenger Configuration

The package requires a Symfony Messenger bus named
`rekalogika.domain_event.bus`. You can accomplish that by creating the
configuration file:

```yaml title="config/packages/rekalogika_domain_event_outbox.yaml"
framework:
    messenger:
        buses:
            rekalogika.domain_event.bus:
                default_middleware:
                    allow_no_handlers: true
```

## Make Sure the Default `messenger.yaml` Has an Explicit Bus Configuration

:::danger

The default Symfony Messenger configuration does not define `buses` and
`default_bus`. You need to make sure they are present in your configuration
file. Otherwise, our bus configuration above will silently become the default
bus.

:::

```yaml title="config/packages/messenger.yaml"
# default messenger.yaml with explicit default bus

framework:
    messenger:
        failure_transport: failed

        transports:
            # https://symfony.com/doc/current/messenger.html#transport-configuration
            async:
                dsn: '%env(MESSENGER_TRANSPORT_DSN)%'
                options:
                    use_notify: true
                    check_delayed_interval: 60000
                retry_strategy:
                    max_retries: 3
                    multiplier: 2
            failed: 'doctrine://default?queue_name=failed'
            # sync: 'sync://'

        # highlight-start
        ### You need to add this
        ### START
        default_bus: messenger.bus.default

        buses:
            messenger.bus.default: null
        ### END
        # highlight-end

        routing:
            Symfony\Component\Mailer\Messenger\SendEmailMessage: async
            Symfony\Component\Notifier\Message\ChatMessage: async
            Symfony\Component\Notifier\Message\SmsMessage: async

            # Route your messages to the transports
            # 'App\Message\YourMessage': async
```

## Configure Your Domain Events Routing

With this package, your domain events become the message classes of the Symfony
Messenger. And like other Symfony Messenger messages, you may need to configure
the routing for your domain events. You can do that like the following.

```yaml title="config/packages/messenger.yaml"
framework:
    messenger:
        # ...
        routing:
            # ...
            'Rekalogika\DomainEvent\Outbox\Message\MessageRelayStartMessage': async
            'App\DomainEvent\*': async
```

## Bundle Configuration

The bundle defines the following configuration option:

```yaml title="config/packages/rekalogika_domain_event_outbox.yaml"
rekalogika_domain_event_outbox:
    # The name of database table used to store the outgoing messages
    outbox_table: rekalogika_event_outbox
```