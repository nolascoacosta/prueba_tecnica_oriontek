<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
/** Representa una Direccion en la base de datos.
 *
 * @property int            $id
 * @property int            $cliente_id
 * @property string         $calle
 * @property string         $num_dep
 * @property string         $codigo_postal
 * @property string         $sector
 * @property string         $municipio
 * @property string         $provincia
 * @property Carbon         $created_at
 * @property Carbon         $updated_at
 * @package App\Models
 */
class Direccion extends Model
{
    use HasFactory;

    protected $fillable = [
        'cliente_id',
        'calle',
        'num_dep',
        'codigo_postal',
        'sector',
        'municipio',
        'provincia',
    ];
}
