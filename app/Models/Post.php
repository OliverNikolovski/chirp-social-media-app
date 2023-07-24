<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @method static create(array $all)
 * @method static whereIn(string $string, \Closure $param)
 * @property mixed $user_id
 */
class Post extends Model
{
    use HasFactory;

    protected $fillable = ['text_content', 'image', 'user_id', 'post_id', 'comment_id', 'type'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function likes(): HasMany
    {
        return $this->hasMany(Like::class);
    }

    public function shares(): HasMany {
        return $this->hasMany(Post::class);
    }

    public function sharedPost(): BelongsTo {
        return $this->belongsTo(Post::class, 'post_id');
    }

    public function sharedComment(): BelongsTo {
        return $this->belongsTo(Comment::class, 'comment_id');
    }
}
