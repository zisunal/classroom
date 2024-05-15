<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use App\Models\Otp;
use App\Models\AppInfo;
use App\Models\User;

class OtpController extends Controller
{
    public static function sendOtp(Request $request, $user_id = 0)
    {
        if ($user_id == 0) {
            $user_id = $request->id;
        }
        if ($user_id == 0) {
            return response()->json(['error' => 'User ID is required'], 401);
        }
        $otp = rand(100000, 999999);
        $expires_at = now()->addMinutes(15);
        $otp = Otp::create([
            'user_id' => $user_id,
            'otp' => $otp,
            'expires_at' => $expires_at
        ]);
        try {
            $user = $otp->user;
            $app_info = AppInfo::first();
            Mail::send('emails.otp', ['otp' => $otp->otp, 'expires' => $otp->expires_at, 'app_info' => $app_info], function ($message) use ($user) {
                $message->to($user->email, $user->name)->subject('OTP for account verification');
            });
            return response()->json(['message' => 'OTP sent'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong'], 402);
        }
    }
    public function verify(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'otp' => 'required|numeric'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 401);
        }
        $otp = Otp::where('user_id', $request->user_id)
            ->where('otp', $request->otp)
            ->where('expires_at', '>=', now())
            ->where('is_used', false)
            ->first();
        if ($otp) {
            $otp->update(['is_used' => true]);
            User::where('id', $request->user_id)->update(['email_verified_at' => date('Y-m-d H:i:s')]);
            return response()->json(['message' => 'OTP verified'], 200);
        }
        return response()->json(['error' => 'Invalid OTP'], 401);
    }
}
