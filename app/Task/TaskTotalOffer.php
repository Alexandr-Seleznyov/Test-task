<?php
namespace App\Task;

use App\Models\Task\BlockOffer;


class TaskTotalOffer extends TaskApi
{
    public function getJsonString()
    {
        $total = BlockOffer::count();

        $result = [
            'result' => $total,
            'description' => 'Title blocks offer',
            'method' => self::$data['method']
        ];

        return json_encode($result);
    }
}
