<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class SendEmailController extends Controller
{
    public function sendContactForm(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'subject' => 'required',
            'message' => 'required',
        ]);

        $details = [
            'name' => $request->name,
            'email' => $request->email,
            'subject' => $request->subject,
            'message' => $request->message,
        ];

        Mail::raw($details['message'], function ($message) use ($details) {
            $message->from($details['email'], $details['name'])
                    ->replyTo($details['email'], $details['name'])
                    ->to(env('MAIL_USERNAME'))
                    ->subject($details['subject']);
        });

        return response()->json(['message' => 'Email sent successfully']);
    }
}
