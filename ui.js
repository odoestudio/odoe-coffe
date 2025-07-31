const ui = {
    createSwipeCard: (user) => {
        const card = document.createElement('div');
        card.className = 'swipe-card';
        card.innerHTML = `
            <div class="card-content sketchy-border w-full h-full relative">
                <img src="${user.image}" alt="${user.name}" class="card-image">
                <div class="card-info">
                    <h3>${user.name}, ${user.age}</h3>
                    <p class="font-kalam">${user.bio}</p>
                </div>
                ${user.backgroundCheck[0].includes('red flag') ? `<div class="card-sticker">✨red flag✨</div>` : ''}
            </div>
        `;
        return card;
    },

    renderHistory: () => {
        const container = document.getElementById('history-content');
        container.innerHTML = users.map(user => `
            <div class="sketchy-border-sm bg-paper-light/80 p-4 rounded-lg text-stone-800">
                <div class="flex items-start space-x-4">
                    <img src="${user.image}" class="w-16 h-16 rounded-full object-cover sketchy-border-sm border-2 border-stone-400">
                    <div>
                        <h3 class="font-gochi-hand text-2xl">${user.name}</h3>
                        <div class="flex items-center my-1">
                            ${'☕'.repeat(user.rating)}<span class="text-stone-400">${'☕'.repeat(5 - user.rating)}</span>
                        </div>
                        <p class="font-kalam text-sm italic">"${user.notes}"</p>
                        <div class="mt-2">
                            <h4 class="font-bold text-sm">Background Check Tea:</h4>
                            <ul class="list-disc list-inside text-xs font-kalam">
                                ${user.backgroundCheck.map(note => `<li>${note}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    },

    renderTeaFeed: () => {
        const container = document.getElementById('feed-content');
        container.innerHTML = teaFeed.map(post => `
            <div class="sketchy-border-sm bg-paper-light/80 p-3 rounded-lg text-stone-800">
                <p class="font-kalam"><strong class="font-patrick-hand text-blue-600">@${post.user}:</strong> ${post.comment}</p>
            </div>
        `).join('');
    },

    renderCrushBoard: () => {
        const container = document.getElementById('crush-board-content');
        const crushes = users.filter(u => u.isCrush);
        container.innerHTML = crushes.map(crush => `
            <div class="relative group">
                <img src="${crush.image}" class="w-full h-auto object-cover sketchy-border-sm border-2 border-pink-400">
                <div class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span class="text-white font-gochi-hand text-2xl">${crush.name}</span>
                </div>
            </div>
        `).join('');
    }
};