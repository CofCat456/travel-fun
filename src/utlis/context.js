import L from 'leaflet';

export const socialMedia = [
  {
    icon: 'github',
    href: 'https://github.com/CofCat456'
  },
  {
    icon: 'mail',
    href: 'mailto:a25690756@gmail.com'
  },
  {
    icon: 'public',
    href: 'https://www.cofcat.com/'
  }
];

export const countryMap = new Map().set('taiwan', '台灣');

export const cityMap = new Map()
  .set('taipei', '台北')
  .set('keelung', '基隆')
  .set('new-taipei', '新北')
  .set('taoyuan', '桃園')
  .set('hsinchu', '新竹')
  .set('miaoli', '苗栗')
  .set('taichung', '台中')
  .set('changhua', '彰化')
  .set('nantou', '南投')
  .set('yunlin', '雲林')
  .set('chiayi', '嘉義')
  .set('tainan', '台南')
  .set('kaohsiung', '高雄')
  .set('pingtung', '屏東')
  .set('yilan', '宜蘭')
  .set('hualien', '花蓮')
  .set('taitung', '台東')
  .set('penghu', '澎湖');

export const categoryMap = new Map().set('tickets', '門票').set('package', '套票');

export const sortMap = new Map()
  .set('', '熱門程度')
  .set('userRating', '用戶評價')
  .set('priceLowToHigh', '價格：低到高')
  .set('newArrivals', '最新上架');

export const iconsConfig = {};

export const icons = {
  orange: new L.Icon({
    iconUrl:
      'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
};

export const unitList = ['張'];

export const mockProducts = [
  {
    title: '北海岸自行車一日遊',
    location: '新北市',
    evaluate: 4.5,
    evaluateTotal: 23,
    price: 700,
    originprice: 1000,
    image: '/images/top-10/top10_1.png',
    geometry: {
      type: 'Point',
      coordinates: [25.2138957, 121.5033791]
    }
  },
  {
    title: '臺灣國家美術館門票',
    location: '台中',
    evaluate: 4,
    evaluateTotal: 23,
    price: 200,
    originprice: 250,
    image: '/images/top-10/top10_2.png',
    geometry: {
      type: 'Point',
      coordinates: [24.1578784, 120.4961373]
    }
  },
  {
    title: '台北野柳地質公園半日遊',
    location: '台北',
    evaluate: 4.5,
    evaluateTotal: 23,
    price: 800,
    originprice: 1000,
    image: '/images/top-10/top10_4.png',
    geometry: {
      type: 'Point',
      coordinates: [25.2063972, 121.6817111]
    }
  },
  {
    title: '台中大坑風景區租單車',
    location: '台中',
    evaluate: 4,
    evaluateTotal: 23,
    price: 300,
    originprice: 400,
    image: '/images/top-10/top10_5.png',
    geometry: {
      type: 'Point',
      coordinates: [24.1883564, 120.7359593]
    }
  },
  {
    title: '台南安平漁港釣魚體驗',
    location: '台南',
    evaluate: 5,
    evaluateTotal: 23,
    price: 500,
    originprice: 800,
    image: '/images/top-10/top10_1.png',
    geometry: {
      type: 'Point',
      coordinates: [22.9921086, 120.1444015]
    }
  },
  {
    title: '墾丁水上活動｜香蕉船',
    location: '屏東',
    evaluate: 4.5,
    evaluateTotal: 23,
    price: 500,
    originprice: 700,
    image: '/images/top-10/top10_2.png',
    geometry: {
      type: 'Point',
      coordinates: [21.9592763, 120.7642527]
    }
  },
  {
    title: '石門水庫單車一日遊',
    location: '新北市',
    evaluate: 4.5,
    evaluateTotal: 23,
    price: 800,
    originprice: 1000,
    image: '/images/top-10/top10_3.png',
    geometry: {
      type: 'Point',
      coordinates: [24.8099547, 121.2579167]
    }
  },
  {
    title: '鹿港老街踏青體驗',
    location: '台中',
    evaluate: 4,
    evaluateTotal: 23,
    price: 250,
    originprice: 300,
    image: '/images/top-10/top10_4.png',
    geometry: {
      type: 'Point',
      coordinates: [24.0563059, 120.430393]
    }
  },
  {
    title: '太魯閣國家公園一日遊',
    location: '花蓮',
    evaluate: 4.5,
    evaluateTotal: 23,
    price: 1599,
    originprice: 1899,
    image: '/images/top-10/top10_2.png',
    geometry: {
      type: 'Point',
      coordinates: [24.2008139, 121.4520192]
    }
  },
  {
    title: '彰化鹿港｜古蹟文化探索一日遊',
    location: '彰化',
    evaluate: 4,
    evaluateTotal: 23,
    price: 799,
    originprice: 999,
    image: '/images/top-10/top10_4.png',
    geometry: {
      type: 'Point',
      coordinates: [24.0832268, 120.3999219]
    }
  },
  {
    title: '阿里山森林鐵路一日遊',
    location: '嘉義',
    evaluate: 4,
    evaluateTotal: 23,
    price: 899,
    originprice: 1099,
    image: '/images/top-10/top10_5.png',
    geometry: {
      type: 'Point',
      coordinates: [23.4868266, 120.4483444]
    }
  },
  {
    title: '台中草悟道單車漫遊',
    location: '台中',
    evaluate: 5,
    evaluateTotal: 23,
    price: 499,
    originprice: 699,
    image: '/images/top-10/top10_6.png',
    geometry: {
      type: 'Point',
      coordinates: [24.1484053, 120.6625813]
    }
  },
  {
    title: '台中彩虹眷村做陶器體驗',
    location: '台中',
    evaluate: 5,
    evaluateTotal: 23,
    price: 899,
    originprice: 1299,
    image: '/images/top-10/top10_2.png',
    geometry: {
      type: 'Point',
      coordinates: [24.1337193, 120.607655]
    }
  },
  {
    title: '九份老街包包製作DIY',
    location: '新北市',
    evaluate: 4.5,
    evaluateTotal: 23,
    price: 599,
    originprice: 799,
    image: '/images/top-10/top10_3.png',
    geometry: {
      type: 'Point',
      coordinates: [25.1098743, 121.842994]
    }
  },
  {
    title: '花蓮秀姑巒溪泛舟體驗',
    location: '花蓮',
    evaluate: 4,
    evaluateTotal: 23,
    price: 1299,
    originprice: 1499,
    image: '/images/top-10/top10_4.png',
    geometry: {
      type: 'Point',
      coordinates: [23.3255398, 121.2025143]
    }
  },
  {
    title: '台東泰源森林浴場門票',
    location: '台東',
    evaluate: 4,
    evaluateTotal: 23,
    price: 299,
    originprice: 399,
    image: '/images/top-10/top10_1.png',
    geometry: {
      type: 'Point',
      coordinates: [22.9928411, 121.2881932]
    }
  },
  {
    title: '台南安平古堡門票',
    location: '台南',
    evaluate: 4,
    evaluateTotal: 23,
    price: 199,
    originprice: 299,
    image: '/images/top-10/top10_3.png',
    geometry: {
      type: 'Point',
      coordinates: [23.0015142, 120.1584357]
    }
  },
  {
    title: '台中谷關溫泉體驗',
    location: '台中',
    evaluate: 4.8,
    evaluateTotal: 23,
    price: 2500,
    originprice: 3500,
    image: '/images/top-10/top10_5.png',
    geometry: {
      type: 'Point',
      coordinates: [24.2033522, 121.0004119]
    }
  },
  {
    title: '彰化埔鹽鄉南新彩繪村門票',
    location: '彰化',
    evaluate: 4,
    evaluateTotal: 23,
    price: 100,
    originprice: 150,
    image: '/images/top-10/top10_1.png',
    geometry: {
      type: 'Point',
      coordinates: [23.9934579, 120.4269515]
    }
  },
  {
    title: '屏東恆春古城門票',
    location: '屏東',
    evaluate: 4.3,
    evaluateTotal: 23,
    price: 150,
    originprice: 200,
    image: '/images/top-10/top10_3.png',
    geometry: {
      type: 'Point',
      coordinates: [21.9831002, 120.7177413]
    }
  },
  {
    title: '台灣清境農場門票',
    location: '南投',
    evaluate: 4.1,
    evaluateTotal: 23,
    price: 350,
    originprice: 500,
    image: '/images/top-10/top10_4.png',
    geometry: {
      type: 'Point',
      coordinates: [24.0553573, 121.1576413]
    }
  },
  {
    title: '台東綠島租車一日遊',
    location: '台東',
    evaluate: 4.9,
    evaluateTotal: 23,
    price: 1200,
    originprice: 1500,
    image: '/images/top-10/top10_1.png',
    geometry: {
      type: 'Point',
      coordinates: [22.6563558, 121.4711554]
    }
  },
  {
    title: '台灣士林夜市美食文化體驗',
    location: '台北',
    evaluate: 4.6,
    evaluateTotal: 23,
    price: 600,
    originprice: 800,
    image: '/images/top-10/top10_2.png',
    geometry: {
      type: 'Point',
      coordinates: [25.0879917, 121.5220137]
    }
  },
  {
    title: '【網美必訪】台東金針花海門票',
    location: '台東',
    evaluate: 4,
    evaluateTotal: 23,
    price: 199,
    originprice: 299,
    image: '/images/top-10/top10_1.png',
    geometry: {
      type: 'Point',
      coordinates: [22.643066, 120.392325]
    }
  },
  {
    title: '【花蓮必玩】砂卡礑步道一日遊',
    location: '花蓮',
    evaluate: 4.8,
    evaluateTotal: 23,
    price: 990,
    originprice: 1290,
    image: '/images/top-10/top10_2.png',
    geometry: {
      type: 'Point',
      coordinates: [24.1729527, 121.6151559]
    }
  },
  {
    title: '【南投熱門景點】日月潭遊湖船票',
    location: '南投',
    evaluate: 4,
    evaluateTotal: 23,
    price: 300,
    originprice: 400,
    image: '/images/top-10/top10_3.png',
    geometry: {
      type: 'Point',
      coordinates: [23.8432114, 120.8708697]
    }
  },
  {
    title: '【台中人氣推薦】高美濕地踏青遊',
    location: '台中',
    evaluate: 4.5,
    evaluateTotal: 23,
    price: 399,
    originprice: 499,
    image: '/images/top-10/top10_4.png',
    geometry: {
      type: 'Point',
      coordinates: [24.3119558, 120.5453253]
    }
  },
  {
    title: '台灣溫泉之都 北投露天溫泉',
    location: '新北市',
    evaluate: 4.5,
    evaluateTotal: 23,
    price: 999,
    originprice: 1299,
    image: '/images/top-10/top10_3.png',
    geometry: {
      type: 'Point',
      coordinates: [25.1373223, 121.5083426]
    }
  },
  {
    title: '【最浪漫體驗】宜蘭梅花湖獨木舟',
    location: '宜蘭',
    evaluate: 4.7,
    evaluateTotal: 23,
    price: 599,
    originprice: 699,
    image: '/images/top-10/top10_5.png',
    geometry: {
      type: 'Point',
      coordinates: [24.6431201, 121.7307104]
    }
  },
  {
    title: '【必訪景點】禪寺貢寮龍洞浮潛',
    location: '新北市',
    evaluate: 5,
    evaluateTotal: 23,
    price: 899,
    originprice: 1099,
    image: '/images/top-10/top10_6.png',
    geometry: {
      type: 'Point',
      coordinates: [25.11175, 121.8467952]
    }
  },
  {
    title: '【台灣南部最大動物園】高雄壽山動物園門票',
    location: '高雄',
    evaluate: 5,
    evaluateTotal: 23,
    price: 399,
    originprice: 599,
    image: '/images/top-10/top10_1.png',
    geometry: {
      type: 'Point',
      coordinates: [22.6355162, 120.2732348]
    }
  },
  {
    title: '高雄旗津潛水體驗',
    location: '高雄',
    evaluate: 5,
    evaluateTotal: 23,
    price: 1299,
    originprice: 1599,
    image: '/images/top-10/top10_2.png',
    geometry: {
      type: 'Point',
      coordinates: [22.6126421, 120.2304626]
    }
  },
  {
    title: '高雄六合夜市小吃美食尋味遊',
    location: '高雄',
    evaluate: 4,
    evaluateTotal: 23,
    price: 299,
    originprice: 399,
    image: '/images/top-10/top10_4.png',
    geometry: {
      type: 'Point',
      coordinates: [22.6310933, 120.2925063]
    }
  },
  {
    title: '高雄國家體育場觀賽門票',
    location: '高雄',
    evaluate: 4,
    evaluateTotal: 23,
    price: 399,
    originprice: 499,
    image: '/images/top-10/top10_4.png',
    geometry: {
      type: 'Point',
      coordinates: [22.7031213, 120.2244275]
    }
  },
  {
    title: '高雄龍虎塔登頂觀景',
    location: '高雄',
    evaluate: 4.5,
    evaluateTotal: 23,
    price: 299,
    originprice: 399,
    image: '/images/top-10/top10_6.png',
    geometry: {
      type: 'Point',
      coordinates: [22.6805082, 120.290289]
    }
  },
  {
    title: '【歷史文化之旅】高雄旗津老街',
    location: '高雄',
    evaluate: 4.8,
    evaluateTotal: 32,
    price: 299,
    originprice: 399,
    image: '/images/top-10/top10_1.png',
    geometry: {
      type: 'Point',
      coordinates: [22.606964, 120.284607]
    }
  },
  {
    title: '【海岸美景】高雄旗津渡輪遊',
    location: '高雄',
    evaluate: 4.4,
    evaluateTotal: 29,
    price: 40,
    originprice: 50,
    image: '/images/top-10/top10_4.png',
    geometry: {
      type: 'Point',
      coordinates: [22.619706, 120.270949]
    }
  },
  {
    title: '【高雄市博物館門票】',
    location: '高雄',
    evaluate: 4.8,
    evaluateTotal: 45,
    price: 299,
    originprice: 350,
    image: 'https://source.unsplash.com/random/800x600/?museum',
    geometry: {
      type: 'Point',
      coordinates: [22.6202514, 120.3017683]
    }
  },
  {
    title: '【高雄草衙飛行傘體驗】',
    location: '高雄',
    evaluate: 4.9,
    evaluateTotal: 32,
    price: 2500,
    originprice: null,
    image: 'https://source.unsplash.com/random/800x600/?paragliding',
    geometry: {
      type: 'Point',
      coordinates: [22.7661328, 120.3559256]
    }
  },
  {
    title: '【高雄市立美術館門票】',
    location: '高雄',
    evaluate: 4.7,
    evaluateTotal: 27,
    price: 270,
    originprice: 300,
    image: 'https://source.unsplash.com/random/800x600/?art',
    geometry: {
      type: 'Point',
      coordinates: [22.6069536, 120.3052865]
    }
  }
];

export default {};
