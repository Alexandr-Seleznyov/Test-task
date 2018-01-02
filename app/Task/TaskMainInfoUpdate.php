<?php
namespace App\Task;

use App\Models\Task\MainInfo;
use \Illuminate\Database\QueryException;


class TaskMainInfoUpdate extends TaskApi
{
    public function getJsonString()
    {

        try {

            $Updated = MainInfo::where('id', self::$data['row']['id'])
                ->update(
                    [
                        'title' => self::$data['row']['title'],
                        'keywords' => self::$data['row']['keywords'],
                        'description' => self::$data['row']['description'],
                        'service_title' => self::$data['row']['service_title'],
                        'service_description_1' => self::$data['row']['service_description_1'],
                        'service_description_2' => self::$data['row']['service_description_2'],
                        'offer_title' => self::$data['row']['offer_title']
                    ]);

            $result = [
                'result' => $Updated,
                'description' => 'Main information updated',
                'method' => self::$data['method']
            ];

        } catch (QueryException $e) {

            $result = [
                'result' => 0,
                'description' => 'Main information NOT UPDATE',
                'method' => self::$data['method'],
                'error' => $e->getMessage()
            ];

        }

        return json_encode($result);
    }
}
