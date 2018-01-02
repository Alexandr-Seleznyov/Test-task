<?php
namespace App\Task;

use App\Models\Task\BlockService;
use \Illuminate\Database\QueryException;


class TaskServiceDelete extends TaskApi
{

    public function getJsonString()
    {

        try {

            $Del = BlockService::where('id', '=', self::$data['id'])->delete();

            $result = [
                'result' => $Del,
                'id' => self::$data['id'],
                'description' => 'Service information deleted',
                'method' => self::$data['method']
            ];

        } catch (QueryException $e) {

            $result = [
                'result' => 0,
                'id' => self::$data['id'],
                'description' => 'Service information NOT DELETED',
                'method' => self::$data['method'],
                'error' => $e->getMessage()
            ];

        }

        return json_encode($result);
    }
}
