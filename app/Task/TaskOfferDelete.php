<?php
namespace App\Task;

use App\Models\Task\BlockOffer;
use \Illuminate\Database\QueryException;


class TaskOfferDelete extends TaskApi
{

    public function getJsonString()
    {

        try {

            $Del = BlockOffer::where('id', '=', self::$data['id'])->delete();

            $result = [
                'result' => $Del,
                'id' => self::$data['id'],
                'description' => 'Offer information delete',
                'method' => self::$data['method']
            ];

        } catch (QueryException $e) {

            $result = [
                'result' => 0,
                'id' => self::$data['id'],
                'description' => 'Offer information NOT DELETE',
                'method' => self::$data['method'],
                'error' => $e->getMessage()
            ];

        }

        return json_encode($result);
    }
}
