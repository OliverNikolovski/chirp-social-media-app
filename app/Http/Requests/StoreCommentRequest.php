<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCommentRequest extends FormRequest
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
            'text_content' => ['required_without:image', 'string','max:600'],
            'image' => ['required_without:text_content', 'image', 'mimes:jpeg,png', 'max:2048'],
            'post_id' => ['required', 'integer', 'exists:posts,id'],
            'parent_comment_id' => ['sometimes', 'integer', 'exists:comments,id']
        ];
    }
}
