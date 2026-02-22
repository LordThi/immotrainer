<?php

namespace App\DataFixtures;

use App\Entity\Listing;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ListingFixtures extends Fixture
{
    private const LISTINGS = [
        ['title' => 'Appartement 45m² centre-ville', 'city' => 'Paris 11e', 'lat' => 48.8627, 'lng' => 2.3799, 'surface' => 45, 'price' => 420000],
        ['title' => 'Studio lumineux', 'city' => 'Paris 18e', 'lat' => 48.8912, 'lng' => 2.3471, 'surface' => 28, 'price' => 220000],
        ['title' => 'T3 avec balcon', 'city' => 'Lyon 6e', 'lat' => 45.7705, 'lng' => 4.8450, 'surface' => 72, 'price' => 380000],
        ['title' => 'Maison 4 pièces avec jardin', 'city' => 'Bordeaux', 'lat' => 44.8471, 'lng' => -0.5765, 'surface' => 110, 'price' => 520000],
        ['title' => 'Appartement vue mer', 'city' => 'Nice', 'lat' => 43.7102, 'lng' => 7.2620, 'surface' => 60, 'price' => 490000],
        ['title' => 'Loft industriel', 'city' => 'Marseille 2e', 'lat' => 43.2965, 'lng' => 5.3702, 'surface' => 95, 'price' => 310000],
        ['title' => 'T2 rénové', 'city' => 'Toulouse', 'lat' => 43.6047, 'lng' => 1.4442, 'surface' => 50, 'price' => 195000],
        ['title' => 'Villa avec piscine', 'city' => 'Cannes', 'lat' => 43.5528, 'lng' => 7.0174, 'surface' => 200, 'price' => 1800000],
        ['title' => 'Appartement haussmannien', 'city' => 'Paris 8e', 'lat' => 48.8752, 'lng' => 2.3089, 'surface' => 120, 'price' => 1950000],
        ['title' => 'Maison de ville', 'city' => 'Nantes', 'lat' => 47.2184, 'lng' => -1.5536, 'surface' => 130, 'price' => 480000],
        ['title' => 'Studio étudiant', 'city' => 'Grenoble', 'lat' => 45.1885, 'lng' => 5.7245, 'surface' => 22, 'price' => 89000],
        ['title' => 'T4 familial', 'city' => 'Strasbourg', 'lat' => 48.5734, 'lng' => 7.7521, 'surface' => 90, 'price' => 320000],
        ['title' => 'Duplex avec terrasse', 'city' => 'Montpellier', 'lat' => 43.6108, 'lng' => 3.8767, 'surface' => 85, 'price' => 340000],
        ['title' => 'Appartement T3 lumineux', 'city' => 'Rennes', 'lat' => 48.1173, 'lng' => -1.6778, 'surface' => 68, 'price' => 255000],
        ['title' => 'Chalet montagne', 'city' => 'Chamonix', 'lat' => 45.9237, 'lng' => 6.8694, 'surface' => 85, 'price' => 920000],
        ['title' => 'Mas provençal', 'city' => 'Aix-en-Provence', 'lat' => 43.5297, 'lng' => 5.4474, 'surface' => 160, 'price' => 780000],
        ['title' => 'Appartement neuf', 'city' => 'Lille', 'lat' => 50.6292, 'lng' => 3.0573, 'surface' => 65, 'price' => 210000],
        ['title' => 'Maison contemporaine', 'city' => 'Biarritz', 'lat' => 43.4832, 'lng' => -1.5586, 'surface' => 140, 'price' => 750000],
        ['title' => 'T2 idéal investissement', 'city' => 'Bordeaux', 'lat' => 44.8378, 'lng' => -0.5792, 'surface' => 42, 'price' => 215000],
        ['title' => 'Appartement T5', 'city' => 'Paris 16e', 'lat' => 48.8637, 'lng' => 2.2769, 'surface' => 150, 'price' => 2400000],
        ['title' => 'Maison avec garage', 'city' => 'Dijon', 'lat' => 47.3220, 'lng' => 5.0415, 'surface' => 105, 'price' => 290000],
        ['title' => 'Appartement vue cathédrale', 'city' => 'Reims', 'lat' => 49.2583, 'lng' => 4.0317, 'surface' => 75, 'price' => 195000],
        ['title' => 'Loft atypique', 'city' => 'Lyon 3e', 'lat' => 45.7579, 'lng' => 4.8345, 'surface' => 100, 'price' => 460000],
        ['title' => 'Pavillon de banlieue', 'city' => 'Versailles', 'lat' => 48.8014, 'lng' => 2.1301, 'surface' => 120, 'price' => 680000],
        ['title' => 'Studio vue port', 'city' => 'La Rochelle', 'lat' => 46.1591, 'lng' => -1.1520, 'surface' => 30, 'price' => 148000],
        ['title' => 'T3 proche gare', 'city' => 'Tours', 'lat' => 47.3941, 'lng' => 0.6848, 'surface' => 65, 'price' => 175000],
        ['title' => 'Belle maison de maître', 'city' => 'Pau', 'lat' => 43.2951, 'lng' => -0.3708, 'surface' => 180, 'price' => 420000],
        ['title' => 'Appartement cosy', 'city' => 'Annecy', 'lat' => 45.8992, 'lng' => 6.1294, 'surface' => 55, 'price' => 370000],
        ['title' => 'T4 avec parking', 'city' => 'Clermont-Ferrand', 'lat' => 45.7772, 'lng' => 3.0870, 'surface' => 88, 'price' => 210000],
        ['title' => 'Maison atypique', 'city' => 'Avignon', 'lat' => 43.9493, 'lng' => 4.8055, 'surface' => 95, 'price' => 310000],
        ['title' => 'Appartement T2 moderne', 'city' => 'Metz', 'lat' => 49.1193, 'lng' => 6.1757, 'surface' => 48, 'price' => 142000],
        ['title' => 'Résidence de standing', 'city' => 'Neuilly-sur-Seine', 'lat' => 48.8848, 'lng' => 2.2699, 'surface' => 90, 'price' => 1100000],
        ['title' => 'Maison de campagne', 'city' => 'Périgueux', 'lat' => 45.1835, 'lng' => 0.7218, 'surface' => 150, 'price' => 195000],
        ['title' => 'Appartement T3 calme', 'city' => 'Poitiers', 'lat' => 46.5802, 'lng' => 0.3404, 'surface' => 70, 'price' => 155000],
        ['title' => 'Duplex neuf', 'city' => 'Nîmes', 'lat' => 43.8367, 'lng' => 4.3601, 'surface' => 80, 'price' => 245000],
        ['title' => 'Maison bord de mer', 'city' => 'Saint-Malo', 'lat' => 48.6493, 'lng' => -2.0257, 'surface' => 90, 'price' => 560000],
        ['title' => 'Studio rénové', 'city' => 'Marseille 13e', 'lat' => 43.3353, 'lng' => 5.4199, 'surface' => 25, 'price' => 72000],
        ['title' => 'Penthouse', 'city' => 'Monaco', 'lat' => 43.7384, 'lng' => 7.4246, 'surface' => 200, 'price' => 4500000],
        ['title' => 'T3 vue montagne', 'city' => 'Chambéry', 'lat' => 45.5646, 'lng' => 5.9178, 'surface' => 72, 'price' => 235000],
        ['title' => 'Maison traditionnelle', 'city' => 'Colmar', 'lat' => 48.0794, 'lng' => 7.3580, 'surface' => 100, 'price' => 320000],
        ['title' => 'Appartement standing', 'city' => 'Sophia Antipolis', 'lat' => 43.6166, 'lng' => 7.0588, 'surface' => 80, 'price' => 420000],
        ['title' => 'T4 avec cave et parking', 'city' => 'Nancy', 'lat' => 48.6921, 'lng' => 6.1844, 'surface' => 92, 'price' => 225000],
        ['title' => 'Appartement vue Saône', 'city' => 'Lyon 2e', 'lat' => 45.7471, 'lng' => 4.8295, 'surface' => 68, 'price' => 395000],
        ['title' => 'Maison avec verger', 'city' => 'Angoulême', 'lat' => 45.6498, 'lng' => 0.1561, 'surface' => 120, 'price' => 185000],
        ['title' => 'T2 hypercentre', 'city' => 'Amiens', 'lat' => 49.8941, 'lng' => 2.2958, 'surface' => 46, 'price' => 128000],
        ['title' => 'Villa contemporaine', 'city' => 'Hyères', 'lat' => 43.1205, 'lng' => 6.1286, 'surface' => 175, 'price' => 890000],
        ['title' => 'Appartement T3 parquet', 'city' => 'Bordeaux', 'lat' => 44.8462, 'lng' => -0.5695, 'surface' => 74, 'price' => 365000],
        ['title' => 'Maison de pêcheur rénovée', 'city' => 'Concarneau', 'lat' => 47.8730, 'lng' => -3.9204, 'surface' => 85, 'price' => 295000],
        ['title' => 'Appartement Montmartre', 'city' => 'Paris 18e', 'lat' => 48.8866, 'lng' => 2.3444, 'surface' => 38, 'price' => 310000],
        ['title' => 'Longère bretonne', 'city' => 'Quimper', 'lat' => 47.9963, 'lng' => -4.0973, 'surface' => 140, 'price' => 245000],
    ];

    private const IMAGES = [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
        'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
    ];

    public function load(ObjectManager $manager): void
    {
        foreach (self::LISTINGS as $i => $data) {
            $listing = new Listing();
            $listing->setTitle($data['title']);
            $listing->setCity($data['city']);
            $listing->setLat($data['lat']);
            $listing->setLng($data['lng']);
            $listing->setSurfaceM2($data['surface']);
            $listing->setPrice($data['price']);
            $listing->setImageUrl(self::IMAGES[$i % count(self::IMAGES)]);
            $manager->persist($listing);
        }

        $manager->flush();
    }
}
