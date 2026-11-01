<?php

use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Route;

Route::get('/health', static fn (): JsonResponse => response()->json([
    'status' => 'ok',
]));

Route::apiResource('products', ProductController::class)
    ->only(['index', 'show']);
