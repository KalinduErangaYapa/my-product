<?php

namespace App\Console\Commands\SiteMap;

use App\Http\Controllers\SiteMap\SiteMapController;
use App\Models\Sitemap;
use Illuminate\Console\Command;

class SiteMapGenerator extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:site-map-generator';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $controller = new SiteMapController();
        $controller->store();
    }
}
