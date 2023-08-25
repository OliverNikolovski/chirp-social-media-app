<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreLikeRequest extends FormRequest
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
            'post_id' => [
                'required_without:comment_id',
                'exists:posts,id',
                function ($attribute, $value, $fail) {
                    if ($this->comment_id) {
                        $fail('A like cannot be associated with both a post and a comment.');
                    }
                },
            ],
            'comment_id' => [
                'required_without:post_id',
                'exists:comments,id',
                function ($attribute, $value, $fail) {
                    if ($this->post_id) {
                        $fail('A like cannot be associated with both a post and a comment.');
                    }
                },
            ],
            'type' => ['required']
        ];
    }

}
