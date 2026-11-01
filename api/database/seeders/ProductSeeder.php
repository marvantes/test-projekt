<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Hrnek z kameniny',
                'slug' => 'hrnek-z-kameniny',
                'description' => 'Ručně glazovaný hrnek na každodenní kávu nebo čaj.',
                'price' => '490.00',
            ],
            [
                'name' => 'Plátěná taška',
                'slug' => 'platena-taska',
                'description' => 'Pevná látková taška na nákup i věci na cesty.',
                'price' => '320.00',
            ],
            [
                'name' => 'Lněný zápisník',
                'slug' => 'lneny-zapisnik',
                'description' => 'Zápisník s deskami z přírodního lnu a čistými stránkami.',
                'price' => '260.00',
            ],
        ];

        foreach ($products as $product) {
            Product::updateOrCreate(
                ['slug' => $product['slug']],
                $product,
            );
        }
    }
}
