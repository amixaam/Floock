<?php

namespace App\Http\Middleware;

use App\Models\Project;
use App\Models\Tag;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class SharePropsWithInertia
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        if ($user) {
            $tags = Tag::where('user_id', $user->id)->get();
            Inertia::share('tags', $tags);
        }

        // dd($user);
        return $next($request);
    }
}
