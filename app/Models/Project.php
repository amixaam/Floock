<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'user_id',
        'status',
        'priority',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function flocks()
    {
        return $this->hasMany(Floock::class);
    }

    public function ongoingActivities()
    {
        return $this->hasMany(Ongoing::class);
    }
}
