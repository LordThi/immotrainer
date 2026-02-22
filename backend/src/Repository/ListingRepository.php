<?php

namespace App\Repository;

use App\Entity\Listing;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class ListingRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Listing::class);
    }

    public function findRandom(int $count): array
    {
        $conn = $this->getEntityManager()->getConnection();
        $ids = $conn->fetchFirstColumn(
            'SELECT id FROM listing ORDER BY RAND() LIMIT ' . (int) $count
        );

        return $this->findBy(['id' => $ids]);
    }
}