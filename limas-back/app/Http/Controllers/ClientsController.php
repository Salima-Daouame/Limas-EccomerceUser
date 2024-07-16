<?php

namespace App\Http\Controllers;
use App\Http\Requests\ClientRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Models\Client;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;


use Illuminate\Http\Request;

class ClientsController extends Controller
{


    public function store(ClientRequest $request)
    {
        try {
            $validatedData = $request->validated();
            $validatedData['password'] = Hash::make($validatedData['password']);

            if ($request->hasFile('image')) {
                $validatedData['image'] = $request->file('image')->store('client-pictures', 'public');
            } else {
                $validatedData['image'] = 'client/dafaultPic01.jpg';
            }

            Client::create($validatedData);

            return response()->json(['message' => "client successfully created."], 200);
        } catch (\Exception $e) {
            \Log::error('Error creating client: ' . $e->getMessage());
            return response()->json(['message' => "Something went really wrong!", 'error' => $e->getMessage()], 500);
        }
    }
    public function login(Request $req)
    {
        $email = $req->input('email');
        $password = $req->input('password');

        $client = Client::where('email', $email)->first();
        if (!$client || !Hash::check($password, $client->password)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        } else {
            $token = JWTAuth::fromUser($client);

            return response()->json([
                'client_id' => $client->id,
                'email' => $client->email,
                'name' => $client->name,
                'image' => url('storage/' . $client->image),
                'token' => $token,
            ]);
        }
//     public function login(Request $req)
// {
//     $email = $req->input('email');
//     $password = $req->input('password');

//     $client = DB::table('Clients')->where('email', $email)->first();
//     if (!$client || !Hash::check($password, $client->password)) {
//         return response()->json(['error' => 'Invalid credentials'], 401);
//     } else {
//         return response()->json([
//             'client_id' => $client->id,
//             'email' => $client->email,
//             'name' => $client->name,
//             'image' => url('storage/' . $client->image),
//         ]);
//     }
}



        private function uploadImage(ClientRequest $request, array &$formFields)
        {
            unset($formFields['image']);
            if ($request->hasFile('image')) {
                $formFields['image'] = $request->file('image')->store('client', 'public');
            } else {
                $formFields['image'] = 'client/dafaultPic01.jpg';
            }
        }


}
