<?php

namespace App\Http\Controllers;

use App\Models\Floock;
use App\Models\Ongoing;
use App\Models\Project;
use App\Models\Tag;
use Illuminate\Http\Request;

class FloockController extends Controller
{
    public function create(Request $request)
    {
        if (Ongoing::where('user_id', $request->user_id)->exists()) {
            return redirect()->back()->withErrors(['You already have an ongoing floock']);
        }

        $data = [
            'user_id' => $request->user_id,
            'tag_id' => $request->tag['value'],
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
            Floock::create([
                'project_id' => $ongoing->project_id,
                'user_id' => $ongoing->user_id,
                'tag_id' => $ongoing->tag_id,
                'name' => $ongoing->name,
                'start_time' => $ongoing->start_time,
                'end_time' => now(),
                'duration' => now()->diff($ongoing->start_time),
            ]);
            $ongoing->delete();
        }
    }
}
