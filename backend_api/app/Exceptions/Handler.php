<?php

namespace App\Exceptions;

use App\Services\ApiMessageBuilder;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Contracts\Container\Container;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Http\Request;
use Illuminate\Validation\UnauthorizedException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\Routing\Exception\RouteNotFoundException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A helper to create error messages.
     * @var ApiMessageBuilder
     */
    protected $messageBuilder;
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];
    /**
     * Handler constructor.
     * @param Container $container
     * @param ApiMessageBuilder $apiMessageBuilder
     */
    public function __construct(Container $container, ApiMessageBuilder  $apiMessageBuilder){
        parent::__construct($container);
        $this->messageBuilder = $apiMessageBuilder;
    }

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * @param Request $request
     * @param Throwable $exception
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response|\Symfony\Component\HttpFoundation\Response
     * @throws Throwable
     */
    public function render($request, Throwable $exception)
    {
        if ($this->isApiRequest($request) && $exception instanceof AuthorizationException) {
            return $this->messageBuilder->forbidden();
        }

        if ($this->isApiRequest($request) && $exception instanceof ThrottleRequestsException) {
            return ($this->messageBuilder->tooManyRequests())->withHeaders($exception->getHeaders());
        }

        if ($this->isApiRequest($request) && $exception instanceof ModelNotFoundException) {
            return $this->messageBuilder->modelNotFound();
        }

        if ($this->isApiRequest($request) && $exception instanceof UnauthorizedHttpException ) {
            return $this->messageBuilder->unauthorized('Authorization Token not found','UnauthorizedHttpException');
        }

        if ($this->isApiRequest($request) && $exception instanceof RouteNotFoundException ) {
            return $this->messageBuilder->badRequest($exception->getMessage(),'MethodNotAllowedHttpException');
        }
        if ($this->isApiRequest($request) && $exception instanceof MethodNotAllowedHttpException ) {
            return $this->messageBuilder->badRequest('The specified method for the request is invalid','MethodNotAllowedHttpException', 405);
        }

        if ($this->isApiRequest($request) && $exception instanceof NotFoundHttpException ) {
            return $this->messageBuilder->badRequest('The specified URL cannot be found','NotFoundHttpException',404);
        }

        if ($this->isApiRequest($request) && $exception instanceof UnauthorizedException ) {
            return $this->messageBuilder->unauthorized($exception->getMessage(),'UnauthorizedException');
        }

        if ($this->isApiRequest($request) && $exception instanceof QueryException ) {
            return $this->messageBuilder->badRequest($exception->getMessage(),'QueryException', 422);
        }

        return parent::render($request, $exception);
    }



    /**
     * @param Request $request
     * @return bool
     */
    private function isApiRequest(Request $request){
        return $request->is('api/*');
    }
}
