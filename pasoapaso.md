## Primer paso

Después de crear el proyecto. Se crean los componentes base. En este caso serían:
- Artistas y Perfiles de Artistas:
    - ArtistsComponent: Lista de artistas
    - ArtistsProfileComponent: Perfil del artista con su información, lista de obras, botón para agregar nueva obra.
    - ArtworkComponent: Detalles de la obra de arte, comentarios y botón para dar "like".

Luego se crean los servicios. En este caso:
- Artistas y Obras de Arte:
    - ArtistsService: Gestiona artistas (get, post, delete, etc...) y sus detalles.
    - ArtworkService: Maneja las obras de arte (get, post, delete) y los "like".

Después se crean los modelos. En este caso:
- Artista: Contiene detalles del artista (nombre, biografía, obras de arte publicadas, etc.).
- Obra de Arte: Almacena detalles de la obra (nombre, imagen, descripción, etc.).

-Una vez creados los artistas y sus obras en formato JSON, darle al comando
 json-server --watch db.json --port 3000

Una vez creado todo eso, hacemos los formularios:
- Agregar Obra de Arte: Em ArtistProfileComponent, un formulario para agregar nuevas obras de arte.
- Registro de Artista: En el componente de agregar artistas, se puede crear un formulario con campos para ingresar los detalles del nuevo artista: Nombre, Biografía, Imagen de perfil, etc.


Ahora se pasa a las Funcionalidades:
- Likes y comentarios: Botones para reaccionar o comentar en las obras de arte.
- Eliminación de Obras de Arte: Botones para eliminar obras de arte.

Tras eso, se procede con el enrutamiento:
- Rutas:
    - /artist: Lista de artistas.
    - /artists/id - Perfil del artista y sus obras.
    - /artworks/id - Detalles de la obra de arte.
    - /addArtist - apunta al formulario para agregar un nuevo artista.

## Interacciones
Integración de Funcionalidades: 
- Habilitar lógica para interactuar con los servicios para agregar o eliminar obras y gestionar las interacciones (me gusta, comentarios).
Estos elementos básicos permitirán a los artistas crear perfiles, publicar obras de arte, interactuar con otras obras y artistas, y eliminar sus propias publicaciones. 
