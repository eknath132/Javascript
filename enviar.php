<?php
$nombre = $_POST['nombre'];
$mail = $_POST['mail'];
$celular = $_POST['celuar'];
$mensaje = $_POST['mensaje'];

$header = 'From: ' . $mail . " \r\n";
$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
$header .= "Mime-Version: 1.0 \r\n";
$header .= "Content-Type: text/plain";

$mensaje = "Este mensaje fue enviado por: " . $nombre . " \r\n";
$mensaje .= "Su e-mail es: " . $mail . " \r\n";
$mensaje .= "Teléfono de contacto: " . $celular . " \r\n";
$mensaje .= "Mensaje: " . $_POST['mensaje'] . " \r\n";
$mensaje .= "Enviado el: " . date('d/m/Y', time());

$para = 'perales.azarel@gmail.com';
$asunto = 'Su consulta fue procesada con exito';

mail($para, $asunto, utf8_decode($mensaje), $header);

header("index.html");
?>