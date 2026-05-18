<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Template;

class TemplateController extends Controller
{
    // CREATE TEMPLATE
    public function createTemplate(Request $request)
    {
        $template = Template::create([

            'name' => $request->name,

            'industry' => $request->industry,

            'layout' => $request->layout,

            'colors' => $request->colors,

            'preview_image' => $request->preview_image,

            'sections' => $request->sections

        ]);

        return response()->json([

            'message' => 'Template Created',

            'template' => $template

        ]);
    }

    // GET ALL TEMPLATES
    public function getTemplates()
    {
        return response()->json(

            Template::all()

        );
    }

    // FILTER BY INDUSTRY
    public function getTemplatesByIndustry($industry)
    {
        $templates = Template::where(

            'industry',
            $industry

        )->get();

        return response()->json($templates);
    }
}