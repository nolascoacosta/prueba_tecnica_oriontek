<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequestForm;
use App\Http\Resources\UserResource;
use App\Models\CuentaSocial;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;
use Laravel\Socialite\Facades\Socialite;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends ApiController
{
    /**
     * @param LoginRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request)
    {
        try {

            $credentials = $request->only(['email', 'password']);

            if (! $token =   JWTAuth::attempt($credentials)) {
                return  $this->messageBuilder->badRequest('Credentials does not match','ValidationException');
            }
            return $this->crearNuevoToken($token);

        } catch (JWTException $exception) {
            return  $this->messageBuilder->badRequest($exception->getMessage());
        }
    }

    /**
     * @param string $service
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSocialUrl(string $service) : \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'url' => Socialite::driver($service)->stateless()->redirect()->getTargetUrl(),
        ]);
    }

    /**
     * @param string $service
     * @return \Illuminate\Http\JsonResponse
     */
    public function socialAutenticacion(string $service)
    {
        $serviceUser = Socialite::driver($service)->stateless()->user();
        $user = null;
        DB::transaction(function () use ($serviceUser, &$user, &$service) {
            $socialAccount = CuentaSocial::firstOrNew(
                ['social_id' => $serviceUser->getId(), 'social_proveedor' => $service],
                ['social_nombre' => $serviceUser->getName()]
            );

            if (!($user = $socialAccount->user)) {
                $user = User::create([
                    'email' => $serviceUser->getEmail(),
                    'name' => $serviceUser->getName(),
                    'is_admin' => false,
                    'password' => $serviceUser->getEmail()
                ]);

                $socialAccount->fill(['user_id' => $user->id])->save();
            }
        });

        try {

            if (! $token =   JWTAuth::fromUser($user)) {
                return  $this->messageBuilder->badRequest('Credentials does not match','ValidationException');
            }
            return $this->crearNuevoToken($token);

        } catch (JWTException $exception) {
            return  $this->messageBuilder->badRequest($exception->getMessage());
        }
    }
    /**
     * @param Request $request
     * @return UserResource|\Illuminate\Http\JsonResponse
     */
    public function currentUser(Request $request)
    {
        $user = JWTAuth::user();
        if ( count((array) $user) > 0) {
            return new UserResource($this->loadRelationships($user));
        } else {
            return  $this->messageBuilder->unauthorized();
        }
    }

    /**
     * @param SignupRequestForm $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function signUp(SignupRequestForm $request): \Illuminate\Http\JsonResponse
    {
        try {
            DB::beginTransaction();
            $request->merge(["is_admin" => false]);
            $user = User::create($request->all());

            DB::commit();
            if (! $token =   JWTAuth::fromUser($user)) {
                return  $this->messageBuilder->badRequest('Credentials does not match','ValidationException');
            }
            return $this->crearNuevoToken($token);

        } catch (\Exception $exception) {
            DB::rollBack();
            return  $this->messageBuilder->sendErrorReponse($exception->getMessage());
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        try {
            config([
                'jwt.blacklist_enabled' => true
            ]);
            auth()->logout();
            JWTAuth::invalidate(JWTAuth::parseToken());

            return $this->messageBuilder->sendSuccessResponse('Logged out successfully',200);

        } catch (\Exception $error)
        {
            return  $this->messageBuilder->badRequest();
        }
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() {
        return $this->crearNuevoToken(auth()->refresh());
    }

    /**
     * @param $token
     * @return \Illuminate\Http\JsonResponse
     */
    protected function crearNuevoToken($token){

        $user = JWTAuth::setToken($token)->toUser();
        $expires_in = auth()->factory()->getTTL() * 60;
        return response()->json([
            'access_token' => $token,
            'user' =>  new UserResource(
                $this->loadRelationships($user, ['roles']))
        ]);
    }
}
