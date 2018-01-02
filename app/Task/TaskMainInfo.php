<?php
namespace App\Task;

use App\Models\Task\MainInfo;

// ================================
// Надо протестить !!!
// ================================
class TaskMainInfo extends TaskApi
{
    public function getJsonString()
    {

        $rows = MainInfo::all();

        $result = [
            'result' => $rows,
            'description' => 'Main information',
            'method' => self::$data['method']
        ];

        return json_encode($result);
    }
}
