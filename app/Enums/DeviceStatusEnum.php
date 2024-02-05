<?php

namespace App\Enums;

enum DeviceStatusEnum: string
{
    case Draft = 'draft';
    case Active = 'active';
    case Inactive = 'inactive';
}
