# Query Logic · Propuestas de Proyecto Final

> **Universidad Nacional de Costa Rica (UNA)**  
> **Curso:** Tópicos Avanzados de Bases de Datos  
> **Equipo:** Query Logic  

Repositorio oficial y presentación interactiva de las tres propuestas arquitectónicas de software open source planteadas por el equipo **Query Logic**.

---

## Enlace a la Presentación en Vivo (GitHub Pages)

Accede a la presentación interactiva en formato 16:9 con navegación por teclado y simuladores técnicos:

👉 **[Ver Presentación en Vivo](https://charlo1397.github.io/query-logic-propuestas/)**

*(O descargar directamente el documento en formato [PDF Ejecutivo](Query_Logic_Propuestas_Final.pdf))*

---

## Resumen de las Tres Propuestas

### 1. QLine · Gestión de Filas y Turnos en Tiempo Real
- **Dominio:** Clínicas, municipalidades, cooperativas y entidades de servicio público.
- **Dolor operativo:** Salas colapsadas y riesgo de llamadas simultáneas duplicadas al mismo turno.
- **Arquitectura de Datos:**
  - **Redis:** Concurrencia atómica in-memory (`LPOP`), colas de atención y expiración TTL por abandono.
  - **MongoDB:** Persistencia inmutable histórica de turnos, marcas de tiempo y métricas de SLA.
- **Lema:** *"MongoDB conserva lo que ocurrió. Redis controla lo que ocurre ahora."*

### 2. NutriBridge · Banco de Alimentos y Rescate de Perecederos
- **Dominio:** Bancos de alimentos, comedores comunitarios, albergues y donantes comerciales.
- **Dolor operativo:** Desperdicio masivo de perecederos y recolección en bodegas/camiones sin cobertura celular.
- **Arquitectura de Datos:**
  - **SQLite:** Almacén transaccional local en edge (camión/bodega) con operación offline garantizada.
  - **Redis:** Cola priorizada FEFO (*First-Expired, First-Out*) ordenada por timestamp de caducidad y alertas críticas.
  - **MongoDB:** Fichas polimórficas de donantes y agregación de impacto social (kg rescatados).
- **Lema:** *"SQLite captura en el acopio sin red. Redis prioriza por caducidad. MongoDB audita el impacto social."*

### 3. AgroLogic · Cuaderno de Campo Digital y Trazabilidad
- **Dominio:** Fincas agrícolas, pequeños productores, cooperativas exportadoras e inspectores agronómicos.
- **Dolor operativo:** Pérdida de certificaciones internacionales por registros en papel dispersos y parcelas sin señal 4G/5G.
- **Arquitectura de Datos:**
  - **SQLite:** Estructura relacional maestra fija ACID en dispositivos móviles en el surco.
  - **Redis:** Caché de dashboards ejecutivos diarios y cálculo de alertas de carencia fitosanitaria.
  - **MongoDB:** Bitácoras heterogéneas multicultivo (fotos, plagas, coordenadas geoespaciales, audios).
- **Lema:** *"SQLite asegura la transacción en el surco. Redis acelera decisiones ejecutivas. MongoDB adapta la riqueza biológica del cultivo."*

---

## Matriz Comparativa de Decisiones

| Criterio de Evaluación | 1. QLine | 2. NutriBridge | 3. AgroLogic |
| :--- | :--- | :--- | :--- |
| **Dominio y Sector** | Clínicas, bancos, municipalidades | Bancos de alimentos, comedores y ONGs | Fincas, agrónomos y cooperativas |
| **Motores Utilizados** | Redis + MongoDB (2 motores) | SQLite + Redis + MongoDB (3 motores) | SQLite + Redis + MongoDB (3 motores) |
| **Reto Técnico Clave** | Concurrencia atómica de ventanillas | Despacho FEFO por caducidad + Offline | Arquitectura offline-first + Schema dinámico |
| **Viabilidad MVP (2–3 sem)** | **Muy Alta (9.5/10)** · Alcance acotado | **Alta (8.8/10)** · Valor social directo | **Media-Alta (8.2/10)** · Requiere acotar cultivo |
| **Demostración en Vivo** | Llamados en vivo en pantalla pública | Reloj regresivo FEFO y asignación | Demostración en modo avión y sync |
| **Potencial hacia TFG** | Predicción de colas con Machine Learning | Optimización de rutas de rescate (VRP) | Visión artificial para plagas + telemetría IoT |

---

## Controles de la Presentación Web

- `→` o `Espacio` o `Enter`: Siguiente diapositiva.
- `←` o `Retroceso`: Diapositiva anterior.
- `F`: Alternar modo pantalla completa.
- Menú desplegable superior: Salto directo a cualquier diapositiva.
- Botón **Descargar PDF**: Descarga directa del archivo ejecutivo de 13 diapositivas.

---

## Licencia

Distribuido bajo licencia de código abierto **MIT License**. Consulta el archivo `LICENSE` para más detalles.
