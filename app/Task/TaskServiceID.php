<?php
namespace App\Task;

use App\Models\Task\BlockService;


class TaskServiceID extends TaskApi
{
    public function getJsonString()
    {
        $row = BlockService::where('id', '=', self::$data['id'])->get();


        $result = [
            'result' => $row,
            'description' => 'Block service',
            'method' => self::$data['method']
        ];


        return json_encode($result);
    }
}