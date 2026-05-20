'use strict';

/* ══════════════════════════════════════════════════════
   POI DATA — Tokyo Skytree Area
   Sourced from Triplabo AI backend (data file)
   Skytree center: [139.8107, 35.710064]
══════════════════════════════════════════════════════ */
var PL = [
  /* ── 3 near POIs (lv0) ─────────────────────────────── */
  /* PL[0] SKYTREE GALLERY */
  {img:'https://lh3.googleusercontent.com/place-photos/AJRVUZPYEMAJLsdlP9gcr43W95AqYcHv68tPU4PSXrWElm_GjnX6TFygzEXAOgzmsJBdVqj6MHckKuZXzqaTQyfs_B9yFcX-y0DiJOb6B9o1svOEwYAj6ltmWKDondfpuEs2Nmc8JY4DpDqQ_e-sp_E=s800',
   bg:'#2A4A7A',e:'🏛️',
   tag:'景点',tc:'ta',d:'50m',n:'スカイツリーギャラリー',cat:'景点',
   ll:[139.81075,35.71005],transit:'押上駅・とうきょうスカイツリー駅直結',
   desc:'東京スカイツリー®の建設の裏側を学べる無料展示エリア。貴重な写真や構造、デザインの秘密に触れて、タワーの魅力をさらに深く理解しよう。',
   ps:['無料','展示','学習','豆知識','タワー'],p:'無料入場',fr:1,r:'4.6',loc:'墨田区',
   hrs:'10:00～22:00',dur:'30分～1時間',venue:'東京都墨田区押上１丁目１−83',
   url:'http://www.tokyo-skytree.jp/enjoy/skytreegallery/',
   hl:[['📸','建設当時の貴重な写真展示'],['🔍','タワーの構造やデザインの秘密'],['🆓','無料で学べる学習スペース']]},

  /* PL[1] すみだ水族館 */
  {img:'https://lh3.googleusercontent.com/place-photos/AJRVUZMdybgzeKeGeI2pTCuHg3owJN1q_2zDo72rrAbLJO9RijfzTLKoCZg-7rO9GzG7XfYyMeWL_OCnU6AuQp6AT5gg5A5ac9C-aQE7UlIjgrKjjGNmAghp4GlQczTmVLNO-berKj0589Tw7OkYKlZ4ir-h=s800',
   bg:'#1A5A8A',e:'🐟',
   tag:'活动',tc:'tac',d:'120m',n:'すみだ水族館',cat:'活动',
   ll:[139.80959,35.70993],transit:'押上駅・とうきょうスカイツリー駅 徒歩すぐ',
   desc:'東京スカイツリータウン®直下！都心で癒やしのひとときを。ペンギンやクラゲ、小笠原諸島の生き物たちと間近に触れ合える屋内型水族館。',
   ps:['屋内施設','水族館','ペンギン','クラゲ','東京'],p:'¥2,700から',fr:0,r:'4.2',loc:'墨田区',
   hrs:'平日10:00～20:00、土日祝9:00～21:00',dur:'1-2時間',venue:'東京都墨田区押上１丁目１−２ ソラマチ5-6F',
   url:'http://www.sumida-aquarium.com/',
   hl:[['🐧','国内最大級の屋内開放型ペンギンプール'],['🪼','約500匹のミズクラゲが漂うビッグシャーレ'],['🐠','いきものとの距離が近い展示']]},

  /* PL[2] 隅田公園 */
  {img:'https://lh3.googleusercontent.com/place-photos/AJRVUZP7bxcPT2BOdRKNYEWqpAr-jXTAuZp5_W0TvCWdPIBUMJoG_wY9UCLVcoVp5ZktR-SliHho6xICW5Bq8Eprps1xIojiplQxJiBLs42KUVa4HLxUr-1JliQ2LC0GwT2vtmpdD9S7cTxOJNRj8w=s800',
   bg:'#2A7A3A',e:'🌸',
   tag:'自然',tc:'ta',d:'900m',n:'台東区立隅田公園',cat:'自然',
   ll:[139.80145,35.71376],transit:'押上駅から徒歩12分',
   desc:'隅田川沿いに広がる、東京スカイツリー®を望む風光明媚な公園。日本さくら名所100選。春の桜、夏の花火大会、四季折々の風景が楽しめます。',
   ps:['公園','桜','夜景','水辺','イベント'],p:'無料入場',fr:1,r:'4.2',loc:'台東区',
   hrs:'常時開園',dur:'1-2時間',venue:'東京都台東区花川戸１丁目１',
   url:'https://www.city.taito.lg.jp/kenchiku/hanamidori/koen/sumidapamphlet.html',
   hl:[['🌸','東京スカイツリー®の絶景ビュースポット'],['🎆','隅田川花火大会の会場'],['🚢','水上バスや屋形船からの花見']]},

  /* ── Extended POIs (lv1, 10 total) ────────────────── */
  /* PL[3] 雷門 */
  {img:'https://lh3.googleusercontent.com/place-photos/AJRVUZOU2Xqxzez3WOi8U0AL78fTP5C03P7H6hVzYMbiuoCBb5rAorH78ICiETgMp6iLyO3A1SSSCZ8QHUZvhlvTBqZrGQdIt4DrsC8TV-iIyocbVTdI8f3YFPcqSAqPi2-CE129-nHkk0EVs3_QdA=s800',
   bg:'#3A2A8A',e:'🏮',
   tag:'景点',tc:'ta',d:'1.3km',n:'雷門',cat:'景点',
   ll:[139.79637,35.711117],transit:'浅草駅 徒歩5分',
   desc:'浅草寺の総門として知られ、雷門の巨大な提灯は浅草のシンボル。風神雷神像が門を守り、夜のライトアップも幻想的。',
   ps:['寺社','象徴','夜景','歴史','徒歩5分'],p:'無料入場',fr:1,r:'4.5',loc:'台東区',
   hrs:'6:00～17:00',dur:'30-60分',venue:'東京都台東区浅草２丁目３−１',
   url:'http://www.senso-ji.jp/guide/guide01.html',
   hl:[['🏮','巨大な提灯がシンボル'],['⚡','風神雷神像が門を守る'],['🌙','夜のライトアップも幻想的']]},

  /* PL[4] 浅草寺 */
  {img:'https://lh3.googleusercontent.com/place-photos/AJRVUZO5fccHmOSJp2lcL2X1TmLVFJfwI_GC--978cPWh6PC5IWxF3ZyCEbjtHSVPf45tuzeCiCl--GOcS9_Fej4e1jAJ5xv4ApDTZ5TlNDAQchE44fXGwxx-0xFC_LJDA1yGnXYrQeoThNysqHqrAo=s800',
   bg:'#3A7A45',e:'⛩️',
   tag:'景点',tc:'ta',d:'1.5km',n:'浅草寺',cat:'景点',
   ll:[139.79666,35.714764],transit:'浅草駅 徒歩5分',
   desc:'東京最古のお寺で、都心にありながら歴史と静寂を感じられるパワースポット。雷門や五重塔など見どころが多く、仲見世通りでの食べ歩きも楽しい。',
   ps:['寺社仏閣','歴史','人気スポット','無料','徒歩5分'],p:'無料入場',fr:1,r:'4.6',loc:'台東区',
   hrs:'6:00～17:00（夏季は18:00まで）',dur:'1-2時間',venue:'東京都台東区浅草２丁目３−１',
   url:'https://www.senso-ji.jp/',
   hl:[['🏛️','東京最古の寺院'],['🎐','雷門、五重塔、宝蔵門'],['🥟','仲見世通りの食べ歩き']]},

  /* PL[5] 錦糸公園 */
  {img:'https://lh3.googleusercontent.com/place-photos/AJRVUZOBRSqVccOp1BULoUeGwvn2HlYinh7ZyK1je6D2MobEkBj-q-SsJc1GC1dDVBPA0ZZAqjD3yjxKtu802t47W5ZPiAD2IE7rU_H8HC2IzKoOc8YpVwq8DWxHk3cda4TA5pfuDLwlDrOj08U9UA=s800',
   bg:'#2A7A2A',e:'🌳',
   tag:'自然',tc:'ta',d:'1.3km',n:'錦糸公園',cat:'自然',
   ll:[139.81639,35.698887],transit:'錦糸町駅 徒歩5分',
   desc:'緑豊かな都会のオアシス。広々とした芝生広場や子供向けの遊具、噴水があり、四季折々の自然が楽しめます。',
   ps:['無料','桜','夏','水遊び','遊具'],p:'無料入場',fr:1,r:'4.0',loc:'墨田区',
   hrs:'常時開園',dur:'1-2時間',venue:'東京都墨田区錦糸４丁目１５−１',
   url:'',
   hl:[['🌸','桜の名所'],['💧','夏は水遊びが人気'],['⚽','野球場・テニスコートも完備']]},

  /* PL[6] 浅草花やしき */
  {img:'https://lh3.googleusercontent.com/place-photos/AJRVUZMrfYVYIuZmppiKdSPwYcea2Dd6ZYTH6ELKefpUB5DRGyuedCSzvzDcBtROn_zdgRIFeobdeIhRGQ9zRcu1xyRe4NSt688BI-6-XLpcDqwlaJsxeIC2kSIwp1iSkagSQHeAVDJEJrGP8Ovm6pm9aYmplw=s800',
   bg:'#7B3FAB',e:'🎡',
   tag:'活动',tc:'tac',d:'1.7km',n:'浅草花やしき',cat:'活动',
   ll:[139.79488,35.71546],transit:'浅草駅 徒歩10分',
   desc:'日本最古の遊園地！レトロなアトラクションと浅草の風情が融合した、大人も子供も楽しめる体験。',
   ps:['昭和レトロ','夜景','遊園地','子供と','散策'],p:'¥1,600から',fr:0,r:'4.1',loc:'台東区',
   hrs:'10:00-18:00',dur:'2-3時間',venue:'東京都台東区浅草２丁目２８−１',
   url:'https://www.hanayashiki.net/',
   hl:[['🎢','現存する日本最古のコースター'],['🎪','昭和レトロな雰囲気'],['🎠','コンパクトながら多彩なアトラクション']]},

  /* PL[7] すみだ北斎美術館 */
  {img:'https://lh3.googleusercontent.com/place-photos/AJRVUZN8DIwPinR4rcXqflGrOnHwYPHCC3QDm-HyxLs9q-VH-50Jlsf_GmAHadoNKfxaBuTjz3HtcLmODtGNnYCTv1IycN4APzRy17deDW94tD9x2minUW0_ZtpPHhbVc-1eczqr6xOtbLl3uFurxQ=s800',
   bg:'#5A3A8A',e:'🎨',
   tag:'景点',tc:'ta',d:'1.5km',n:'すみだ北斎美術館',cat:'景点',
   ll:[139.80042,35.69633],transit:'両国駅 徒歩5分',
   desc:'葛飾北斎の生誕の地に建つ世界的に有名な美術館。「冨嶽三十六景」など北斎の代表作と浮世絵に関する資料が豊富に展示されています。',
   ps:['美術館','浮世絵','両国','墨田','芸術'],p:'¥400から',fr:0,r:'4.1',loc:'墨田区',
   hrs:'9:30-17:30',dur:'1-2時間',venue:'東京都墨田区亀沢２丁目７−２',
   url:'https://hokusai-museum.jp/',
   hl:[['🗻','「冨嶽三十六景」など代表作を展示'],['🏛️','妹島和世設計の斬新な建築'],['📚','浮世絵専門書を閲覧できる図書室']]},

  /* PL[8] Samurai Ninja Museum */
  {img:'https://lh3.googleusercontent.com/place-photos/AJRVUZOUp7TlWesY-NS64IbkBUCBaiVzyxXx5O6mjaOQYk0HYTf_6Hv_YxaqWHawPLpzap57O7MVlf7erkN7ltvWs4YY4M3CJzmpc-j4YecgyrTXN9laG1LfFRE7MgP5G1UclWRB26ewSxUrJmJtjw8eX57F6Q=s800',
   bg:'#8A2A2A',e:'⚔️',
   tag:'活动',tc:'tac',d:'1.8km',n:'Samurai Ninja Museum',cat:'活动',
   ll:[139.79178,35.711514],transit:'浅草駅 徒歩10分',
   desc:'侍と忍者の文化を体験・展示するユニークな博物館。実演ショーやコスチューム体験など、インタラクティブな展示が充実。',
   ps:['昭和レトロ','歴史','体験','コスプレ','人気'],p:'',fr:0,r:'4.9',loc:'台東区',
   hrs:'',dur:'1-2時間',venue:'東京都台東区西浅草１丁目８−１３',
   url:'https://mai-ko.com/samurai/',
   hl:[['⚔️','侍・忍者の実演ショー'],['👘','コスチューム体験あり'],['📷','インタラクティブな展示']]},

  /* PL[9] 東武博物館 */
  {img:'https://lh3.googleusercontent.com/place-photos/AJRVUZP6iqy9XF2uS-J2JO1IKrB1EdGn1_Fil8rNMxlVN0s-7uheNTy1rfPbaFu2nPNcrbPj5izZkqupa62u2LOolonEhxxwHGVTSCyRa1SBBMJHwmxv3TTmOiczpeJL_PybmRasx0HQ-NCGU-P6qCEBHQcL=s800',
   bg:'#1A4A8A',e:'🚃',
   tag:'景点',tc:'ta',d:'1.6km',n:'東武博物館',cat:'景点',
   ll:[139.81944,35.72478],transit:'東向島駅 徒歩3分',
   desc:'東武鉄道の歴史と車両を展示する鉄道博物館。実物車両の展示や運転シミュレーターなど鉄道ファン必見の施設。',
   ps:['博物館','鉄道','子供と','東武','展示'],p:'',fr:0,r:'4.3',loc:'墨田区',
   hrs:'',dur:'1-2時間',venue:'東京都墨田区東向島４丁目２８−１６',
   url:'http://www.tobu.co.jp/museum/',
   hl:[['🚃','実物車両の展示'],['🎮','運転シミュレーター体験'],['📚','鉄道の歴史を学べる']]},

  /* ── lv2 POIs ────────────────────────────────────── */
  /* PL[10] かっぱ橋道具街 */
  {img:'https://lh3.googleusercontent.com/place-photos/AJRVUZPteVlomTqmT6CtKJivaIy7ixkILogBjJpVa5_RUGJiqT9oBE1YNHeblVZBPpzLqoaxzA-aH7dhnCCfwtLaoyq2SRFn_rLeCRE9BQlvKUHV7MqrMkp_ZI4ujrne2DG4ROfxVaw84HX3DW376Jg=s800',
   bg:'#5A2A8A',e:'🍳',
   tag:'购物',tc:'ts',d:'2.2km',n:'かっぱ橋道具街',cat:'购物',
   ll:[139.78796,35.71058],transit:'田原町駅 徒歩5分',
   desc:'料理道具・食器・食品サンプルなど食に関わるあらゆるものが揃うユニークな専門店街。プロの料理人から一般家庭まで宝探しのような体験が楽しめる。',
   ps:['専門店街','料理好き','お土産','散策','雑貨'],p:'無料散策',fr:1,r:'4.3',loc:'台東区',
   hrs:'10:00～17:00（店舗により異なる）',dur:'1-2時間',venue:'東京都台東区松が谷３丁目１８−２',
   url:'http://www.kappabashi.or.jp/',
   hl:[['🍳','調理道具・食器の品揃え豊富'],['🍱','食品サンプル体験・購入'],['🛍️','掘り出し物が見つかる専門店街']]},

  /* ── 活動詳細 (main card — shown in sheet) ─────── */
  /* PL[11] 東京スカイツリー 展望台 */
  {img:'https://lh3.googleusercontent.com/place-photos/AJRVUZNwXcpxVpNWj09JFD_vC4CgB0lPXnTuk2RAx7sWbI_KmRo9bPCc4OYgFX4qkLow4kUHUg13nCQpEOFf_Y0nahQ3Jd7gOKWj_iNKVXfDiy74O6JyYd3x821Cq0EeazciAGdZsokRRApxz5a6vg=s800',
   bg:'#1A3050',e:'🗼',
   tag:'景点',tc:'ta',d:'0m',n:'東京スカイツリー 天望デッキ',cat:'景点',
   ll:[139.8107,35.710064],
   desc:'高さ634mを誇る自立式電波塔。地上350mの天望デッキから360度のパノラマビューが楽しめます。夜景観賞にもおすすめ。',
   ps:['夜景','東京','展望台','駅直結','人気'],p:'¥2,000から',fr:0,r:'4.4',loc:'墨田区',
   hrs:'10:00～22:00',dur:'1-2時間',venue:'東京都墨田区押上１丁目１−２',
   url:'https://www.tokyo-skytree.jp/',
   hl:[['🌆','地上350mの天望デッキ'],['☁️','空中散歩気分の天望回廊（450m）'],['🌃','圧巻の夜景']]},

  /* ── Event POIs ─────────────────────────────────── */
  /* PL[30] BLUE LOCK EVENT at Skytree */
  {img:'https://lh3.googleusercontent.com/place-photos/AJRVUZNwXcpxVpNWj09JFD_vC4CgB0lPXnTuk2RAx7sWbI_KmRo9bPCc4OYgFX4qkLow4kUHUg13nCQpEOFf_Y0nahQ3Jd7gOKWj_iNKVXfDiy74O6JyYd3x821Cq0EeazciAGdZsokRRApxz5a6vg=s800',
   bg:'#0A0A3A',e:'✨',
   tag:'限時活動',tc:'tev',d:'0m',n:'BLUE LOCK EPISODE SKY',cat:'限時活動',
   ll:[139.8107,35.710064],transit:'押上駅・とうきょうスカイツリー駅直結',
   desc:'人気アニメ「ブルーロック」との初コラボイベント。作品の世界観を体験できる展示や限定グッズ販売、コラボカフェなどを展開。',
   ps:['コラボイベント','限定グッズ','アニメ','展示','カフェ'],p:'¥2,000から',fr:0,r:'4.4',loc:'墨田区',
   hrs:'10:00～22:00',dur:'2-3時間',venue:'東京都墨田区押上１丁目１−２',
   url:'https://www.tokyo-skytree.jp/',
   hl:[['⚽','「ブルーロック」の世界観を体験'],['🛍️','限定グッズ販売'],['☕','コラボカフェ']],
   isEvent:true,venueCat:'景点',
   eventPeriod:'2026年4月9日 〜 開催中',
   eventMenu:[],
   eventTickets:[{name:'天望デッキ入場券付きイベントセット',sub:'当日券（当日スカイツリー展望台入場含む）',price:'¥2,300'}],
   poiImg:'https://lh3.googleusercontent.com/place-photos/AJRVUZNwXcpxVpNWj09JFD_vC4CgB0lPXnTuk2RAx7sWbI_KmRo9bPCc4OYgFX4qkLow4kUHUg13nCQpEOFf_Y0nahQ3Jd7gOKWj_iNKVXfDiy74O6JyYd3x821Cq0EeazciAGdZsokRRApxz5a6vg=s800',
   poiName:'東京スカイツリー',
   poiDesc:'高さ634mを誇る自立式電波塔。東京のシンボルとして国内外から多くの観光客が訪れます。',
   poiHrs:'10:00～22:00',poiDur:'1-2時間',
   poiHl:[['🌆','地上350mの天望デッキ'],['☁️','天望回廊（450m）'],['🌃','圧巻の夜景']],
   poiUrl:'https://www.tokyo-skytree.jp/'},

  /* PL[31] 台湾祭 at Skytree Town */
  {img:'https://lh3.googleusercontent.com/place-photos/AJRVUZMw6J4L4Z6EX394r1wFYYQ7AXOptzqv2dbWcQdHwI74ISlvmv78vjqIDTDndLc1xEbId6-LYV2eqMiPEE-Q6B7t3F3iUtybG3qnU-gxK2_SJMBzjKz99okSGquhXPwA4JNW-8W-Mnq49YFpWqw=s800',
   bg:'#8A1A1A',e:'🏮',
   tag:'限時活動',tc:'tev',d:'0m',n:'台湾祭 in スカイツリータウン',cat:'限時活動',
   ll:[139.8108,35.7101],transit:'押上駅・とうきょうスカイツリー駅直結',
   desc:'台湾のグルメや文化を楽しめる期間限定イベント。台南ランタン祭をテーマに、夜市グルメやランタン展示などを展開します。',
   ps:['グルメ','台湾','夜市','ランタン','限定'],p:'無料（飲食別途）',fr:1,r:'4.4',loc:'墨田区',
   hrs:'平日10:00～21:00、土日祝9:00～21:00',dur:'1-2時間',venue:'東京都墨田区押上１丁目１−２ ソラマチ',
   url:'https://www.tokyo-skytree.jp/',
   hl:[['🏮','台南ランタン祭をテーマにした演出'],['🍜','台湾夜市グルメ勢揃い'],['🆓','庭園エリアは無料入場']],
   isEvent:true,venueCat:'景点',
   eventPeriod:'2026年4月29日 〜 開催予定',
   eventMenu:[{name:'牛肉麺',note:'台湾本場の味',price:'¥1,200'},{name:'タピオカドリンク',note:'各種フレーバー',price:'¥600'},{name:'小籠包セット',note:'点心6個入り',price:'¥900'}],
   eventTickets:[{name:'入場料',sub:'会場エリアは無料入場',price:'無料'},{name:'台湾夜市グルメパス',sub:'3品セット割引券',price:'¥2,500'}],
   poiImg:'https://lh3.googleusercontent.com/place-photos/AJRVUZNwXcpxVpNWj09JFD_vC4CgB0lPXnTuk2RAx7sWbI_KmRo9bPCc4OYgFX4qkLow4kUHUg13nCQpEOFf_Y0nahQ3Jd7gOKWj_iNKVXfDiy74O6JyYd3x821Cq0EeazciAGdZsokRRApxz5a6vg=s800',
   poiName:'東京スカイツリータウン®',
   poiDesc:'スカイツリー直下のショッピング・グルメ複合施設「東京ソラマチ」を中心に、水族館・プラネタリウムなど多彩な施設が揃う。',
   poiHrs:'店舗により異なる（10:00〜21:00）',poiDur:'2-3時間',
   poiHl:[['🛍️','東京ソラマチ：300以上の店舗'],['🐠','すみだ水族館直結'],['🌌','コニカミノルタプラネタリウム']],
   poiUrl:'https://www.tokyo-skytree.jp/'},
];
