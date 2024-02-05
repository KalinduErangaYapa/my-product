<?php

namespace App\Http\Traits;

use Illuminate\Support\Arr;

trait UtilityTrait
{

    /**
     * Method enumToArray
     *
     * @param mixed $enum [explicite description]
     *
     * @return array
     */
    public function enumToArray($enum): array
    {

        return Arr::map($enum, fn ($enum) => $enum->value);
    }
    /**
     * Method enumToSelect
     *
     * @param array $enum [explicite description]
     *
     * @return array
     */
    public function enumToSelect($enum): array
    {
        $arr = [];
        foreach ($this->enumToArray($enum) as $key => $value) {
            $arr[] = ['value' => $value, 'label' => ucwords($value)];
        }
        return $arr;
    }
}
