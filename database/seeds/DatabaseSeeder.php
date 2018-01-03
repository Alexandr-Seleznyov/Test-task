<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

use App\Models\Task\BlockService;
use App\Models\Task\BlockOffer;
use App\Models\Task\MainInfo;


class DatabaseSeeder extends Seeder
{
    use TruncateTable;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call(AuthTableSeeder::class);
        $this->call(TaskBlockServiceTableSeeder::class);
        $this->call(TaskBlockOfferTableSeeder::class);
        $this->call(TaskMainInfoTableSeeder::class);

        Model::reguard();
    }
}



// =================================================================================
// TaskBlockServiceTableSeeder
// =================================================================================
class TaskBlockServiceTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('block_service')->delete();

        BlockService::create([
            'order' => 1,
            'href' => '',
            'description' => '<span>Development</span><br>of the acquisition or<br>sales strategy',
            'icon' => 'img/task/icons/201.svg',
            // 'created_at' => DB::raw('CURRENT_TIMESTAMP'),
            // 'created_at' => DB::raw('NOW()'),
        ]);

        BlockService::create([
            'order' => 2,
            'href' => '',
            'description' => '<span>Company analysis,</span><br>preparation of the investment<br>memorandum',
            'icon' => 'img/task/icons/202.svg',
        ]);

        BlockService::create([
            'order' => 3,
            'href' => '',
            'description' => 'Undertaking comprehensive<br><span>industry and market</span><br><span>researches</span>',
            'icon' => 'img/task/icons/203.svg',
        ]);

        BlockService::create([
            'order' => 4,
            'href' => '',
            'description' => '<span>Identifying transaction</span><br><span>opportunities</span><br>based on a client’s objectives<br>and strategy',
            'icon' => 'img/task/icons/204.svg',
        ]);

        BlockService::create([
            'order' => 5,
            'href' => '',
            'description' => 'Determining an<br><span>appropriate valuation</span><br>for the businesses, facilities<br>and other assets',
            'icon' => 'img/task/icons/205.svg',
        ]);

        BlockService::create([
            'order' => 6,
            'href' => '',
            'description' => 'Serving as a intermediary in<br><span>negotiations</span><br>with any level of complexity to get<br>the best possible price and terms',
            'icon' => 'img/task/icons/206.svg',
        ]);

        BlockService::create([
            'order' => 7,
            'href' => '',
            'description' => '<span>Providing counsel</span><br>to the clients in helping secure<br>acquisitions, leading the due<br>diligence process',
            'icon' => 'img/task/icons/207.svg',
        ]);

        BlockService::create([
            'order' => 8,
            'href' => '',
            'description' => 'Negotiating the<br><span>relevant legal documents,</span><br>drafting contracts<br>and legal documentation',
            'icon' => 'img/task/icons/208.svg',
        ]);

        BlockService::create([
            'order' => 9,
            'href' => '',
            'description' => '<span>Managing PR</span><br><span>and reputation</span><br>around the transaction',
            'icon' => 'img/task/icons/209.svg',
        ]);

        BlockService::create([
            'order' => 10,
            'href' => '',
            'description' => 'Continuing advice<br>and support during the<br><span>post-acquisition period</span>',
            'icon' => 'img/task/icons/210.svg',
        ]);

    }
}



// =================================================================================
// TaskBlockOfferTableSeeder
// =================================================================================
class TaskBlockOfferTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('block_offer')->delete();

        BlockOffer::create([
            'order' => 1,
            'href' => '',
            'title' => '100% Clear-Cut Hit',
            'description' => 'We only identify companies that precisely match your brief, because we underttake comprehensive market research, wte take every detail of your strategy into account and provide sustainable and efficient deal execution',
            'icon' => 'img/task/icons/101.svg',
        ]);

        BlockOffer::create([
            'order' => 2,
            'href' => '',
            'title' => 'Active searching',
            'description' => 'We can approach shareholders directly so as to acquire “not for sale” or to sell for “not acquiring” targets',
            'icon' => 'img/task/icons/102.svg',
        ]);

        BlockOffer::create([
            'order' => 3,
            'href' => '',
            'title' => 'Professionalism',
            'description' => 'For each project we establish a team of the best qualified professionals and experts with relevant expertise and knowledge.',
            'icon' => 'img/task/icons/103.svg',
        ]);

        BlockOffer::create([
            'order' => 4,
            'href' => '',
            'title' => 'Negotiation',
            'description' => 'We can help to get the best possible price and terms by ensuring responsive communication, high quality preparation, applying all our experience and skills.',
            'icon' => 'img/task/icons/104.svg',
        ]);

        BlockOffer::create([
            'order' => 5,
            'href' => '',
            'title' => 'Confidentiality',
            'description' => 'Maintaining confidentiality is our specialty and that’s why your information would not be shared with any third party without your written permission.',
            'icon' => 'img/task/icons/105.svg',
        ]);

        BlockOffer::create([
            'order' => 6,
            'href' => '',
            'title' => 'Guarantee',
            'description' => 'If we don\'t achieve the desired results, you pay nothing. There are few, if any advisers offering the same no risk offer.',
            'icon' => 'img/task/icons/106.svg',
        ]);

        BlockOffer::create([
            'order' => 7,
            'href' => '',
            'title' => 'Free support',
            'description' => 'We offer three months post-acquisition support at no extra cost.',
            'icon' => 'img/task/icons/107.svg',
        ]);
    }
}



// =================================================================================
// TaskMainInfoTableSeeder
// =================================================================================
class TaskMainInfoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('main_info')->delete();

        MainInfo::create([
            'title' => 'Helicopter view',
            'keywords' => 'some keywords',
            'description' => 'some description',
            'service_title' => 'service',
            'service_description_1' => 'We identify compelling investment opportunities, opening doors that might otherwise appear closed.',
            'service_description_2' => 'We facilitate all aspects of deal execution.',
            'offer_title' => 'our offer',
        ]);
    }
}