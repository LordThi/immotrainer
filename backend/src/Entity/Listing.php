<?php

namespace App\Entity;

use App\Repository\ListingRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ListingRepository::class)]
class Listing
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private int $id;

    #[ORM\Column(length: 255)]
    private string $title;

    #[ORM\Column(length: 100)]
    private string $city;

    #[ORM\Column]
    private float $lat;

    #[ORM\Column]
    private float $lng;

    #[ORM\Column]
    private int $surfaceM2;

    #[ORM\Column]
    private int $price;

    #[ORM\Column(length: 500)]
    private string $imageUrl;

    public function getId(): int { return $this->id; }

    public function getTitle(): string { return $this->title; }
    public function setTitle(string $title): static { $this->title = $title; return $this; }

    public function getCity(): string { return $this->city; }
    public function setCity(string $city): static { $this->city = $city; return $this; }

    public function getLat(): float { return $this->lat; }
    public function setLat(float $lat): static { $this->lat = $lat; return $this; }

    public function getLng(): float { return $this->lng; }
    public function setLng(float $lng): static { $this->lng = $lng; return $this; }

    public function getSurfaceM2(): int { return $this->surfaceM2; }
    public function setSurfaceM2(int $surfaceM2): static { $this->surfaceM2 = $surfaceM2; return $this; }

    public function getPrice(): int { return $this->price; }
    public function setPrice(int $price): static { $this->price = $price; return $this; }

    public function getImageUrl(): string { return $this->imageUrl; }
    public function setImageUrl(string $imageUrl): static { $this->imageUrl = $imageUrl; return $this; }
}