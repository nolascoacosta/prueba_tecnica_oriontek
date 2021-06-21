<?php
namespace App\Services;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

final class ApiMessageBuilder
{
    /**
     * Returns a 400 bad request error.
     *
     * @param string $message
     * @param string $type
     * @param int    $status
     * @return \Illuminate\Http\JsonResponse
     */
    public function badRequest(
        string $message     = 'The given data was invalid.',
        string $type        = ValidationException::class,
        int $status         = JsonResponse::HTTP_BAD_REQUEST
    ): JsonResponse
    {
         return $this->makeResponse(false,$message, $type, $status);
    }

    /**
     * Returns a 401 unauthorized error.
     *
     * @param string $message
     * @param string $type
     * @param int    $status
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function unauthorized(
        string $message = 'This action is unauthorized.',
        string $type = AuthorizationException::class,
        int $status = JsonResponse::HTTP_UNAUTHORIZED
    ): JsonResponse
    {
         return $this->makeResponse(false,$message, $type, $status);
    }

    /**
     * Returns a 403 forbidden error.
     *
     * @param string $message
     * @param string $type
     * @param int    $status
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function forbidden(
        string $message = 'This action is forbidden for the current user.',
        string $type = AuthorizationException::class,
        int $status = JsonResponse::HTTP_FORBIDDEN
    ): JsonResponse
    {
         return $this->makeResponse(false,$message, $type, $status);
    }
    /**
     * Returns a 404 not found error.
     *
     * @param string $message
     * @param string $type
     * @param int    $status
     * @return \Illuminate\Http\JsonResponse
     */
    public function modelNotFound(
        string $message = 'The resource you are looking for does not exist.',
        string $type = ModelNotFoundException::class,
        int $status = JsonResponse::HTTP_NOT_FOUND
    ): JsonResponse
    {
         return $this->makeResponse(false,$message, $type, $status);
    }

    /**
     * Returns a 429 too many requests error.
     *
     * @param string $message
     * @param string $type
     * @param int    $status
     * @return \Illuminate\Http\JsonResponse
     */
    public function tooManyRequests(
        string $message = 'You have made too many requests.',
        string $type = ThrottleRequestsException::class,
        int $status = JsonResponse::HTTP_TOO_MANY_REQUESTS
    ): JsonResponse
    {
         return $this->makeResponse(false,$message, $type, $status);
    }

    /**
     * Returns a 500 internal server error.
     *
     * @param string $message
     * @param string $type
     * @param int    $status
     * @return \Illuminate\Http\JsonResponse
     */
    public function serverError(
        string $message = 'Internal server error.',
        string $type = \Exception::class,
        int $status = JsonResponse::HTTP_INTERNAL_SERVER_ERROR
    ): JsonResponse
    {
         return $this->makeResponse(false,$message, $type, $status);
    }

    /**
     * @param $message
     * @param int $status
     * @return JsonResponse
     */
    public function sendSuccessResponse($message, int $status = 200) : JsonResponse{
        return $this->makeResponse(true, $message, '',$status);
    }

    /**
     * @param $message
     * @param int $status
     * @return JsonResponse
     */
    public function sendErrorReponse($message, int $status = 400) : JsonResponse{
        return $this->makeResponse(false, $message,'', $status);
    }

    /**
     * Returns a JsonResponse with the default error structure.
     * @param bool $success
     * @param string $message
     * @param string $type
     * @param int $status
     * @return JsonResponse
     */
    private function makeResponse(bool $success ,string $message, string $type, int $status): JsonResponse
    {
        $infoResponse = [];
        $infoResponse['success'] = $success;
        $infoResponse['message'] = $message;

        if (! empty($type)){
            $infoResponse['type'] = $type;
        }

        $infoResponse['status'] = $status;
        return new JsonResponse($infoResponse ,$status);
    }
}
