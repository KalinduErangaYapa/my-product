<?php

namespace App\Enums;

enum BookingStatusEnum: string
{
    case Draft = 'draft';
    case Active = 'active';
    case Solving = 'solving';
    case Solved = 'solved';
    case Rejected = 'rejected';
}
