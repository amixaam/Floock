<?php

namespace App\Http\Middleware;

use App\Models\Ongoing;
use App\Models\Project;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        if ($request->user()) {
            $tags = Tag::where('user_id', $request->user()->id)->get();
            $projects = Project::where('user_id', $request->user()->id)->get();
            $options = [];
            foreach ($tags as $tag) {
                $options['tags'][] = [
                    'value' => $tag->id,
                    'label' => $tag->name
                ];
            }
            foreach ($projects as $project) {
                $options['projects'][] = [
                    'value' => $project->id,
                    'label' => $project->name
                ];
            }

            return [
                ...parent::share($request),
                'auth' => [
                    'user' => $request->user(),
                ],
                'options' => $options,
                'ongoing' => Ongoing::where('user_id', $request->user()->id)->first() ?? null,
            ];
        }
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
        ];
    }
}
