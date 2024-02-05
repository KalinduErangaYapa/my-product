<?php

namespace App\Enums;

enum RepairTypeStatusEnum: string
{
    case Draft = 'draft';
    case Active = 'active';
    case Inactive = 'inactive';
}
