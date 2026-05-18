<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ResumeController;
use App\Http\Controllers\Api\TemplateController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AIController;
use App\Http\Controllers\Api\ContactController;
Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::post('/resume/create', [ResumeController::class, 'createResume']);

Route::get('/resumes', [ResumeController::class, 'getResumes']);

Route::get('/resume/{id}', [ResumeController::class, 'getResume']);

Route::put('/resume/update/{id}', [ResumeController::class, 'updateResume']);

Route::delete('/resume/delete/{id}', [ResumeController::class, 'deleteResume']);
Route::get('/public/resume/{shareLink}', [ResumeController::class, 'publicResume']);
Route::get('/resume/download/{id}', [ResumeController::class, 'downloadResume']);
// TEMPLATE ROUTES
Route::post('/template/create', [TemplateController::class, 'createTemplate']);

Route::get('/templates', [TemplateController::class, 'getTemplates']);

Route::get('/templates/industry/{industry}', [TemplateController::class, 'getTemplatesByIndustry']);
// ADMIN ROUTES
Route::put('/admin/verify-user/{id}', [AdminController::class, 'verifyUser']);

Route::get('/admin/pending-users', [AdminController::class, 'pendingUsers']);
Route::post('/ai/generate-summary', [AIController::class, 'generateSummary']);
Route::post('/ai/suggest-skills', [AIController::class, 'suggestSkills']);
Route::post('/ai/suggest-projects', [AIController::class, 'suggestProjects']);
Route::post('/ai/review-resume', [AIController::class, 'reviewResume']);
Route::middleware('role:recruiter')->group(function () {

    Route::get('/recruiter/search-resumes', [ResumeController::class, 'searchPublicResumes']);

});
Route::post('/contact/send', [ContactController::class, 'sendRequest']);
Route::get('/contact/requests', [ContactController::class, 'getRequests']);