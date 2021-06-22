<?php

namespace App\Http\Middleware;

use App\Services\ApiMessageBuilder;
use Closure;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtMiddleware
{
    /**
     * A helper to create error messages.
     *
     * @var ApiMessageBuilder
     */
    protected $messageBuilder;

    public function __construct(ApiMessageBuilder $messageBuilder)
    {
        $this->messageBuilder = $messageBuilder;
    }
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

        } catch (\Exception $exception) {

            if ($exception instanceof TokenInvalidException) {
                return $this->messageBuilder->badRequest('Token is Invalid', 'TokenInvalidException', 401);
            }
            if ($exception instanceof TokenBlacklistedException) {
                return $this->messageBuilder->badRequest('The token has been blacklisted', 'TokenBlacklistedException', 401);
            }

            if ($exception instanceof TokenExpiredException) {
                return $this->messageBuilder->badRequest('Token is Expired', 'TokenExpiredException', 401);
            }

            return $this->messageBuilder->unauthorized('Authorization Token not found', 'JWTException', 401);

        }
        return $next($request);
    }
}
