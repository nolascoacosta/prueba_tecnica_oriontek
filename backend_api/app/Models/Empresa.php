<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
/** Representa una Empresa en la base de datos.
 *
 * @property int            $id
 * @property int            $user_id
 * @property string         $nombre
 * @property string         $telefono
 * @property Carbon         $created_at
 * @property Carbon         $updated_at
 * @package App\Models
 */

class Empresa extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     *  @var string[]
     */
    protected $fillable = [
        'user_id',
        'nombre',
        'telefono',
    ];
}
