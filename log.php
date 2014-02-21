<?php
$content = file_get_contents('php://input');
$json = json_decode($content);
$dir = 'log/' . $json->id;
$file = $dir . '/' . time();

mkdir($dir, 0777, true);
file_put_contents($file, $content);
chmod($dir, 0777);
chmod($file, 0777);
?>
