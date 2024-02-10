<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {

        $projects = Project::all();

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
