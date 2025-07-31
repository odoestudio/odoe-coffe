document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('card-container');
    const themeToggle = document.getElementById('theme-toggle');
    const modal = document.getElementById('daily-brew-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const navBtns = document.querySelectorAll('.nav-btn');
    const screens = document.querySelectorAll('.screen');

    let currentUserIndex = 0;
    let currentCard;

    // --- INITIALIZATION ---
    function init() {
        loadNextCard();
        setupEventListeners();
        ui.renderHistory();
        ui.renderTeaFeed();
        ui.renderCrushBoard();
        
        // Show modal on first visit (or daily)
        setTimeout(() => {
            if(modal) modal.classList.remove('hidden');
        }, 2000);
    }

    // --- CARD SWIPING LOGIC ---
    function loadNextCard() {
        if (currentUserIndex >= users.length) {
            cardContainer.innerHTML = '<p class="font-gochi-hand text-2xl text-center text-stone-500">No more profiles...<br>go touch grass.</p>';
            return;
        }
        currentCard = ui.createSwipeCard(users[currentUserIndex]);
        cardContainer.innerHTML = '';
        cardContainer.appendChild(currentCard);
        addSwipeListeners(currentCard);
    }

    function addSwipeListeners(card) {
        let startX, startY, isDragging = false;

        function onDragStart(e) {
            isDragging = true;
            startX = e.pageX ?? e.touches[0].pageX;
            startY = e.pageY ?? e.touches[0].pageY;
            card.style.transition = 'none';
        }

        function onDragMove(e) {
            if (!isDragging) return;
            e.preventDefault();
            const currentX = e.pageX ?? e.touches[0].pageX;
            const currentY = e.pageY ?? e.touches[0].pageY;
            const diffX = currentX - startX;
            const diffY = currentY - startY;
            const rotate = diffX * 0.1;
            card.style.transform = `translate(${diffX}px, ${diffY}px) rotate(${rotate}deg)`;
        }

        function onDragEnd(e) {
            if (!isDragging) return;
            isDragging = false;
            const currentX = e.changedTouches ? e.changedTouches[0].pageX : e.pageX;
            const diffX = currentX - startX;

            card.style.transition = 'transform 0.3s ease';
            if (Math.abs(diffX) > card.offsetWidth / 4) {
                const direction = diffX > 0 ? 1 : -1;
                card.style.transform = `translate(${direction * 500}px, 0) rotate(${direction * 30}deg)`;
                currentUserIndex++;
                setTimeout(loadNextCard, 300);
            } else {
                card.style.transform = 'translate(0, 0) rotate(0)';
            }
        }

        card.addEventListener('mousedown', onDragStart);
        document.addEventListener('mousemove', onDragMove);
        document.addEventListener('mouseup', onDragEnd);
        card.addEventListener('touchstart', onDragStart, { passive: true });
        document.addEventListener('touchmove', onDragMove);
        document.addEventListener('touchend', onDragEnd);
    }

    // --- NAVIGATION ---
    function handleNavClick(e) {
        const targetScreenId = e.currentTarget.dataset.screen;
        
        screens.forEach(screen => {
            screen.classList.toggle('hidden', screen.id !== targetScreenId);
            screen.classList.toggle('active', screen.id === targetScreenId);
        });

        navBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.screen === targetScreenId);
        });
    }

    // --- EVENT LISTENERS ---
    function setupEventListeners() {
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            const icon = themeToggle.querySelector('i');
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
        });

        if(closeModalBtn) closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));

        navBtns.forEach(btn => btn.addEventListener('click', handleNavClick));
    }

    init();
});