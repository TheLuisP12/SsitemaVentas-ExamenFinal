-- Crear base de datos
CREATE DATABASE SistemaVentas;
GO

USE SistemaVentas;
GO

-- Tabla: Usuario
CREATE TABLE Usuario (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL CHECK (rol IN ('admin', 'cliente', 'vendedor')),
    fecha_registro DATETIME DEFAULT GETDATE()
);
GO

-- Tabla: Categoria
CREATE TABLE Categoria (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);
GO

-- Tabla: Producto
CREATE TABLE Producto (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    categoria_id INT NOT NULL,
    imagen_url VARCHAR(255),
    FOREIGN KEY (categoria_id) REFERENCES Categoria(id)
);
GO

-- Tabla: Venta
CREATE TABLE Venta (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT NOT NULL,
    fecha_venta DATETIME DEFAULT GETDATE(),
    total DECIMAL(10,2) NOT NULL,
    metodo_pago VARCHAR(50),
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);
GO

-- Tabla: DetalleVenta
CREATE TABLE DetalleVenta (
    id INT IDENTITY(1,1) PRIMARY KEY,
    venta_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (venta_id) REFERENCES Venta(id),
    FOREIGN KEY (producto_id) REFERENCES Producto(id),
    CONSTRAINT UQ_venta_producto UNIQUE (venta_id, producto_id) -- Evita duplicidad
);
GO
