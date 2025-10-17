# Prueba_Symfony_React

📞 Teléfono: 0999819224  

## 📌 Descripción
Este repositorio contiene el desarrollo de una **prueba técnica** realizado por **Jose Imbaquinga**, enfocada en demostrar habilidades en **desarrollo fullstack** con **Symfony (PHP)** y **React**.  

El proyecto consiste en un **sistema de gestión de tareas** con funcionalidades como:

- Crear tareas
- Listar todas las tareas
- Actualizar el estado de las tareas (“pendiente”, “en_progreso”, “completada”)
- Eliminar tareas
- Consumo de API REST desde React

## 📌 Instrucciones para ejecutar backend y frontend

### 1. Clonar el repositorio
```bash
git clone https://github.com/jrimbaquingaguana/Prueba_Tecnica_Back_Symfony.git
cd Prueba_Tecnica_Back_Symfony
```
### 2. Configurar la base de datos
Editar el archivo .env y actualizar la URL de conexión a MySQL:
```bash
DATABASE_URL="mysql://root:040500@127.0.0.1:3306/tasks_test?serverVersion=8.0"
```
Luego crear la base de datos y ejecutar migraciones:
```bash
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
```
### 3. Ejecutar el backend (Symfony)
```bash
symfony serve
```
### 4. Configurar y ejecutar el frontend (React)
```bash
cd ../prueba-tecnica-react
npm install
npm run dev

```

## 🚀 Tecnologías utilizadas
- **Backend**: PHP Symfony + Doctrine ORM  
- **Base de datos**: MySQL  
- **Frontend**: React (Vite)  
- **Estilos**: CSS responsivo  
- **Despliegue**: Vercel (frontend)  

---

## ⚙️ Funcionalidades principales
1. **Gestión de tareas (CRUD)**
   - Crear, listar, actualizar y eliminar tareas
2. **Validaciones**
   - Título obligatorio
   - Estado solo puede ser: pendiente, en_progreso, completada
3. **Interfaz de usuario**
   - Tabla centrada con bordes
   - Formulario desplegable para crear tareas
   - Botones para cambiar estado y eliminar
   - Actualización automática al crear o modificar tareas
