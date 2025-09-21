document.addEventListener('DOMContentLoaded', () => {
    const featuredAppListContainer = document.getElementById('featured-app-list-container');
    const allAppListContainer = document.getElementById('all-app-list-container');
    const categoryNav = document.getElementById('category-nav');
    const searchInput = document.getElementById('search-input');

    let currentFilter = 'All Apps';
    let currentSearchTerm = '';

    const dummyApps = [
        {
            id: 1,
            name: 'Netflix Premium',
            description: 'အကန့်အသတ်မရှိ ရုပ်ရှင်နှင့် တီဗီရှိုးများကြည့်ရှုရန်',
            size: '69.8 MB',
            rating: 4.9,
            category: 'Entertainment',
            isFeatured: true,
            iconUrl: 'https://placehold.co/48x48/ff2950/ffffff?text=N',
            bgImageUrl: 'https://i.ibb.co/jkqNvDqR/pexels-dreamypixel-547114.jpg',
            downloadUrl: '#',
        },
        {
            id: 2,
            name: 'Spotify Premium',
            description: 'ကြော်ငြာမပါဘဲ အကန့်အသတ်မရှိ သီချင်းနားဆင်ရန်',
            size: '52.4 MB',
            rating: 4.7,
            category: 'Entertainment',
            isFeatured: true,
            iconUrl: 'https://placehold.co/48x48/1DB954/ffffff?text=S',
            bgImageUrl: 'https://i.ibb.co/dstKxsX4/pexels-mccutcheon-1191710.jpg',
            downloadUrl: '#',
        },
        {
            id: 3,
            name: 'Xcode Video',
            description: 'ဗီဒီယိုအားလုံးကို ကြည့်ရှုနိုင်သည်',
            size: '15.2 MB',
            rating: 4.0,
            category: 'Utilities',
            isFeatured: true,
            iconUrl: 'https://placehold.co/48x48/000000/ffffff?text=X',
            bgImageUrl: 'https://i.ibb.co/XHJwdsm/pexels-umkreisel-app-956999.jpg',
            downloadUrl: '#',
        },
        {
            id: 4,
            name: 'Sketchware Pro',
            description: 'Android အက်ပ်ဖန်တီးရန် ခေတ်မီ platform',
            size: '21.2 MB',
            rating: 4.5,
            category: 'Development',
            isFeatured: true,
            iconUrl: 'https://placehold.co/48x48/4285F4/ffffff?text=S',
            bgImageUrl: 'https://i.ibb.co/YFQkwW8G/photo-2025-09-17-23-50-08.jpg',
            downloadUrl: '#',
        },
        {
            id: 5,
            name: 'AIDE Pro 2.8',
            description: 'မိုဘိုင်းအက်ပ်ဖန်တီးရန် Professional Android IDE',
            size: '31.2 MB',
            rating: 4.4,
            category: 'Development',
            isFeatured: false,
            iconUrl: 'https://placehold.co/48x48/34A853/ffffff?text=A',
            downloadUrl: '#',
        },
        {
            id: 6,
            name: 'Video Downloader',
            description: 'ဝဘ်ဆိုက်အမျိုးမျိုးမှ ဗီဒီယိုများဒေါင်းလုတ်ဆွဲရန်',
            size: '12.5 MB',
            rating: 4.6,
            category: 'Utilities',
            isFeatured: false,
            iconUrl: 'https://placehold.co/48x48/990099/ffffff?text=V',
            downloadUrl: '#',
        },
        {
            id: 7,
            name: 'Modified Apps',
            description: 'ပြုပြင်ထားသော အက်ပ်များကို ရှာဖွေပြီး ဒေါင်းလုတ်ဆွဲရန်',
            size: '10.1 MB',
            rating: 4.8,
            category: 'Modified Apps',
            isFeatured: false,
            iconUrl: 'https://placehold.co/48x48/FF5722/ffffff?text=M',
            downloadUrl: '#',
        },
    ];

    const categories = ['All Apps', ...new Set(dummyApps.map(app => app.category))];

    function renderAppCards(container, appsToRender) {
        if (appsToRender.length === 0) {
            container.innerHTML = `<p class="text-center text-gray-500 col-span-full">အက်ပ်မတွေ့ပါ</p>`;
            return;
        }

        container.innerHTML = appsToRender.map(app => {
            const cardStyle = app.isFeatured
                ? `background-image: url('${app.bgImageUrl}');`
                : '';
            const textColorClass = app.isFeatured ? 'text-white' : 'text-gray-800';

            return `
                <div class="app-card p-4 rounded-2xl shadow-xl flex flex-col space-y-3 ${app.isFeatured ? 'text-white app-card-bg-image' : 'bg-white'}" style="${cardStyle}">
                    <div class="flex items-center space-x-3">
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
                    <a href="${app.downloadUrl}" class="bg-green-500 text-white font-bold py-2 px-6 rounded-full text-center hover:bg-green-600 transition-colors duration-200 self-center w-full">
                        ဒေါင်းလုတ်ဆွဲရန်
                    </a>
                </div>
