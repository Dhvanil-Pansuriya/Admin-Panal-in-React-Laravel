<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends ApiController
{
    function getAllUsers()
    {
        $users = User::where('role', '!=', 1)->get();
        return $this->successResponse(["users" => $users], "All users fetched successfully");
    }


    function getAllAdmins()
    {
        $users = User::where('role', '!=', 0)->get();
        return $this->successResponse(["admins" => $users], "All admins fetched successfully");
    }


    function getTotalUsers()
    {
        $total = User::where('role', '!=', 1)->count();

        return $this->successResponse(["totalUsers" => $total], "Total users counting done perfectly", 200);
    }

    function getTotalAdmins()
    {
        $total = User::where('role', '!=', 0)->count();

        return $this->successResponse(["totalAdmins" => $total], "Total admins counting done perfectly", 200);
    }

    function getTotalAdminsAndUsers()
    {
        $total = User::count();
        return $this->successResponse(["totalAdminsAndUsers" => $total], "Total admins & users counting done perfectly", 200);
    }


    public function updateUser(Request $request, $id)
    {
        // Find the user by ID
        $user = User::find($id);

        // Check if user exists
        if (!$user) {
            return $this->errorResponse("User not found", 404);
        }

        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:6|confirmed',
            'role' => 'required|integer',
        ]);

        // Update the user details
        $user->name = $validatedData['name'];
        $user->email = $validatedData['email'];
        if (!empty($validatedData['password'])) {
            $user->password = bcrypt($validatedData['password']);
        }
        $user->role = $validatedData['role'];
        $user->save();

        return $this->successResponse(["user" => $user], "User updated successfully", 200);
    }


    function deleteUserById($id)
    {
        $user = User::find($id);

        if (!$user) {
            return $this->errorResponse("User not found", 404);
        }

        if ($user->role == 1) {
            return $this->errorResponse("You are not allowed to delete this user", 403);
        }

        $user->delete();

        return $this->successResponse($user, "User deleted successfully");
    }



}
