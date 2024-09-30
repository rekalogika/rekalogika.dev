---
title: Mapping DateTime
---

This chapter describes how to do a mapping involving `DateTime` objects.

## Supported Transformations

Supported target type-hints are `DateTimeInterface`, `DateTimeImmutable`,
`DateTime` and Symfony `DatePoint`. Mapper supports transformation among these
objects, and also to & from string, integer, and float.

To perform the transformation, Mapper will convert the source value to an
intermediate Symfony `DatePoint` object. Then it will transform the intermediate
object into the target type.

## Changing the Time Zone

By default, Mapper will leave the time zone alone. If the data does not have the
time zone (e.g. when the string representation does not have the time zone), it
uses the system time zone.

To change the time zone, use the `#[DateTimeOptions]` attribute on the property:

```php
use Rekalogika\Mapper\Attribute\DateTimeOptions;

class SomeObject
{
    #[DateTimeOptions(timeZone: 'Asia/Jakarta')]
    public \DateTimeInterface $someDate;
}
```

If it is on the source side, Mapper will convert the source value to the
specified time zone. Or, if the source does not have time zone information,
Mapper will assume the source is already in the specified time zone.

If it is on the target side, Mapper will convert the incoming date time object
to the specified time zone.

## Changing the Format

If the mapping involves string, float, or integer, you can specify the format
using the `#[DateTimeOptions]` attribute:

```php
use Rekalogika\Mapper\Attribute\DateTimeOptions;

class SomeObject
{
    #[DateTimeOptions(format: 'Y-m-d H:i:s', timeZone: 'Asia/Pontianak')]
    public string $someDate;
}
```

It will work as anyone would expect. At the source side, Mapper will assume the
string is in the specified format. At the target side, Mapper will transform to
the target using the specified format.

:::note

Without `DateTimeOptions`, a source date time will be passed as is to the
`DatePoint` constructor, and will be automatically detected. At the target
side, the string will be formatted as `DateTimeInterface::ATOM` by default.

Date time in integer or float is assumed to be in Unix time.

:::

## Some Examples

```php
use Rekalogika\Mapper\Attribute\DateTimeOptions;

class SomeObject
{
    #[DateTimeOptions(format: 'Ymd', timeZone: 'Asia/Jayapura')]
    public int $YYYYMMDDinInteger;

    #[DateTimeOptions(format: 'd-m-y')]
    public string $DDMMYYinString;
}       