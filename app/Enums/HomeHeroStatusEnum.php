<?php

namespace App\Enums;

enum HomeHeroStatusEnum: string
{
    case Draft = 'draft';
    case Active = 'active';
    case Inactive = 'inactive';
}
