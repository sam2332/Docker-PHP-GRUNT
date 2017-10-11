<?php
require __DIR__ . '/vendor/autoload.php';

/* Simply build the application around your URLs */
$app = new Bullet\App();

$app->path('/', function ($request) {
    return "Hello World!";
});
$app->path('/foo', function ($request) {
    return "Bar!";
});

/* Run the app! (takes $method, $url or Bullet\Request object)
 * run() always return a \Bullet\Response object (or throw an exception) */

$app->run(new Bullet\Request())->send();
