---
title: rekalogika/temporary-url-bundle
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Symfony bundle for creating temporary URLs to your resources. You provide the
resource in a plain PHP object, and a service to turn it into a HTTP response.
The framework handles the rest.

## Installation

Make sure Composer is installed globally, as explained in the
[installation chapter](https://getcomposer.org/doc/00-intro.md)
of the Composer documentation.

<Tabs>
<TabItem value="flex" label="With Symfony Flex">

Open a command console, enter your project directory, and execute:

```bash
composer require rekalogika/temporary-url-bundle
```
</TabItem>

<TabItem value="noflex" label="Without Symfony Flex">

Step 1: Download the Bundle

Open a command console, enter your project directory, and execute the
following command to download the latest stable version of this bundle:

```bash
composer require rekalogika/temporary-url-bundle
```

Step 2: Enable the Bundle

Then, enable the bundle by adding it to the list of registered bundles
in the `config/bundles.php` file of your project:

```php title=config/bundles.php
return [
    // ...
    Rekalogika\TemporaryUrl\RekalogikaTemporaryUrlBundle::class => ['all' => true],
];
```

Step 3: Configure the route

Add the route in `config/routes/rekalogika_temporary_url.yaml`.

```yaml title=config/routes/rekalogika_temporary_url.yaml
rekalogika_temporary_url:
    resource: '@RekalogikaTemporaryUrlBundle/config/routes.xml'
    prefix: /_temporary
```

:::note

You may change the prefix if you like.

:::

</TabItem>
</Tabs>

## Creating a Resource Class

Create a class that describes your resource. There is no particular requirement
for this class, except that it must be serializable.

```php
class MyData
{
    public function __construct(private string $name)
    {
    }

    public function getName(): string
    {
        return $this->name;
    }
}
```

:::tip Protip

You can reuse your existing event, message, DTO, value objects, or
other similar classes for this purpose.

:::

## Creating a Resource Server

Then create a server class or method that transforms the resource into an HTTP
response. Use the `AsTemporaryUrlServer` attribute to mark the method as a
temporary URL server. If the attribute is attached to the class, then the method
is assumed to be `__invoke()`. The method must accept the resource as its first
argument, and return a `Response` object.

```php
use Rekalogika\TemporaryUrl\Attribute\AsTemporaryUrlServer;
use Symfony\Component\HttpFoundation\Response;

class MyDataServer
{
    #[AsTemporaryUrlServer]
    public function respond(MyData $data): Response
    {
        return new Response('My name is ' . $data->getName());
    }
}
```

## Generating a Temporary URL

To generate a temporary URL, use the `TemporaryUrlGeneratorInterface` service.

```php
use Rekalogika\TemporaryUrl\TemporaryUrlGeneratorInterface;

/** @var TemporaryUrlGeneratorInterface $temporaryUrlGenerator */

$resource = new MyData('123');
$url = $temporaryUrlGenerator->generateUrl($resource);
```

The `TemporaryUrlGeneratorInterface::generateUrl()` offers additional options:

* `$ttl` (`int` or `DateInterval`): The time-to-live of the URL. Defaults to 30
  minutes.
* `$pinSession` (`bool`): Whether to pin the URL to the session. Pinned URLs can
  only be accessed by the same user that generated them. Defaults to `false`.
* `$referenceType`  (`int`): The type of reference to be generated (one of the
  `UrlGeneratorInterface::ABSOLUTE_*` constants). Defaults to
  `UrlGeneratorInterface::ABSOLUTE_PATH`.

## In Twig Templates

In a Twig template, you can use the filter `temporary_url` to generate a
temporary URL.

```twig
{# my_data here is a resource object #}
<a href="{{ my_data|temporary_url }}">Click here to download my data</a>
```

The filter accepts the same options as the `generateUrl()` method above.

## Dealing With Unserializable Resources

If your resource is not serializable, you can create a resource transformer
method that converts your resource into an intermediate serializable object.

```php
use Rekalogika\TemporaryUrl\Attribute\AsTemporaryUrlResourceTransformer;
use Rekalogika\TemporaryUrl\Attribute\AsTemporaryUrlServer;
use Symfony\Component\HttpFoundation\Response;

class MyDataServer
{
    /**
     * This method transforms the resource into a serializable object.
     */
    #[AsTemporaryUrlResourceTransformer]
    public function transform(MyUnserializableData $data): MySerializableData
    {
        return new MySerializableData($data);
    }

   ./**
      * This uses the transformed data and send it to the client.
      */
    #[AsTemporaryUrlServer]
    public function respond(MySerializableData $data): Response
    {
        return new Response('My name is ' . $data->getName());
    }
}
```

Using the above example, you will be able to generate a temporary URL to
`MyUnserializableData`. The framework will automatically transform
`MyUnserializableData` to `MySerializableData` behind the scenes.