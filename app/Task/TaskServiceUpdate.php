<?php
namespace App\Task;

use App\Models\Task\BlockService;
use \Illuminate\Database\QueryException;


class TaskServiceUpdate extends TaskApi
{
    public function getJsonString()
    {

        try {

            $Updated = BlockService::where('id', self::$data['row']['id'])
                ->update(
                    [
                        'order' => self::$data['row']['order'],
                        'href' => self::$data['row']['href'],
                        'description' => self::$data['row']['description'],
                        'icon' => self::$data['row']['icon']
                    ]);

            $result = [
                'result' => $Updated,
                'description' => 'Service information updated',
                'method' => self::$data['method']
            ];

        } catch (QueryException $e) {

            $result = [
                'result' => 0,
                'description' => 'Service information NOT UPDATE',
                'method' => self::$data['method'],
                'error' => $e->getMessage()
            ];

        }


        return json_encode($result);
    }
}
