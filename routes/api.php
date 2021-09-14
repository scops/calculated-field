<?php

use Illuminate\Support\Facades\Route;

Route::post('/calculate/{resource}/{field}', 'Scops\CalculatedField\Http\Controllers\CalculatedFieldController@calculate');
