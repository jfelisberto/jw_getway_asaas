<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Components\FlashMessages;

class AppServiceProvider extends ServiceProvider
{
    use FlashMessages;

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
        view()->composer('components.messages', function ($view) {
            $messages = self::messages();
            return $view->with('messages', $messages);
        });
    }
}
