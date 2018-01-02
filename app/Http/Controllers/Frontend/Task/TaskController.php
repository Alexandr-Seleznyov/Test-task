<?php
namespace App\Http\Controllers\frontend\Task;

use App\Http\Controllers\Controller;
use App\Models\Task\MainInfo;


/**
 * Class TaskController.
 */
class TaskController extends Controller
{
    /**
     * @return \Illuminate\View\View
     */
    public function index()
    {

        // Передадим только SEO данные, остальные будут приходить по требованию Ajax
        $mainInfo = MainInfo::select(
            'title',
            'keywords',
            'description',
            'service_title',
            'service_description_1',
            'service_description_2',
            'offer_title')
            ->get();

        return view('task.index', ['mainInfo' => $mainInfo]);
    }
}
