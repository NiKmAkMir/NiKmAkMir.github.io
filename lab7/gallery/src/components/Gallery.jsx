import React, { useRef, useState, useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const base = import.meta.env.BASE_URL

const IMAGES = [
    `${base}images/img1.jpeg`,
    `${base}images/img2.jpg`,
    `${base}images/img3.jpg`,
    `${base}images/img4.jpg`,
    `${base}images/img5.jpg`,
    `${base}images/img6.jpg`,
    `${base}images/img7.jpg`,
    `${base}images/img8.jpg`,
]

function Arrow({ onClick, direction }) {
    return (
        <button
            className={`arrow arrow-${direction}`}
            onClick={onClick}
            aria-label={direction === 'next' ? 'Следующий слайд' : 'Предыдущий слайд'}
        >
            {direction === 'next' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M9 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M15 6l-6 6 6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        </button>
    )
}

export default function Gallery() {
    const sliderRef = useRef(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow())

    function getSlidesToShow() {
        const w = window.innerWidth
        if (w < 640) return 1
        return 3
    }

    useEffect(() => {
        function handleResize() {
            setSlidesToShow(getSlidesToShow())
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const totalSlides = IMAGES.length
    const totalPages = Math.ceil(totalSlides / slidesToShow)

    const settings = {
        dots: false,
        infinite: false,
        speed: 480,
        slidesToShow,
        slidesToScroll: slidesToShow,
        swipeToSlide: true,
        nextArrow: <Arrow direction="next" />,
        prevArrow: <Arrow direction="prev" />,
        beforeChange: (oldIndex, newIndex) => {
            let page
            if (slidesToShow === 1) {
                page = newIndex + 1
            } else {
                const lastVisibleSlide = newIndex + slidesToShow - 1
                page = Math.ceil(lastVisibleSlide / slidesToShow)
            }
            setCurrentPage(page)
        },
        responsive: [
            { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    }

    function goToPage(page) {
        const index = (page - 1) * slidesToShow
        if (sliderRef.current) sliderRef.current.slickGoTo(index)
        setCurrentPage(page)
    }

    return (
        <div className="gallery-root">
            <div className="slider-wrap">
                <Slider ref={sliderRef} {...settings}>
                    {IMAGES.map((src, i) => (
                        <div key={i} className="slide">
                            <div className="slide-card">
                                <img src={src} alt={`Карточка ${i + 1}`} loading="lazy" />
                                <div className="slide-meta">
                                    <h3>Снимок #{i + 1}</h3>
                                    <p>Невероятные просторы и свет.</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            <div className="pager">
                <div
                    className="pager-buttons"
                    role="tablist"
                    aria-label="Пейджер галереи"
                >
                    {Array.from({ length: totalPages }).map((_, idx) => {
                        const page = idx + 1
                        const active = page === currentPage
                        return (
                            <button
                                key={page}
                                className={`pager-btn ${active ? 'active' : ''}`}
                                onClick={() => goToPage(page)}
                                aria-current={active ? 'true' : 'false'}
                            >
                                {page}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
