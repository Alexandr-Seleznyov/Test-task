<?php

namespace App\Http\Controllers\frontend\Task;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Task\TaskApi;
use App\Models\Task\MainInfo;
use App\Models\Task\BlockService;
use App\Models\Task\BlockOffer;

class AdminController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // ===============================================
        // Полная передача данных странице администратора:
        // ===============================================
        $mainInfo = MainInfo::all();
        $blockService = BlockService::orderBy('order', 'asc')->get();
        $blockOffer = BlockOffer::orderBy('order', 'asc')->get();

        $dirName = dirname(__FILE__)."/../../../../../public/img/task/icons";
        $fileNameAll = scandir($dirName);

        return view('task.admin', [
            'mainInfo' => $mainInfo,
            'blockService' => $blockService,
            'blockOffer' => $blockOffer,
            'fileNameAll' => $fileNameAll
        ]);
        // ===============================================
    }




    public function api($data)
    {
        $taskApi = TaskApi::initial($data);
        Header('Access-Control-Allow-Origin: *');
        echo $taskApi->getJsonString();
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
