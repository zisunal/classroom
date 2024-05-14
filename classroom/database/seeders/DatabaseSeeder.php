<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AppInfoSeeder::class,
            UserSeeder::class,
        ]);
        $this->command->info('Database seeded with app info and new user with Email:zisun.ind@gmail.com, Password:APassword1!');
    }
}
