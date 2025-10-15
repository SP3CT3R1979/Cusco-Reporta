
-- Crear la tabla de Usuarios
CREATE TABLE Usuarios (
    UsuarioID INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(100) NOT NULL,
    Apellido NVARCHAR(100) NOT NULL,
    CorreoElectronico NVARCHAR(255) UNIQUE NOT NULL,
    ContrasenaHash NVARCHAR(255) NOT NULL,
    Rol NVARCHAR(50) NOT NULL CHECK (Rol IN ('ciudadano', 'autoridad', 'administrador')),
    FechaRegistro DATETIME DEFAULT GETDATE(),
    Activo BIT DEFAULT 1
);
GO

-- Crear la tabla de Categorías de Incidencias
CREATE TABLE Categorias (
    CategoriaID INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(100) UNIQUE NOT NULL,
    Descripcion NVARCHAR(255)
);
GO

-- Crear la tabla de Distritos
CREATE TABLE Distritos (
    DistritoID INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(100) UNIQUE NOT NULL
);
GO

-- Crear la tabla de Incidencias
CREATE TABLE Incidencias (
    IncidenciaID INT PRIMARY KEY IDENTITY(1,1),
    CodigoUnico NVARCHAR(20) UNIQUE NOT NULL,
    Titulo NVARCHAR(255) NOT NULL,
    Descripcion NVARCHAR(MAX) NOT NULL,
    CategoriaID INT FOREIGN KEY REFERENCES Categorias(CategoriaID),
    UsuarioID INT FOREIGN KEY REFERENCES Usuarios(UsuarioID),
    FechaCreacion DATETIME DEFAULT GETDATE(),
    Latitud DECIMAL(9, 6),
    Longitud DECIMAL(9, 6),
    FotoURL NVARCHAR(500),
    Estado NVARCHAR(50) NOT NULL DEFAULT 'recibido' CHECK (Estado IN ('recibido', 'en proceso', 'resuelto')),
    ResponsableID INT NULL FOREIGN KEY REFERENCES Usuarios(UsuarioID), -- Autoridad asignada
    DistritoID INT FOREIGN KEY REFERENCES Distritos(DistritoID)
);
GO

-- Crear la tabla para el historial de cambios de estado de las incidencias
CREATE TABLE HistorialEstadosIncidencia (
    HistorialID INT PRIMARY KEY IDENTITY(1,1),
    IncidenciaID INT FOREIGN KEY REFERENCES Incidencias(IncidenciaID) ON DELETE CASCADE,
    EstadoAnterior NVARCHAR(50),
    EstadoNuevo NVARCHAR(50) NOT NULL,
    FechaCambio DATETIME DEFAULT GETDATE(),
    UsuarioID INT FOREIGN KEY REFERENCES Usuarios(UsuarioID), -- Quién hizo el cambio
    Comentario NVARCHAR(1000)
);
GO

-- Insertar categorías y distritos por defecto
INSERT INTO Categorias (Nombre, Descripcion) VALUES
('Vías', 'Reportes sobre baches, pistas en mal estado, veredas rotas, etc.'),
('Alumbrado Público', 'Postes de luz sin funcionar, cables expuestos, etc.'),
('Residuos Sólidos', 'Acumulación de basura, contenedores llenos, etc.'),
('Agua y Saneamiento', 'Fugas de agua, desagües obstruidos, etc.'),
('Seguridad Ciudadana', 'Reportes sobre robos, vandalismo, o zonas peligrosas.');
GO

INSERT INTO Distritos (Nombre) VALUES
('Cusco'),
('San Sebastián'),
('Wanchaq'),
('Santiago'),
('San Jerónimo'),
('Poroy'),
('Saylla'),
('Ccorca');
GO
