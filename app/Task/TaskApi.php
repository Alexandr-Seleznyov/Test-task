<?php
namespace App\Task;


abstract class TaskApi
{
    protected static $data;

    public static function initial($data)
    {
        self::$data = $data;
        $className = null;

        // Формируем имя класса
        switch ($data['method'])
        {
            //================================================
            // MAIN
            //================================================
            case 'getMainInfo':
                $className = 'TaskMainInfo';
                break;
            case 'setMainInfo':
                $className = 'TaskMainInfoUpdate';
                break;

            //================================================
            // SERVICE
            //================================================
            case 'getServices':
                $className = 'TaskServices';
                break;
            case 'getServicesID':
                $className = 'TaskServiceID';
                break;
            case 'getTotalService':
                $className = 'TaskTotalService';
                break;
            case 'setService':
                $className = 'TaskServiceUpdate';
                break;
            case 'addService':
                $className = 'TaskServiceInsert';
                break;
            case 'removeServiceID':
                $className = 'TaskServiceDelete';
                break;

            //================================================
            // OFFER
            //================================================
            case 'getOffers':
                $className = 'TaskOffers';
                break;
            case 'getOfferID':
                $className = 'TaskOfferID';
                break;
            case 'getTotalOffer':
                $className = 'TaskTotalOffer';
                break;
            case 'setOffer':
                $className = 'TaskOfferUpdate';
                break;
            case 'addOffer':
                $className = 'TaskOfferInsert';
                break;
            case 'removeOfferID':
                $className = 'TaskOfferDelete';
                break;

            default:
                $className = 'TaskError';
        }

        return new $className();
    }

    abstract public function getJsonString();
}
