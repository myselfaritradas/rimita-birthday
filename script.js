document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Overlay & Audio Setup ---
    const enterBtn = document.getElementById('enter-btn');
    const overlay = document.getElementById('entrance-overlay');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');
    
    enterBtn.addEventListener('click', () => {
        // Fade in audio smoothly over 2 seconds
        bgMusic.volume = 0;
        bgMusic.play().then(() => {
            let currentVolume = 0;
            const fadeInterval = setInterval(() => {
                currentVolume += 0.05;
                if (currentVolume >= 1) {
                    bgMusic.volume = 1;
                    clearInterval(fadeInterval);
                } else {
                    bgMusic.volume = currentVolume;
                }
            }, 100); // 20 steps of 100ms = 2000ms
        }).catch(error => console.log("Audio play failed:", error));

        overlay.style.opacity = '0';
        
        setTimeout(() => {
            overlay.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.classList.add('visible');
            setTimeout(initObserver, 100);
        }, 1000); 
    });

    // --- 2. Dynamic Story Generation (Images & Wishes) ---
    const storyContainer = document.getElementById('story-container');
    
    const images = [
        "20240213_201101.jpg", "20240819_195812.jpg", "20241028_213438.jpg", "20241229_151832.jpg",
        "20241229_151842.jpg", "20250201_200800.jpg", "20250415_141437.jpg", "20250415_221057.jpg",
        "20250804_141203.jpg", "20250804_141443.jpg", "20250809_114137.jpg", "20250809_201207.jpg",
        "20250809_201450.jpg", "20250809_214212(1).jpg", "20250809_214429.jpg", "20250908_214608.jpg",
        "20250929_162722.jpg", "20250929_163149.jpg", "20251023_152442.jpg", "20251023_152621(0).jpg",
        "20251023_152712.jpg", "20251023_164706.jpg", "20251023_183328.jpg", "20251117_203434.jpg",
        "20251117_213513.jpg", "20251117_215208.jpg", "20251117_224138.jpg", "20251120_121622(1)(1).jpg",
        "20251120_121658.jpg", "20251213_145526.jpg", "20251214_202302.jpg", "20251226_152410.jpg",
        "20251226_152510(0).jpg", "IMG_3455(1).jpg", "IMG_3645(1).jpg"
    ];

    const wishes = [
        {
            heading: "Threads of Tradition",
            text: "Your hands weave magic onto cloth, bringing such beautiful traditional art to life. Have a bright and beautiful future for you in every stroke and pattern you create."
        },
        {
            heading: "Canvas of Dreams",
            text: "Beyond cloth, your beautiful paintings leave everyone in aweeeeeeeeeeeeeeeeee. You have a gift for capturing the world's beauty and making it your own."
        },
        {
            heading: "Ctrl + Alt + Defeat? 😅",
            text: "Currently pursuing BCA and you absolutely hate it! Just remember, every bug you fix (or create) is just a stepping stone to where you truly want to be. Keep smiling through the CODE!"
        },
        {
            heading: "Radiant as a Sunflower 🌻",
            text: "You always charm everyone with your warmth, just like a sunflower turning towards the light. My greatest wish for you is to always keep that beautiful smile. Remember: 'Never Lose the Sunflower in You'."
        },
        {
            heading: "Miles Apart, Close at Heart",
            text: "If the day comes when your dream job takes you far away, and distance grows between us, know that my heart will ache a little. But I'll always be cheering you on, proud of what you have done and will do in future!"
        }
    ];



    // Inject images and distribute wishes evenly
    let wishIndex = 0;
    // We have 35 images and 5 wishes. We can insert a wish every 7 images (35/5 = 7).
    
    images.forEach((imgFile, index) => {
        // Create Image Card
        const imgCard = document.createElement('div');
        imgCard.className = 'image-card hidden-element';
        
        // All images have been converted to JPG for universal compatibility.
        imgCard.innerHTML = `
            <img src="./assets/${imgFile}" alt="Memory of Rimita" loading="lazy">
        `;
        storyContainer.appendChild(imgCard);

        // After every 7th image (index 6, 13, 20, 27, 34), insert a wish
        if ((index + 1) % 7 === 0 && wishIndex < wishes.length) {
            const wish = wishes[wishIndex];
            const wishCard = document.createElement('div');
            wishCard.className = 'wish-card hidden-element';
            wishCard.innerHTML = `
                <h2 class="cursive-title">${wish.heading}</h2>
                <p class="cursive-main-text">${wish.text}</p>
            `;
            storyContainer.appendChild(wishCard);
            wishIndex++;
        }
    });

    // --- 3. Parallax Effect ---
    const layerBack = document.querySelector('.layer-back');
    const layerMid = document.querySelector('.layer-mid');
    const layerFront = document.querySelector('.layer-front');
    const heroContent = document.querySelector('.hero-content');
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                let scrollY = window.scrollY;
                if (layerBack) layerBack.style.transform = `translateY(${scrollY * 0.5}px)`;
                if (layerMid) layerMid.style.transform = `translateY(${scrollY * 0.25}px)`;
                if (layerFront) layerFront.style.transform = `translateY(${scrollY * 0.1}px)`;
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrollY * 0.35}px)`;
                    let opacity = 1 - (scrollY / 600);
                    heroContent.style.opacity = opacity > 0 ? opacity : 0;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // --- 4. Intersection Observer for Scroll Animations ---
    function initObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-element');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        const hiddenElements = document.querySelectorAll('.hidden-element');
        hiddenElements.forEach(el => observer.observe(el));
    }
});
