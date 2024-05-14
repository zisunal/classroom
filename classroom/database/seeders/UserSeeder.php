<?php
namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Zisun',
            'email' => 'zisun.ind@gmail.com',
            'password' => bcrypt('APassword1'),
        ]);
    }
}