<?php

namespace App\Http\Middleware;

use App\Services\ApiMessageBuilder;
use Closure;
use Illuminate\Http\Request;

class SocialMiddleware
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
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $services = ['google','facebook'];
        $enabledServices = [];
        foreach ($services as $service) {
            if ( config('services.'.$service)) {
                $enabledServices[] = $service;
            }
        }

        if (!in_array(strtolower($request->service),$enabledServices)) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'invalid social service',
                ],403);
            }else{
                return redirect()->back();
            }
        }
        return $next($request);
    }
}
