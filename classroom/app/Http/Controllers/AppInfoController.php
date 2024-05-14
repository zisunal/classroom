<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AppInfo;

class AppInfoController extends Controller
{
    public function index (Request $request) {
        if (!$request->user()->tokenCan('appinfo:read')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        return AppInfo::all()->last();
    }
}
