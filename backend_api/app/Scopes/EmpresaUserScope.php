<?php

namespace App\Scopes;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;

class EmpresaUserScope implements Scope
{

    /**
     * A helper to create api response messages.
     *
     * @var User
     */
    private $user;
    public function __construct()
    {
        $this->user = Auth::user();
    }

    public function apply(Builder $builder, Model $model)
    {
        if (!$this->user->is_admin) {
            $builder->where('user_id','=', $this->user->id);
        }
    }
}
