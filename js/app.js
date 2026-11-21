/* La Casa del Tapiz — lógica de la tienda (HTML + JavaScript puro, sin dependencias) */
(() => {
  "use strict";

  /* ---------- Utilidades ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const catBySlug = s => CATEGORIES.find(c => c.slug === s);
  const prodById = id => PRODUCTS.find(p => p.id === Number(id));
  const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

  let wish = load("cdt_wish", []);   // [id]

  /* ---------- Piezas de interfaz ---------- */
  const swatch = (p, color) => {
    const cat = catBySlug(p.cat);
    const hex = COLORS[color || p.colors[0]] || "#7d0c15";
    return `<div class="swatch ${cat.pattern}" style="--c:${hex}"></div>`;
  };

  function productCard(p) {
    const sel = p.colors[0];
    return `
    <article class="prod" data-id="${p.id}" data-color="${esc(sel)}">
      <div class="media" data-quick="${p.id}">
        ${p.tag ? `<span class="tag">${esc(p.tag)}</span>` : ""}
        <button class="wish ${wish.includes(p.id) ? "on" : ""}" data-wish="${p.id}" aria-label="Favorito">${wish.includes(p.id) ? "♥" : "♡"}</button>
        ${swatch(p, sel)}
        <div class="quick">Vista rápida</div>
      </div>
      <div class="body">
        <h3><a href="#/producto/${p.id}">${esc(p.name)}</a></h3>
        <div class="meta">${esc(p.width)} · ${esc(p.comp)}</div>
        <div class="actions">
          <a class="btn btn-red" target="_blank" rel="noopener" href="https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent("Hola, quiero cotizar: " + p.name)}">Cotizar por WhatsApp</a>
        </div>
      </div>
    </article>`;
  }

  const productGrid = list => list.length
    ? `<div class="prod-grid">${list.map(productCard).join("")}</div>`
    : `<div class="empty"><h3>No encontramos productos</h3><p>Prueba con otra búsqueda o categoría.</p></div>`;

  function bestSellerSamples() {
    const cuerinas = ["Negro", "Café", "REF 100"].map(name => {
      const index = CUERINA_IMAGES.findIndex(sample => sample.name === name);
      const sample = CUERINA_IMAGES[index];
      return { src: sample.src, name: `Cuerina ${sample.name}`, action: "cuerina", index };
    });
    const carFabrics = CAR_FABRIC_IMAGES
      .map((sample, index) => ({ sample, index }))
      .filter(({ sample }) => !sample.unavailable)
      .slice(0, 3)
      .map(({ sample, index }) => ({
        src: sample.src,
        name: `Tela de auto ${index + 1}`,
        action: "car-fabric",
        index
      }));
    const floorSamples = FLOOR_AUTO_IMAGES.slice(1, 4).map((src, index) => ({
      src,
      name: `Piso de auto ${index + 2}`,
      action: "floor-auto",
      index: index + 1
    }));
    return `<div class="prod-grid">${[...cuerinas, ...carFabrics, ...floorSamples].map(sample => `
      <article class="prod fabric-tile">
        <button class="media fabric-media" type="button" data-${sample.action}="${sample.index}" aria-label="Ver ${esc(sample.name)} en grande">
          <img src="${esc(sample.src)}" alt="${esc(sample.name)}" loading="lazy" decoding="async">
          <span class="quick">Ver en grande</span>
        </button>
        <div class="body"><h3>${esc(sample.name)}</h3></div>
      </article>
    `).join("")}</div>`;
  }

  function newCarFabricCard() {
    const sample = CAR_FABRIC_IMAGES[3];
    return `<div class="prod-grid">
      <article class="prod fabric-tile">
        <button class="media fabric-media" type="button" data-car-fabric="3" aria-label="Ver muestra de tela de auto 4 en grande">
          <img src="${esc(sample.src)}" alt="Muestra de tela de auto 4" loading="lazy" decoding="async">
          <span class="quick">Ver en grande</span>
        </button>
        <div class="body"><h3>Muestra de tela de auto 4</h3></div>
      </article>
    </div>`;
  }

  function allCategorySamples() {
    return `<div class="prod-grid">${CATEGORIES.map((category, index) => `
      <article class="prod fabric-tile">
        <button class="media fabric-media" type="button" data-home-category-image="${index}" aria-label="Ver imagen de ${esc(category.name)} en grande">
          <img src="${esc(category.image)}" alt="${esc(category.name)}" loading="lazy" decoding="async">
          <span class="quick">Ver en grande</span>
        </button>
        <div class="body"><h3>${esc(category.name)}</h3></div>
      </article>
    `).join("")}</div>`;
  }

  const quoteLink = name => `<a class="btn btn-red fabric-quote" target="_blank" rel="noopener" href="https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent("Hola, quiero cotizar: " + name)}">Cotizar por WhatsApp</a>`;

  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 2000);
  }

  function persist() {
    save("cdt_wish", wish);
    $("#wishCount").textContent = wish.length;
  }
  function toggleWish(id) {
    wish = wish.includes(id) ? wish.filter(x => x !== id) : [...wish, id];
    persist();
  }

  /* ---------- Vista rápida / producto ---------- */
  function openQuick(id) {
    const p = prodById(id), cat = catBySlug(p.cat);
    $("#modalRoot").innerHTML = `
    <div class="modal" data-closemodal>
      <div class="box" data-id="${p.id}" data-color="${esc(p.colors[0])}">
        <button class="x close" data-closemodal>×</button>
        <div id="qSwatch">${swatch(p, p.colors[0])}</div>
        <div class="info">
          <div class="crumbs">${esc(cat.name)}</div>
          <h2>${esc(p.name)}</h2>
          <div class="specs"><span><b>Ancho:</b> ${esc(p.width)}</span><span><b>Composición:</b> ${esc(p.comp)}</span><span><b>Unidad:</b> ${esc(p.unit)}</span></div>
          <a class="btn btn-line btn-block" target="_blank" rel="noopener" href="https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent("Hola, quiero cotizar: " + p.name)}">Cotizar por WhatsApp</a>
        </div>
      </div>
    </div>`;
  }
  function openImage(src, alt, unavailable = false) {
    if (!src) return;
    $("#modalRoot").innerHTML = `
    <div class="modal fabric-modal" data-closemodal>
      <div class="box">
        <button class="x close" data-closemodal aria-label="Cerrar">×</button>
        ${unavailable ? `<span class="tag unavailable-tag">No disponible</span>` : ""}
        <img src="${esc(src)}" alt="${esc(alt)}">
      </div>
    </div>`;
  }
  function openFabric(index) {
    openImage(FABRIC_GALLERY_IMAGES[index], `Muestra de tela ${index + 1}`);
  }
  function openVinylNormal(index) {
    openImage(VINYL_NORMAL_IMAGES[index], `Muestra de vinil normal ${index + 1}`);
  }
  function openVinylPerforated(index) {
    openImage(VINYL_PERFORATED_IMAGES[index], `Muestra de vinil perforado ${index + 1}`);
  }
  function openCarFabric(index) {
    const image = CAR_FABRIC_IMAGES[index];
    if (!image) return;
    openImage(image.src, `Muestra de tela de auto ${index + 1}`, image.unavailable);
  }
  const floorAutoSampleName = index => index === 0 ? "Aislante de calor" : `Muestra de piso de auto ${index + 1}`;
  function openFloorAuto(index) {
    openImage(FLOOR_AUTO_IMAGES[index], floorAutoSampleName(index));
  }
  function openRoofAuto(index) {
    openImage(ROOF_AUTO_IMAGES[index], `Muestra de techo de auto ${index + 1}`);
  }
  function openLona(index) {
    const image = LONA_IMAGES[index];
    if (!image) return;
    openImage(image.src, image.name);
  }
  function openThread40(index) {
    openImage(THREAD_40_IMAGES[index], `Hilo de Nylon, muestra ${index + 1}`);
  }
  function openWaxedThread(index) {
    openImage(WAXED_THREAD_IMAGES[index], `Hilo encerado, muestra ${index + 1}`);
  }
  function openNylonThread(index) {
    const sample = NYLON_THREAD_IMAGES[index];
    if (!sample) return;
    openImage(sample.src, sample.name);
  }
  function openCuerina(index) {
    const sample = CUERINA_IMAGES[index];
    if (!sample) return;
    openImage(sample.src, `Cuerina ${sample.name}`);
  }
  function openReata(index) {
    const sample = REATA_IMAGES[index];
    if (!sample) return;
    openImage(sample.src, sample.name);
  }
  function openReataTwoInch(index) {
    const sample = REATA_TWO_INCH_IMAGES[index];
    if (!sample) return;
    openImage(sample.src, sample.name);
  }
  function openReataThreeQuarter(index) {
    const sample = REATA_THREE_QUARTER_IMAGES[index];
    if (!sample) return;
    openImage(sample.src, sample.name);
  }
  function openReataOneAndQuarter(index) {
    const sample = REATA_ONE_AND_QUARTER_IMAGES[index];
    if (!sample) return;
    openImage(sample.src, sample.name);
  }
  function openBelcron(index) {
    const sample = BELCRON_IMAGES[index];
    if (!sample) return;
    openImage(sample.src, sample.name);
  }
  function openPolifon(index) {
    const sample = POLIFON_IMAGES[index];
    if (!sample) return;
    openImage(sample.src, `Polifón de ${sample.size}`);
  }
  const closeModal = () => { $("#modalRoot").innerHTML = ""; };

  /* ---------- Vistas ---------- */
  function viewHome() {
    const categoryProductCounts = {
      telas: FABRIC_GALLERY_IMAGES.length,
      viniles: VINYL_NORMAL_IMAGES.length + VINYL_PERFORATED_IMAGES.length,
      cuerinas: CUERINA_IMAGES.length,
      "tela-de-carro": CAR_FABRIC_IMAGES.filter(image => !image.unavailable).length,
      lonas: LONA_IMAGES.length,
      "piso-de-auto": FLOOR_AUTO_IMAGES.length,
      "techo-de-auto": ROOF_AUTO_IMAGES.length,
      hilos: THREAD_40_IMAGES.length + WAXED_THREAD_IMAGES.length + NYLON_THREAD_IMAGES.length,
      talabarteria: TALABARTERIA_GALLERIES.reduce((total, gallery) => total + gallery.images.length, 0),
      reata: REATA_IMAGES.length + REATA_TWO_INCH_IMAGES.length + REATA_THREE_QUARTER_IMAGES.length + REATA_ONE_AND_QUARTER_IMAGES.length + BELCRON_IMAGES.length,
      polifon: POLIFON_IMAGES.length
    };
    return `
    <section class="hero"><div class="container hero-inner">
      <div class="eyebrow">Tapicería · Automotriz · Talabartería</div>
      <h1>Todo lo que necesitas para <em>tapizar</em> con calidad</h1>
      <p>Telas, viniles, cuerinas, lonas, material para autos, hilos, talabartería y reata. Cortes a la medida y atención personalizada.</p>
      <a class="btn btn-red" href="#/categoria/telas">Ver catálogo</a>
      <a class="btn btn-line" href="#/contacto" style="margin-left:8px">Cotizar</a>
    </div></section>

    <section class="section"><div class="container">
      <div class="section-title"><h2>Nuestras categorías</h2><p>Encuentra el material exacto para tu proyecto</p></div>
      <div class="cat-grid">${CATEGORIES.map(c => {
        const count = `${categoryProductCounts[c.slug]} productos`;
        return `<a class="cat-card" href="#/categoria/${c.slug}">
          <span class="ico">${c.icon}</span>
          <img class="cat-image" src="${c.image}" alt="${esc(c.name)}" loading="lazy">
          <div class="info"><h3>${c.name}</h3><span class="count">${count}</span></div></a>`;
      }).join("")}</div>
    </div></section>

    <section class="section" style="background:var(--black-2);border-block:1px solid var(--line)"><div class="container">
      <div class="section-title"><h2>Productos en tendencia</h2><p>Calidad para todo tipo de trabajo</p></div>
      <div class="tabs" id="homeTabs">
        <button class="tab active" data-tab="Más vendido">Más vendidos</button>
        <button class="tab" data-tab="Nuevo">Nuevos</button>
        <button class="tab" data-tab="all">Todos</button>
      </div>
      <div id="homeProducts">${bestSellerSamples()}</div>
    </div></section>

    <section class="section"><div class="container features">
      <div class="feature"><div class="big">🚚</div><h4>Envíos</h4><p>Consulta cobertura por WhatsApp.</p></div>
      <div class="feature"><div class="big">✂️</div><h4>Cortes a la medida</h4><p>Pide solo los metros o yardas que necesitas.</p></div>
      <div class="feature"><div class="big">🏆</div><h4>Calidad</h4><p>Materiales resistentes para uso rudo.</p></div>
      <div class="feature"><div class="big">💬</div><h4>Atención directa</h4><p>Cotiza y pide por WhatsApp.</p></div>
    </div></section>`;
  }

  function talabarteriaGalleryGrid(groups = TALABARTERIA_GALLERIES) {
    return `<div class="prod-grid">${groups.map(group => `
      <article class="prod">
        <div class="product-carousel" role="region" aria-label="${esc(group.name)}; desliza horizontalmente para ver las ${group.images.length} imágenes" tabindex="0">
          ${group.images.map((src, index) => `
            <div class="product-carousel-slide">
              <img src="${esc(src)}" alt="${esc(group.name)}, imagen ${index + 1}" loading="lazy" decoding="async">
            </div>
          `).join("")}
        </div>
        <div class="body">
          <h3>${esc(group.name)}</h3>
          ${group.details ? `<p class="meta">${esc(group.details)}</p>` : ""}
          ${quoteLink(group.name)}
        </div>
      </article>
    `).join("")}</div>`;
  }

  function viewCategory(slug) {
    const c = catBySlug(slug);
    if (!c) return viewNotFound();
    const sort = new URLSearchParams(location.hash.split("?")[1] || "").get("orden") || "";
    let list = PRODUCTS.filter(p => p.cat === slug);
    if (sort === "menor") list.sort((a, b) => a.price - b.price);
    if (sort === "mayor") list.sort((a, b) => b.price - a.price);
    if (sort === "az") list.sort((a, b) => a.name.localeCompare(b.name));
    const fabricGallery = slug === "telas" ? `
      <section class="fabric-gallery" aria-labelledby="fabricGalleryTitle">
        <div class="section-title"><h2 id="fabricGalleryTitle">Muestrario de telas</h2><p>Toca una muestra para verla en grande</p></div>
        <div class="prod-grid">${FABRIC_GALLERY_IMAGES.map((src, index) => `
          <article class="prod fabric-tile">
            <button class="media fabric-media" type="button" data-fabric="${index}" aria-label="Ver muestra de tela ${index + 1} en grande">
              <img src="${esc(src)}" alt="Muestra de tela ${index + 1}" loading="lazy" decoding="async">
              <span class="quick">Ver en grande</span>
            </button>
            <div class="body"><h3>Muestra de tela ${index + 1}</h3>${quoteLink(`Muestra de tela ${index + 1}`)}</div>
          </article>
        `).join("")}</div>
      </section>` : "";
    const talabarteriaGallery = slug === "talabarteria" ? talabarteriaGalleryGrid() : "";
    const belcronGallery = slug === "reata" ? `
      <section class="fabric-gallery" aria-labelledby="belcronGalleryTitle">
        <div class="section-title"><h2 id="belcronGalleryTitle">Belcron</h2><p>Toca una muestra para verla en grande</p></div>
        <div class="prod-grid">${BELCRON_IMAGES.map((sample, index) => `
          <article class="prod fabric-tile">
            <button class="media fabric-media" type="button" data-belcron="${index}" aria-label="Ver ${esc(sample.name)} en grande">
              <img src="${esc(sample.src)}" alt="${esc(sample.name)}" loading="lazy" decoding="async">
              <span class="quick">Ver en grande</span>
            </button>
            <div class="body"><h3>${esc(sample.name)}</h3>${quoteLink(sample.name)}</div>
          </article>
        `).join("")}</div>
      </section>` : "";
    const reataOneAndQuarterGallery = slug === "reata" ? `
      <section class="fabric-gallery" aria-labelledby="reataOneAndQuarterGalleryTitle">
        <div class="section-title"><h2 id="reataOneAndQuarterGalleryTitle">Reatas de 1¼ pulgadas</h2><p>Toca una muestra para verla en grande</p></div>
        <div class="prod-grid">${REATA_ONE_AND_QUARTER_IMAGES.map((sample, index) => `
          <article class="prod fabric-tile">
            <button class="media fabric-media" type="button" data-reata-one-and-quarter="${index}" aria-label="Ver ${esc(sample.name)} en grande">
              <img src="${esc(sample.src)}" alt="${esc(sample.name)}" loading="lazy" decoding="async">
              <span class="quick">Ver en grande</span>
            </button>
            <div class="body"><h3>${esc(sample.name)}</h3>${quoteLink(sample.name)}</div>
          </article>
        `).join("")}</div>
      </section>` : "";
    const reataThreeQuarterGallery = slug === "reata" ? `
      <section class="fabric-gallery" aria-labelledby="reataThreeQuarterGalleryTitle">
        <div class="section-title"><h2 id="reataThreeQuarterGalleryTitle">Reatas de 3/4 de pulgada</h2><p>Toca una muestra para verla en grande</p></div>
        <div class="prod-grid">${REATA_THREE_QUARTER_IMAGES.map((sample, index) => `
          <article class="prod fabric-tile">
            <button class="media fabric-media" type="button" data-reata-three-quarter="${index}" aria-label="Ver ${esc(sample.name)} en grande">
              <img src="${esc(sample.src)}" alt="${esc(sample.name)}" loading="lazy" decoding="async">
              <span class="quick">Ver en grande</span>
            </button>
            <div class="body"><h3>${esc(sample.name)}</h3>${quoteLink(sample.name)}</div>
          </article>
        `).join("")}</div>
      </section>` : "";
    const vinylSections = slug === "viniles" ? `
      <section class="vinyl-section" aria-labelledby="normalVinylTitle">
        <div class="section-title"><h2 id="normalVinylTitle">Vinil normal</h2><p>Toca una muestra para verla en grande</p></div>
        <div class="prod-grid">${VINYL_NORMAL_IMAGES.map((src, index) => `
          <article class="prod fabric-tile">
            <button class="media fabric-media" type="button" data-vinyl-normal="${index}" aria-label="Ver muestra de vinil normal ${index + 1} en grande">
              <img src="${esc(src)}" alt="Muestra de vinil normal ${index + 1}" loading="lazy" decoding="async">
              <span class="quick">Ver en grande</span>
            </button>
            <div class="body"><h3>Muestra de vinil normal ${index + 1}</h3>${quoteLink(`Muestra de vinil normal ${index + 1}`)}</div>
          </article>
        `).join("")}</div>
      </section>
      <section class="vinyl-section" aria-labelledby="perforatedVinylTitle">
        <div class="section-title"><h2 id="perforatedVinylTitle">Vinil perforado</h2><p>Toca una muestra para verla en grande</p></div>
        <div class="prod-grid">${VINYL_PERFORATED_IMAGES.map((src, index) => `
          <article class="prod fabric-tile">
            <button class="media fabric-media" type="button" data-vinyl-perforated="${index}" aria-label="Ver muestra de vinil perforado ${index + 1} en grande">
              <img src="${esc(src)}" alt="Muestra de vinil perforado ${index + 1}" loading="lazy" decoding="async">
              <span class="quick">Ver en grande</span>
            </button>
            <div class="body"><h3>Muestra de vinil perforado ${index + 1}</h3>${quoteLink(`Muestra de vinil perforado ${index + 1}`)}</div>
          </article>
        `).join("")}</div>
      </section>` : "";
    const carFabricGallery = slug === "tela-de-carro" ? `
      <section class="fabric-gallery" aria-labelledby="carFabricGalleryTitle">
        <div class="section-title"><h2 id="carFabricGalleryTitle">Tela de Carro</h2><p>Toca una muestra para verla en grande</p></div>
        <div class="prod-grid">${CAR_FABRIC_IMAGES.map((image, index) => `
          <article class="prod fabric-tile">
            <button class="media fabric-media" type="button" data-car-fabric="${index}" aria-label="Ver muestra de tela de auto ${index + 1} en grande${image.unavailable ? ", no disponible" : ""}">
              ${image.unavailable ? `<span class="tag unavailable-tag">No disponible</span>` : ""}
              <img src="${esc(image.src)}" alt="Muestra de tela de auto ${index + 1}" loading="lazy" decoding="async">
              <span class="quick">Ver en grande</span>
            </button>
            <div class="body"><h3>Muestra de tela de auto ${index + 1}</h3>${quoteLink(`Muestra de tela de auto ${index + 1}`)}</div>
          </article>
        `).join("")}</div>
      </section>` : "";
    const floorAutoGallery = slug === "piso-de-auto" ? `
      <section class="fabric-gallery" aria-labelledby="floorAutoGalleryTitle">
        <div class="section-title"><h2 id="floorAutoGalleryTitle">Piso de Auto</h2><p>Toca una muestra para verla en grande</p></div>
        <div class="prod-grid">${FLOOR_AUTO_IMAGES.map((src, index) => `
          <article class="prod fabric-tile">
            <button class="media fabric-media" type="button" data-floor-auto="${index}" aria-label="Ver ${esc(floorAutoSampleName(index))} en grande">
              <img src="${esc(src)}" alt="${esc(floorAutoSampleName(index))}" loading="lazy" decoding="async">
              <span class="quick">Ver en grande</span>
            </button>
            <div class="body"><h3>${esc(floorAutoSampleName(index))}</h3>${quoteLink(floorAutoSampleName(index))}</div>
          </article>
        `).join("")}</div>
      </section>` : "";
    const roofAutoGallery = slug === "techo-de-auto" ? `
      <section class="fabric-gallery" aria-labelledby="roofAutoGalleryTitle">
        <div class="section-title"><h2 id="roofAutoGalleryTitle">Techo de Auto</h2><p>Toca una muestra para verla en grande</p></div>
        <div class="prod-grid">${ROOF_AUTO_IMAGES.map((src, index) => `
          <article class="prod fabric-tile">
            <button class="media fabric-media" type="button" data-roof-auto="${index}" aria-label="Ver muestra de techo de auto ${index + 1} en grande">
              <img src="${esc(src)}" alt="Muestra de techo de auto ${index + 1}" loading="lazy" decoding="async">
              <span class="quick">Ver en grande</span>
            </button>
            <div class="body"><h3>Muestra de techo de auto ${index + 1}</h3>${quoteLink(`Muestra de techo de auto ${index + 1}`)}</div>
          </article>
        `).join("")}</div>
      </section>` : "";
    const lonaGallery = slug === "lonas" ? `
      <section class="fabric-gallery" aria-labelledby="lonaGalleryTitle">
        <div class="section-title"><h2 id="lonaGalleryTitle">Lonas</h2><p>Toca una muestra para verla en grande</p></div>
        <div class="prod-grid">${LONA_IMAGES.map((image, index) => `
          <article class="prod fabric-tile">
            <button class="media fabric-media" type="button" data-lona="${index}" aria-label="Ver ${esc(image.name)} en grande">
              <img src="${esc(image.src)}" alt="${esc(image.name)}" loading="lazy" decoding="async">
              <span class="quick">Ver en grande</span>
            </button>
            <div class="body"><h3>${esc(image.name)}</h3>${quoteLink(image.name)}</div>
          </article>
        `).join("")}</div>
      </section>` : "";
    const threadGallery = slug === "hilos" ? `
      <section class="fabric-gallery" aria-labelledby="thread40Title">
        <div class="section-title"><h2 id="thread40Title">Hilos de Nylon</h2><p>Toca una muestra para verla en grande</p></div>
        <div class="prod-grid">${THREAD_40_IMAGES.map((src, index) => `
          <article class="prod fabric-tile">
            <button class="media fabric-media" type="button" data-thread40="${index}" aria-label="Ver Hilo de Nylon, muestra ${index + 1} en grande">
              <img src="${esc(src)}" alt="Hilo de Nylon, muestra ${index + 1}" loading="lazy" decoding="async">
              <span class="quick">Ver en grande</span>
            </button>
            <div class="body"><h3>Hilo de Nylon</h3>${quoteLink(`Hilo de Nylon, muestra ${index + 1}`)}</div>
          </article>
        `).join("")}</div>
      </section>
      <section class="vinyl-section" aria-labelledby="waxedThreadTitle">
        <div class="section-title"><h2 id="waxedThreadTitle">Hilos encerados</h2><p>Toca una muestra para verla en grande</p></div>
        <div class="prod-grid">${WAXED_THREAD_IMAGES.map((src, index) => `
          <article class="prod fabric-tile">
            <button class="media fabric-media" type="button" data-waxed-thread="${index}" aria-label="Ver hilo encerado, muestra ${index + 1} en grande">
              <img src="${esc(src)}" alt="Hilo encerado, muestra ${index + 1}" loading="lazy" decoding="async">
              <span class="quick">Ver en grande</span>
            </button>
            <div class="body"><h3>Hilo encerado</h3>${quoteLink(`Hilo encerado, muestra ${index + 1}`)}</div>
          </article>
        `).join("")}</div>
      </section>
      <section class="vinyl-section" aria-labelledby="nylonThreadTitle">
        <div class="section-title"><h2 id="nylonThreadTitle">Hilos de nylon</h2><p>Toca una muestra para verla en grande</p></div>
        <div class="prod-grid">${NYLON_THREAD_IMAGES.map((sample, index) => `
          <article class="prod fabric-tile">
            <button class="media fabric-media" type="button" data-nylon-thread="${index}" aria-label="Ver ${esc(sample.name)} en grande">
              <img src="${esc(sample.src)}" alt="${esc(sample.name)}" loading="lazy" decoding="async">
              <span class="quick">Ver en grande</span>
            </button>
            <div class="body"><h3>${esc(sample.name)}</h3>${quoteLink(sample.name)}</div>
          </article>
        `).join("")}</div>
      </section>` : "";
    const polifonSection = slug === "polifon" ? `
      <section class="fabric-gallery" aria-labelledby="polifonTitle">
        <div class="section-title"><h2 id="polifonTitle">Polifón</h2><p>Elige el grosor que necesitas y cotízalo por WhatsApp</p></div>
        <div class="prod-grid">${POLIFON_IMAGES.map((sample, index) => `
          <article class="prod fabric-tile">
            <button class="media fabric-media" type="button" data-polifon="${index}" aria-label="Ver polifón de ${esc(sample.size)} en grande">
              <img src="${esc(sample.src)}" alt="Polifón de ${esc(sample.size)}" loading="lazy" decoding="async">
              <span class="quick">Ver en grande</span>
            </button>
            <div class="body"><h3>${esc(sample.size)}</h3>${quoteLink(`Polifón de ${sample.size}`)}</div>
          </article>
        `).join("")}</div>
      </section>` : "";
    const cuerinaGallery = slug === "cuerinas" ? `
      <section class="fabric-gallery" aria-labelledby="cuerinaGalleryTitle">
        <div class="section-title"><h2 id="cuerinaGalleryTitle">Muestrario de Cuerinas</h2><p>Toca una muestra para verla en grande</p></div>
        <div class="prod-grid">${CUERINA_IMAGES.map((sample, index) => `
          <article class="prod fabric-tile">
            <button class="media fabric-media" type="button" data-cuerina="${index}" aria-label="Ver cuerina ${esc(sample.name)} en grande">
              <img src="${esc(sample.src)}" alt="Cuerina ${esc(sample.name)}" loading="lazy" decoding="async">
              <span class="quick">Ver en grande</span>
            </button>
            <div class="body"><h3>${esc(sample.name)}</h3>${quoteLink(`Cuerina ${sample.name}`)}</div>
          </article>
        `).join("")}</div>
      </section>` : "";
    const reataGallery = slug === "reata" ? `
      <section class="fabric-gallery" aria-labelledby="reataGalleryTitle">
        <div class="section-title"><h2 id="reataGalleryTitle">Reatas de 1 pulgada</h2><p>Toca una muestra para verla en grande</p></div>
        <div class="prod-grid">${REATA_IMAGES.map((sample, index) => `
          <article class="prod fabric-tile">
            <button class="media fabric-media" type="button" data-reata="${index}" aria-label="Ver ${esc(sample.name)} en grande">
              <img src="${esc(sample.src)}" alt="${esc(sample.name)}" loading="lazy" decoding="async">
              <span class="quick">Ver en grande</span>
            </button>
            <div class="body"><h3>${esc(sample.name)}</h3>${quoteLink(sample.name)}</div>
          </article>
        `).join("")}</div>
      </section>` : "";
    const reataTwoInchGallery = slug === "reata" ? `
      <section class="fabric-gallery" aria-labelledby="reataTwoInchGalleryTitle">
        <div class="section-title"><h2 id="reataTwoInchGalleryTitle">Reatas de 2 pulgadas</h2><p>Toca una muestra para verla en grande</p></div>
        <div class="prod-grid">${REATA_TWO_INCH_IMAGES.map((sample, index) => `
          <article class="prod fabric-tile">
            <button class="media fabric-media" type="button" data-reata-two-inch="${index}" aria-label="Ver ${esc(sample.name)} en grande">
              <img src="${esc(sample.src)}" alt="${esc(sample.name)}" loading="lazy" decoding="async">
              <span class="quick">Ver en grande</span>
            </button>
            <div class="body"><h3>${esc(sample.name)}</h3>${quoteLink(sample.name)}</div>
          </article>
        `).join("")}</div>
      </section>` : "";
    const categoryProducts = slug === "telas" || slug === "viniles" || slug === "cuerinas" || slug === "tela-de-carro" || slug === "piso-de-auto" || slug === "techo-de-auto" || slug === "lonas" || slug === "hilos" || slug === "polifon" || slug === "reata" || slug === "talabarteria" ? "" : `
      <div class="toolbar"><span style="color:var(--muted)">${list.length} productos</span>
        <select id="sortSel"><option value="">Ordenar</option>
          <option value="menor" ${sort === "menor" ? "selected" : ""}>Precio: menor a mayor</option>
          <option value="mayor" ${sort === "mayor" ? "selected" : ""}>Precio: mayor a menor</option>
          <option value="az" ${sort === "az" ? "selected" : ""}>Nombre A–Z</option></select></div>
      ${productGrid(list)}`;
    return `
    <div class="page-head"><div class="container">
      <div class="crumbs"><a href="#/">Inicio</a> / ${c.name}</div>
      <h1>${c.icon} ${c.name}</h1><p style="color:var(--muted);margin-top:6px">${c.desc}</p>
    </div></div>
    <section class="section"><div class="container">
      ${fabricGallery}${vinylSections}${cuerinaGallery}${talabarteriaGallery}${carFabricGallery}${floorAutoGallery}${roofAutoGallery}${lonaGallery}${threadGallery}${polifonSection}${reataGallery}${reataTwoInchGallery}${reataThreeQuarterGallery}${reataOneAndQuarterGallery}${belcronGallery}${categoryProducts}
    </div></section>`;
  }

  function viewSearch(q) {
    const normalizeSearch = value => value.toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    const t = normalizeSearch(q);
    const searchTerms = t.split(/\s+/).filter(Boolean).map(term => term.length > 3 ? term.replace(/s$/, "") : term);
    const talabarteriaMatches = t ? TALABARTERIA_GALLERIES.filter(group => {
      const searchable = normalizeSearch(`${group.name} ${group.details || ""}`);
      return searchTerms.every(term => searchable.includes(term));
    }) : [];
    if (talabarteriaMatches.length) {
      return `<div class="page-head"><div class="container"><h1>Resultados para “${esc(q)}”</h1></div></div>
        <section class="section"><div class="container">${talabarteriaGalleryGrid(talabarteriaMatches)}</div></section>`;
    }

    const categoryMatches = t ? CATEGORIES.filter(category =>
      normalizeSearch(category.name).includes(t) ||
      normalizeSearch(category.slug.replace(/-/g, " ")).includes(t)
    ) : [];
    const productMatches = t ? PRODUCTS.filter(product => {
      const category = catBySlug(product.cat);
      return normalizeSearch(`${product.name} ${category.name} ${product.comp} ${product.colors.join(" ")}`).includes(t);
    }) : [];
    const matchedSlugs = new Set([
      ...categoryMatches.map(category => category.slug),
      ...productMatches.map(product => product.cat)
    ]);

    if (matchedSlugs.size === 1) return viewCategory([...matchedSlugs][0]);

    if (matchedSlugs.size > 1) {
      const categories = CATEGORIES.filter(category => matchedSlugs.has(category.slug));
      return `<div class="page-head"><div class="container"><h1>Resultados para “${esc(q)}”</h1></div></div>
        <section class="section"><div class="container"><div class="cat-grid">${categories.map(category => `
          <a class="cat-card" href="#/categoria/${category.slug}">
            <img class="cat-image" src="${esc(category.image)}" alt="${esc(category.name)}" loading="lazy">
            <div class="info"><h3>${esc(category.name)}</h3></div>
          </a>
        `).join("")}</div></div></section>`;
    }

    return `<div class="page-head"><div class="container"><h1>Resultados para “${esc(q)}”</h1></div></div>
      <section class="section"><div class="container">${productGrid(productMatches)}</div></section>`;
  }

  function viewProduct(id) {
    const p = prodById(id); if (!p) return viewNotFound();
    const c = catBySlug(p.cat);
    const rel = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 4);
    return `<div class="page-head"><div class="container">
      <div class="crumbs"><a href="#/">Inicio</a> / <a href="#/categoria/${c.slug}">${c.name}</a> / ${esc(p.name)}</div><h1>${esc(p.name)}</h1></div></div>
      <section class="section"><div class="container"><div class="prod-grid" style="grid-template-columns:minmax(260px,420px)">${productCard(p)}</div></div></section>
      ${rel.length ? `<section class="section" style="padding-top:0"><div class="container"><div class="section-title"><h2>Relacionados</h2></div>${productGrid(rel)}</div></section>` : ""}`;
  }

  function viewWish() {
    return `<div class="page-head"><div class="container"><h1>♥ Mis favoritos</h1></div></div>
      <section class="section"><div class="container">${wish.length ? productGrid(wish.map(prodById).filter(Boolean)) : `<div class="empty"><p>Aún no tienes favoritos.</p></div>`}</div></section>`;
  }

  function viewContact() {
    return `<div class="page-head"><div class="container"><h1>Contáctanos</h1></div></div>
    <section class="section"><div class="container two-col">
      <div class="card prose"><h2 style="margin-top:0">Escríbenos</h2>
        <p>Cuéntanos qué material necesitas y te cotizamos.</p>
        <p>📞 ${esc(STORE.phone)}<br>✉️ ${esc(STORE.email)}<br>📍 ${esc(STORE.address)}</p>
        <a class="btn btn-gold" target="_blank" rel="noopener" href="https://wa.me/${STORE.whatsapp}">Abrir WhatsApp</a></div>
      <form class="card form" id="contactForm">
        <label>Nombre<input name="nombre" required></label>
        <label>Número de teléfono<input type="tel" name="tel" required></label>
        <label>Mensaje<textarea name="msg" rows="5" required></textarea></label>
        <button class="btn btn-red">Enviar por WhatsApp</button>
      </form>
    </div></section>`;
  }

  function viewAbout() {
    return `<div class="page-head"><div class="container"><h1>Nosotros</h1></div></div>
    <section class="section"><div class="container prose" style="max-width:800px">
      <h2 style="margin-top:0">La Casa del Tapiz</h2>
      <p>Somos una tienda especializada en materiales para tapicería, automotriz y talabartería. Ofrecemos telas, viniles, cuerinas, tela de carro, lonas, piso y techo de auto, hilos, insumos de talabartería y reata.</p>
      <p>Nuestro objetivo es darte el material correcto, con asesoría y al mejor precio, ya sea para un mueble, un auto o un trabajo artesanal.</p>
      <p><i>(Texto provisional — reemplázalo con la historia real del negocio.)</i></p>
    </div></section>`;
  }

  const viewNotFound = () => `<div class="container empty" style="padding:90px 0"><h2>Página no encontrada</h2><br><a class="btn btn-gold" href="#/">Volver al inicio</a></div>`;

  /* ---------- Router ---------- */
  function render() {
    const [path] = (location.hash || "#/").slice(1).split("?");
    const parts = path.split("/").filter(Boolean);
    let html, active = "";
    switch (parts[0]) {
      case undefined: html = viewHome(); break;
      case "categoria": html = viewCategory(parts[1]); active = parts[1]; break;
      case "producto": html = viewProduct(parts[1]); break;
      case "buscar": html = viewSearch(decodeURIComponent(parts[1] || "")); break;
      case "favoritos": html = viewWish(); break;
      case "contacto": html = viewContact(); break;
      case "nosotros": html = viewAbout(); break;
      default: html = viewNotFound();
    }
    $("#app").innerHTML = html;
    $$("#mainNav a").forEach(a => a.classList.toggle("active", a.dataset.slug === active));
    window.scrollTo(0, 0);
  }

  /* ---------- Eventos (delegación) ---------- */
  document.addEventListener("click", e => {
    const t = e.target;
    const q = s => t.closest(s);

    let el;
    if ((el = q("[data-closemodal]")) && (t === el || el.classList.contains("x"))) return closeModal();

    if ((el = q("[data-wish]"))) {
      e.stopPropagation();
      const id = Number(el.dataset.wish); toggleWish(id);
      $$(`[data-wish="${id}"]`).forEach(b => { const on = wish.includes(id); b.classList.toggle("on", on); b.textContent = on ? "♥" : "♡"; });
      if (location.hash === "#/favoritos") render();
      return;
    }
    if ((el = q("[data-fabric]"))) return openFabric(Number(el.dataset.fabric));
    if ((el = q("[data-home-category-image]"))) {
      const category = CATEGORIES[Number(el.dataset.homeCategoryImage)];
      if (category) return openImage(category.image, category.name);
    }
    if ((el = q("[data-vinyl-normal]"))) return openVinylNormal(Number(el.dataset.vinylNormal));
    if ((el = q("[data-vinyl-perforated]"))) return openVinylPerforated(Number(el.dataset.vinylPerforated));
    if ((el = q("[data-car-fabric]"))) return openCarFabric(Number(el.dataset.carFabric));
    if ((el = q("[data-floor-auto]"))) return openFloorAuto(Number(el.dataset.floorAuto));
    if ((el = q("[data-roof-auto]"))) return openRoofAuto(Number(el.dataset.roofAuto));
    if ((el = q("[data-lona]"))) return openLona(Number(el.dataset.lona));
    if ((el = q("[data-thread40]"))) return openThread40(Number(el.dataset.thread40));
    if ((el = q("[data-waxed-thread]"))) return openWaxedThread(Number(el.dataset.waxedThread));
    if ((el = q("[data-nylon-thread]"))) return openNylonThread(Number(el.dataset.nylonThread));
    if ((el = q("[data-polifon]"))) return openPolifon(Number(el.dataset.polifon));
    if ((el = q("[data-cuerina]"))) return openCuerina(Number(el.dataset.cuerina));
    if ((el = q("[data-reata]"))) return openReata(Number(el.dataset.reata));
    if ((el = q("[data-reata-two-inch]"))) return openReataTwoInch(Number(el.dataset.reataTwoInch));
    if ((el = q("[data-reata-three-quarter]"))) return openReataThreeQuarter(Number(el.dataset.reataThreeQuarter));
    if ((el = q("[data-reata-one-and-quarter]"))) return openReataOneAndQuarter(Number(el.dataset.reataOneAndQuarter));
    if ((el = q("[data-belcron]"))) return openBelcron(Number(el.dataset.belcron));
    if ((el = q("[data-quick]"))) return openQuick(Number(el.dataset.quick));

    if ((el = q(".dot"))) {
      const host = q("[data-color]") && el.closest("[data-id]");
      if (host) {
        host.dataset.color = el.dataset.color;
        $$(".dot", host).forEach(d => d.classList.toggle("sel", d === el));
        const p = prodById(host.dataset.id);
        const sw = $(".swatch", host); if (sw) sw.style.setProperty("--c", COLORS[el.dataset.color] || "#888");
        const label = $("#qColor", host); if (label) label.textContent = el.dataset.color;
      }
      return;
    }
    if ((el = q(".tab"))) {
      $$("#homeTabs .tab").forEach(b => b.classList.toggle("active", b === el));
      const k = el.dataset.tab;
      $("#homeProducts").innerHTML = k === "Nuevo"
        ? newCarFabricCard()
        : k === "all"
          ? allCategorySamples()
          : bestSellerSamples();
      return;
    }
  });

  document.addEventListener("change", e => {
    if (e.target.id === "sortSel") {
      const base = location.hash.split("?")[0];
      location.hash = e.target.value ? `${base}?orden=${e.target.value}` : base;
    }
  });

  document.addEventListener("submit", e => {
    if (e.target.id === "searchForm") {
      e.preventDefault();
      const v = $("#searchInput").value.trim(); if (v) location.hash = `#/buscar/${encodeURIComponent(v)}`;
    } else if (e.target.id === "contactForm") {
      e.preventDefault();
      const f = Object.fromEntries(new FormData(e.target));
      const msg = `Hola, soy ${f.nombre}. Mi número es ${f.tel}.\n${f.msg}`;
      window.open(`https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    } else if (e.target.id === "newsForm") {
      e.preventDefault(); e.target.reset(); toast("¡Gracias por suscribirte!");
    }
  });

  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
  window.addEventListener("hashchange", render);

  /* ---------- Inicio ---------- */
  function init() {
    $("#mainNav").innerHTML = CATEGORIES.map(c => `<li><a href="#/categoria/${c.slug}" data-slug="${c.slug}">${c.name}</a></li>`).join("");
    $("#footCats").innerHTML = CATEGORIES.map(c => `<li><a href="#/categoria/${c.slug}">${c.name}</a></li>`).join("");
    $("#phoneTop").textContent = STORE.phone;
    $("#footPhone").textContent = "📞 " + STORE.phone;
    $("#footMail").textContent = "✉️ " + STORE.email;
    $("#year").textContent = new Date().getFullYear();
    $("#waFloat").href = `https://wa.me/${STORE.whatsapp}`;
    persist(); render();
  }
  init();
})();
