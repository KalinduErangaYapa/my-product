<?php

namespace App\Enums;

enum InquiryStatusEnum: string
{
    case NewRequest = 'new request';
    case Read = 'read';
    case Scam = 'scam';
}
