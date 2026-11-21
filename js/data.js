/* ============================================================
   La Casa del Tapiz — Datos de la tienda
   Edita aquí categorías, productos, precios y datos de contacto.
   Más adelante esto puede venir de una API/base de datos.
   ============================================================ */

const STORE = {
  name: "La Casa del Tapiz",
  phone: "+507 6740-8293",          // CAMBIAR
  whatsapp: "50767408293",      // código de país + número, sin + ni espacios
  email: "lacasadeltapizlt@gmail.com", // CAMBIAR
  address: "Panamá"                // CAMBIAR
};

/* Paleta de colores disponibles (nombre -> hex) para las muestras */
const COLORS = {
  "Negro": "#111111", "Rojo": "#b3121f", "Vino": "#6d0f1c", "Dorado": "#c9a227",
  "Beige": "#d8c7a3", "Gris": "#7b7b7b", "Café": "#5a3a22", "Blanco": "#f1ede4",
  "Azul": "#1f3a63", "Verde": "#2f5d3a", "Camel": "#b98b52", "Crema": "#eadfc8",
  "Plata": "#b9bcc0", "Naranja": "#d2641c", "Marino": "#14213d", "Natural": "#cbb98f"
};

/* Cada categoría incluye una imagen representativa para la página de inicio. */
const CATEGORIES = [
  { slug: "telas",       name: "Telas",          icon: "🧵", image: "Catalogo/imagenes/telas/546e02f2-e673-4fe7-a46f-a8042a5066be.png", desc: "Telas de tapicería y decoración: chenille, velvet, lino, jacquard y más." },
  { slug: "viniles",     name: "Viniles",        icon: "🛋️", image: "Catalogo/imagenes/viniles/normal/vinil-normal-01.webp", desc: "Viniles resistentes para muebles, bares, oficinas y auto." },
  { slug: "cuerinas",    name: "Cuerinas",       icon: "👜", image: "Catalogo/imagenes/cuerinas/cuerina-cafe.png", desc: "Cuerinas de acabado fino para tapicería y marroquinería." },
  { slug: "tela-de-carro", name: "Tela de Carro", icon: "🚗", image: "Catalogo/imagenes/tela-de-carro/tela-auto-01.png", desc: "Telas automotrices para asientos, puertas y paneles." },
  { slug: "lonas",       name: "Lonas",          icon: "⛺", image: "Catalogo/imagenes/lonas/lona-plastico-roja.png", desc: "Lonas acrílicas y de algodón para toldos, exteriores y cubiertas." },
  { slug: "piso-de-auto", name: "Piso de Auto",  icon: "🟥", image: "Catalogo/imagenes/piso-de-auto/piso-auto-02.png", desc: "Alfombra y piso para interior de vehículos, por metro." },
  { slug: "techo-de-auto", name: "Techo de Auto", icon: "🚙", image: "Catalogo/imagenes/techo-de-auto/techo-auto-01.png", desc: "Tela espumada para forrar techos de autos y camionetas." },
  { slug: "hilos",       name: "Hilos",          icon: "🪡", image: "Catalogo/imagenes/hilos/40/hilo-40-01.png", desc: "Hilos de nylon y poliéster de alta resistencia para tapicería." },
  { slug: "talabarteria", name: "Talabartería",  icon: "🐎", image: "Catalogo/imagenes/talabarteria/portada-talabarteria.jpeg", desc: "Insumos para talabartería: cueros, hebillas, remaches y herrajes." },
  { slug: "reata",       name: "Reata",          icon: "🪢", image: "Catalogo/imagenes/reata/reata-1-pulgada-negra.png", desc: "Reatas y cintas en varios anchos y colores." },
  { slug: "polifon",     name: "Polifón",        icon: "🧽", image: "Catalogo/imagenes/polifon/polifon-1-pulgada.png", desc: "Polifón para tapicería." }
];

const FABRIC_GALLERY_IMAGES = [
  "Catalogo/imagenes/telas/b7193543-1056-42c9-b890-e2abc1dbffe1.webp",
  "Catalogo/imagenes/telas/bd23bebd-5159-4f30-af8e-3b2caef0d1bb.webp",
  "Catalogo/imagenes/telas/bdfca0d0-5b18-4b7f-af05-2988f8f7aa3d.webp",
  "Catalogo/imagenes/telas/ead873ac-54bd-4189-af05-9df19398ec01.webp",
  "Catalogo/imagenes/telas/watermarked_img_1040529976409067252.webp",
  "Catalogo/imagenes/telas/watermarked_img_3074393967307659272.webp",
  "Catalogo/imagenes/telas/6e073e11-204a-4e42-96a5-81c955ee346a.png",
  "Catalogo/imagenes/telas/546e02f2-e673-4fe7-a46f-a8042a5066be.png",
  "Catalogo/imagenes/telas/7735140c-4193-4bba-b7e7-37e1e7d0fae1.webp",
  "Catalogo/imagenes/telas/b51a978b-36b0-49dd-a067-c4f0b64ac3e0.webp"
];

const VINYL_NORMAL_IMAGES = [
  "Catalogo/imagenes/viniles/normal/vinil-normal-01.webp",
  "Catalogo/imagenes/viniles/normal/vinil-normal-02.webp",
  "Catalogo/imagenes/viniles/normal/vinil-normal-03.webp",
  "Catalogo/imagenes/viniles/normal/vinil-normal-04.webp",
  "Catalogo/imagenes/viniles/normal/vinil-normal-05.webp",
  "Catalogo/imagenes/viniles/normal/vinil-normal-06.webp"
];

const VINYL_PERFORATED_IMAGES = [
  "Catalogo/imagenes/viniles/perforado/vinil-perforado-01.webp",
  "Catalogo/imagenes/viniles/perforado/vinil-perforado-02.webp",
  "Catalogo/imagenes/viniles/perforado/vinil-perforado-03.webp"
];

const CAR_FABRIC_IMAGES = [
  { src: "Catalogo/imagenes/tela-de-carro/tela-auto-01.png" },
  { src: "Catalogo/imagenes/tela-de-carro/tela-auto-02.png" },
  { src: "Catalogo/imagenes/tela-de-carro/tela-auto-03-azul.png", unavailable: true },
  { src: "Catalogo/imagenes/tela-de-carro/tela-auto-04.png" },
  { src: "Catalogo/imagenes/tela-de-carro/tela-auto-05.png" },
  { src: "Catalogo/imagenes/tela-de-carro/tela-auto-06.png" },
  { src: "Catalogo/imagenes/tela-de-carro/tela-auto-07-beige.png", unavailable: true },
  { src: "Catalogo/imagenes/tela-de-carro/tela-auto-08.png" }
];

const FLOOR_AUTO_IMAGES = [
  "Catalogo/imagenes/piso-de-auto/piso-auto-01.png",
  "Catalogo/imagenes/piso-de-auto/piso-auto-02.png",
  "Catalogo/imagenes/piso-de-auto/piso-auto-03.png",
  "Catalogo/imagenes/piso-de-auto/piso-auto-04.png"
];

const ROOF_AUTO_IMAGES = [
  "Catalogo/imagenes/techo-de-auto/techo-auto-01.png",
  "Catalogo/imagenes/techo-de-auto/techo-auto-02.png",
  "Catalogo/imagenes/techo-de-auto/techo-auto-03.png"
];

const LONA_IMAGES = [
  { src: "Catalogo/imagenes/lonas/lona-plastico-roja.png", name: "Lona de plástico" },
  { src: "Catalogo/imagenes/lonas/lona-sombrilla-azul.png", name: "Lona sombrilla azul" },
  { src: "Catalogo/imagenes/lonas/lona-sombrilla-verde.png", name: "Lona sombrilla verde" }
];

const THREAD_40_IMAGES = [
  "Catalogo/imagenes/hilos/40/hilo-40-01.png",
  "Catalogo/imagenes/hilos/40/hilo-40-02.png",
  "Catalogo/imagenes/hilos/40/hilo-40-03.png",
  "Catalogo/imagenes/hilos/40/hilo-40-04.png",
  "Catalogo/imagenes/hilos/40/hilo-40-05.png",
  "Catalogo/imagenes/hilos/40/hilo-40-06.png",
  "Catalogo/imagenes/hilos/40/hilo-40-07.png",
  "Catalogo/imagenes/hilos/40/hilo-40-08.png",
  "Catalogo/imagenes/hilos/40/hilo-40-09.png",
  "Catalogo/imagenes/hilos/40/hilo-40-10.png",
  "Catalogo/imagenes/hilos/40/hilo-40-11.png",
  "Catalogo/imagenes/hilos/40/hilo-40-12.png"
];

const WAXED_THREAD_IMAGES = [
  "Catalogo/imagenes/hilos/encerado/hilo-encerado-01.png",
  "Catalogo/imagenes/hilos/encerado/hilo-encerado-02.png"
];

const NYLON_THREAD_IMAGES = [
  { src: "Catalogo/imagenes/hilos/nylon/hilo-nylon-01.png", name: "Hilo de Nylon #20" },
  { src: "Catalogo/imagenes/hilos/nylon/hilo-nylon-02.png", name: "Hilo de Nylon #10" }
];

const POLIFON_IMAGES = [
  { src: "Catalogo/imagenes/polifon/polifon-media-pulgada.png", size: "1/2 pulgada" },
  { src: "Catalogo/imagenes/polifon/polifon-1-pulgada.png", size: "1 pulgada" },
  { src: "Catalogo/imagenes/polifon/polifon-2-pulgadas.png", size: "2 pulgadas" },
  { src: "Catalogo/imagenes/polifon/polifon-3-pulgadas.png", size: "3 pulgadas" },
  { src: "Catalogo/imagenes/polifon/polifon-4-pulgadas.png", size: "4 pulgadas" },
  { src: "Catalogo/imagenes/polifon/polifon-5-pulgadas.png", size: "5 pulgadas" }
];

const CUERINA_IMAGES = [
  { src: "Catalogo/imagenes/cuerinas/cuerina-camel.png", name: "Camel" },
  { src: "Catalogo/imagenes/cuerinas/cuerina-negra.png", name: "Negro" },
  { src: "Catalogo/imagenes/cuerinas/cuerina-cafe.png", name: "Café" },
  { src: "Catalogo/imagenes/cuerinas/REF100.png", name: "REF 100" },
  { src: "Catalogo/imagenes/cuerinas/REF186.png", name: "REF 186" },
  { src: "Catalogo/imagenes/cuerinas/REF191.png", name: "REF 191" },
  { src: "Catalogo/imagenes/cuerinas/REF487.png", name: "REF 487" },
  { src: "Catalogo/imagenes/cuerinas/REF595.png", name: "REF 595" },
  { src: "Catalogo/imagenes/cuerinas/REF734.jpeg", name: "REF 734" },
  { src: "Catalogo/imagenes/cuerinas/REF1126.png", name: "REF 1126" },
  { src: "Catalogo/imagenes/cuerinas/REF1176.png", name: "REF 1176" },
  { src: "Catalogo/imagenes/cuerinas/REF2156.png", name: "REF 2156" },
  { src: "Catalogo/imagenes/cuerinas/REF2048.png", name: "REF 2048" },
  { src: "Catalogo/imagenes/cuerinas/REF2188.png", name: "REF 2188" },
  { src: "Catalogo/imagenes/cuerinas/REF2268.png", name: "REF 2268" },
  { src: "Catalogo/imagenes/cuerinas/REF3086.png", name: "REF 3086" },
  { src: "Catalogo/imagenes/cuerinas/REF3104.png", name: "REF 3104" },
  { src: "Catalogo/imagenes/cuerinas/REF3126.png", name: "REF 3126" },
  { src: "Catalogo/imagenes/cuerinas/REF3144.png", name: "REF 3144" },
  { src: "Catalogo/imagenes/cuerinas/REF3343.png", name: "REF 3343" },
  { src: "Catalogo/imagenes/cuerinas/REF4438.png", name: "REF 4438" },
  { src: "Catalogo/imagenes/cuerinas/REF5115.png", name: "REF 5115" },
  { src: "Catalogo/imagenes/cuerinas/REF6626.png", name: "REF 6626" },
  { src: "Catalogo/imagenes/cuerinas/cuerina-topo-claro.png", name: "Topo claro" },
  { src: "Catalogo/imagenes/cuerinas/cuerina-topo.png", name: "Topo" }
];

const REATA_IMAGES = [
  { src: "Catalogo/imagenes/reata/reata-1-pulgada-negra.png", name: "Reata de 1 pulgada negra" },
  { src: "Catalogo/imagenes/reata/reata-1-pulgada-cafe.png", name: "Reata de 1 pulgada café" },
  { src: "Catalogo/imagenes/reata/reata-1-pulgada-roja.png", name: "Reata de 1 pulgada roja" },
  { src: "Catalogo/imagenes/reata/reata-1-pulgada-cafe-claro.png", name: "Reata de 1 pulgada café claro" }
];

const REATA_TWO_INCH_IMAGES = [
  { src: "Catalogo/imagenes/reata/reata-2-pulgadas-negra.png", name: "Reata de 2 pulgadas negra" },
  { src: "Catalogo/imagenes/reata/reata-2-pulgadas-cafe.png", name: "Reata de 2 pulgadas café" }
];

const REATA_THREE_QUARTER_IMAGES = [
  { src: "Catalogo/imagenes/reata/reata-tres-cuartos-negra.png", name: "Reata de 3/4 de pulgada negra" },
  { src: "Catalogo/imagenes/reata/reata-tres-cuartos-cafe.png", name: "Reata de 3/4 de pulgada café" },
  { src: "Catalogo/imagenes/reata/reata-tres-cuartos-roja.png", name: "Reata de 3/4 de pulgada roja" },
  { src: "Catalogo/imagenes/reata/reata-tres-cuartos-azul.png", name: "Reata de 3/4 de pulgada azul" }
];

const REATA_ONE_AND_QUARTER_IMAGES = [
  { src: "Catalogo/imagenes/reata/reata-1-1-4-pulgadas-roja.png", name: "Reata de 1¼ pulgadas roja" },
  { src: "Catalogo/imagenes/reata/reata-1-1-4-pulgadas-azul.png", name: "Reata de 1¼ pulgadas azul" },
  { src: "Catalogo/imagenes/reata/reata-1-1-4-pulgadas-cafe.png", name: "Reata de 1¼ pulgadas café" },
  { src: "Catalogo/imagenes/reata/reata-1-1-4-pulgadas-negra.png", name: "Reata de 1¼ pulgadas negra" }
];

const BELCRON_IMAGES = [
  { src: "Catalogo/imagenes/reata/belcron-2-pulgadas.png", name: "Belcron de 2 pulgadas" },
  { src: "Catalogo/imagenes/reata/belcron-1-pulgada.png", name: "Belcron de 1 pulgada" }
];

const TALABARTERIA_NEEDLE_IMAGES = [
  { src: "Catalogo/imagenes/talabarteria/agujas/aguja-groz-beckert-01.png", name: "Aguja Nm 110/18 - 2331 FR LG" },
  { src: "Catalogo/imagenes/talabarteria/agujas/aguja-groz-beckert-02.png", name: "Aguja Nm 180/24 - 328 / 214 x 1" },
  { src: "Catalogo/imagenes/talabarteria/agujas/aguja-groz-beckert-03.png", name: "Aguja Nm 130/21 - 134 LR" },
  { src: "Catalogo/imagenes/talabarteria/agujas/aguja-groz-beckert-04.png", name: "Aguja Nm 110/18 - DB x 1 / 1738" },
  { src: "Catalogo/imagenes/talabarteria/agujas/aguja-groz-beckert-05.png", name: "Aguja Nm 130/21 - 2331 FR LG" },
  { src: "Catalogo/imagenes/talabarteria/agujas/aguja-groz-beckert-06.png", name: "Aguja Nm 140/22 - 1738 A / DL x 1" },
  { src: "Catalogo/imagenes/talabarteria/agujas/aguja-groz-beckert-07.png", name: "Aguja Nm 200/25 - 328 LR" }
];

const TALABARTERIA_STAINLESS_RING_IMAGES = [
  "Catalogo/imagenes/talabarteria/argollas-acero-inoxidable/argolla-acero-01.png",
  "Catalogo/imagenes/talabarteria/argollas-acero-inoxidable/argolla-acero-02.png",
  "Catalogo/imagenes/talabarteria/argollas-acero-inoxidable/argolla-acero-03.png",
  "Catalogo/imagenes/talabarteria/argollas-acero-inoxidable/argolla-acero-04.png"
];

const TALABARTERIA_BRONZE_RING_IMAGES = [
  "Catalogo/imagenes/talabarteria/argollas-bronce/argollas-bronce-01-juntas.png",
  "Catalogo/imagenes/talabarteria/argollas-bronce/argollas-bronce-02.png",
  "Catalogo/imagenes/talabarteria/argollas-bronce/argollas-bronce-03.png",
  "Catalogo/imagenes/talabarteria/argollas-bronce/argollas-bronce-04.png",
  "Catalogo/imagenes/talabarteria/argollas-bronce/argollas-bronce-05.png"
];

const TALABARTERIA_IRON_RING_IMAGES = [
  "Catalogo/imagenes/talabarteria/argollas-hierro/argollas-hierro-01.png",
  "Catalogo/imagenes/talabarteria/argollas-hierro/argollas-hierro-02.png",
  "Catalogo/imagenes/talabarteria/argollas-hierro/argollas-hierro-03.png",
  "Catalogo/imagenes/talabarteria/argollas-hierro/argollas-hierro-04.png"
];

const TALABARTERIA_ZAMAC_RING_IMAGES = [
  "Catalogo/imagenes/talabarteria/argollas-zamac/argollas-zamac-01-juntas.png",
  "Catalogo/imagenes/talabarteria/argollas-zamac/argollas-zamac-02.png",
  "Catalogo/imagenes/talabarteria/argollas-zamac/argollas-zamac-03.png",
  "Catalogo/imagenes/talabarteria/argollas-zamac/argollas-zamac-04.png"
];

const TALABARTERIA_CONCHO_IMAGES = [
  "Catalogo/imagenes/talabarteria/conchos/concho-01.png",
  "Catalogo/imagenes/talabarteria/conchos/concho-02.png",
  "Catalogo/imagenes/talabarteria/conchos/concho-03.png",
  "Catalogo/imagenes/talabarteria/conchos/concho-04.png",
  "Catalogo/imagenes/talabarteria/conchos/concho-05.png",
  "Catalogo/imagenes/talabarteria/conchos/concho-06.png",
  "Catalogo/imagenes/talabarteria/conchos/concho-07.png",
  "Catalogo/imagenes/talabarteria/conchos/concho-08.png",
  "Catalogo/imagenes/talabarteria/conchos/concho-09.png"
];

const TALABARTERIA_STAINLESS_BUCKLE_IMAGES = [
  "Catalogo/imagenes/talabarteria/hebillas-acero-inoxidable/hebilla-acero-01.png",
  "Catalogo/imagenes/talabarteria/hebillas-acero-inoxidable/hebilla-acero-02.png",
  "Catalogo/imagenes/talabarteria/hebillas-acero-inoxidable/hebilla-acero-03.png",
  "Catalogo/imagenes/talabarteria/hebillas-acero-inoxidable/hebilla-acero-04.png",
  "Catalogo/imagenes/talabarteria/hebillas-acero-inoxidable/hebilla-acero-05.png",
  "Catalogo/imagenes/talabarteria/hebillas-acero-inoxidable/hebilla-acero-06.png"
];

const TALABARTERIA_BRONZE_BUCKLE_IMAGES = [
  "Catalogo/imagenes/talabarteria/hebillas-bronce/hebilla-bronce-01.png",
  "Catalogo/imagenes/talabarteria/hebillas-bronce/hebilla-bronce-02.png",
  "Catalogo/imagenes/talabarteria/hebillas-bronce/hebilla-bronce-03.png",
  "Catalogo/imagenes/talabarteria/hebillas-bronce/hebilla-bronce-04.png",
  "Catalogo/imagenes/talabarteria/hebillas-bronce/hebilla-bronce-05.png",
  "Catalogo/imagenes/talabarteria/hebillas-bronce/hebilla-bronce-06.png",
  "Catalogo/imagenes/talabarteria/hebillas-bronce/hebilla-bronce-07.png",
  "Catalogo/imagenes/talabarteria/hebillas-bronce/hebilla-bronce-08.png",
  "Catalogo/imagenes/talabarteria/hebillas-bronce/hebilla-bronce-09.png"
];

const TALABARTERIA_BELT_BUCKLE_IMAGES = [
  "Catalogo/imagenes/talabarteria/hebillas-correa/hebilla-correa-01.png",
  "Catalogo/imagenes/talabarteria/hebillas-correa/hebilla-correa-02.png",
  "Catalogo/imagenes/talabarteria/hebillas-correa/hebilla-correa-03.png",
  "Catalogo/imagenes/talabarteria/hebillas-correa/hebilla-correa-04.png",
  "Catalogo/imagenes/talabarteria/hebillas-correa/hebilla-correa-05.png",
  "Catalogo/imagenes/talabarteria/hebillas-correa/hebilla-correa-06.png",
  "Catalogo/imagenes/talabarteria/hebillas-correa/hebilla-correa-07.png"
];

const TALABARTERIA_IRON_BUCKLE_IMAGES = [
  "Catalogo/imagenes/talabarteria/hebillas-hierro/hebilla-hierro-01.png",
  "Catalogo/imagenes/talabarteria/hebillas-hierro/hebilla-hierro-02.png",
  "Catalogo/imagenes/talabarteria/hebillas-hierro/hebilla-hierro-03.png",
  "Catalogo/imagenes/talabarteria/hebillas-hierro/hebilla-hierro-04.png",
  "Catalogo/imagenes/talabarteria/hebillas-hierro/hebilla-hierro-05.png",
  "Catalogo/imagenes/talabarteria/hebillas-hierro/hebilla-hierro-06.png",
  "Catalogo/imagenes/talabarteria/hebillas-hierro/hebilla-hierro-07.png",
  "Catalogo/imagenes/talabarteria/hebillas-hierro/hebilla-hierro-08.png",
  "Catalogo/imagenes/talabarteria/hebillas-hierro/hebilla-hierro-09.png"
];

const TALABARTERIA_MORRAL_IMAGES = [
  "Catalogo/imagenes/talabarteria/morral/morral-01.png",
  "Catalogo/imagenes/talabarteria/morral/morral-02.png",
  "Catalogo/imagenes/talabarteria/morral/morral-03.png",
  "Catalogo/imagenes/talabarteria/morral/morral-04.png"
];

const TALABARTERIA_COWBOY_BUCKLE_IMAGES = [
  "Catalogo/imagenes/talabarteria/hebillas-vaqueras/hebilla-vaquera-01.png",
  "Catalogo/imagenes/talabarteria/hebillas-vaqueras/hebilla-vaquera-02.png",
  "Catalogo/imagenes/talabarteria/hebillas-vaqueras/hebilla-vaquera-03.png",
  "Catalogo/imagenes/talabarteria/hebillas-vaqueras/hebilla-vaquera-04.png",
  "Catalogo/imagenes/talabarteria/hebillas-vaqueras/hebilla-vaquera-05.png",
  "Catalogo/imagenes/talabarteria/hebillas-vaqueras/hebilla-vaquera-06.png"
];

const TALABARTERIA_STAINLESS_HALF_MOON_IMAGES = [
  "Catalogo/imagenes/talabarteria/media-luna-acero-inoxidable/media-luna-01.png",
  "Catalogo/imagenes/talabarteria/media-luna-acero-inoxidable/media-luna-02.png",
  "Catalogo/imagenes/talabarteria/media-luna-acero-inoxidable/media-luna-03.png",
  "Catalogo/imagenes/talabarteria/media-luna-acero-inoxidable/media-luna-04.png",
  "Catalogo/imagenes/talabarteria/media-luna-acero-inoxidable/media-luna-05.png",
  "Catalogo/imagenes/talabarteria/media-luna-acero-inoxidable/media-luna-06.png"
];

const TALABARTERIA_EYELET_IMAGES = [
  "Catalogo/imagenes/talabarteria/ojetes/ojete-01.png",
  "Catalogo/imagenes/talabarteria/ojetes/ojete-02.png"
];

const TALABARTERIA_FURNITURE_FEET_IMAGES = [
  "Catalogo/imagenes/talabarteria/patas-muebles/pata-mueble-01.png"
];

const TALABARTERIA_RIVET_WASHER_IMAGES = [
  "Catalogo/imagenes/talabarteria/remaches-arandelas/remache-arandela-01.png"
];

const TALABARTERIA_DECORATIVE_TACK_IMAGES = [
  "Catalogo/imagenes/talabarteria/tachuelas-decorativas/tachuela-decorativa-01.png",
  "Catalogo/imagenes/talabarteria/tachuelas-decorativas/tachuela-decorativa-02.png"
];

const TALABARTERIA_ZIPPER_IMAGES = [
  "Catalogo/imagenes/talabarteria/zipper/zipper-01.png",
  "Catalogo/imagenes/talabarteria/zipper/zipper-02.png",
  "Catalogo/imagenes/talabarteria/zipper/zipper-03.png"
];

const TALABARTERIA_ADHESIVE_IMAGES = [
  "Catalogo/imagenes/talabarteria/pegante/pegante-01.png"
];

const TALABARTERIA_GALLERIES = [
  { name: "Agujas", images: TALABARTERIA_NEEDLE_IMAGES.map(sample => sample.src) },
  { name: "Argollas de acero inoxidable", images: TALABARTERIA_STAINLESS_RING_IMAGES },
  { name: "Argollas de bronce", images: TALABARTERIA_BRONZE_RING_IMAGES },
  { name: "Argollas de hierro", images: TALABARTERIA_IRON_RING_IMAGES },
  { name: "Argollas de zamac", images: TALABARTERIA_ZAMAC_RING_IMAGES },
  { name: "Conchos", images: TALABARTERIA_CONCHO_IMAGES },
  { name: "Hebillas de acero inoxidable", images: TALABARTERIA_STAINLESS_BUCKLE_IMAGES },
  { name: "Hebillas de bronce", images: TALABARTERIA_BRONZE_BUCKLE_IMAGES },
  { name: "Hebillas de correa", images: TALABARTERIA_BELT_BUCKLE_IMAGES },
  { name: "Hebillas de hierro", images: TALABARTERIA_IRON_BUCKLE_IMAGES },
  { name: "Morrales", images: TALABARTERIA_MORRAL_IMAGES },
  { name: "Hebillas vaqueras", images: TALABARTERIA_COWBOY_BUCKLE_IMAGES },
  { name: "Media luna de acero inoxidable", images: TALABARTERIA_STAINLESS_HALF_MOON_IMAGES },
  { name: "Ojetes", images: TALABARTERIA_EYELET_IMAGES },
  { name: "Patas de muebles", images: TALABARTERIA_FURNITURE_FEET_IMAGES },
  { name: "Remaches con arandelas", images: TALABARTERIA_RIVET_WASHER_IMAGES },
  { name: "Tachuela decorativa", images: TALABARTERIA_DECORATIVE_TACK_IMAGES },
  { name: "Zipper", images: TALABARTERIA_ZIPPER_IMAGES },
  { name: "Pegante", images: TALABARTERIA_ADHESIVE_IMAGES },
  { name: "Estribos", images: ["Catalogo/imagenes/talabarteria/estribos/estribos-01.png"], details: "Tamaños: Grande, mediano y chico" }
];

/* Productos. unit: unidad de venta. */
const PRODUCTS = [
  // TELAS
  { id: 101, cat: "telas", name: "Chenille Liso", price: 6.95, unit: "yarda", width: "150 cm", comp: "100% Poliéster", colors: ["Negro","Vino","Beige","Gris","Camel"], tag: "Más vendido", image: "images/productos/tela,rosa,1.jpg" },
  { id: 102, cat: "telas", name: "Velvet Imperial", price: 21.95, unit: "yarda", width: "150 cm", comp: "100% Poliéster", colors: ["Negro","Rojo","Dorado","Vino","Café"], tag: "Nuevo" },
  { id: 103, cat: "telas", name: "Jacquard Real", price: 24.95, unit: "yarda", width: "145 cm", comp: "100% Poliéster", colors: ["Dorado","Vino","Crema","Negro"] },
  { id: 104, cat: "telas", name: "Lino Rústico", price: 12.5, unit: "yarda", width: "150 cm", comp: "Lino / Poliéster", colors: ["Natural","Beige","Gris","Blanco"] },
  { id: 105, cat: "telas", name: "Chenille París", price: 15.95, unit: "yarda", width: "150 cm", comp: "100% Poliéster", colors: ["Rojo","Vino","Plata","Negro","Crema"] },
  // VINILES
  { id: 201, cat: "viniles", name: "Vinil Rock", price: 7.95, unit: "yarda", width: "140 cm", comp: "100% PVC", colors: ["Negro","Rojo","Vino","Café","Dorado","Blanco"], tag: "Más vendido" },
  { id: 202, cat: "viniles", name: "Vinil Cocodrilo", price: 11.95, unit: "yarda", width: "140 cm", comp: "100% PVC", colors: ["Negro","Rojo","Café","Dorado"] },
  { id: 203, cat: "viniles", name: "Vinil Náutico", price: 13.5, unit: "yarda", width: "140 cm", comp: "PVC anti-UV", colors: ["Blanco","Negro","Marino","Gris"] },
  { id: 204, cat: "viniles", name: "Vinil Acolchado", price: 14.95, unit: "yarda", width: "137 cm", comp: "PVC + espuma", colors: ["Negro","Rojo","Vino"], tag: "Nuevo" },
  // CUERINAS
  { id: 301, cat: "cuerinas", name: "Cuerina Premium", price: 9.95, unit: "yarda", width: "140 cm", comp: "PU / Poliéster", colors: ["Negro","Café","Vino","Camel","Rojo"], tag: "Más vendido" },
  { id: 302, cat: "cuerinas", name: "Cuerina Napa", price: 12.95, unit: "yarda", width: "140 cm", comp: "PU", colors: ["Negro","Beige","Gris","Blanco"] },
  { id: 303, cat: "cuerinas", name: "Cuerina Perlada", price: 13.95, unit: "yarda", width: "140 cm", comp: "PU", colors: ["Dorado","Plata","Vino"] },
  { id: 304, cat: "cuerinas", name: "Cuerina Texturizada", price: 10.95, unit: "yarda", width: "140 cm", comp: "PU / Poliéster", colors: ["Negro","Café","Rojo"] },
  // TELA DE AUTO
  { id: 401, cat: "tela-de-carro", name: "Auto Velvet", price: 9.95, unit: "yarda", width: "145 cm", comp: "100% Poliéster", colors: ["Negro","Gris"], tag: "Más vendido" },
  { id: 402, cat: "tela-de-carro", name: "Tela Deportiva Malla", price: 14.5, unit: "yarda", width: "150 cm", comp: "Poliéster espumado", colors: ["Negro","Rojo","Gris"] },
  { id: 403, cat: "tela-de-carro", name: "Tela Diamante", price: 16.95, unit: "yarda", width: "145 cm", comp: "Poliéster", colors: ["Negro","Rojo","Dorado"], tag: "Nuevo" },
  { id: 404, cat: "tela-de-carro", name: "Tela OEM Gris", price: 12.95, unit: "yarda", width: "145 cm", comp: "Poliéster", colors: ["Gris","Beige","Negro"] },
  // LONAS
  { id: 501, cat: "lonas", name: "Lona Acrílica Lisa", price: 24.95, unit: "yarda", width: "150 cm", comp: "100% Acrílico", colors: ["Negro","Rojo","Marino","Blanco","Natural"], tag: "Más vendido" },
  { id: 502, cat: "lonas", name: "Lona Rayada", price: 24.95, unit: "yarda", width: "150 cm", comp: "100% Acrílico", colors: ["Rojo","Marino","Verde","Natural"] },
  { id: 503, cat: "lonas", name: "Lona Impermeable", price: 29.95, unit: "yarda", width: "120 cm", comp: "Acrílico + PU", colors: ["Negro","Gris","Marino"] },
  { id: 504, cat: "lonas", name: "Lona de Algodón", price: 8.95, unit: "yarda", width: "150 cm", comp: "100% Algodón", colors: ["Natural","Café","Negro"] },
  // PISO DE AUTO
  { id: 601, cat: "piso-de-auto", name: "Alfombra Auto Estándar", price: 8.5, unit: "metro", width: "150 cm", comp: "Poliéster punzonado", colors: ["Negro","Gris","Beige"], tag: "Más vendido" },
  { id: 602, cat: "piso-de-auto", name: "Alfombra Auto Premium", price: 12.5, unit: "metro", width: "150 cm", comp: "Poliéster + base látex", colors: ["Negro","Gris","Rojo"] },
  { id: 603, cat: "piso-de-auto", name: "Piso Acanalado", price: 10.95, unit: "metro", width: "150 cm", comp: "Poliéster", colors: ["Negro","Gris"] },
  // TECHO DE AUTO
  { id: 701, cat: "techo-de-auto", name: "Tela Techo Espumada", price: 11.95, unit: "yarda", width: "150 cm", comp: "Poliéster + espuma 3 mm", colors: ["Gris","Beige","Negro"], tag: "Más vendido" },
  { id: 702, cat: "techo-de-auto", name: "Tela Techo Suede", price: 18.95, unit: "yarda", width: "145 cm", comp: "Microfibra + espuma", colors: ["Negro","Gris","Vino"], tag: "Nuevo" },
  { id: 703, cat: "techo-de-auto", name: "Tela Techo Perforada", price: 15.95, unit: "yarda", width: "145 cm", comp: "Poliéster perforado", colors: ["Negro","Gris","Beige"] },
  // HILOS
  { id: 801, cat: "hilos", name: "Hilo Nylon Bonded #69", price: 6.5, unit: "cono", width: "—", comp: "100% Nylon", colors: ["Negro","Blanco","Rojo","Café","Dorado"], tag: "Más vendido" },
  { id: 802, cat: "hilos", name: "Hilo Nylon Bonded #138", price: 8.5, unit: "cono", width: "—", comp: "100% Nylon", colors: ["Negro","Blanco","Rojo","Café"] },
  { id: 803, cat: "hilos", name: "Hilo Poliéster Cono", price: 3.95, unit: "cono", width: "—", comp: "100% Poliéster", colors: ["Negro","Blanco","Gris","Beige","Marino"] },
  { id: 804, cat: "hilos", name: "Hilo Encerado", price: 4.95, unit: "rollo", width: "—", comp: "Poliéster encerado", colors: ["Negro","Café","Natural"] },
  // TALABARTERÍA
  { id: 901, cat: "talabarteria", name: "Cuero Vacuno Cortado", price: 14.95, unit: "pie²", width: "—", comp: "Cuero natural", colors: ["Café","Negro","Natural"], tag: "Más vendido" },
  { id: 902, cat: "talabarteria", name: "Hebilla Metálica", price: 1.95, unit: "unidad", width: "varios", comp: "Acero / latón", colors: ["Dorado","Plata","Negro"] },
  { id: 903, cat: "talabarteria", name: "Remaches (bolsa x100)", price: 4.5, unit: "bolsa", width: "—", comp: "Latón", colors: ["Dorado","Plata"] },
  { id: 904, cat: "talabarteria", name: "Aguja y Punzón (kit)", price: 6.95, unit: "kit", width: "—", comp: "Acero", colors: ["Plata"], tag: "Nuevo" },
  // REATA
  { id: 1001, cat: "reata", name: "Reata Poliéster 25 mm", price: 0.85, unit: "metro", width: "25 mm", comp: "100% Poliéster", colors: ["Negro","Rojo","Marino","Verde","Natural"], tag: "Más vendido" },
  { id: 1002, cat: "reata", name: "Reata Poliéster 50 mm", price: 1.45, unit: "metro", width: "50 mm", comp: "100% Poliéster", colors: ["Negro","Rojo","Gris","Natural"] },
  { id: 1003, cat: "reata", name: "Reata de Algodón", price: 0.95, unit: "metro", width: "30 mm", comp: "100% Algodón", colors: ["Natural","Café","Negro"] },
  { id: 1004, cat: "reata", name: "Reata Reforzada", price: 1.95, unit: "metro", width: "40 mm", comp: "Polipropileno", colors: ["Negro","Dorado","Rojo"], tag: "Nuevo" }
];
