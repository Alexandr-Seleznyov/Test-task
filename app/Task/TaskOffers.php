<?php
namespace App\Task;

use App\Models\Task\BlockOffer;


class TaskOffers extends TaskApi
{
    public function getJsonString()
    {
        $discr = 'Array - Blocks offer';


        if (array_key_exists('limit', self::$data) &&
                is_int(self::$data['limit']) &&
                self::$data['limit'] > 0) {

            $limit = self::$data['limit'];

        } else {
            $limit = 0;
            $discr = 'Error: "The argument \'limit\' is not a positive and integer"';
        }


        if (array_key_exists('offset', self::$data) &&
                is_int(self::$data['offset']) &&

                self::$data['offset'] > 0) {

            $offset = self::$data['offset'];
        } else {

            $offset = 0;
            $discr = 'Warning: "The argument \'offset\' is not a positive and integer"';
        }


        if ($limit === 0) {

            $rows = BlockOffer::select('id', 'order', 'href', 'title','description', 'icon')
                ->orderBy('order', 'asc')
                ->get();

        } else {

            $rows = BlockOffer::select('id', 'order', 'href', 'title','description', 'icon')
                ->orderBy('order', 'asc')
                ->skip($offset) // OFFSET
                ->take($limit) // LIMIT
                ->get();

        }

        $result = [
            'result' => $rows,
            'description' => $discr,
            'limit' => $limit,
            'method' => self::$data['method']
        ];

        return json_encode($result);
    }
}
