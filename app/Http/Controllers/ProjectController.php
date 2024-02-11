<?php

namespace App\Http\Controllers;

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
    protected function formatMinutesToTime($minutes)
    {
        // TODO: once floocks can be started and stopped, change how 'length' is stored to a full time diff, not diff in minutes
        $hours = floor($minutes / 60);
        $minutes = $minutes % 60;
        $seconds = 0; // Set seconds to 0 if not tracked
        return sprintf("%02d:%02d:%02d", $hours, $minutes, $seconds);
    }

    public function index()
    {
        $projects = Project::with('floocks:project_id,length')
            ->where('user_id', auth()->user()->id)
            ->select('id', 'name', 'status', 'created_at')
            ->get();


        foreach ($projects as $project) {
            $project['total_time'] = $this->formatMinutesToTime($project->floocks->sum('length'));
            $formattedDate = Carbon::parse($project->created_at)->format('d/m/Y');
            $project['formatted_date'] = $formattedDate;
        }

        return Inertia::render('Projects/All', [
            'projects' =>  $projects,
        ]);
    }

    public function view(Project $project)
    {
        return Inertia::render('Projects/View', [
            'project' => $project,
        ]);
    }

    public function update(Project $project, Request $request)
    {
        $project->update($request->all());

        return redirect()->route('projects.view', $project);
    }
}
