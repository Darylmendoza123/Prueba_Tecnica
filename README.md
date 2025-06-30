### PRUEBA TECNICA

El sistema fue desarrollado con Django y React.js que permite gestionar usuarios, incluyendo funcionalidades CRUD (creación, edición, eliminación), y exportación de registros en formato CSV. También implementa autenticación y roles diferenciados para un superusuario y usuarios estándar.



#### Requisitos Técnicos

Backend (Django):

En el backend se implementó un sistema completo de gestión de usuarios utilizando Django. Se utilizó un modelo personalizado para incluir campos como nombre, correo electrónico, contraseña y teléfono. Además, se añadieron roles diferenciados para administrador y usuario estándar. Los superusuarios tienen acceso completo a todas las funcionalidades, mientras que los usuarios estándar solo pueden visualizar el listado y exportar los datos a CSV.



Frontend (React.js):

El frontend se desarrolló con React.js, proporcionando una interfaz intuitiva para gestionar usuarios. Se diseñó un formulario de creación y edición de usuarios que incluye validaciones en el frontend utilizando la librería "validator" para garantizar la integridad de los datos ingresados. También se integró Bootstrap para lograr un diseño limpio y responsivo.



Autenticación y Roles:

Se configuró el sistema de autenticación mediante JWT (JSON Web Tokens) en el backend, permitiendo a los usuarios iniciar sesión de forma segura. Los roles están definidos de manera que las acciones permitidas se controlan desde el backend mediante permisos personalizados.



#### Funcionalidades del Sistema



El sistema incluye las siguientes funcionalidades:



1. Autenticación



El superusuario puede iniciar sesión con las credenciales predefinidas:

* Usuario: Admin
* Contraseña: super1





Los usuarios estándar también pueden iniciar sesión y acceder a funcionalidades limitadas.



2\. Gestión de Usuarios



El superusuario puede realizar las siguientes acciones:



* Crear usuarios mediante un formulario con validaciones.
* Editar y eliminar registros existentes.
* Exportar el listado completo de usuarios a un archivo CSV.
* Visualizar una lista paginada de usuarios.



El usuario estándar puede:



* Visualizar el listado paginado de usuarios.
* Exportar el listado a CSV.
  

## 

#### Componentes Clave del Proyecto

Frontend:

* App.js: Configura las rutas del frontend.
* Login.js: Gestiona el inicio de sesión con validación de credenciales.
* Usuarios.js: Implementa el listado de usuarios, paginación y exportación.
* CrearEditarUsuario.js: Gestiona la creación y edición de usuarios con validación.



backend:

* views.py: Contiene la lógica del backend para el CRUD, exportación y permisos.
* permissions.py: Define las reglas de acceso según el rol del usuario.
* urls.py: Configura las rutas del backend.



#### 

#### Requerimientos previos

* Instalar Python 3.9 o superior
* Instalar Node.js 16 o superior
* Instalar MySQL o PostgreSQL (Configura una base de datos vacía para el proyecto.)
* Instalar Git (Para clonar el repositorio.)



#### Pasos para ejecutar el proyecto

###### 1\. Clonar el repositorio



git clone <URL\_DEL\_REPOSITORIO>

cd <CARPETA\_DEL\_PROYECTO>





##### Configuración del backend

* ir a la carpeta del backend desde la consola :

cd backend



* Crea un entorno virtual e instálalo:

python -m venv env

env\\Scripts\\activate



* Instala las dependencias:

pip install -r requirements.txt



* Crea un archivo .env desde el archivo de ejemplo:

cp .env.example .env



* Aplica las migraciones de la base de datos:

python manage.py migrate



* Crea un superusuario:

python manage.py createsuperuser



Inicia el servidor del backend:

python manage.py runserver



##### Configuración del frontend

* Ve a la carpeta del frontend desde la termianl:

cd ../frontend



* instala las dependencias del proyecto:

npm install



* Inicia el servidor del frontend:

npm start



Acceso al sistema
---

Accede a la aplicación desde tu navegador:



Frontend: http://localhost:3000



Backend (API): http://localhost:8000

