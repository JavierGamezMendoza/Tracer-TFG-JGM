En este repositorio centralizaremos toda la información relativa a los **Proyectos de Desarrollo de Aplicaciones Web del I.E.S Alixar**.
Al continuación encontraremos los **apellidos y nombre** del alumno/a junto al **título de su proyecto**. El enlace nos dará acceso al repositorio del proyecto (no a la página GitHub del usuario).

En este repositorio se debe incluir la documentación especificada en [Requerimientos y criterios a seguir en el desarrollo de los proyectos](https://github.com/iesalixar/plantilla_proyecto_iesalixar/wiki/a.---Criterios-comunes-para-todos-los-proyectos), así como las indicaciones que el tutor haya podido ir a realizando a lo largo del desarrollo del mismo.

El desarrollo de toda Aplicación Web requiere seguir un [proceso estructurado](https://github.com/iesalixar/plantilla_proyecto_iesalixar/wiki/w1.--PROCESO-ESTRUCTURADO-PARA-DESARROLLO-DE-APLICACIONES-WEB), este  de contenido de la wiki te puede ayudar.


---

**Los párrafos anteriores son informativos y no deben aparecer en el reposotirio de los alumnos.**

---

# Título del Proyecto

#### Curso Escolar 2023-2024
#### Autor: Javier Gámez Mendoza (https://github.com/javiergamezmendoza/Tracer-tFG-JGM.git)
#### Tutor: Mónica María Marcos Gutiérrez(https://github.com/monicamg12)

## Título y descripción del proyecto

Cualquier aficionado al motor sabe que en ocasiones, encontrar la solución a un problema concreto puede volverse una tarea tediosa, en algunos casos llega a ser frustrante y en el peor de ellos, hace que una bonita afición acabe por convertirse en una fuente inagotable de desgracias.

De esa idea nace Tracer, una herramienta con una premisa muy simple, ayudar a todos aquellos amantes del motor a compartir sus experiencias y conocimientos, para hacer la vida del resto un poco más fácil.

## Motivación personal

El principal motivo por el que he decidido abordar un proyecto de estas características es que yo soy uno de esos aficionados. No es nada sencillo encontrar valiendote de foros por qué una moto de hace 30 años no carbura de forma correcta. La información está, pero está terriblemente dispersa en decenas de plataformas centradas en una marca o un modelo concreto de vehículo. 

Ese es el problema que pretende solucionar Tracer.  

## Tecnologías utilizadas / Stack Tecnológico

Entorno Frontend: ReactJS
Elegido por su versatilidad, facilidad de uso, parecido con frameworks estudiados, escalabilidad y compatibilidad con dispositivos móviles.

Entorno Backend: Spring Boot Java
Elegido por su sostenibilidad, por haber sido el máximo objeto de estudio a lo largo del ciclo y por su buen desempeño.

Entorno de base de datos: MySQL
Elegida por su facilidad de uso, su naturaleza relacional y su escalabilidad.

## Requisitos funcionales de la aplicación

La aplicación debe ser capaz de permitir las siguientes funcionalidades: 

RF01 - El sistema debe permitir un login
RF02 - El sistema debe permitir un logout
RF03 - El sistema debe permitir el registro de usuarios
RF04 - El sistema debe permitir editar el perfil de usuario. 
RF05 - El sistema debe permitir añadir vehículos (Administrador)
RF06 - El sistema debe permitir crear un hilo dentro de un vehículo
RF07 - El sistema debe permitir el seguimiento de hilos y vehículos (añadir a favoritos)
RF08 - El sistema debe permitir leer y responder en un hilo (NO a tiempo real, tipo foro)
RF09 - El sistema debe permitir concluir un hilo (Creador y Administrador)
RF10 - El sistema debe permitir ver el listado general de vehículos/hilos de un vehículo.
RF11 - El sistema debe permitir que el administrador elimine comentarios ofensivos.
RF12 - El sistema debe permitir el veto de usuarios problemáticos de la aplicación.
RF13 - El sistema debe permitir la búsqueda de vehículos por nombre y el filtrado por marca, año, etc.
RF14  - El sistema debe permitir el seguimiento de usuarios concretos (añadir a favoritos).
RF15 - El sistema debe permitir un feed donde se muestre contenido de interés/favoritos ordenado por antigüedad.
RF16  - El sistema debe permitir buscar usuarios por nombre.
RF17  - El sistema debe permitir que el usuario creador de un hilo marque como solución la respuesta de otro usuario en su hilo, esta acción concluye el hilo.
RF18 - El sistema debe permitir que un usuario bloquee a otro usuario para no recibir sus comunicaciones, reportarlo a él o a algún mensaje concreto.
RF19 - Sistema de usuarios Fiables. Usuarios veteranos o con varias respuestas correctas registradas serán distinguidos con insignias.
RF20 - El administrador puede consultar estadísticas referentes a la resolución de hilos en función de marcas y modelos.

## Estructura del Proyecto

En este apartado el alumno explicará el contenido del repositorio y de todas las carpetas relevantes del mismo. Para facilitar la gestión de la entrega, todo el código y documentación debe estar en este repositorio.

Por lo anterior, un proyecto que contenga un Frontend en una tecnología o framework (por ejemplo Angular) y una API REST en otra tecnología o framework (Springboot, Express) deberá tener la siguiente estructura de directorios en el repositorio de entrega:

- src-backend
- src-frontend
- docs
- README.md


