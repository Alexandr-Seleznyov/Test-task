<?php
namespace App\Task;

use App\Models\Task\BlockService;


class TaskTotalService extends TaskApi
{
    public function getJsonString()
    {
        $total = BlockService::count();

        $result = [
            'result' => $total,
            'description' => 'Title blocks service',
            'method' => self::$data['method']
        ];

        return json_encode($result);
    }
}
