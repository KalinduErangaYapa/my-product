<?php

use App\Http\Controllers\AboutUs\AboutUsController;
use App\Http\Controllers\Admin\Catalog\AdminContactUsController;
use App\Http\Controllers\Admin\Catalog\BlogController;
use App\Http\Controllers\Admin\Catalog\BookingsController as CatalogBookingsController;
use App\Http\Controllers\Admin\Catalog\BrandsController;
use App\Http\Controllers\Admin\Catalog\CareersController as CatalogCareersController;
use App\Http\Controllers\Admin\Catalog\CategoryController;
use App\Http\Controllers\Admin\Catalog\CollectionsController;
use App\Http\Controllers\Admin\Catalog\FaqController as CatalogFaqController;
use App\Http\Controllers\Admin\Template\HomeHeroController;
use App\Http\Controllers\Admin\Catalog\InquiryController;
use App\Http\Controllers\Admin\Catalog\NewsLetterSubscriberController as CatalogNewsLetterSubscriberController;
use App\Http\Controllers\Admin\Catalog\ProductsController;
use App\Http\Controllers\Admin\Catalog\RepairTypesController;
use App\Http\Controllers\Admin\Catalog\ReviewsController;
use App\Http\Controllers\Admin\Catalog\SideNavController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\OrdersController;
use App\Http\Controllers\Blogs\BlogsController;
use App\Http\Controllers\Bookings\BookingsController;
use App\Http\Controllers\ContactUs\ContactUsController;
use App\Http\Controllers\FAQ\FaqController;
use App\Http\Controllers\Home\HomeController;
use App\Http\Controllers\Inquiry\PublicInquiryController;
use App\Http\Controllers\NewsLetterSubscriberController;
use App\Http\Controllers\PrivacyAndPolicy\PrivacyAndPolicyController;
use App\Http\Controllers\ProductsFilter\ProductsFilterController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TermsAndConditions\TermsAndConditionsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', HomeController::class)->name("home");
Route::get('/imac', [HomeController::class, "index"])->name("imac");
Route::get('/services', [ProductsFilterController::class, "index"])->name('services.filter');
Route::get('/services/{slug}', [ProductsFilterController::class, "show"])->name('services.filter.show');
Route::get('/about-us', [AboutUsController::class, "index"])->name('about-us');
Route::get('/booking', [BookingsController::class, "index"])->name('booking');
Route::post('/booking/create', [BookingsController::class, "store"])->name('booking.store');
Route::get('/contact-us', [ContactUsController::class, "index"])->name('contact-us');
Route::post('/contact-us/create', [ContactUsController::class, "store"])->name('contact-us.create');
Route::post('/inquiry', [PublicInquiryController::class, "store"])->name('inquiry.store');
Route::get('/articles', [BlogsController::class, "index"])->name('blogs');
Route::get('/articles/{blog}/', [BlogsController::class, "read"])->name('blogs.read');
Route::get('/terms-and-conditions', [TermsAndConditionsController::class, "index"])->name('terms-and-conditions');
Route::get('/privacy-and-policy', [PrivacyAndPolicyController::class, "index"])->name('privacy-and-policy');
Route::get('/faq', [FaqController::class, "index"])->name('faq');

Route::post('/new-subscriber', [NewsLetterSubscriberController::class, "store"])->name('subscriber.store');



Route::prefix('admin')->name('admin.')->group(
    function () {

        Route::middleware('auth')->group(
            function () {
                //dashboard
                Route::get('/dashboard', [DashboardController::class, "index"])->name('dashboard');
                // Orders
                Route::resource('orders', OrdersController::class);
                // Categories
                Route::post('/categories/{category}/update', [CategoryController::class, 'updateCategory'])->name('categories.info.update');
                Route::resource('categories', CategoryController::class);
                // Products
                Route::post('services/{product}/upload/images', [ProductsController::class, "uploadImage"])->name('services.images.upload');
                Route::delete('services/image/{image}', [ProductsController::class, "deleteImage"])->name('services.images.delete');
                Route::resource('services', ProductsController::class);
                //updateProduct
                Route::post('services/{product}/updateProduct', [ProductsController::class, "updateProduct"])->name('services.updateProduct');

                //createDevice
                Route::post('services/{product}/createDevice', [ProductsController::class, "createDevice"])->name('services.createDevice');
                //updateDevice
                Route::post('services/{product}/updateDevice', [ProductsController::class, "updateDevice"])->name('services.updateDevice');
                //deleteDevice
                Route::delete('services/{product}/deleteDevice/{device}', [ProductsController::class, "deleteDevice"])->name('services.deleteDevice');
                //createPrice
                Route::post('services/{product}/createPrice', [ProductsController::class, "createPrice"])->name('services.createPrice');
                //service icons
                Route::post('services/{product}/upload/icons', [ProductsController::class, "uploadIcon"])->name('services.icons.upload');
                Route::delete('services/icon/{icon}', [ProductsController::class, "deleteIcon"])->name('services.icons.delete');
                //Repair Types
                Route::resource('repair-types', RepairTypesController::class);
                Route::post('repair-types/{repairType}/update', [RepairTypesController::class, 'updateRepairType'])->name('repair-types.updateRepairTypes');
                // Home Hero
                Route::post('/home-heros/{home_hero}/update', [HomeHeroController::class, 'updateHomeHero'])->name('home-heros.info.update');
                Route::resource('home-heros', HomeHeroController::class);
                // Reviews
                Route::post('/reviews/{review}/update', [ReviewsController::class, 'updateReview'])->name('reviews.info.update');
                Route::resource('reviews', ReviewsController::class);
                // Inquiries
                Route::resource('inquiries', InquiryController::class);
                Route::resource('careers', CatalogCareersController::class);
                Route::resource('faq', CatalogFaqController::class);
                Route::post('/faq/{faq}/update', [CatalogFaqController::class, 'updateFaq'])->name('faq.updateFaq');
                Route::resource('blogs', BlogController::class);
                Route::post('/blogs/{blog}/update', [BlogController::class, 'updateBlog'])->name('blog.updateBlog');
                Route::resource('contact-us', AdminContactUsController::class);
                //bookings
                Route::resource('bookings', CatalogBookingsController::class);
               //news-letter-subscribers
                Route::resource('news-letter-subscribers', CatalogNewsLetterSubscriberController::class);

                // Profile
                Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
                Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
                Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
            }
        );
        // Auth
        include __DIR__ . '/auth.php';
    }
);
