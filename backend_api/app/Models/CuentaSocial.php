<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
/** Representa una CuentaSocial en la base de datos.
 *
 * @property int            $id
 * @property int            $user_id
 * @property int            $social_id
 * @property string         $social_proveedor
 * @property string         $social_nombre
 * @property Carbon         $created_at
 * @property Carbon         $updated_at
 * @package App\Models
 */
class CuentaSocial extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'social_id',
        'social_proveedor',
        'social_nombre',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
