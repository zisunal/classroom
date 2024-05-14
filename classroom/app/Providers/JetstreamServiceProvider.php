<?php

namespace App\Providers;

use App\Actions\Jetstream\DeleteUser;
use Illuminate\Support\ServiceProvider;
use Laravel\Jetstream\Jetstream;

class JetstreamServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configurePermissions();

        Jetstream::deleteUsersUsing(DeleteUser::class);
    }

    /**
     * Configure the permissions that are available within the application.
     */
    protected function configurePermissions(): void
    {
        Jetstream::defaultApiTokenPermissions(['class:read']);

        Jetstream::permissions([
            'user:create',
            'user:update',
            'user:delete',
            'user:read',
            'class:create',
            'class:update',
            'class:delete',
            'class:read',
            'assignment:create',
            'assignment:update',
            'assignment:delete',
            'assignment:read',
            'submission:create',
            'submission:update',
            'submission:delete',
            'submission:read',
            'grade:create',
            'grade:update',
            'grade:delete',
            'grade:read',
            'comment:create',
            'comment:update',
            'comment:delete',
            'comment:read',
            'role:create',
            'role:update',
            'role:delete',
            'role:read',
            'post:create',
            'post:update',
            'post:delete',
            'post:read',
            'announcement:create',
            'announcement:update',
            'announcement:delete',
            'announcement:read',
            'appinfo:update',
            'appinfo:read',
        ]);
    }
}
