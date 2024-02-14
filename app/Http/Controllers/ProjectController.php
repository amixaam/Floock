<?php

namespace App\Http\Controllers;

use App\Models\Floock;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

use function Pest\Laravel\json;
use Carbon\Carbon;
use DateInterval;
use DateTime;

class ProjectController extends Controller
{

    public function index()
    {
        $projects = Project::with('floocks:project_id,length')
            ->where('user_id', auth()->user()->id)
            ->select('id', 'name', 'status', 'created_at')
            ->get();


        foreach ($projects as $project) {
            $length = $project->floocks->sum('length');
            $project['total_time'] = Carbon::parse($length)->format('H:i:s');

            $project['formatted_date'] = Carbon::parse($project['created_at'])->format('d-m-Y');
        }

        return Inertia::render('Projects/All', [
            'projects' =>  $projects,
        ]);
    }

    public function view(Project $project)
    {
        $floocks = Floock::where('project_id', $project->id)
            ->orderBy('start_time', 'desc')
            ->get();

        foreach ($floocks as $floock) {
            $floock['formatted_time'] = Carbon::parse($floock->length)->format('H:i:s');
            $floock['formatted_interval'] =
                Carbon::parse($floock->start_time)->format('d/m/Y - H:i A') . " - " . Carbon::parse($floock->end_time)->format('H:i A');
        }

        return Inertia::render('Projects/View', [
            'project' => $project,
            'floocks' => $floocks,
        ]);
    }

    public function update(Project $project, Request $request)
    {
        $project->update($request->all());

        return redirect()->route('projects.view', $project);
    }
}
