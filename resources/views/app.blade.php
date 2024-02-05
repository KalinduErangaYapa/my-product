<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="description"
        content="Welcome to Brothers Tech - Your Gateway to Culinary Excellence. Explore our premium food products and 20-year legacy of quality. Join us on a flavorful journey today!"
        data-react-helmet="true" />

    <meta property="og:title" content="Brothers Tech" data-react-helmet="true" />

    <meta property="og:type" content="website" data-react-helmet="true" />

    <meta property="og:image" content="/assets/images/meta.png" data-react-helmet="true" />

    <meta property="og:image:type" content="image/png" data-react-helmet="true" />

    <meta property="og:image:width" content="1200" data-react-helmet="true" />

    <meta property="og:image:height" content="630" data-react-helmet="true" />

    <meta property="og:image:alt" content="Brothers Tech Logo" data-react-helmet="true" />

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
