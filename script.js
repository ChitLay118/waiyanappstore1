document.addEventListener('DOMContentLoaded', () => {
    const featuredAppListContainer = document.getElementById('featured-app-list-container');
    const allAppListContainer = document.getElementById('all-app-list-container');
    const categoryNav = document.getElementById('category-nav');
    const searchInput = document.getElementById('search-input');

    let currentFilter = 'All Apps';
    let currentSearchTerm = '';
    let featuredIndex = 0;

    const dummyApps = [
        {id:1,name:'Netflix Premium',description:'အကန့်အသတ်မရှိ ရုပ်ရှင်နှင့် တီဗီရှိုးများကြည့်ရှုရန်',size:'69.8 MB',rating:4.9,category:'Entertainment',isFeatured:true,iconUrl:'https://placehold.co/48x48/ff2950/ffffff?text=N',bgImageUrl:'https://i.ibb.co/jkqNvDqR/pexels-dreamypixel-547114.jpg',downloadUrl:'#'},
        {id:2,name:'Spotify Premium',description:'ကြော်ငြာမပါဘဲ အကန့်အသတ်မရှိ သီချင်းနားဆင်ရန်',size:'52.4 MB',rating:4.7,category:'Entertainment',isFeatured:true,iconUrl:'https://placehold.co/48x48/1DB954/ffffff?text=S',bgImageUrl:'https://i.ibb.co/dstKxsX4/pexels-mccutcheon-1191710.jpg',downloadUrl:'#'},
        {id:3,name:'Xcode Video',description:'ဗီဒီယိုအားလုံးကို ကြည့်ရှုနိုင်သည်',size:'15.2 MB',rating:4.0,category:'Utilities',isFeatured:true,iconUrl:'https://placehold.co/48x48/000000/ffffff?text=X',bgImageUrl:'https://i.ibb.co/XHJwdsm/pexels-umkreisel-app-956999.jpg',downloadUrl:'#'},
        {id:4,name:'Sketchware Pro',description:'Android အက်ပ်ဖန်တီးရန် ခေတ်မီ platform',size:'21.2 MB',rating:4.5,category:'Development',isFeatured:true,iconUrl:'https://placehold.co/48x48/4285F4/ffffff?text=S',bgImageUrl:'https://i.ibb.co/YFQkwW8G/photo-2025-09-17-23-50-08.jpg',downloadUrl:'#'},
        {id:5,name:'AIDE Pro 2.8',description:'မိုဘိုင်းအက်ပ်ဖန်တီးရန် Professional Android IDE',size:'31.2 MB',rating:4.4,category:'Development',isFeatured:false,iconUrl:'https://placehold.co/48x48/34A853/ffffff?text=A',downloadUrl:'#'},
        {id:6,name:'Video Downloader',description:'ဝဘ်ဆိုက်အမျိုးမျိုးမှ ဗီဒီယိုများဒေါင်းလုတ်ဆွဲရန်',size:'12.5 MB',rating:4.6,category:'Utilities',isFeatured:false,iconUrl:'https://placehold.co/48x48/990099/ffffff?text=V',downloadUrl:'#'},
        {id:7,name:'Modified Apps',description:'ပြုပြင်ထားသော အက်ပ်များကို ရှာဖွေပြီး ဒေါင်းလုတ်ဆွဲရန်',size:'10.1 MB',rating:4.8,category:'Modified Apps',isFeatured:false,iconUrl:'https://placehold.co/48x48/FF5722/ffffff?text=M',downloadUrl:'#'},
    ];

    const categories = ['All Apps', ...new Set(dummyApps.map(app => app.category))];

    function renderCategories() {
        categoryNav.innerHTML = categories.map(cat => `
            <button
                class="px-4 py-2 mx-1 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer category-button ${currentFilter===cat?'bg-blue-600 text-white shadow-lg':'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
                data-category="${cat}">${cat==='All Apps'?'အက်ပ်အားလုံး':cat}</button>
        `).join('');
        document.querySelectorAll('.category-button').forEach(btn=>{
            btn.addEventListener('click', e=>{
                currentFilter = e.target.dataset.category;
                currentSearchTerm = '';
                searchInput.value = '';
                renderCategories();
                updateUI();
            });
        });
    }

    function renderAppCards(container, appsToRender, isFeatured=false) {
        if(appsToRender.length===0){
            container.innerHTML=`<p class="text-center text-gray-500 col-span-full">အက်ပ်မတွေ့ပါ</p>`;
            return;
        }
        container.innerHTML = appsToRender.map(app => {
            const cardClasses = isFeatured ? 'text-white app-card-bg-image featured-card' : 'bg-white';
            return `
                <div class="app-card p-4 sm:p-6 rounded-2xl shadow-xl flex flex-col space-y-3 ${cardClasses}" style="${isFeatured?'background-image:url('+app.bgImageUrl+');':''}">
                    <div class="app-card-content flex items-center space-x-3">
                        <div class="w-16 h-16 rounded-xl overflow-hidden shadow-lg">
                            <img src="${app.iconUrl}" alt="${app.name}" class="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 class="text-lg font-bold">${app.name}</h3>
                            <p class="text-sm">${app.description}</p>
                        </div>
                    </div>
                    ${!isFeatured?`<a href="${app.downloadUrl}" class="bg-green-500 text-white font-bold py-2 px-6 rounded-full text-center hover:bg-green-600 transition-colors duration-200 self-center w-full mt-auto">ဒေါင်းလုတ်ဆွဲရန်</a>`:''}
                </div>
            `;
        }).join('');
    }

    function updateUI() {
        const filteredApps = dummyApps
            .filter(app => currentFilter==='All Apps' || app.category===currentFilter)
            .filter(app => app.name.toLowerCase().includes(currentSearchTerm.toLowerCase()));

        renderAppCards(featuredAppListContainer, filteredApps.filter(app=>app.isFeatured), true);
        renderAppCards(allAppListContainer, filteredApps.filter(app=>!app.isFeatured), false);
    }

    searchInput.addEventListener('input', e=>{
        currentSearchTerm=e.target.value;
        updateUI();
    });

    renderCategories();
    updateUI();

    // Featured Carousel
    function startFeaturedCarousel(){
        const container=document.getElementById('featured-app-list-container');
        const cards=container.children;
        const total=cards.length;
        setInterval(()=>{
            featuredIndex++;
            if(featuredIndex>=total) featuredIndex=0;
            const cardWidth=cards[0].offsetWidth;
            container.scrollLeft=cardWidth*featuredIndex;
        },3000);
    }
    startFeaturedCarousel();
});
