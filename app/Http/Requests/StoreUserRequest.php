<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'max:255'],
            'username' => ['required', 'min:6', 'max:255', 'unique:users,username'],
            'password' => ['required', 'min:8', 'confirmed'],
            'bio' => ['sometimes', 'min:50'],
            'location' => ['sometimes', 'max:2000'],
            'website' => ['sometimes', 'max:2000'],
            'birthdate' => ['sometimes', 'date'],
            'profile_picture' => ['sometimes', 'image', 'mimes:jpeg,png', 'max:2048']
        ];

    }
}
