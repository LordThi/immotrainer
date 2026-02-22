<?php

namespace App\Controller;

use App\Repository\ListingRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api')]
class ListingController extends AbstractController
{
    #[Route('/listings/random', methods: ['GET'])]
    public function random(Request $request, ListingRepository $repository): JsonResponse
    {
        $count = min((int) $request->query->get('count', 5), 10);
        $listings = $repository->findRandom($count);

        $data = array_map(fn($l) => [
            'id'        => $l->getId(),
            'title'     => $l->getTitle(),
            'city'      => $l->getCity(),
            'lat'       => $l->getLat(),
            'lng'       => $l->getLng(),
            'surfaceM2' => $l->getSurfaceM2(),
            'imageUrl'  => $l->getImageUrl(),
        ], $listings);

        return $this->json($data);
    }

    #[Route('/guess', methods: ['POST'])]
    public function guess(Request $request, ListingRepository $repository): JsonResponse
    {
        $body = json_decode($request->getContent(), true);

        $listingId  = $body['listingId'] ?? null;
        $guessPrice = $body['guessPrice'] ?? null;

        if (!$listingId || !$guessPrice || $guessPrice <= 0) {
            return $this->json(['error' => 'Invalid payload'], 400);
        }

        $listing = $repository->find($listingId);

        if (!$listing) {
            return $this->json(['error' => 'Listing not found'], 404);
        }

        $actual       = $listing->getPrice();
        $delta        = abs($guessPrice - $actual) / $actual;
        $deltaPercent = round($delta * 100, 2);
        $score        = max(0, (int) round(1000 * (1 - $delta)));

        return $this->json([
            'actualPrice'  => $actual,
            'deltaPercent' => $deltaPercent,
            'score'        => $score,
        ]);
    }
}