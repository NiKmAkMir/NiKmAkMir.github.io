import React, { useState, useRef, useEffect } from "react";

const PRODUCTS = [
  {
    id: "iphone-14",
    title: "Apple iPhone 14",
    price: 49999,
    img: "https://30.img.avito.st/image/1/1.R49hJba-62YXgBlgYzg5lwaE6WDTiO9k344pYieC6WTVhK8.1nl2lYRmqydHwflSbpnhWutzQJmabRfMJU47KvFucG8",
    type: "option",
    options: [
      { value: "128", label: "128 ГБ", multiplier: 1 },
      { value: "256", label: "256 ГБ", multiplier: 1.1 },
      { value: "512", label: "512 ГБ", multiplier: 1.2 }
    ]
  },
  {
    id: "console-ps5",
    title: "Sony PlayStation 5",
    price: 79990,
    img: "https://m.media-amazon.com/images/I/517hCmftoEL.jpg",
    type: "property",
    propertyLabel: "Добавить второй контроллер (+ 10 000 ₽)",
    propertyPrice: 10000
  },
  {
    id: "laptop-asus-tuf",
    title: "ASUS TUF Gaming F15",
    price: 73999,
    img: "https://avatars.mds.yandex.net/get-mpic/11405706/2a0000018cd77e0d5b7bf2d532f4540ce5ae/orig",
    type: "both",
    options: [
      { value: "8gb", label: "8 ГБ RAM", multiplier: 1 },
      { value: "16gb", label: "16 ГБ RAM", multiplier: 1.15 },
      { value: "32gb", label: "32 ГБ RAM", multiplier: 1.3 }
    ],
    propertyLabel: "Добавить расширенную гарантию (+ 5 000 ₽)",
    propertyPrice: 5000
  },
  {
    id: "phone-redmi12",
    title: "Xiaomi Redmi Note 12",
    price: 19999,
    img: "https://avatars.mds.yandex.net/i?id=e45272aeb34422ecbc977bd7aa0e15fc_l-10848716-images-thumbs&n=13",
    type: "base"
  },
  {
    id: "ssd-wd-1tb",
    title: "WD Blue SN570 1TB (NVMe)",
    price: 7499,
    img: "https://a.allegroimg.com/s720/11c446/823b4e954af8aaf292f7cdf7082f/Dysk-SSD-WD-Blue-SN570-WDS250G3B0C-250-GB-M-2-PCIe-NVMe-3-0-x4",
    type: "base"
  },
  {
    id: "headphones-sony",
    title: "Sony WH-1000XM4",
    price: 27990,
    img: "https://cdn.mos.cms.futurecdn.net/ApSCVe5AyXT7VC8wAssbK8-1200-80.png",
    type: "option",
    options: [
      { value: "black", label: "Черный", multiplier: 1 },
      { value: "white", label: "Белый", multiplier: 1.05 }
    ]
  },
  {
    id: "earbuds",
    title: "Беспроводные наушники TWS",
    price: 4990,
    img: "https://avatars.mds.yandex.net/get-mpic/7394206/img_id580277346318901299.jpeg/orig",
    type: "property",
    propertyLabel: "Добавить расширенную гарантию (+ 500 ₽)",
    propertyPrice: 500
  }
];

function formatCurrencyRub(n) {
  return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB" }).format(n);
}

export default function OrderCalculator() {
  const [selectedId, setSelectedId] = useState(null);
  const [qty, setQty] = useState("1");
  const [selectedOption, setSelectedOption] = useState("");
  const [propertyChecked, setPropertyChecked] = useState(false);
  const [total, setTotal] = useState(null);
  const scrollerRef = useRef(null);

  const selectedProduct = PRODUCTS.find(x => x.id === selectedId);

  function onImageError(e) {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "https://via.placeholder.com/300x200?text=No+Image";
  }

  function validateQuantity(q) {
    return /^\s*[1-9]\d*\s*$/.test(q);
  }

  useEffect(() => {
    if (!selectedProduct) { setTotal(null); return; }
    if (!validateQuantity(qty)) { setTotal(null); return; }

    let price = selectedProduct.price;

    if (selectedProduct.type === "option" || selectedProduct.type === "both") {
      const opt = selectedProduct.options.find(o => o.value === selectedOption) || selectedProduct.options[0];
      if (opt) price = price * opt.multiplier;
    }

    if (
      (selectedProduct.type === "property" || selectedProduct.type === "both") &&
      propertyChecked
    ) {
      price += selectedProduct.propertyPrice;
    }

    const q = parseInt(qty, 10);
    setTotal(Math.round(price * q));
  }, [selectedId, qty, selectedOption, propertyChecked]);

  function handleSelect(p) {
    setSelectedId(p.id);
    setQty("1");
    setSelectedOption(p.options ? p.options[0].value : "");
    setPropertyChecked(false);
  }

  function scroll(direction = "next") {
    const node = scrollerRef.current;
    if (!node) return;
    const offset = Math.round(node.clientWidth * 0.8);
    node.scrollBy({ left: direction === "next" ? offset : -offset, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-12 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">Каталог электроники</h1>
            <p className="text-gray-500 mt-2 max-w-xl">Выберите товар и рассчитайте стоимость с учетом опций</p>
          </div>

          <div className="flex gap-2 mt-3 sm:mt-0">
            <button onClick={() => scroll("prev")} className="h-10 px-4 rounded-lg bg-white shadow hover:bg-gray-50">‹</button>
            <button onClick={() => scroll("next")} className="h-10 px-4 rounded-lg bg-indigo-600 text-white shadow hover:bg-indigo-700">›</button>
          </div>
        </header>

        {/* Список товаров */}
        <div className="relative">
          <div ref={scrollerRef} className="custom-scrollbar grid grid-flow-col auto-cols-[minmax(220px,1fr)] grid-rows-2 gap-4 overflow-x-auto py-3 px-2">
            {PRODUCTS.map((p) => {
              const isSelected = selectedId === p.id;
              return (
                <article
                  key={p.id}
                  onClick={() => handleSelect(p)}
                  className={`flex flex-col bg-white rounded-2xl shadow-sm p-3 cursor-pointer hover:shadow-md transition-transform ${isSelected ? "ring-2 ring-indigo-400" : ""}`}
                >
                  <div className="rounded-xl overflow-hidden bg-gray-100 h-36 flex items-center justify-center">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="object-contain h-full w-full"
                      onError={onImageError}
                    />
                  </div>
                  <div className="mt-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-sm text-gray-900 truncate">{p.title}</h3>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-lg font-semibold">{formatCurrencyRub(p.price)}</div>
                      <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm">Купить</button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Калькулятор */}
        <div className="mt-8">
          {selectedProduct ? (
            <section className="max-w-3xl mx-auto bg-white rounded-2xl p-6 shadow">
              <div className="flex flex-col sm:flex-row gap-4 items-start min-w-0">
                <div className="sm:w-36 h-28 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={selectedProduct.img}
                    alt="selected"
                    onError={onImageError}
                    className="object-contain h-full w-full"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold truncate">{selectedProduct.title}</h3>
                  <div className="text-sm text-gray-500 mt-1">
                    Цена за единицу: <span className="font-medium">{formatCurrencyRub(selectedProduct.price)}</span>
                  </div>

                  {/* Select */}
                  {(selectedProduct.type === "option" || selectedProduct.type === "both") && (
                    <div className="mt-3">
                      <label className="text-sm font-medium block mb-1">
                        Выберите вариант:
                      </label>
                      <select
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className="border p-2 rounded-lg text-sm"
                      >
                        {selectedProduct.options.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Checkbox */}
                  {(selectedProduct.type === "property" || selectedProduct.type === "both") && (
                    <div className="mt-3">
                      <label className="text-sm font-medium flex gap-2 items-center">
                        <input
                          type="checkbox"
                          checked={propertyChecked}
                          onChange={(e) => setPropertyChecked(e.target.checked)}
                        />
                        {selectedProduct.propertyLabel}
                      </label>
                    </div>
                  )}

                  {/* Количество */}
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2">
                    <label className="text-sm shrink-0">Количество</label>
                    <input
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      inputMode="numeric"
                      className="w-full sm:w-28 rounded-lg border border-gray-200 p-2 text-sm min-w-0"
                    />
                    <button
                      onClick={() => { setSelectedId(null); setTotal(null); }}
                      className="px-3 py-2 bg-gray-100 rounded-lg"
                    >
                      Отмена
                    </button>
                  </div>

                  {/* Итог */}
                  <div className="mt-3 min-h-[1.25rem]" aria-live="polite">
                    {total !== null ? (
                      <div className="text-lg font-semibold">
                        Итог: {formatCurrencyRub(total)}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-400">Введите корректное количество</div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <div className="max-w-3xl mx-auto text-center text-gray-500 py-8">
              Выберите товар, чтобы посчитать стоимость заказа
            </div>
          )}
        </div>

        <footer className="mt-8 text-xs text-gray-400 text-center">
          Made by GeoNTar
        </footer>
      </div>
    </div>
  );
}
