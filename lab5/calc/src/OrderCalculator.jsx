import React, { useState, useRef, useEffect } from "react";

const PRODUCTS = [
    {
        id: "phone-redmi12", title: "Xiaomi Redmi Note 12", price: 19999,
        img: "https://avatars.mds.yandex.net/i?id=e45272aeb34422ecbc977bd7aa0e15fc_l-10848716-images-thumbs&n=13"
    },
    {
        id: "phone-samsung-a54", title: "Samsung Galaxy A54", price: 39999,
        img: "https://70.img.avito.st/image/1/1.VAxM_ba4-OV6VDrgaNB8UzRf-uPyXHrtOln65_xU8O_6.KK2eyj74T1Tk2MjSEAt1G_lYJbLTHJq7keDDCg0Mq_I"
    },
    {
        id: "iphone-14", title: "Apple iPhone 14 128GB", price: 49999,
        img: "https://30.img.avito.st/image/1/1.R49hJba-62YXgBlgYzg5lwaE6WDTiO9k344pYieC6WTVhK8.1nl2lYRmqydHwflSbpnhWutzQJmabRfMJU47KvFucG8?cqp=2.9Ww5Fuaw7uD9ZNOXvAe_1Xv_WxDsoR9KOH8G0no83A=="
    },
    {
        id: "laptop-lenovo", title: "Lenovo IdeaPad Slim 3", price: 35999,
        img: "https://avatars.mds.yandex.net/i?id=7455c3d90549d1aefe43bda95dd7ee702bbfd396-16400625-images-thumbs&n=13"
    },
    {
        id: "laptop-asus-tuf", title: "ASUS TUF Gaming F15", price: 73999,
        img: "https://avatars.mds.yandex.net/get-mpic/11405706/2a0000018cd77e0d5b7bf2d532f4540ce5ae/orig"
    },
    {
        id: "ssd-wd-1tb", title: "WD Blue SN570 1TB (NVMe)", price: 7499,
        img: "https://a.allegroimg.com/s720/11c446/823b4e954af8aaf292f7cdf7082f/Dysk-SSD-WD-Blue-SN570-WDS250G3B0C-250-GB-M-2-PCIe-NVMe-3-0-x4"
    },
    {
        id: "mouse-mx", title: "Logitech MX Master 3", price: 7990,
        img: "https://i.ebayimg.com/images/g/IbcAAOSwWBNmXngM/s-l1600.jpg"
    },
    {
        id: "headphones-sony", title: "Sony WH-1000XM4", price: 27990,
        img: "https://cdn.mos.cms.futurecdn.net/ApSCVe5AyXT7VC8wAssbK8-1200-80.png"
    },
    {
        id: "console", title: "Sony PlayStation 5 (Disk)", price: 79990,
        img: "https://m.media-amazon.com/images/I/517hCmftoEL.jpg"
    },
    {
        id: "earbuds", title: "Беспроводные наушники TWS", price: 4990,
        img: "https://avatars.mds.yandex.net/get-mpic/7394206/img_id580277346318901299.jpeg/orig"
    }
];

function formatCurrencyRub(n) {
    return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB" }).format(n);
}

export default function ProductGallery() {
    const [products] = useState(PRODUCTS);
    const [selectedId, setSelectedId] = useState(null);
    const [qty, setQty] = useState("1");
    const [error, setError] = useState("");
    const [total, setTotal] = useState(null);
    const [clickedCard, setClickedCard] = useState(null);
    const scrollerRef = useRef(null);

    useEffect(() => {
        if (!clickedCard) return;
        const t = setTimeout(() => setClickedCard(null), 700);
        return () => clearTimeout(t);
    }, [clickedCard]);

    function onImageError(e) {
        e.currentTarget.onerror = null;
        e.currentTarget.src = "https://via.placeholder.com/800x600?text=No+Image";
    }

    function validateQuantity(q) {
        return /^\s*[1-9]\d*\s*$/.test(q);
    }

    function handleSelect(p) {
        setSelectedId(p.id);
        setQty("1");
        setTotal(null);
        setError("");
        setClickedCard(p.id);
    }

    function calculate() {
        setError("");
        setTotal(null);
        const p = products.find(x => x.id === selectedId);
        if (!p) { setError("Выберите товар."); return; }
        if (!validateQuantity(qty)) { setError("Количество должно быть целым положительным числом."); return; }
        const q = parseInt(qty, 10);
        const sum = Math.round((p.price * q) * 100) / 100;
        setTotal(sum);
        setClickedCard(p.id);
    }

    function scroll(direction = "next") {
        const node = scrollerRef.current;
        if (!node) return;
        const offset = Math.round(node.clientWidth * 0.8);
        if (direction === "next") node.scrollBy({ left: offset, behavior: "smooth" });
        else node.scrollBy({ left: -offset, behavior: "smooth" });
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-12 pb-12 px-4">

            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">Каталог электроники</h1>
                        <p className="text-gray-500 mt-2 max-w-xl">Выберите любой товар и подсчитайте сколько он будет стоить</p>
                    </div>

                    <div className="flex gap-2 mt-3 sm:mt-0">
                        <button
                            onClick={() => scroll("prev")}
                            aria-label="Предыдущие товары"
                            className="inline-flex items-center justify-center h-10 px-4 rounded-lg bg-white shadow hover:bg-gray-50"
                        >
                            ‹
                        </button>

                        <button
                            onClick={() => scroll("next")}
                            aria-label="Следующие товары"
                            className="inline-flex items-center justify-center h-10 px-4 rounded-lg bg-indigo-600 text-white shadow hover:bg-indigo-700"
                        >
                            ›
                        </button>
                    </div>
                </header>

                <div className="relative">
                    <div
                        ref={scrollerRef}
                        role="list"
                        aria-label="Список товаров"
                        className="custom-scrollbar grid grid-flow-col auto-cols-[minmax(220px,1fr)] grid-rows-2 gap-4 overflow-x-auto py-3 px-2"
                        style={{ WebkitOverflowScrolling: "touch" }}
                    >
                        {products.map((p) => {
                            const isSelected = selectedId === p.id;
                            const isClicked = clickedCard === p.id;
                            return (
                                <article
                                    key={p.id}
                                    role="listitem"
                                    onClick={() => handleSelect(p)}
                                    className={`snap-start flex flex-col bg-white rounded-2xl shadow-sm p-3 transition-transform duration-200 ease-in-out transform cursor-pointer min-w-[220px]`}
                                >
                                    <div className={`rounded-xl overflow-hidden bg-gray-100 h-36 flex items-center justify-center card-img ${isClicked ? "ring-2 ring-offset-2 ring-indigo-300 scale-105" : ""}`}>
                                        <img
                                            src={p.img}
                                            alt={p.title}
                                            className="w-full h-full"
                                            onError={onImageError}
                                            loading="lazy"
                                        />
                                    </div>

                                    <div className="mt-3 flex-1 min-w-0 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-semibold text-sm text-gray-900 truncate">{p.title}</h3>
                                            <p className="text-xs text-gray-400 mt-1 truncate">{p.id}</p>
                                        </div>

                                        <div className="mt-3 flex items-center justify-between">
                                            <div className="text-lg font-semibold">{formatCurrencyRub(p.price)}</div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleSelect(p); setClickedCard(p.id); }}
                                                    className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-600 text-white rounded-md text-sm shadow-sm transition-transform active:scale-95"
                                                    aria-pressed={isSelected}
                                                >
                                                    Купить
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-8">
                    {selectedId ? (
                        <section className="max-w-3xl mx-auto bg-white rounded-2xl p-6 shadow">
                            <div className="flex flex-col sm:flex-row gap-4 items-start min-w-0">
                                <div className="sm:w-36 h-28 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                    <img
                                        src={products.find(x => x.id === selectedId)?.img}
                                        alt="selected"
                                        onError={onImageError}
                                        className="h-full"
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold truncate">{products.find(x => x.id === selectedId)?.title}</h3>
                                    <div className="text-sm text-gray-500 mt-1">Цена за единицу: <span className="font-medium">{formatCurrencyRub(products.find(x => x.id === selectedId)?.price || 0)}</span></div>

                                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2">
                                        <label className="text-sm shrink-0">Количество</label>

                                        <input
                                            value={qty}
                                            onChange={(e) => setQty(e.target.value)}
                                            inputMode="numeric"
                                            className="w-full sm:w-28 rounded-lg border border-gray-200 p-2 text-sm min-w-0"
                                            aria-label="Количество товара"
                                        />

                                        <div className="flex gap-2 mt-2 sm:mt-0">
                                            <button onClick={calculate} className="px-4 py-2 bg-green-600 text-white rounded-lg">Посчитать</button>
                                            <button onClick={() => { setSelectedId(null); setTotal(null); setError(""); }} className="px-3 py-2 bg-gray-100 rounded-lg">Отмена</button>
                                        </div>
                                    </div>

                                    <div className="mt-3 min-h-[1.25rem]" aria-live="polite">
                                        {error ? <div className="text-red-600 font-medium">{error}</div> : null}
                                        {total !== null ? <div className="text-lg font-semibold">Итог: {formatCurrencyRub(total)}</div> : null}
                                    </div>
                                </div>
                            </div>
                        </section>
                    ) : (
                        <div className="max-w-3xl mx-auto text-center text-gray-500 py-8">Выберите товар, чтобы посчитать стоимость заказа</div>
                    )}
                </div>

                <footer className="mt-8 text-xs text-gray-400 text-center">
                    Made by GeoNTar
                </footer>
            </div>
        </div>
    );
}
