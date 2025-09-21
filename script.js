function renderAppCards(container, appsToRender) {
    if (appsToRender.length === 0) {
        container.innerHTML = `<p class="text-center text-gray-500 col-span-full">အက်ပ်မတွေ့ပါ</p>`;
        return;
    }

    container.innerHTML = appsToRender.map(app => {
        const cardStyle = app.isFeatured
            ? `background-image: url('${app.bgImageUrl}');`
            : '';
        const cardClasses = app.isFeatured ? 'text-white app-card-bg-image' : 'bg-white';
        const textColorClass = app.isFeatured ? 'text-white' : 'text-gray-800';

        return `
            <div class="app-card p-4 sm:p-6 rounded-2xl shadow-xl flex flex-col space-y-3 ${cardClasses}" style="${cardStyle}">
                <div class="app-card-content flex items-center space-x-3">
                    <div class="w-16 h-16 rounded-xl overflow-hidden shadow-lg">
                        <img src="${app.iconUrl}" alt="${app.name} icon" class="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 class="text-lg font-bold ${textColorClass}">${app.name}</h3>
                        <p class="text-sm ${textColorClass}">${app.description}</p>
                        <div class="flex items-center space-x-2 mt-1">
                            <span class="text-yellow-400">
                                <svg class="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.948a1 1 0 00.95.691h4.15c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.948c.3.921-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 00-1.176 0l-3.366 2.446c-.785.57-1.84-.197-1.54-1.118l1.287-3.948a1 1 0 00-.364-1.118L2.091 9.376c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.691l1.286-3.948z" />
                                </svg>
                            </span>
                            <span class="text-sm font-semibold ${textColorClass}">${app.rating}</span>
                            <span class="text-sm ${textColorClass}">· ${app.size}</span>
                        </div>
                    </div>
                </div>
                <a href="${app.downloadUrl}" class="bg-green-500 text-white font-bold py-2 px-6 rounded-full text-center hover:bg-green-600 transition-colors duration-200 self-center w-full mt-auto">
                    ဒေါင်းလုတ်ဆွဲရန်
                </a>
            </div>
        `;
    }).join('');
}
