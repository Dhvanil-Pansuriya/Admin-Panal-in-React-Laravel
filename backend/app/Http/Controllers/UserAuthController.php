<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserAuthController extends ApiController
{
    function login(Request $request)
    {

        $request->validate([
            "email" => "required|email",
            "password" => "required"
        ]);

        $user = User::where("email", $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return $this->errorResponse("Provided credentials are incorrect ", 401);
        }

        $token = $user->createToken($user->role)->plainTextToken;
        return $this->successResponse(["token" => $token, "user" => $user], "User login successfully");
    }

    function signup(Request $request)
    {
        $request->validate([
            "name" => "required",
            "email" => "required|email|unique:users",
            "password" => "required|min:6",
            "gender" => "required|in:Male,Female,Other"
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->gender = $request->gender;
        $user->save();

        return $this->successResponse($user, "User created successfully");
    }

}
