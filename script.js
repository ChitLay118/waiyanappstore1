document.addEventListener('DOMContentLoaded', () => {
    const featuredContainer = document.getElementById('featured-app-list-container');
    const allContainer = document.getElementById('all-app-list-container');
    const categoryNav = document.getElementById('category-nav');
    const searchInput = document.getElementById('search-input');

    let currentFilter = 'All Apps';
    let currentSearchTerm = '';
    let featuredIndex = 0;

    const dummyApps = [
        {id:1,name:'Netflix Premium',category:'Entertainment',isFeatured:true,
         iconUrl:'https://modyolo.com/wp-content/uploads/2021/09/netflix-150x150.jpg',
         bgImageUrl:'https://i.ibb.co/jkqNvDqR/pexels-dreamypixel-547114.jpg',
         downloadUrl:'https://files.modyolo.com/Netflix./Netflix%20v9.34.0%20MOD.apk'},
        
        {id:2,name:'Spotify Premium',category:'Entertainment',isFeatured:true,
         iconUrl:'https://modyolo.com/wp-content/uploads/2021/11/spotify-apk-mod-premium-150x150.png',
         bgImageUrl:'https://i.ibb.co/dstKxsX4/pexels-mccutcheon-1191710.jpg',
         downloadUrl:'https://files.modyolo.com/Spotify/Spotify_%20v9.0.82.1008%20x.xapk'},
        
        {id:3,name:'WY AppStore',
         category:'Modified Apps',isFeatured:true,iconUrl:'https://i.ibb.co/PzxgMt7N/photo-2025-09-18-00-58-09.jpg',
         bgImageUrl:'https://i.ibb.co/XHJwdsm/pexels-umkreisel-app-956999.jpg',
         downloadUrl:'https://www.mediafire.com/file/n8ohx9xnfisynuw/WY_App_Store.apk/file'},
        
        {id:4,name:'Sketchware Pro',category:'Development',
         isFeatured:true,iconUrl:'https://i.ibb.co/YB24757s/photo-2025-09-18-07-49-55.jpg',
         bgImageUrl:'https://i.ibb.co/YFQkwW8G/photo-2025-09-17-23-50-08.jpg',
         downloadUrl:'https://www.mediafire.com/file/7pi9zf551xbgiy8/Sketchware_pro.apk/file'},
        
        {id:5,name:'AIDE Pro 2.8',category:'Development',
         isFeatured:false,iconUrl:'https://i.ibb.co/8CPMDm7/photo-2025-09-18-07-50-07.jpg',
         downloadUrl:'https://www.mediafire.com/file/rh85g28nbmnur3f/AIDE_Pro_2.8.7-freely.apk/file'},
        
        {id:6,name:'Download Video No Watermark',
         category:'Utilities',isFeatured:false,iconUrl:'https://i.ibb.co/tTrfrTT2/photo-2025-09-18-10-04-51.jpg',
         downloadUrl:'https://www.mediafire.com/file/jcj5q0w5s4t6p3r/AhaTik_Downloader_Premium_v1.52.3_Modded_by_%2540Getmodpcs.apk/file'},
        
        {id:7,name:'IMDB Movies and TV Shows',category:'Entertainment',
         isFeatured:false,iconUrl:'https://i.ibb.co/206dWSK6/photo-2025-09-18-11-23-21.jpg',
         downloadUrl:'https://www.mediafire.com/file/iehjn9emmv2pa2l/IMDb_Premium_v9.3.2.160259480_Modded_by_%2540Getmodpcs.apk/file'},
        
        {id:8,name:'သတင်းနှင့်ဇာတ်ကား',category:'Entertainment',
         isFeatured:false,iconUrl:'https://i.ibb.co/NRB7DRs/IMG-20250907-105744.png',
         downloadUrl:'https://www.mediafire.com/file/kz2cas0hpx4p2mz/%E1%80%9E%E1%80%90%E1%80%84%E1%80%BA%E1%80%B8%E1%80%94%E1%80%BE%E1%80%84%E1%80%BA%E1%80%B7%E1%80%87%E1%80%AC%E1%80%90%E1%80%BA%E1%80%80%E1%80%AC%E1%80%B8update.apk/file'},
         
        {id:9,name:'Netflix Premium',category:'Entertainment',
         isFeatured:false,iconUrl:'https://modyolo.com/wp-content/uploads/2021/09/netflix-150x150.jpg',
         downloadUrl:'https://files.modyolo.com/Netflix./Netflix%20v9.34.0%20MOD.apk'},      
    
    
    
    
    ];
    const categories = ['All Apps', ...new Set(dummyApps.map(a=>a.category))];

    function renderCategories(){
        categoryNav.innerHTML = categories.map(cat => `
            <button class="px-4 py-2 mx-1 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer category-button ${currentFilter===cat?'bg-blue-600 text-white shadow-lg':'bg-gray-200 text-gray-700 hover:bg-gray-300'}" data-category="${cat}">
                ${cat==='All Apps'?'အက်ပ်အားလုံး':cat}
            </button>
        `).join('');
        document.querySelectorAll('.category-button').forEach(btn=>{
            btn.addEventListener('click',e=>{
                currentFilter=e.target.dataset.category;
                currentSearchTerm='';
                searchInput.value='';
                renderCategories();
                updateUI();
            });
        });
    }

    function renderAppCards(container, appsToRender, isFeatured=false){
        if(appsToRender.length===0){
            container.innerHTML=`<p class="text-center text-gray-500 col-span-full">အက်ပ်မတွေ့ပါ</p>`;
            return;
        }
        container.innerHTML = appsToRender.map(app => {
            if(isFeatured){
                return `
                <a href="${app.downloadUrl}" class="app-card p-4 sm:p-6 rounded-2xl shadow-xl flex flex-col space-y-3 text-white app-card-bg-image featured-card" style="background-image:url(${app.bgImageUrl})">
                    <div class="app-card-content flex items-center space-x-3">
                        <div class="w-16 h-16 rounded-xl overflow-hidden shadow-lg">
                            <img src="${app.iconUrl}" alt="${app.name}" class="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 class="text-lg font-bold">${app.name}</h3>
                            
                        </div>
                    </div>
                </a>
                `;
            } else {
                return `
                <div class="app-card p-4 sm:p-6 rounded-2xl shadow-xl flex flex-col items-center space-y-3 bg-white text-center">
                    <div class="w-24 h-24 rounded-xl overflow-hidden shadow-lg">
                        <img src="${app.iconUrl}" alt="${app.name}" class="w-full h-full object-cover" />
                    </div>
                    <h3 class="text-lg font-bold">${app.name}</h3>
                    <p class="text-sm text-gray-500">${app.category}</p>
            
                    <a href="${app.downloadUrl}" class="bg-green-500 text-white font-bold py-2 px-6 rounded-full text-center hover:bg-green-600 transition-colors duration-200 w-full">
                        Download
                    </a>
                </div>
                `;
            }
        }).join('');
    }

    function updateUI(){
        const filtered=dummyApps
            .filter(a=>currentFilter==='All Apps'||a.category===currentFilter)
            .filter(a=>a.name.toLowerCase().includes(currentSearchTerm.toLowerCase()));
        renderAppCards(featuredContainer,filtered.filter(a=>a.isFeatured),true);
        renderAppCards(allContainer,filtered.filter(a=>!a.isFeatured),false);
    }

    searchInput.addEventListener('input',e=>{
        currentSearchTerm=e.target.value;
        updateUI();
    });

    renderCategories();
    updateUI();

    // Featured Carousel
    function startFeaturedCarousel(){
        const cards=featuredContainer.children;
        setInterval(()=>{
            if(cards.length===0) return;
            const perView=window.innerWidth>=1024?2:1;
            featuredIndex += perView;
            if(featuredIndex>=cards.length) featuredIndex=0;
            const cardWidth=cards[0].offsetWidth;
            featuredContainer.scrollLeft = cardWidth*featuredIndex;
        },3000);
    }

    startFeaturedCarousel();
});
