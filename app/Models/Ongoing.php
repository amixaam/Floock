<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ongoing extends Model
{
    protected $table = 'ongoing';
    use HasFactory;

    protected $fillable = [
        'project_id',
        'user_id',
        'tag_id',
        'name',
        'notes',
        'start_time',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tag()
    {
        return $this->belongsTo(Tag::class);
    }
}
