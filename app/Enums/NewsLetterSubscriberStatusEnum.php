<?php

namespace App\Enums;

enum NewsLetterSubscriberStatusEnum: string
{
    case Active = 'active';
    case Unsubscribed = 'unsubscribed';
}
