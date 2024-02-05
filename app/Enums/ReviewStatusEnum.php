<?php

namespace App\Enums;

enum ReviewStatusEnum: string
{
    case Draft = 'draft';
    case Active = 'active';
    case Inactive = 'inactive';
}
