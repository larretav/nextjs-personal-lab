export interface FeatureItem {
  label: string;
  value: string;
}

export interface ComponentItem {
  name: string;
  type: string;
  qty: string;
}

export interface DomoticSystem {
  id: string;
  category: string;
  name: string;
  badge: string;
  targetAudience: string;
  needsCovered: string[];
  features: FeatureItem[];
  loadCapacity: FeatureItem[];
  sitePreparation: string[];
  installation: string;
  investment: string;
  maintenance: string;
  components: ComponentItem[];
}

export const systemsData: Record<string, DomoticSystem> = {
  "ubiquiti-poe": {
    id: "ubiquiti-poe",
    category: "Seguridad y vigilancia",
    name: "Cámara de videovigilancia PoE - Ubiquiti",
    badge: "Híbrido",
    targetAudience:
      "Viviendas unifamiliares, residencias de nivel medio/alto, pequeños conjuntos residenciales y usuarios que requieren videovigilancia permanente.",
    needsCovered: [
      "Vigilancia de accesos",
      "Supervisión de jardines y perímetro",
      "Identificación visual de personas y vehículos",
      "Registro de eventos",
      "Supervisión remota",
    ],
    features: [
      { label: "Comunicación", value: "Ethernet / IP" },
      { label: "Alimentación", value: "PoE (Power over Ethernet)" },
      {
        label: "Escalabilidad",
        value:
          "Alta. Se pueden incorporar varias cámaras a una misma infraestructura UniFi Protect, dependiendo del controlador/NVR utilizado.",
      },
    ],
    loadCapacity: [
      { label: "Carga eléctrica", value: "Aproximadamente 4 W por cámara." },
      { label: "Carga de red", value: "Conexión Ethernet 10/100 MbE." },
    ],
    sitePreparation: [
      "Tubería / conduit para cableado de datos",
      "Cable UTP Cat 6 recomendado",
      "Caja de paso o caja de conexión donde sea necesario",
      "Punto de red cercano a cada cámara",
      "Ubicación con campo visual libre",
      "Centro de comunicaciones para switch / NVR",
    ],
    installation:
      "Fija, sobre muro, techo o poste. Preferentemente cableada mediante PoE.",
    investment: "Baja - Media",
    maintenance: "Moderada",
    components: [
      { name: "Cámara UniFi Protect PoE", type: "Dispositivo final", qty: "1+" },
      { name: "Switch PoE UniFi", type: "Infraestructura", qty: "1" },
      {
        name: "UniFi Cloud Gateway / NVR",
        type: "Controlador / Almacenamiento",
        qty: "1",
      },
      { name: "Cable de red UTP Cat 6", type: "Cableado", qty: "Según obra" },
    ],
  },
  "nest-doorbell": {
    id: "nest-doorbell",
    category: "Seguridad y vigilancia",
    name: "Timbre inteligente con cámara - Google Nest",
    badge: "Inalámbrico",
    targetAudience:
      "Departamentos, casas en renta y viviendas donde no se desea obra civil para cableado de datos.",
    needsCovered: [
      "Identificación de visitantes",
      "Notificación de paquetería",
      "Registro de actividad en la entrada",
      "Comunicación remota con visitantes",
    ],
    features: [
      { label: "Comunicación", value: "Wi-Fi 2.4 / 5 GHz" },
      {
        label: "Alimentación",
        value: "Transformador de timbre existente o batería recargable",
      },
      {
        label: "Escalabilidad",
        value:
          "Media. Se integra a un ecosistema Google Home junto con otros dispositivos Nest.",
      },
    ],
    loadCapacity: [
      { label: "Carga eléctrica", value: "Aproximadamente 3 W en operación continua." },
      {
        label: "Carga de red",
        value: "Consumo de ancho de banda variable según calidad de video.",
      },
    ],
    sitePreparation: [
      "Verificar transformador de timbre existente (8-24V)",
      "Señal Wi-Fi estable en la entrada",
      "Superficie de montaje vertical junto a la puerta",
    ],
    installation: "Fija, atornillada junto al marco de la puerta principal.",
    investment: "Baja",
    maintenance: "Baja",
    components: [
      { name: "Timbre Nest Doorbell", type: "Dispositivo final", qty: "1" },
      { name: "Google Home Hub / App", type: "Controlador", qty: "1" },
      { name: "Kit de cableado (opcional)", type: "Cableado", qty: "Según instalación" },
    ],
  },
  "philips-hue": {
    id: "philips-hue",
    category: "Iluminación",
    name: "Iluminación inteligente - Philips Hue",
    badge: "Inalámbrico",
    targetAudience:
      "Viviendas de cualquier tamaño que buscan control de ambiente, escenas de iluminación y ahorro energético sin modificar instalación eléctrica existente.",
    needsCovered: [
      "Control remoto de encendido/apagado",
      "Escenas y ambientes por horario",
      "Simulación de presencia",
      "Ahorro energético",
    ],
    features: [
      {
        label: "Comunicación",
        value: "Zigbee (vía Hue Bridge) + Wi-Fi para control remoto",
      },
      { label: "Alimentación", value: "110-127V estándar residencial" },
      {
        label: "Escalabilidad",
        value: "Alta. Un Hue Bridge admite hasta 50 dispositivos conectados.",
      },
    ],
    loadCapacity: [
      { label: "Carga eléctrica", value: "Entre 6.5 W y 9.5 W por foco, según modelo." },
      {
        label: "Carga de red",
        value: "Bajo consumo de ancho de banda; requiere conexión a router local.",
      },
    ],
    sitePreparation: [
      "Bases/lámparas compatibles con foco estándar E26/E27",
      "Punto de red cercano para el Hue Bridge",
      "Interruptores de pared sin corte de neutro (recomendado)",
    ],
    installation: "Focos de reemplazo directo; no requiere obra civil.",
    investment: "Baja - Media",
    maintenance: "Baja",
    components: [
      { name: "Foco inteligente Hue", type: "Dispositivo final", qty: "1+ por punto de luz" },
      { name: "Hue Bridge", type: "Controlador", qty: "1" },
      {
        name: "Interruptor inteligente Hue (opcional)",
        type: "Accesorio",
        qty: "Según necesidad",
      },
    ],
  },
  "ecobee-climate": {
    id: "ecobee-climate",
    category: "Climatización",
    name: "Termostato inteligente - Ecobee",
    badge: "Inalámbrico",
    targetAudience:
      "Viviendas con sistema de aire acondicionado central o minisplit que buscan optimizar consumo energético y confort por zonas.",
    needsCovered: [
      "Programación de temperatura por horario",
      "Control remoto vía app",
      "Detección de ocupación por sensores remotos",
      "Reportes de consumo energético",
    ],
    features: [
      { label: "Comunicación", value: "Wi-Fi 2.4 GHz" },
      { label: "Alimentación", value: "Cableado C-wire o kit adaptador incluido" },
      {
        label: "Escalabilidad",
        value:
          "Media. Admite sensores remotos adicionales para promediar temperatura por zona.",
      },
    ],
    loadCapacity: [
      { label: "Carga eléctrica", value: "Consumo mínimo, menor a 5 W." },
      {
        label: "Carga de red",
        value: "Conexión Wi-Fi permanente para sincronización y control remoto.",
      },
    ],
    sitePreparation: [
      "Verificar compatibilidad con el sistema HVAC existente",
      "Cableado de termostato existente (o instalación de cable nuevo)",
      "Señal Wi-Fi estable en el punto de instalación",
    ],
    installation: "Fija, en sustitución del termostato de pared existente.",
    investment: "Media",
    maintenance: "Baja",
    components: [
      { name: "Termostato Ecobee", type: "Dispositivo final", qty: "1" },
      {
        name: "Sensor remoto de temperatura/ocupación",
        type: "Accesorio",
        qty: "Según zonas",
      },
      {
        name: "Kit adaptador de alimentación (power extender kit)",
        type: "Accesorio",
        qty: "1 (si aplica)",
      },
    ],
  },
  "august-lock": {
    id: "august-lock",
    category: "Acceso y cerraduras",
    name: "Cerradura inteligente - August",
    badge: "Inalámbrico",
    targetAudience:
      "Viviendas, departamentos en renta o Airbnb que requieren control de acceso remoto y códigos temporales para visitas.",
    needsCovered: [
      "Apertura remota de la puerta",
      "Códigos de acceso temporales para huéspedes",
      "Registro de entradas y salidas",
      "Auto-bloqueo por proximidad",
    ],
    features: [
      { label: "Comunicación", value: "Bluetooth + Wi-Fi (vía puente opcional)" },
      { label: "Alimentación", value: "4 pilas AA, reemplazables" },
      {
        label: "Escalabilidad",
        value: "Baja-Media. Un dispositivo por puerta; se integra a asistentes de voz.",
      },
    ],
    loadCapacity: [
      {
        label: "Carga eléctrica",
        value: "Funciona con baterías; sin conexión eléctrica fija.",
      },
      {
        label: "Carga de red",
        value: "Bajo consumo; solo activo durante eventos de apertura/cierre.",
      },
    ],
    sitePreparation: [
      "Cerradura de perilla (deadbolt) estándar compatible",
      "Verificar grosor de puerta compatible",
      "Señal Bluetooth/Wi-Fi suficiente en la entrada",
    ],
    installation:
      "Se instala sobre el mecanismo de cerradura existente, sin cambiar el cilindro.",
    investment: "Media",
    maintenance: "Baja",
    components: [
      { name: "Cerradura August", type: "Dispositivo final", qty: "1 por puerta" },
      {
        name: "August Connect (puente Wi-Fi)",
        type: "Controlador",
        qty: "1 (opcional, para control remoto)",
      },
    ],
  },
  "rachio-riego": {
    id: "rachio-riego",
    category: "Riego",
    name: "Controlador de riego inteligente - Rachio",
    badge: "Inalámbrico",
    targetAudience:
      "Viviendas con jardín o áreas verdes que cuentan con sistema de riego por aspersión o goteo y buscan automatizar y ahorrar agua.",
    needsCovered: [
      "Programación de riego por zona",
      "Ajuste automático según clima y pronóstico",
      "Control remoto vía app",
      "Ahorro de agua",
    ],
    features: [
      { label: "Comunicación", value: "Wi-Fi 2.4 GHz" },
      { label: "Alimentación", value: "110-127V, transformador incluido" },
      {
        label: "Escalabilidad",
        value: "Alta. Modelos disponibles de 8 a 16 zonas de riego.",
      },
    ],
    loadCapacity: [
      { label: "Carga eléctrica", value: "Consumo bajo, aproximadamente 3-5 W en operación." },
      {
        label: "Carga de red",
        value: "Requiere conexión Wi-Fi constante para datos climáticos.",
      },
    ],
    sitePreparation: [
      "Válvulas de riego existentes por zona",
      "Cableado de bajo voltaje hacia las válvulas",
      "Ubicación cubierta para el controlador (garaje o exterior protegido)",
    ],
    installation: "Fija, en sustitución de un controlador de riego tradicional.",
    investment: "Media",
    maintenance: "Baja",
    components: [
      { name: "Controlador Rachio", type: "Dispositivo final", qty: "1" },
      { name: "Sensor de lluvia/clima (opcional)", type: "Accesorio", qty: "1" },
      { name: "Cableado de zonas existente", type: "Cableado", qty: "Según jardín" },
    ],
  },
};

export const systemsList: DomoticSystem[] = Object.values(systemsData);

export const categories: string[] = Array.from(
  new Set(systemsList.map((s) => s.category)),
);
