<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    function successResponse($data, $message = "Success", $success = true, $status = 200)
    {
        return response()->json([
            'message' => $message,
            'success' => $success,
            'data' => $data,
        ], $status);
    }

    function errorResponse($message = "Error", $error = true, $status = 400)
    {
        return response()->json([
            'message' => $message,
            'error' => $error
        ], $status);
    }
}
