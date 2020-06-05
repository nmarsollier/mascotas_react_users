# mascotas_react_users

Modulo Usuarios para mascotas.

## Modo de uso

```bash
    "mascotas_react_users": "git+https://github.com/nmarsollier/mascotas_react_users.git#master",
```

## Dependencias

Esta librería no incluye dependencias internas, todas las dependencias definidas en package.json como devDependencies  deben ser incluidas en el proyecto mascotas_react_app como dependencies

## Uso local

En el proyecto donde quedamos usar este modulo, debemos cambiar

```bash
    "mascotas_react_users": "git+https://github.com/nmarsollier/mascotas_react_users.git#master",
```

por su directorio local:

```bash
    "mascotas_react_users": "file:../mascotas_react_users",
```

De este modo usaremos la version local, para que tome los cambios hay que hacer build

```bash
    npm run build
```
