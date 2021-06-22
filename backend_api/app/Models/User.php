<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Contracts\JWTSubject;

/** Representa un Usuario en la base de datos.
 *
 * @property int            $id
 * @property boolean        $is_admin
 * @property string         $name
 * @property string         $email
 * @property string         $password
 * @property Carbon         $email_verified_at
 * @property Carbon         $created_at
 * @property Carbon         $updated_at
 * @package App\Models
 */

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'is_admin',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_admin'          => 'boolean',
    ];

    public function empresas()
    {
        return $this->hasMany(Empresa::class);
    }
    /**
     * @param $value
     */
    public function setPasswordAttribute($value)
    {
        if(! empty($value) ){
            $this->attributes['password'] = Hash::make($value);
        }
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
