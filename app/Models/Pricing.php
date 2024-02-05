<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pricing extends Model
{
    use HasFactory;

    protected $fillable = ['product_id', 'device_id', 'repair_type_id', 'price', 'status'];

    protected $appends = ['repair_name'];

    /**
     * Method device
     *
     * @return void
     */
    public function device()
    {
        return $this->belongsTo(Device::class, 'device_id');
    }
    /**
     * Method repair
     *
     * @return void
     */
    public function repair()
    {
        return $this->belongsTo(RepairType::class, 'repair_type_id');
    }

    /**
     * Method getRepairNameAttribute
     *
     * @return void
     */
    public function getRepairNameAttribute()
    {
        return $this->repair?->name;
    }
}
