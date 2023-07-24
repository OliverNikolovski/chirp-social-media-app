<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePostRequest extends FormRequest
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
            'type' => [
                'required',
                Rule::in(['p', 's']),
            ],
            'text_content' => [
                Rule::when($this->type === 'p', ['required_without:image', 'string', 'max:600']),
            ],
            'image' => [
                Rule::when($this->type === 'p', ['required_without:text_content', 'image', 'mimes:jpeg,png', 'max:2048']),
            ],
            'post_id' => [
                Rule::when($this->type === 's', ['required_without:comment_id', 'integer', 'exists:posts,id'])
            ],
            'comment_id' => [
                Rule::when($this->type === 's', ['required_without:post_id', 'integer', 'exists:comments,id'])
            ]
        ];
    }
}
