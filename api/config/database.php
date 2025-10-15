<?php
// api/config/database.php

// Configuración de la base de datos
// Asegúrate de que la extensión PHP 'sqlsrv' esté habilitada en tu php.ini
// (Necesitarás instalar el controlador de Microsoft para PHP para SQL Server)

$serverName = "(localdb)\\MSSQLLocalDB"; // Reemplaza con el nombre de tu instancia de LocalDB
$database = "CuscoReportaDB";

// Para Autenticación de Windows (la que estás usando)
$connectionOptions = array(
    "Database" => $database,
    "CharacterSet" => "UTF-8"
    // No se necesitan "UID" ni "PWD" para la autenticación de Windows
);

// Para Autenticación de SQL Server (si cambias de opinión)
/*
$uid = "tu_usuario_sql";
$pwd = "tu_contraseña_sql";
$connectionOptions = array(
    "Database" => $database,
    "Uid" => $uid,
    "PWD" => $pwd,
    "CharacterSet" => "UTF-8"
);
*/

function getConnection() {
    global $serverName, $connectionOptions;
    try {
        $conn = sqlsrv_connect($serverName, $connectionOptions);
        if ($conn === false) {
            die(print_r(sqlsrv_errors(), true));
        }
        return $conn;
    } catch (Exception $e) {
        die("Error al conectar a la base de datos: " . $e->getMessage());
    }
}

// Función para probar la conexión (opcional, puedes llamarla en un script de prueba)
function testConnection() {
    $conn = getConnection();
    if ($conn) {
        echo "Conexión a la base de datos exitosa (PHP)!<br>";
        sqlsrv_close($conn);
    } else {
        echo "Error al conectar a la base de datos (PHP)!<br>";
    }
}

// testConnection(); // Descomenta para probar la conexión directamente
?>
