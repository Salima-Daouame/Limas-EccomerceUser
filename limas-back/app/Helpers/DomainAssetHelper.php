<?php

if (! function_exists('domain_asset')) {
    /**
     * Generate an asset path for the application from a different domain.
     *
     * @param  string  $path
     * @return string
     */
    function domain_asset($path)
    {
        return env('DOMAIN_ASSET') . '/' . ltrim($path, '/');
    }
}
