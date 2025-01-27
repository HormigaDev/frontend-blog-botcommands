# Notas de desarrollador

> Para cronometrar el tiempo de carga de un componente puede usarse el siguiente código:

-   Importar la función `loadChrono` u `useEffect` de React:

```typescript
import { loadChrono } from '@/api/dev/loadChrono';
import { useEffect } from 'react';
```

-   Dentro del `useEffect` llamar a la función `loadChrono` pasando como parámetro el nombre del componente (opcional):

```typescript
useEffect(() => {
    loadChrono('MiComponente');
}, []);
```

> El sistema mostrará un mensaje de Toastify, informado el tiempo de carga en milisegundos
