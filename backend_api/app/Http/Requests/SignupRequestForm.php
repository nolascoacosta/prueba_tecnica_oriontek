<?php

namespace App\Http\Requests;
use Illuminate\Validation\Rules\Password;

class SignupRequestForm extends ApiFormRequest
{
    public function rules()
    {
        return [
            'email' => 'required|email|unique:users,email|min:5|max:255',
            'password' => [
                'required',
                'string',
                Password::min(8)
                    ->mixedCase()
                    ->letters()
                    ->numbers()
            ],
        ];
    }
}
