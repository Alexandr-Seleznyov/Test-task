<?php
namespace App\Task;

use App\Models\Task\BlockOffer;
use \Illuminate\Database\QueryException;


class TaskOfferUpdate extends TaskApi
{
    public function getJsonString()
    {

        try {

            $Updated = BlockOffer::where('id', self::$data['row']['id'])
                ->update(
                    [
                        'order' => self::$data['row']['order'],
                        'href' => self::$data['row']['href'],
                        'title' => self::$data['row']['title'],
                        'description' => self::$data['row']['description'],
                        'icon' => self::$data['row']['icon']
                    ]);

            $result = [
                'result' => $Updated,
                'description' => 'Offer information updated',
                'method' => self::$data['method']
            ];

        } catch (QueryException $e) {

            $result = [
                'result' => 0,
                'description' => 'Offer information NOT UPDATE',
                'method' => self::$data['method'],
                'error' => $e->getMessage()
            ];

        }


        return json_encode($result);
    }
}
