<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_health_endpoint_returns_a_json_status(): void
    {
        $this->getJson('/api/health')
            ->assertOk()
            ->assertExactJson(['status' => 'ok']);
    }

    public function test_products_endpoint_returns_a_list_of_products(): void
    {
        Product::query()->create([
            'name' => 'Hrnek z kameniny',
            'slug' => 'hrnek-z-kameniny',
            'description' => 'Ručně glazovaný hrnek.',
            'price' => '490.00',
        ]);

        $this->getJson('/api/products')
            ->assertOk()
            ->assertJsonPath('data.0.slug', 'hrnek-z-kameniny')
            ->assertJsonPath('data.0.price', '490.00');
    }

    public function test_product_endpoint_finds_a_product_by_slug(): void
    {
        Product::query()->create([
            'name' => 'Plátěná taška',
            'slug' => 'platena-taska',
            'description' => 'Pevná látková taška.',
            'price' => '320.00',
        ]);

        $this->getJson('/api/products/platena-taska')
            ->assertOk()
            ->assertJsonPath('data.name', 'Plátěná taška');
    }

    public function test_unknown_product_slug_returns_a_json_404(): void
    {
        $this->getJson('/api/products/unknown-product')
            ->assertNotFound();
    }
}
