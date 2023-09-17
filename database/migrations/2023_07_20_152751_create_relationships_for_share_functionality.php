<?php

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->unsignedBigInteger('post_id')->nullable();
            $table->unsignedBigInteger('comment_id')->nullable();
        });

        Schema::table('posts', function (Blueprint $table) {
            $table->foreign('post_id', 'posts_post_id_foreign')->references('id')->on('posts')->onDelete('cascade');
            $table->foreign('comment_id', 'posts_comment_id_foreign')->references('id')->on('comments')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropForeign('posts_post_id_foreign');
            $table->dropForeign('posts_comment_id_foreign');
            $table->dropColumn(['post_id', 'comment_id']);
        });
    }

};
