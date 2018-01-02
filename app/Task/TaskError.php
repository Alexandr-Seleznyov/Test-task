<?php
namespace App\Task;

class TaskError extends TaskApi
{
    public function getJsonString()
    {
        $result = [
            'result' => null,
            'description' => 'Error: The method does not exist',
            'method' => self::$data['method']
        ];

        return json_encode($result);
    }
}
