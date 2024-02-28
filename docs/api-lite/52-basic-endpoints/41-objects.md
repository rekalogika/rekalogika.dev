---
title: Objects Used in the Examples
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="tab" groupId="api">

<TabItem value="book" label="Book">

```php title="src/Entity/Book.php"
namespace App\Entity;

use App\Repository\BookRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: BookRepository::class)]
class Book extends \stdClass
{
    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true, nullable: false)]
    private Uuid $id;

    #[ORM\Column]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column(type: Types::DATETIME_IMMUTABLE, nullable: true)]
    private ?\DateTimeInterface $lastChecked = null;

    /**
     * @var Collection<array-key,Review>
     */
    #[ORM\OneToMany(
        targetEntity: Review::class,
        mappedBy: 'book',
        cascade: ['persist', 'remove'],
        orphanRemoval: true,
        fetch: 'EXTRA_LAZY',
        indexBy: 'id',
    )]
    private Collection $reviews;

    public function __construct()
    {
        $this->id = Uuid::v7();
        $this->reviews = new ArrayCollection();
    }

    /**
     * We want to check our books' conditions every now and then.
     */
    public function check(): void
    {
        $this->lastChecked = new \DateTimeImmutable();
    }

    public function getId(): Uuid
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<array-key,Review>
     */
    public function getReviews(): Collection
    {
        return $this->reviews;
    }

    public function addReview(Review $review): self
    {
        if (!$this->reviews->contains($review)) {
            $this->reviews[] = $review;
            $review->setBook($this);
        }

        return $this;
    }

    public function removeReview(Review $review): self
    {
        if ($this->reviews->removeElement($review)) {
            // set the owning side to null (unless already changed)
            if ($review->getBook() === $this) {
                $review->setBook(null);
            }
        }

        return $this;
    }

    public function getLastChecked(): ?\DateTimeInterface
    {
        return $this->lastChecked;
    }
}
```

</TabItem>

<TabItem value="review" label="Review">

```php title="src/Entity/Review.php"
namespace App\Entity;

use App\Repository\ReviewRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: ReviewRepository::class)]
class Review
{
    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true, nullable: false)]
    private Uuid $id;

    /**
     * @var int<1,5>
     */
    #[ORM\Column]
    private int $rating = 3;

    #[ORM\Column]
    private ?string $body = null;

    #[ORM\ManyToOne(
        targetEntity: Book::class,
        inversedBy: 'reviews',
    )]
    private ?Book $book = null;

    public function __construct()
    {
        $this->id = Uuid::v7();
    }


    public function getId(): Uuid
    {
        return $this->id;
    }

    public function getBook(): ?Book
    {
        return $this->book;
    }

    public function setBook(?Book $book): self
    {
        $this->book = $book;

        return $this;
    }

    public function getBody(): ?string
    {
        return $this->body;
    }

    public function setBody(?string $body): self
    {
        $this->body = $body;

        return $this;
    }

    /**
     * @return int<1,5>
     */
    public function getRating(): int
    {
        return $this->rating;
    }

    /**
     * @param int<1,5> $rating
     */
    public function setRating(int $rating): self
    {
        $this->rating = $rating;

        return $this;
    }
}
```

</TabItem>

<TabItem value="bookdto" label="BookDto">

```php title="src/ApiResource/Admin/BookDto.php"
namespace App\ApiResource\Admin;

use Rekalogika\Mapper\CollectionInterface;
use Symfony\Component\Uid\Uuid;

class BookDto
{
    public ?Uuid $id = null;
    public ?string $title = null;
    public ?string $description = null;
    public ?\DateTimeInterface $lastChecked = null;

    /**
     * @var ?CollectionInterface<int,ReviewDto>
     */
    public ?CollectionInterface $reviews = null;
}
```

</TabItem>

<TabItem value="reviewdto" label="ReviewDto">

```php title="src/ApiResource/Admin/ReviewDto.php"
namespace App\ApiResource\Admin;

use Symfony\Component\Uid\Uuid;

class ReviewDto
{
    public ?Uuid $id = null;
    public ?string $body = null;

    /**
     * @var int<1,5>|null
     */
    public ?int $rating = null;
    public ?BookDto $book = null;
}
```

</TabItem>

</Tabs>