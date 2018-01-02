<?php
namespace App\Task;

use App\Models\Task\BlockOffer;


class TaskOfferID extends TaskApi
{
    public function getJsonString()
    {
        $row = BlockOffer::where('id', '=', self::$data['id'])->get();


        $result = [
            'result' => $row,
            'description' => 'Block offer',
            'method' => self::$data['method']
        ];


        return json_encode($result);
    }
}