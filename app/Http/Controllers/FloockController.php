<?php

namespace App\Http\Controllers;

use App\Models\Floock;
use App\Models\Ongoing;
use App\Models\Project;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FloockController extends Controller
{
    public function create(Request $request)
    {
        if (Ongoing::where('user_id', $request->user_id)->exists()) {
            return Inertia::render('YourComponent', [
                'errors' => ['You already have a floock running.']
            ])->withViewData(['title' => 'Error']);
        }
        if (!isset($request->project['value'])) {
            return Inertia::render('YourComponent', [
                'errors' => ['No project selected.']
            ])->withViewData(['title' => 'Error']);
        }
        if (!isset($request->name)) {
            return Inertia::render('YourComponent', [
                'errors' => ['Name your Floock.']
            ])->withViewData(['title' => 'Error']);
        }

        //validate errors
        $data = [
            'user_id' => $request->user_id,
            'tag_id' => isset($request->tag['value']) ? $request->tag['value'] : null,
            'project_id' => $request->project['value'],
            'name' => $request->name,
            'start_time' => now(),
        ];

        if (isset($request->tag['__isNew__'])) {
            $newTag = Tag::create([
                'name' => $request->tag['value'],
                'user_id' => $request->user_id,

            ]);
            $data['tag_id'] = $newTag->id;
        }
        if (isset($request->project['__isNew__'])) {
            $newProject = Project::create([
                'name' => $request->project['value'],
                'user_id' => $request->user_id,
            ]);
            $data['project_id'] = $newProject->id;
        }

        Ongoing::create($data);
    }

    public function finish()
    {
        $ongoing = Ongoing::where('user_id', auth()->user()->id)->first();
        if ($ongoing) {
            $lengthInSeconds = now()->diffInSeconds($ongoing->start_time);

            Floock::create([
                'project_id' => $ongoing->project_id,
                'user_id' => $ongoing->user_id,
                'tag_id' => $ongoing->tag_id,
                'name' => $ongoing->name,
                'start_time' => $ongoing->start_time,
                'end_time' => now(),
                'length' => $lengthInSeconds,
            ]);
            $ongoing->delete();
        }
    }
}
