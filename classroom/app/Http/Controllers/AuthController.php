<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|max:30',
            'c_password' => 'required|same:password'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 401);
        }
        try {
            $input = $request->all();
            $input['password'] = bcrypt($input['password']);
            $user = User::create($input);
            $success['token'] = $user->createToken('authToken')->plainTextToken;
            $success['name'] = $user->name;
            OtpController::sendOtp($user->id);
            return response()->json(['id' => $user->id], 200);
        } catch (\Exception $e) {
            return response()->json(['Something went wrong'], 402);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|exists:users,email',
            'password' => 'required|string|min:8|max:30'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 401);
        }
        try {
            if (Auth::guard('web')->attempt($request->all())) {
                $user = User::find(Auth::guard('web')->user()->id);
                $success['token'] = explode("|", $user->createToken('authToken', ['user'], now()->addMonth())->plainTextToken)[1];
                $success['user'] = [
                    "id" => $user->id,
                    "name" => $user->name,
                    "email" => $user->email,
                    "email_verified_at" => $user->email_verified_at
                ];
                $success['tokenExpires'] = now()->addMonth();
                
                return response()->json($success, 200);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 402);
        }
        
        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
