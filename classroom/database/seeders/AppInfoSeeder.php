<?php
namespace Database\Seeders;

use App\Models\AppInfo;
use Illuminate\Database\Seeder;

class AppInfoSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        AppInfo::create([
            'name' => 'Classroom',
            'version' => '1.0.0',
            'description' => 'A digital classroom application',
            'author' => 'Zisun',
            'author_url' => 'https://youtube.com/zisunal',
            'email' => 'zisun.ind@gmail.com',
            'meta_title' => 'Digital Classroom',
            'meta_description' => 'A digital classroom application',
            'meta_keywords' => 'classroom, digital, education, learning',
        ]);
    }
}