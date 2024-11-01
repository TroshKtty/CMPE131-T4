const PRODUCTS = [
  {
    item: "Red Apples",
    weight: 1,
    price: 2.09,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/58d418e7996bd456166526d1_generic-pinkladyapple._FMwebp__SR300,300__TTD_.jpg",
    category: "Fruits",
  },
  {
    item: "Bananas",
    weight: 2,
    price: 2.26,
    imgUrl:
      "https://cdn11.bigcommerce.com/s-1ly92eod7l/images/stencil/1280x1280/products/647/790/Product_Produce_Banana__90431.1700494209.jpg?c=1&imbypass=on",
    category: "Fruits",
    images: ["/bananas.jpg"],
  },
  {
    item: "Broccoli",
    weight: 1,
    price: 2.0,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/61e73e94c2f694d317d37246_dld-0858959004101-glamor-right-2021-12-28t12-37-44-iphone-7-quality-90-1-26-2-user-5c4f16e4fc9c91accd101ce4-jjao-143094-1642544786821._FMwebp__SR600,600_.jpg",
    category: "Vegetables",
  },
  {
    item: "Carrots",
    weight: 1,
    price: 1.5,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/57b5ee98450d2edbd4733fc8_produce-ogcarrots-bunch-1._FMwebp__SR300,300__TTD_.jpg",
    category: "Vegetables",
  },
  {
    item: "Whole Chicken",
    weight: 5,
    price: 6.50,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/5f49863a144b13f9b96ca4c4_2020-cen-ecommerce-meat-chickenwholefryer._FMwebp__SR300,300__TTD_.jpg",
    category: "Meat",
  },
  {
    item: "Salmon Fillets",
    weight: 1,
    price: 12.0,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/5ee23929bfbded247e1a8fe0_august-coho-salmon._FMwebp__SR300,300__TTD_.jpg",
    category: "Fish",
  },
  {
    item: "Almond Milk",
    weight: 4,
    price: 3.54,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/62e8fd9c4c590a3e38128537_0041570056707-glamor-front-2022-03-22t15-28-57-iphone-7-quality-90-1-29-0-user-5d7652c1db2c4b51d4c666ca-85qn-886954._FMwebp__SR300,300__TTD_.jpg",
    category: "Dairy Alternatives",
  },
  {
    item: "Bread",
    weight: 1,
    price: 10.00,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/65891703edf5e963b27ab911_2024-01-05_22-53-32_front.main._FMwebp__SR300,300__TTD_.jpg",
    category: "Bakery",
  },
  {
    item: "Rice",
    weight: 20,
    price: 26.00,
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8NQagNMOMZOstGS-5wyGBp-eVdNYyLwXiqg&s",
    category: "Grains",
  },
  {
    item: "Pasta",
    weight: 1,
    price: 2.82,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/6415fd65415d3b033e4d7fa7_0024094070916-glamor-front-2023-01-26t14-26-15-iphone-x-quality-90-1-33-0-user-62007be7ec32e60fa58d2f55-xia3-403387._FMwebp__SR300,300__TTD_.jpg",
    category: "Grains",
  },
  {
    item: "Tomatoes",
    weight: 1,
    price: 1.28,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/57d87a74faf465e394f41c7a_produce-romatomatoes-1._FMwebp__SR300,300__TTD_.JPG",
    category: "Fruits",
    images: ["/tomatoes.jpg"],
  },
  {
    item: "Cucumbers",
    weight: 1,
    price: 1.0,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/56dae08c7c3b931100975e32._FMwebp__SR300,300__TTD_.jpg",
    category: "Vegetables",
  },
  {
    item: "Cheddar Cheese",
    weight: 1,
    price: 5.0,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/5f496275a7709dab073cf431_00256989000009-glamor-glamor3-2020-08-25t19-46-55-iphone-x-quality-90-1-21-1-user-5984ad42a967f880524de2c4-27it-270447._FMwebp__SR300,300__TTD_.jpg",
    category: "Dairy",
  },
  {
    item: "Peanut Butter",
    weight: 1,
    price: 6.57,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/5e87b94a04297dc65945df45_00071018010190-glamor-frontpackageglamor-2020-03-09t17-53-20-iphone-7-quality-90-1-21-1-user-5c4f16e4fc9c91accd101ce4-4k1y-724537._FMwebp__SR300,300__TTD_.jpg",
    category: "Condiments",
  },
  {
    item: "Orange Juice",
    weight: 4,
    price: 3.66,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/5cdd438299082d1c6360c609_upc-00028165000840-glamor-frontpackageglamor-2019-04-11t15-59-44-396d2050-667b-44e8-af70-0c1a5feac451._FMwebp__SR300,300__TTD_.jpg",
    category: "Beverages",
  },
  {
    item: "Spinach",
    weight: 1,
    price: 2.0,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/5e7bbe4a790735db919f2a23_00033383904320-glamor-frontpackageglamor-2020-03-12t14-18-09-iphone-7-quality-90-1-21-1-user-5c4f16e4fc9c91accd101ce4-t6n8-227598._FMwebp__SR300,300__TTD_.jpg",
    category: "Vegetables",
  },
  {
    item: "Strawberries",
    weight: 1,
    price: 3.27,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/57e058d8afb2864a1005688f_produce-genericstrawberries-md-1._FMwebp__SR300,300__TTD_.jpg",
    category: "Fruits",
  },
  {
    item: "Potato",
    weight: 1,
    price: 1.8,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/57b1084a1ba4fe70a564328e_produce-yukongold-1._FMwebp__SR300,300__TTD_.JPG",
    category: "Vegetables",
  },
  {
    item: "Zucchini",
    weight: 1,
    price: 1.5,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/56edaf7d55ca541100c46bd3_365_-zuccini-squash_412._FMwebp__SR300,300__TTD_.jpg",
    category: "Vegetables",
  },
  {
    item: "Lentils",
    weight: 1,
    price: 2.5,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/608ad749189b690cef21cbd7_6970-glamor-frontpackageglamor-2019-09-10t16-05-35-b782600c-35e0-4773-a5f3-635355f8d01f-1571192362157._FMwebp__SR300,300__TTD_.jpeg",
    category: "Grains",
  },
  {
    item: "Kale",
    weight: 1,
    price: 3.0,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/601c092c97e3c63f5a86092f_00078783906000-glamor-frontpackageglamor-2021-01-14t13-40-24-iphone-7-quality-90-1-21-8-user-5c4f16e4fc9c91accd101ce4-0lwg-514262._FMwebp__SR300,300__TTD_.jpg",
    category: "Vegetables",
  },
  {
    item: "Cauliflower",
    weight: 1,
    price: 2.5,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/6310d9fd9d7f481c7de8d2a6_0033383699998-glamor-front-2022-09-01t16-12-08-iphone-x-quality-100-1-31-0-user-5984ad42a967f880524de2c4-9wff-511712._FMwebp__SR300,300__TTD_.jpg",
    category: "Vegetables",
  },
  {
    item: "Ground Beef",
    weight: 1,
    price: 15.0,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/63879d9d2b1a50216b992f0c_0850001591782-glamor-front-2022-08-31t18-36-53-iphone-x-quality-100-1-31-0-user-5984ad42a967f880524de2c4-gx22-539117._FMwebp__SR300,300__TTD_.jpg",
    category: "Meat",
  },
  {
    item: "Pork Chops",
    weight: 1,
    price: 9.0,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/5f49863a144b13f9b96ca4c6_2020-cen-ecommerce-meat-porkloinboneincentercut._FMwebp__SR300,300__TTD_.jpg",
    category: "Meat",
  },
  {
    item: "Tofu",
    weight: 1,
    price: 2.2,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/5f95b144ee200ab2da74f677_099482409258-front._FMwebp__SR300,300__TTD_.jpg",
    category: "Dairy Alternatives",
  },
  {
    item: "Hummus",
    weight: 1,
    price: 5.59,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/5ce7587c805d3fc09a29f28c_upc-00708756002025-glamor-frontpackageglamor-2019-04-11t17-25-42-fc8dc6a0-cd85-4f09-abf5-bb56a9820708._FMwebp__SR300,300__TTD_.jpg",
    category: "Dips",
  },
  {
    item: "Olive Oil",
    weight: 1,
    price: 15.40,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/65ba2e9ec2ab09d1bc4c0666_2024-01-31_11-27-30_front.main._FMwebp__SR300,300__TTD_.jpg",
    category: "Condiments",
  },
  {
    item: "Vinegar",
    weight: 1,
    price: 11.02,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/6181d3c8fd45237cd2cfbc15_0022506002487-glamor-front-2021-10-07t16-05-09-iphone-x-quality-90-1-25-4-user-5d7652c1db2c4b51d4c666ca-j8hp-497831._FMwebp__SR300,300__TTD_.jpg",
    category: "Condiments",
  },
  {
    item: "Honey",
    weight: 1,
    price: 10.00,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/5f49b552168eaebab4db7b12_00898601002024-glamor-frontpackageglamor-2020-08-26t14-45-19-iphone-x-quality-90-1-21-1-user-5984ad42a967f880524de2c4-gq20-727768._FMwebp__SR300,300__TTD_.jpg",
    category: "Condiments",
  },
  {
    item: "Maple Syrup",
    weight: 1,
    price: 15.00,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/61df838dd30df14763cdeb1f_0008577000249-glamor-front-2021-12-21t18-28-24-iphone-7-quality-90-1-26-2-user-5d7652c1db2c4b51d4c666ca-8zeg-235994._FMwebp__SR300,300__TTD_.jpg",
    category: "Condiments",
  },
  {
    item: "Granola Bars",
    weight: 1,
    price: 34.58,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/6579f973ff59effa8c46240d_2023-12-27_21-22-06_front.main._FMwebp__SR300,300__TTD_.jpg",
    category: "Snacks",
  },
  {
    item: "Potato Chips",
    weight: 1,
    price: 7.39,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/613f8b6ee11bfde3601602e5_dld-0084114112729-glamor-front-2021-08-06t20-26-38-iphone-x-quality-90-1-25-4-user-5984ad42a967f880524de2c4-lfzx-833226-1631554405975._FMwebp__SR300,300__TTD_.jpg",
    category: "Snacks",
  },
  {
    item: "Dark Chocolate",
    weight: 1,
    price: 9.36,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/5ce75e38d9ac4cc0f131a0c0_upc-00211713003152-glamor-frontpackageglamor-2019-03-29t20-16-27-aefb2362-82e1-48b9-8b27-8f3684b04791._FMwebp__SR300,300__TTD_.jpg",
    category: "Snacks",
  },
  {
    item: "Ice Cream",
    weight: 1,
    price: 11.99,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/65fa17084fc65172bd6aad30_2024-03-19_22-52-02_front.main._FMwebp__SR300,300__TTD_.jpg",
    category: "Frozen Desserts",
  },
  {
    item: "Frozen Mixed Vegetables",
    weight: 1,
    price: 2.59,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/669eed3b5435d547d0620f41_2024-07-24_23-15-16_front.main._FMwebp__SR300,300__TTD_.jpg",
    category: "Frozen Foods",
  },
  {
    item: "Frozen Pizza",
    weight: 1,
    price: 10.79,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/61563a0d9bf3c1b28945be59_dld-0042272001019-glamor-front-2021-08-20t18-05-30-iphone-x-quality-90-1-25-4-user-5984ad42a967f880524de2c4-57yw-357534-1633040909350._FMwebp__SR300,300__TTD_.jpg",
    category: "Frozen Foods",
  },
  {
    item: "Coffee",
    weight: 1,
    price: 18.50,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/5cdd4e5b87d6d71c5c6e49f4_upc-00094922907462-glamor-frontpackageglamor-2019-04-10t18-06-48-7e65a6f1-9c02-4242-aba2-d9cf45d43e88._FMwebp__SR300,300__TTD_.jpg",
    category: "Beverages",
  },
  {
    item: "Tea",
    weight: 1,
    price: 9.01,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/62bcb033c23dbac2aec2be0b.main._FMwebp__SR300,300__TTD_.jpg",
    category: "Beverages",
  },
  {
    item: "Coconut Water",
    weight: 2,
    price: 11.92,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/660aba6ed0f0957ced076c88_2024-04-01_16-12-35_front.main._FMwebp__SR300,300__TTD_.jpg",
    category: "Beverages",
  },
  {
    item: "Crystal Geyser Natural Alpine Spring Water - 32 Count",
    weight: 35,
    price: 5.74,
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU03kC_x5u1oDWZrAbKDEltMkVv-H4iGBa7g&s",
    category: "Beverages",
    images: ["/water.jpg"],
  },
  {
    item: "Sparkling Water",
    weight: 6,
    price: 10.00,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/621ece1bf3d7476545d9f68b_0012993112103-glamor-front-2022-02-09t19-35-00-iphone-x-quality-90-1-26-2-user-6191b0023d41d147aed4bacb-nh6n-831545._FMwebp__SR300,300__TTD_.jpg",
    category: "Beverages",
  },
  {
    item: "Green Bell Peppers",
    weight: 1,
    price: 2.5,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/56e77b57f6e8791100e7fffb_365_-green-bell-peppers.1._FMwebp__SR300,300__TTD_.jpg",
    category: "Vegetables",
  },
  {
    item: "Onions",
    weight: 1,
    price: 1.5,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/5aa7c486fc8ae2e1a13b6faf_produce-ogyellowonion-2._FMwebp__SR300,300__TTD_.JPG",
    category: "Vegetables",
  },
  {
    item: "Garlic",
    weight: 1,
    price: 4.14,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/56dc1363a8ced3110066fcb7._FMwebp__SR300,300__TTD_.jpg",
    category: "Vegetables",
  },
  {
    item: "Applesauce",
    weight: 1,
    price: 29.96,
    imgUrl:
      "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/60f5b6343e2800f6df41a5c9_dld-0036192122107-glamor-front-2021-06-01t16-03-30-iphone-x-quality-90-1-25-4-user-5984ad42a967f880524de2c4-jead-061424-1626715700191._FMwebp__SR300,300__TTD_.jpg",
    category: "Canned Goods",
  },
  {
     item: "Lays Potato Chips - 65% Less Fat",
    weight: 1,
    price: 5.20,
    imgUrl:
      "layschips.jpg",
    category: "Snacks",
  }
];

export default PRODUCTS;
