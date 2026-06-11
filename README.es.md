# Generador de Firmas de Correo

Email Signature Generator es un motor open source para crear firmas
profesionales de correo electrónico en HTML. El proyecto se encuentra
actualmente en su etapa inicial de desarrollo.

Documentación en inglés: [README.md](README.md)

## Licencia open source

El código fuente cubierto del motor está disponible bajo la
[Mozilla Public License 2.0](LICENSE) (`MPL-2.0`). Puede utilizarse y
modificarse conforme a los términos de esa licencia.

Cuando se redistribuyan modificaciones de archivos cubiertos por MPL-2.0,
deben conservarse y cumplirse las obligaciones aplicables de MPL-2.0. Se
recomienda revisar el texto completo de la licencia antes de distribuir
versiones modificadas.

El proyecto oficial podrá ofrecer soporte, implementaciones, complementos y
servicios comerciales relacionados. Estas ofertas comerciales no cambian los
términos de licencia de los archivos open source cubiertos.

## Marcas y afiliación

La licencia del código fuente no concede autorización automática para utilizar
la marca oficial, el nombre comercial definitivo, los logos, el dominio o la
identidad visual del proyecto. Tampoco autoriza a afirmar o aparentar
afiliación, respaldo o condición de proyecto oficial.

Consulte [TRADEMARKS.md](TRADEMARKS.md) para obtener más información.

## Aviso de licencia del código fuente

Hasta que se agreguen archivos fuente principales, este aviso ubicado en la
raíz del repositorio funciona como aviso de licencia claramente visible:

> This Source Code Form is subject to the terms of the Mozilla Public License,
> v. 2.0. If a copy of the MPL was not distributed with this file, You can
> obtain one at https://mozilla.org/MPL/2.0/.

Los archivos fuente principales que se agreguen posteriormente deberán incluir
este aviso cuando sea práctico o permanecer cubiertos mediante una ubicación
equivalente claramente visible.

## MVP actual

El repositorio contiene un MVP estático construido con Astro y TypeScript, sin
backend. Incluye cuatro plantillas orientadas a Gmail, vista previa en tiempo
real, copia enriquecida, descarga HTML, importación y exportación JSON segura,
guardado local, imágenes HTTPS, advertencias para imágenes locales, páginas
localizadas, SEO técnico, pruebas y CI.

Idiomas disponibles: español, inglés, portugués de Brasil, francés y alemán.

Captura de pantalla: **pendiente de revisión visual final y despliegue público**.

## Desarrollo local

```sh
npm ci
npm run dev
```

Utilice la versión de Node indicada en `.nvmrc`. Para validar el proyecto
ejecute `npm run validate` y `npm run test:e2e`.

## Arquitectura y privacidad

Astro genera páginas estáticas localizadas. TypeScript del navegador controla
el editor y módulos aislados sanitizan las entradas antes de producir HTML con
tablas y estilos inline. Los borradores permanecen en localStorage y pueden
eliminarse desde el generador. No existen backend, cuentas, almacenamiento
remoto, analítica ni rastreadores.

Consulte [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md),
[docs/PRIVACY_MODEL.md](docs/PRIVACY_MODEL.md) y
[docs/DEPLOYMENT_CLOUDFLARE_PAGES.md](docs/DEPLOYMENT_CLOUDFLARE_PAGES.md).

## Avisos

La información de derechos de autor y del repositorio oficial está registrada
en [NOTICE](NOTICE).
