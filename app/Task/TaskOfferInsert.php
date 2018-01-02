<?php
namespace App\Task;

use App\Models\Task\BlockOffer;
use \Illuminate\Database\QueryException;


class TaskOfferInsert extends TaskApi
{
    public function getJsonString()
    {

        try {

            $Inserted = BlockOffer::insertGetId(
                    [
                        'order' => self::$data['row']['order'],
                        'href' => self::$data['row']['href'],
                        'title' => self::$data['row']['title'],
                        'description' => self::$data['row']['description'],
                        'icon' => self::$data['row']['icon']
                    ]);

            $result = [
                'result' => $Inserted,
                'description' => 'Offer information inserted',
                'method' => self::$data['method']
            ];

        } catch (QueryException $e) {

            $result = [
                'result' => 0,
                'description' => 'Offer information NOT INSERT',
                'method' => self::$data['method'],
                'error' => $e->getMessage()
            ];

        }


        return json_encode($result);
    }
}
