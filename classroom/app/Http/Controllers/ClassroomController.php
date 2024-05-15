<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Classroom;

class ClassroomController extends Controller
{
    public function createClass(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'teacher_id' => 'required|integer|exists:users,id'
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()[0]], 400);
        }
        if ($request->user()->tokenCan('class:create')) {
            try {
                $class_code = $this->generateClassCode(7);
                $classroom = new Classroom();
                $classroom->name = $request->name;
                $classroom->teacher_id = $request->teacher_id;
                $classroom->code = $class_code;
                if ($request->has('subject')) {
                    $classroom->subject = $request->subject;
                }
                if ($request->has('section')) {
                    $classroom->section = $request->section;
                }
                if ($request->has('room_no')) {
                    $classroom->room_no = $request->room_no;
                }
                $classroom->save();
                return response()->json(['message' => 'Classroom created'], 201);
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    private function generateClassCode($length) {
        $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        // Check if the class code already exists
        if (Classroom::where('code', $randomString)->exists()) {
            $this->generateClassCode($length);
        }
        return $randomString;
    }

    public function getTeachingClasses(Request $request) {
        $validator = Validator::make($request->all(), [
            'teacher_id' => 'required|integer|exists:users,id'
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()[0]], 400);
        }
        if ($request->user()->tokenCan('class:read')) {
            try {
                $classes = Classroom::where('teacher_id', $request->teacher_id)->get();
                return response()->json(['classes' => $classes], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}
