<?php

use Illuminate\Http\Request;
use App\Http\Controllers\frontend\Task\AdminController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('api')->post('', function (Request $request) {

    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);
    $ac = new AdminController();
    $ac->api($data);
});


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
