/* Silque Tours — Default Data Store
   Images live in Google Drive folder: 1p4diwcZYfPMblG1smUOFQrY9Q0qCzguB
   Admin workflow: upload → share link → paste in admin.
*/
window.SILQUE = window.SILQUE || {};
window.SILQUE.DRIVE_FOLDER_ID = '1p4diwcZYfPMblG1smUOFQrY9Q0qCzguB';
window.SILQUE.DRIVE_FOLDER_URL = 'https://drive.google.com/drive/folders/1p4diwcZYfPMblG1smUOFQrY9Q0qCzguB';

window.SILQUE.DATA = (function(){
  /* Compact helper */
  function T(id,name,country,loc,price,dur,grp,date,st,img,bdg,diff,type,desc){return{id,name,country,location:loc,price,duration:dur,group:grp,date,status:st,image:img,badge:bdg,difficulty:diff,type,description:desc};}

  const LOCAL = [
    T('kanunga','Kanunga Falls Day Hike','🇰🇪 Kenya','Kiambu, Kenya',2000,'1 Day','10-30','2026-03-15','upcoming','1O_Fcpn95kxp5ajLo933uF62Wmr2CA2Sy','🌊 Popular','Moderate','day-hike','Breathtaking Kanunga Falls with nature trails and swimming holes.'),
    T('ngong','Ngong Hills Hike','🇰🇪 Kenya','Ngong, Kenya',2300,'1 Day','15-30','2026-04-05','upcoming','1U4CgpG5TAzsF4fFYuCMCHkToyaOCnur-','🌄 Views','Moderate','hike','Scenic hike with panoramic Rift Valley views.'),
    T('kilimambogo','14 Falls Kilimambogo','🇰🇪 Kenya','Kilimambogo, Kenya',2500,'1 Day','15-30','2026-04-12','upcoming','1twuKQCyMrAwQEcvgJvZfvwf2tyuhvzGx','💧 Waterfalls','Moderate','hike','Explore the magnificent 14 Falls.'),
    T('longonot','Mount Longonot Hike','🇰🇪 Kenya','Naivasha, Kenya',2700,'1 Day','10-25','2026-04-19','upcoming','1RY-JWOe6FbdK5WP9nn_5H4nvhUjRYdOd','⛰️ Hike','Challenging','hike','Conquer Mount Longonot crater views.'),
    T('castleforest','Castle Forest Mt. Kenya','🇰🇪 Kenya','Mount Kenya',2800,'1 Day','15-30','2026-04-26','upcoming','1xtguB_ZwxuPxAjcpmy4SkxaAytp4AjME','🏰 Forest','Moderate','hike','Enchanting Castle Forest.'),
    T('thompson','Thompson Falls & Lalanasi','🇰🇪 Kenya','Nyahururu, Kenya',3300,'1 Day','15-35','2026-09-20','upcoming','1AgVhL4iiGSlXmEIVfHon4gSQ5YAei4ZJ','🆕 New','Moderate','hike','Iconic 72-meter Thompson Falls.'),
    T('hellsgate','Hells Gate National Park','🇰🇪 Kenya','Naivasha, Kenya',3500,'1 Day','15-35','2026-05-10','upcoming','1TDFZTQaICUHbK-SKakPrOlN-nVWTyw_V','🦁 Wildlife','Easy','adventure-wildlife','Cycle and walk among wildlife.'),
    T('magadi','Lake Magadi Hot Springs','🇰🇪 Kenya','Kajiado, Kenya',4500,'1 Day','15-30','2026-05-17','upcoming','16iYVY7r0y-JUmyg3wgEyonb7oFNs-OWg','♨️ Hot Springs','Easy','adventure-wildlife','Relaxing therapeutic hot springs.'),
    T('mamburi','Mamburi Sand Dunes Malindi','🇰🇪 Kenya','Malindi, Kenya',18000,'3 Days','15-30','2026-11-19','upcoming','1MtAwGYpuWKtGekSKTn8BmRfdcD7UU0I0','🏖️ Beach','Easy','beach','Beach bliss and Swahili culture.'),
    T('diani','Diani Beach Getaway','🇰🇪 Kenya','Diani, Kenya',41000,'3 Days','10-25','2026-12-10','upcoming','1F8XfXt5U6FYevCXSgP6xmhoQAUtTxZUV','✈️ Flight Incl.','Easy','beach','Paradise at Diani Beach.'),
    {id:'wrc',name:'WRC Naivasha Rally',location:'Naivasha, Kenya',country:'🇰🇪 Kenya',price:2700,duration:'3 Days',group:'20-50',date:'2026-03-20',status:'past',image:'1O7T4HZtGT19sSUGmV7hBjesgoc9TVgVC',badge:'🏁 Past',difficulty:'Easy',type:'sports-events',description:'Our inaugural trip! 45 corporate guests.',adventureLink:'https://www.instagram.com/silque_tnt'},
    {id:'kanunga-p',name:'Kanunga Falls Expedition',location:'Kiambu, Kenya',country:'🇰🇪 Kenya',price:2000,duration:'1 Day',group:'10-30',date:'2026-04-15',status:'past',image:'1zMJqyBZyyyRHDDeAnrdl9YF11lzA_wmw',badge:'✅ Done',difficulty:'Moderate',type:'day-hike',description:'28 adventurers through scenic trails.',adventureLink:'https://www.instagram.com/silque_tnt'},
    {id:'revelation-p',name:'Revelation Park Retreat',location:'Mwingi, Kenya',country:'🇰🇪 Kenya',price:2700,duration:'3 Days',group:'15-40',date:'2026-05-10',status:'past',image:'11Nj9TU_kGdQ7ma71nRcYUjRuq6x-BPg_',badge:'✅ Done',difficulty:'Easy',type:'weekend',description:'Weekend retreat for 35 participants.',adventureLink:'https://www.instagram.com/silque_tnt'}
  ];

  /* All new destinations from admin prompt */
  const LOCAL_NEW = [
    T('meru','Meru National Park','🇰🇪 Kenya','Meru, Kenya',3500,'1 Day','10-30','2026-03-22','upcoming','1S9LqwQlno0ADXzZMAojo4eH42F9dmGAF','🦁 Safari','Moderate','adventure-wildlife','Wild savannah and Elsa the Lioness history.'),
    T('lewa','Lewa Wildlife Conservancy','🇰🇪 Kenya','Laikipia, Kenya',3500,'1 Day','10-30','2026-03-29','upcoming','1ZI4OHij6yMT-tWR18_-0tyDFW3UQIfXr','🦏 Rhino','Easy','adventure-wildlife',"Premier rhino and Grevy's zebra sanctuary."),
    T('solio','Solio Game Reserve','🇰🇪 Kenya','Nyeri, Kenya',3000,'1 Day','10-25','2026-04-05','upcoming','1gfEs7ft_8UZ2wIKC_TflCbDBi0gdboT1','🦏 Rhino','Easy','adventure-wildlife','Rhino breeding sanctuary near Nyeri.'),
    T('elementaita','Lake Elementaita','🇰🇪 Kenya','Nakuru, Kenya',2800,'1 Day','15-30','2026-04-12','upcoming','1MTUokpRFS5vkRRTtbezIk2NGo8K9xyyu','🦩 Flamingos','Easy','adventure-wildlife','Soda lake framed by Sleeping Warrior Hill.'),
    T('mtkenyaPL','Mount Kenya (Point Lenana)','🇰🇪 Kenya','Central Kenya',3000,'5 Days','8-15','2026-08-10','upcoming','1h-F55sz6wPXF5pAhjtn_G7ZbA31ieSkg','🏔️ Trek','Challenging','hike','Peak trekking, alpine lakes, and glaciers.'),
    T('satima',"Mount Satima & Dragon's Teeth",'🇰🇪 Kenya','Aberdares, Kenya',2000,'1 Day','10-25','2026-04-19','upcoming','1hcvGiGtWXWEGcdLS2rLGNGtGvhvL9KTs','🏔️ Hike','Challenging','hike','Jagged monoliths and alpine tundra.'),
    T('elephanthill','Elephant Hill (Aberdares)','🇰🇪 Kenya','Aberdares, Kenya',2500,'1 Day','10-20','2026-04-26','upcoming','15tWB10rniXMK-_GLva9nA_sDv_XUNyNp','🐘 Hike','Challenging','hike','Demanding bamboo and cloud forest trek.'),
    T('suswa','Mount Suswa','🇰🇪 Kenya','Narok, Kenya',3000,'1 Day','10-30','2026-05-03','upcoming','18q7Jvge82ErA5AtytFT9uxJiktE1pOJm','🌋 Volcano','Moderate','hike','Double-crater volcano with lava tubes.'),
    T('eburru','Mount Eburru (Naivasha)','🇰🇪 Kenya','Naivasha, Kenya',2200,'1 Day','10-25','2026-05-10','upcoming','1_7KMkeFZYGQsh0qOalBnLmnibi3MqZ4O','🌲 Forest','Moderate','hike','Volcanic forest with mountain bongo.'),
    T('eburruvents','Ol Doinyo Eburru Steam Vents','🇰🇪 Kenya','Naivasha, Kenya',2500,'1 Day','10-25','2026-05-17','upcoming','1PQr2NCJxOn0r9Qa_LtjLkEZrjerVZxgo','♨️ Geo','Moderate','hike','Active geothermal fissures.'),
    T('kereita','Kereita Forest / Forest Adventures','🇰🇪 Kenya','Kiambu, Kenya',1500,'1 Day','10-40','2026-05-24','upcoming','1HKT7kj1-vmlj8mIhVLrCnEg42RpMr9xz','🎯 Activities','Easy','recreational','Ziplining, archery, paintball.'),
    T('sagana','Sagana Waterfalls','🇰🇪 Kenya','Nyeri, Kenya',2000,'1 Day','10-30','2026-05-31','upcoming','1eyW6XWj439rdXRzaCWWg80DEnAoHxCNw','🌊 Rapids','Moderate','adventure','White-water rafting and bungee jumping.'),
    T('karura','Karura Forest','🇰🇪 Kenya','Nairobi, Kenya',1500,'1 Day','5-30','2026-06-07','upcoming','1bPwbYfT9SZARrmw2HovA3wNRegTeqIAM','🌳 Urban','Easy','recreational','Urban forest with waterfalls and caves.'),
    T('oloolua','Oloolua Nature Trail (Karen)','🇰🇪 Kenya','Nairobi, Kenya',1500,'1 Day','5-30','2026-06-14','upcoming','1KGUrg93OXW5ZXRY_GzK9h8asxNyaBkHG','🌲 Nature','Easy','hike','Forested trail, cave, stream, waterfall.'),
    T('paradiselost','Paradise Lost (Kiambu)','🇰🇪 Kenya','Kiambu, Kenya',1500,'1 Day','10-40','2026-06-21','upcoming','1XRpXue0PEVlCZ-sLE9flsQZ1kyqi-J4a','🕋 Caves','Easy','recreational','Ancient caves, waterfall, boating.'),
    T('kitengelaglass','Kitengela Glass & Ostrich Farm','🇰🇪 Kenya','Kajiado, Kenya',1500,'1 Day','10-25','2026-06-28','upcoming','16WNdUkZvP_auF6C0UWd6iScD_DkGQonK','🪶 Ostrich','Easy','recreational','Suspension bridge art studio.'),
    T('kiambethu','Kiambethu Tea Farm (Limuru)','🇰🇪 Kenya','Limuru, Kenya',1500,'1 Day','10-25','2026-07-05','upcoming','1co7Lhke2dHyshiqeIPYnuGYaYGJV469L','🍃 Tea','Easy','culinary','Historic tea estate with lunch.'),
    T('fairview','Fairview Coffee Estate','🇰🇪 Kenya','Kiambu, Kenya',1600,'1 Day','10-25','2026-07-12','upcoming','1eXVJgKHRQGEIdknGSmoCxXx6fIcR-5wd','☕ Coffee','Easy','culinary','Bean-to-cup coffee processing tours.'),
    T('tigoni','Tigoni Tea Plantations','🇰🇪 Kenya','Limuru, Kenya',1500,'1 Day','10-25','2026-07-19','upcoming','1Qgg7Z7sV-nXo3f6YBpol8c6m9ZEuXgbx','🍃 Cycling','Easy','recreational','Rolling green tea hills for cycling.'),
    T('champagne','Champagne Ridge & Ngong Escarpments','🇰🇪 Kenya','Kajiado, Kenya',1500,'1 Day','10-30','2026-07-26','upcoming','1CpS6je1Q04WPYdkHHGGuLkiR-xGks0XN','🌅 Sunset','Easy','recreational','Cliffside sunset views over Rift floor.'),
    T('sleepingwarrior','Sleeping Warrior & Ugali Hill','🇰🇪 Kenya','Nakuru, Kenya',2200,'1 Day','10-25','2026-08-02','upcoming','1K8H0zxXaeGn5HzBd1UfWotPDk4DOTnuh','🌋 Hike','Moderate','hike','Distinctive volcanic trekking hills.'),
    T('nzaui','Nzaui Range & Kivou','🇰🇪 Kenya','Makueni, Kenya',2800,'1 Day','10-25','2026-08-09','upcoming','1XzsKKIYIBUQ0k0BzS50exilLDDj-Ubc2','🪨 Hiking','Moderate','hike','Granite monoliths and day hiking.'),
    T('mua','Mua Hills','🇰🇪 Kenya','Machakos, Kenya',1800,'1 Day','10-30','2026-08-16','upcoming','1HwQKXVt6RFpMNs_xHL4iRMmRJ0WQ6oE1','🌄 Views','Moderate','hike','Scenic highlands and outdoor park.'),
    T('kariandusi','Kariandusi Prehistoric Site','🇰🇪 Kenya','Nakuru, Kenya',1500,'1 Day','10-30','2026-08-23','upcoming','1zxwZnEDnhR3HKZuTqRnwCclM2rJ5tuAY','🪨 History','Easy','cultural','Early Stone Age hand-axe excavation beds.'),
    T('namanga','Namanga Rooftop','🇰🇪 Kenya','Kajiado, Kenya',2800,'1 Day','10-30','2026-09-06','upcoming','1jRrLjmd52GvypEkjCmeqCBOevNcDJGOI','🌅 Sunset','Easy','recreational','Rooftop sunset at the Kenya-Tanzania border.'),
    T('trasha','Trasha Falls','🇰🇪 Kenya','Kiambu, Kenya',1500,'1 Day','10-25','2026-09-13','upcoming','15UTPV84LaTv8-fLu8O-iCdHw2QMynb1P','💧 Waterfall','Moderate','hike','Hidden waterfall trek in Kiambu.'),
    T('thiba','Thiba Falls','🇰🇪 Kenya','Kirinyaga, Kenya',2500,'1 Day','10-25','2026-09-20','upcoming','1Y2eeuWMXEGyu1-a3g2V9Y0f9d5B51w1c','💧 Waterfall','Moderate','hike','Cascading falls near Mount Kenya.'),
    T('ragia','Ragia Falls','🇰🇪 Kenya','Nyeri, Kenya',3000,'1 Day','10-25','2026-09-27','upcoming','1xMcnBK0IxNS3lhSaSxJGe5E0t3SpdmPf','💧 Waterfall','Moderate','hike','Scenic waterfall trek.'),
    T('teliza','Teliza Gardens Ruiru','🇰🇪 Kenya','Kiambu, Kenya',1700,'1 Day','10-30','2026-10-04','upcoming','1_O8dxEwUWyYgl7lMh_mozsyDyEoKYQ-v','🌻 Gardens','Easy','recreational','Beautiful gardens in Ruiru.'),
    T('masinga','Masinga Dam Spillway','🇰🇪 Kenya','Machakos, Kenya',2500,'1 Day','10-25','2026-10-11','upcoming','19u1d8a4RMdmEWEG2ptcNOGHLKRD6YGWq','💧 Dam','Easy','recreational','Dam spillway views.'),
    T('ndakaini','Ndakaini Dam','🇰🇪 Kenya',"Murang'a, Kenya",2300,'1 Day','10-25','2026-10-18','upcoming','1dtBxy0D9V1l2df3B16wFWk3p2HRl1Vhu','💧 Dam','Easy','recreational','Nairobi water supply dam.'),
    T('swara','Swara Acacia Lodge – Athi River','🇰🇪 Kenya','Machakos, Kenya',1500,'1 Day','10-40','2026-10-25','upcoming','1B8s3MqDWnXtg78oHgdBVpGppbpmLmA3b','🌳 Lodge','Easy','recreational','Nature lodge near Athi River.'),
    T('thayu','Thayu Tea Farm','🇰🇪 Kenya','Kiambu, Kenya',1500,'1 Day','10-25','2026-11-01','upcoming','1FMqMJ0RhnwMfg4Uu18B3SI7p6d9vB_qx','🍃 Tea','Easy','culinary','Tea farm tour and tasting.'),
    T('lukenya','Lukenya Hike','🇰🇪 Kenya','Machakos, Kenya',1500,'1 Day','10-30','2026-11-08','upcoming','1KqkV7jAJgip28lltcWQOd6C3HRIeUK67','🥾 Hike','Moderate','hike','Lukenya hills hike.'),
    T('menengai','Menengai Crater','🇰🇪 Kenya','Nakuru, Kenya',2500,'1 Day','10-25','2026-11-15','upcoming','1QSQM6QlopAMdIiotgzf2aM7n6BnISGNk','🌋 Crater','Moderate','hike','Volcanic crater hike.'),
    T('mkWild','Mount Kenya Wildlife Conservancy','🇰🇪 Kenya','Nanyuki, Kenya',3500,'1 Day','10-30','2026-11-22','upcoming','19E4dqeZJXw-JdGSjDxvQXEATy5l4JhoK','🦌 Wildlife','Easy','adventure-wildlife','Bongo sanctuary.'),
    T('magicaqua','Nairobi Magic Aqua Park','🇰🇪 Kenya','Nairobi, Kenya',1500,'1 Day','5-40','2026-11-29','upcoming','1YWhQJAOmTZ1HSxvWhEv1xNByDB_eUOCv','🎢 Aqua','Easy','recreational','Aqua park and water slides.'),
    T('sheldrickorphan','David Sheldrick Elephant Orphanage','🇰🇪 Kenya','Nairobi, Kenya',1500,'1 Day','10-30','2026-12-06','upcoming','1mDYrQZxKsRjfiNrhkBTel5_lnWLi7uXr','🐘 Orphanage','Easy','adventure-wildlife','Elephant orphan rescue.'),
    T('millennium','Millennium Maze Nanyuki','🇰🇪 Kenya','Laikipia, Kenya',3300,'1 Day','10-30','2026-12-13','upcoming','1XnxcGPl39nRBdBJXnLsdvs7BG_qFaZC4','🎯 Fun','Easy','recreational','Millennium Maze and family activities.'),
    T('gatamaiyu','Gatamaiyu Keretta Falls','🇰🇪 Kenya','Kiambu, Kenya',1500,'1 Day','10-25','2026-12-20','upcoming','1a1GWq-i5rkl68SywRKlnpC5ydRggXHaw','💧 Waterfall','Moderate','hike','Forest waterfall hike.'),
    T('dragons',"Dragon's Teeth Aberdares",'🇰🇪 Kenya','Aberdares, Kenya',2500,'1 Day','10-20','2026-12-27','upcoming','1nvE7A46TMdeGpNKv54cXrP_OSZI-3MUA','🏔️ Hike','Challenging','hike',"Dragon's Teeth monoliths."),
    T('kenze','Kenze Gorges Makueni','🇰🇪 Kenya','Makueni, Kenya',2600,'1 Day','10-25','2027-01-03','upcoming','17l10LpFzQLuvN0pvSERFt3IqiwmIJHMO','🪨 Gorge','Moderate','hike','Canyon gorges.'),
    T('nyamindi','River Nyamindi Embu','🇰🇪 Kenya','Embu, Kenya',3300,'1 Day','10-25','2027-01-10','upcoming','1UdGGFP-VfeSTCZ1KO9aVa9Cm4w0EqWA7','💧 River','Moderate','adventure','River walk and rapids.'),
    T('nthenge','Nthenge Njeru Waterfalls','🇰🇪 Kenya',"Murang'a, Kenya",2000,'1 Day','10-25','2027-01-17','upcoming','1GftBc_xXrw07lc1jsBDS5g-sfc5pjY56','💧 Waterfall','Moderate','hike','Hidden waterfall trek.'),
    T('bogoria','Lake Bogoria Hot Springs','🇰🇪 Kenya','Baringo, Kenya',3700,'1 Day','15-30','2027-01-24','upcoming','1xtWmnX_ok89yvr7sdzGP0pLUPmVg5R0l','♨️ Hot Springs','Easy','adventure-wildlife','Geothermal hot springs.'),
    T('ruanyoni','Rua Nyoni Waterfalls Embu','🇰🇪 Kenya','Embu, Kenya',3500,'1 Day','10-25','2027-01-31','upcoming','1x9VY4VfuhsqwzWWamWMcTgw_KerTfb9w','💧 Waterfall','Moderate','hike','Rua Nyoni falls.'),
    T('njine','Njine Falls','🇰🇪 Kenya','Nyeri, Kenya',3300,'1 Day','10-25','2027-02-07','upcoming','1HJ96pOwSxuAwfpJO_aXZ1HZAia61aSTq','💧 Waterfall','Moderate','hike','Njine Falls adventure.'),
    T('magura','Magura Falls','🇰🇪 Kenya','Nyandarua, Kenya',2400,'1 Day','10-25','2027-02-14','upcoming','1xiumL4s8KHsHmd5u9Bn50fP3vH9Tqi_X','💧 Waterfall','Moderate','hike','Magura Falls scenic trek.'),
    T('chania','Chania Falls','🇰🇪 Kenya','Kiambu, Kenya',1500,'1 Day','10-30','2027-02-21','upcoming','13RZtgOfoPv7vQTJkvJ3jukohINPzrPox','💧 Waterfall','Easy','hike','Chania Falls day trip.'),
    T('giraffe','Giraffe Centre','🇰🇪 Kenya','Nairobi, Kenya',1500,'1 Day','10-40','2027-02-28','upcoming','1-pfStaCaLdnEXoamRxizuR58I76ZXlEh','🦒 Giraffe','Easy','recreational','Giraffe Centre feeding.'),
    T('loita','Loita Hills Waterfall','🇰🇪 Kenya','Narok, Kenya',2800,'1 Day','10-25','2027-03-07','upcoming','1LyhBvaR8avkW5AH2xGheWYJeBcZ4wRt4','💧 Waterfall','Moderate','hike','Loita Hills waterfall.'),
    T('ngarendare','Ngare Ndare','🇰🇪 Kenya','Laikipia, Kenya',2500,'1 Day','10-25','2027-03-14','upcoming','1nR28-hVI8o3hmSjiulPIIAhjjkdymcku','🌊 Blue Pools','Moderate','hike','Famous blue pools and canopy walk.'),
    T('mzima','Mzima Springs','🇰🇪 Kenya','Taita-Taveta, Kenya',4000,'1 Day','10-30','2027-03-21','upcoming','1VObL0SYxSunWmL6qaqENBryLyi-MtgGr','💧 Springs','Easy','adventure-wildlife','Crystal-clear springs in Tsavo.'),
    T('muranga',"Murang'a Gorges",'🇰🇪 Kenya',"Murang'a, Kenya",2500,'1 Day','10-25','2027-03-28','upcoming','19-La-3EeiIimyACCnGlYpdo2ck2wmmd1','🪨 Gorge','Moderate','hike',"Murang'a river gorges."),
    T('kamakia','Kamakia Waterfalls','🇰🇪 Kenya','Meru, Kenya',2200,'1 Day','10-25','2027-04-04','upcoming','1eJh7O9fBtQbOnUSHwxeSPNAL3aF_-q3B','💧 Waterfall','Moderate','hike','Kamakia Falls.'),
    T('zaina','Zaina Waterfalls','🇰🇪 Kenya','Nyeri, Kenya',3500,'1 Day','10-25','2027-04-11','upcoming','1HhBTRWR4xgiTx8rVey3oQnQpsMIk8xMV','💧 Waterfall','Moderate','hike','Zaina Falls adventure.')
  ];

  const WEEKEND = [
    T('revelation','Revelation Park Retreat','🇰🇪 Kenya','Mwingi, Kenya',2700,'3 Days','15-40','2026-06-05','upcoming','1_JiDzRIx17OuoFbwVsab9FMqjETlv-SM','🏞️ Retreat','Easy','weekend','Serene retreat with bonfires.'),
    T('samburu','Samburu, Buffalo Springs & Shaba Reserves','🇰🇪 Kenya','Samburu, Kenya',6000,'3 Days','10-25','2026-03-27','upcoming','1R1PwkhZI4U2qt1mmECfHw7fBw4hQlWGu','🦓 Special Five','Moderate','adventure-wildlife','Arid northern wildlife.'),
    T('chala','Lake Chala (Taveta)','🇰🇪 Kenya','Taveta, Kenya',4500,'2 Days','10-25','2026-04-10','upcoming','1IOwcSG6PPYvrzc6SfLdptzb0XIaTpVO1','🌋 Crater','Moderate','adventure','Deep volcanic crater lake.'),
    T('turkana','Lake Turkana & Central Island','🇰🇪 Kenya','Turkana, Kenya',8000,'3 Days','8-20','2026-05-01','upcoming','1SRXSTwf8Om84j2UU-sA6q45Zszo7zz_w','🌊 Jade Sea','Challenging','adventure-wildlife','The Jade Sea.'),
    T('elgon','Mount Elgon & Kitum Cave','🇰🇪 Kenya','Bungoma, Kenya',6500,'3 Days','8-15','2026-05-15','upcoming','16XLN13IQHQ3hutWdng4ylOwrdB1gRWcG','🏔️ Cave','Challenging','hike','Volcanic caldera and elephant caves.'),
    T('kasigau','Mount Kasigau (Taita)','🇰🇪 Kenya','Taita-Taveta, Kenya',4500,'2 Days','8-15','2026-05-22','upcoming','1qELiJHpoOSJKmoU1n4I6iAmGWpL7wgRc','⛰️ Forest','Challenging','hike','Forest-capped monolith.'),
    T('shimba','Shimba Hills National Reserve','🇰🇪 Kenya','Kwale, Kenya',5000,'2 Days','10-30','2026-05-29','upcoming','1NzeetS8NS-2lce82AfMnXNlyrP-6eJ66','🦌 Forest','Easy','adventure-wildlife','Coastal rainforest.'),
    T('gede','Gede Ruins & Arabuko-Sokoke Forest','🇰🇪 Kenya','Kilifi, Kenya',4500,'2 Days','10-30','2026-06-12','upcoming','1Sgpw1iaW2sEGWkGQCc7qx3oZugBWdLI_','🏛️ Ruins','Easy','cultural','12th-century ruined city.'),
    T('marafa',"Hell's Kitchen / Marafa Depression",'🇰🇪 Kenya','Kilifi, Kenya',5000,'2 Days','10-30','2026-06-19','upcoming','1-SGk8ofspElwz_19Uw7vJiW_cCq_dtvt','🪨 Canyon','Easy','adventure','Multi-hued sandstone canyons.'),
    T('wasini','Wasini Island & Kisite-Mpunguti','🇰🇪 Kenya','Kwale, Kenya',6000,'2 Days','10-25','2026-06-26','upcoming','1B6r_15bJ8RXAPAEFVV_a8huZXiUqYes8','🐬 Dolphins','Easy','adventure','Coral reef snorkeling.'),
    T('midacreek','Mida Creek (Watamu)','🇰🇪 Kenya','Kilifi, Kenya',6500,'2 Days','10-25','2026-07-03','upcoming','1bfc88uy6jFhNKufoHtx2WpXyt_Dmxs50','🛶 Mangrove','Easy','adventure','Mangrove boardwalks.'),
    T('kilificreek','Kilifi Creek & Bofa Beach','🇰🇪 Kenya','Kilifi, Kenya',6500,'2 Days','10-25','2026-07-10','upcoming','1eotUwVo9bARi2D0nrCfcv5T30K_UwLZD','⛵ Sailing','Easy','adventure','Deep-water creek sailing.'),
    T('pate','Pate & Kiwayu Islands','🇰🇪 Kenya','Lamu, Kenya',8000,'3 Days','8-20','2026-07-17','upcoming','1TCphN7gQzIiuBsmxJEqFlqTRacWBRkRZ','🐢 Turtles','Moderate','adventure','Sea turtle nesting beaches.'),
    T('kakamega','Kakamega Forest National Reserve','🇰🇪 Kenya','Kakamega, Kenya',4500,'2 Days','10-25','2026-07-24','upcoming','1dHVZfgVu_HcGgoRJZoWap4SJ7xrj5_aT','🌳 Rainforest','Easy','adventure-wildlife','Ancient equatorial rainforest.'),
    T('kisumu','Kisumu Impala Sanctuary & Dunga Hill','🇰🇪 Kenya','Kisumu, Kenya',4500,'2 Days','10-30','2026-07-31','upcoming','1Nxcn8ZFBbD69LQHb0KZ3lEKOxwgFkp1f','🦛 Hippos','Easy','adventure-wildlife','Lake Victoria shorelines.'),
    T('kitmikayi','Kit Mikayi (Siaya)','🇰🇪 Kenya','Siaya, Kenya',4500,'2 Days','10-25','2026-08-07','upcoming','1qdWBEXFIGBzqshT_vepcgwtUm0ar4rwv','🪨 Cultural','Easy','cultural','Granite balancing rocks.'),
    T('cryingstone','Crying Stone of Ilesi','🇰🇪 Kenya','Kakamega, Kenya',5500,'2 Days','10-25','2026-08-14','upcoming','1qJrHnxUNR-O2ox2HuOcohkYjGR3hHpmS','🪨 Cultural','Easy','cultural','Unique rock formation.'),
    T('rusinga','Rusinga Island','🇰🇪 Kenya','Homa Bay, Kenya',7500,'3 Days','10-25','2026-08-21','upcoming','1EGR-_klDXlzoqBtHGENRORJSAiIMb2i5','🏝️ Island','Easy','adventure','Peaceful Lake Victoria island.'),
    T('ndere','Ndere Island National Park','🇰🇪 Kenya','Kisumu, Kenya',7500,'3 Days','10-25','2026-08-28','upcoming','1MlTrm1g3bG3xWBn5YSso7bvJHmYu3DHm','🦎 Walking Safari','Moderate','adventure-wildlife','Walking safari island.'),
    T('saiwa','Saiwa Swamp National Park','🇰🇪 Kenya','Trans-Nzoia, Kenya',4500,'2 Days','10-25','2026-09-04','upcoming','19ZGH9voDXTZ76ocO8r2pJ8ZyqVwtbeKc','🦌 Sitatunga','Easy','adventure-wildlife','Boardwalks over swamps.'),
    T('sipi','Sipi Falls (Mt. Elgon Slopes)','🇰🇪 Kenya','Bungoma, Kenya',6000,'2 Days','10-25','2026-09-11','upcoming','1_EeUltJg-fltjuFEqvORpSyVjkwrnYse','💧 Waterfall','Moderate','hike','Triple cascading waterfalls.'),
    T('ruma','Ruma National Park (Homa Bay)','🇰🇪 Kenya','Homa Bay, Kenya',5000,'2 Days','10-25','2026-09-18','upcoming','1qG6srlsnycaqceyd6lWoe7dON0uQWbgs','🦌 Roan','Easy','adventure-wildlife','Last Roan antelopes.'),
    T('tugen','Tugen Hills & Iten Viewpoint','🇰🇪 Kenya','Baringo, Kenya',4500,'2 Days','10-25','2026-09-25','upcoming','1WkDOZ-1FTsE1wtapfQWWF0HusVHMdaWE','🏔️ Runner','Challenging','hike','Marathon runner training grounds.'),
    T('kerio','Kerio Valley & Cheploch Gorge','🇰🇪 Kenya','Elgeyo-Marakwet, Kenya',3800,'2 Days','10-25','2026-10-02','upcoming','1_mUwSJWlJef3sKzmwuMrKvpTe-jGg0cm','🏞️ Gorge','Moderate','adventure','Deep fault valley.'),
    T('chyulu','Chyulu Hills National Park','🇰🇪 Kenya','Makueni, Kenya',4500,'2 Days','10-25','2026-10-09','upcoming','1h6P7Pa9f22tw4sHLKqjRjvbijFoxmoeq','🌋 Hills','Moderate','adventure-wildlife','Volcanic hills and lava tubes.'),
    T('gurakaruru','Gura & Karuru Falls (Aberdares)','🇰🇪 Kenya','Nyandarua, Kenya',3500,'2 Days','10-25','2026-10-16','upcoming','155JU395gHzYQWqWY6HOFFVmEeHlN3ph9',"💧 Kenya's Highest",'Moderate','hike',"Kenya's highest waterfall (273m)."),
    T('marsabit','Marsabit National Park & Lake Paradise','🇰🇪 Kenya','Marsabit, Kenya',7500,'3 Days','8-20','2026-10-23','upcoming','1qbYj3DybTqMOOF6ePUC__cx4gN1dXfns','🐘 Tuskers','Moderate','adventure-wildlife','Mist forest crater lake.'),
    T('takwa','Takwa Ruins (Manda Island)','🇰🇪 Kenya','Lamu, Kenya',7000,'3 Days','8-20','2026-10-30','upcoming','1-FK2MU6Oe-Adf5njamsc5at4c3ZNOUYy','🏛️ Ruins','Easy','cultural','16th-century Swahili town ruins.'),
    T('ololokwe','Mount Ololokwe / Sabache','🇰🇪 Kenya','Marsabit, Kenya',4500,'2 Days','8-15','2026-11-06','upcoming','1tZRNNNTM2TZqTawQw9omJ4I-feoFs0-a','🏔️ Sacred','Challenging','hike','Sacred flat-topped monolith.'),
    T('kulal','Mount Kulal','🇰🇪 Kenya','Marsabit, Kenya',6500,'3 Days','8-15','2026-11-13','upcoming','1d-cWifxnwjolXZNgMlxFA_-V2j7zF-Bq','🏔️ Biosphere','Challenging','hike','Biosphere reserve mountain.'),
    T('ngurunit','Ngurunit & Ndoto Mountains','🇰🇪 Kenya','Marsabit, Kenya',6500,'3 Days','8-15','2026-11-20','upcoming','1tOFpgrMMOmQukdRfVPnQM9zYP6cN852r','🪨 Granite','Challenging','hike','Granite peaks.'),
    T('chalbi','Chalbi Desert & Kalacha Oasis','🇰🇪 Kenya','Marsabit, Kenya',7000,'3 Days','8-15','2026-11-27','upcoming','1R-qeGdFH6YGHpxgGbBHLzkRWqtzhqeeA','🏜️ Desert','Challenging','adventure','Salt pan with palm springs.'),
    T('suguta','Suguta Valley & Cathedral Rock','🇰🇪 Kenya','Turkana, Kenya',8000,'3 Days','6-12','2026-12-04','upcoming','1sbDVBFQjjmJL8YkM3LunSf8-hjewO2bq','🏜️ Hyper-arid','Challenging','adventure','Red dunes.'),
    T('reteti','Reteti Elephant Sanctuary','🇰🇪 Kenya','Samburu, Kenya',6000,'2 Days','10-25','2026-12-11','upcoming','1GsSTz9cMweUynA26xDL63pQL8AjXYAFR','🐘 Rescue','Easy','adventure-wildlife','Community elephant rescue.'),
    T('sera','Sera Rhino Sanctuary & Singing Wells','🇰🇪 Kenya','Samburu, Kenya',7500,'3 Days','8-20','2026-12-18','upcoming','1qDe9Xdk0Xb6DzcMY9xviQ1UTMlBGN2sH','🦏 Rhino','Moderate','adventure-wildlife','Rhino tracking.'),
    T('sibiloi','Sibiloi National Park & Koobi Fora','🇰🇪 Kenya','Turkana, Kenya',8500,'3 Days','6-15','2026-12-22','upcoming','1X67MkmzQUeSxd_yB_D-otIjNS4VXvt6t','🦴 Fossils','Challenging','adventure-wildlife','Cradle of Mankind.'),
    T('loiyangalani','Loiyangalani & Desert Museum','🇰🇪 Kenya','Marsabit, Kenya',8500,'3 Days','8-20','2026-12-26','upcoming','1HWrAMXT-Lgv98G_PbOzORMXTSojw83vE','🏛️ Cultural','Moderate','cultural','Lake Turkana cultural hub.'),
    T('maralal','Maralal & Losiolo Escarpment','🇰🇪 Kenya','Samburu, Kenya',5800,'2 Days','10-25','2026-12-29','upcoming','1pzS9fVc0VwUKkp2_htHT9nK4SSXKJruH','🏞️ Viewpoint','Moderate','adventure','Rift Valley viewpoint.'),
    T('karweti','Karweti Waterfalls','🇰🇪 Kenya','Meru, Kenya',7250,'2 Days','10-25','2026-07-08','upcoming','1EwzUqvuVg0AK-FiDO5BMF91pU0yCNJGQ','💧 Waterfall','Challenging','hike','Karweti waterfalls.'),
    T('kapsimotwa','Kapsimotwa Nandi Hills','🇰🇪 Kenya','Nandi, Kenya',5000,'2 Days','10-25','2026-07-15','upcoming','1FnZ1cKogt0e3ryt8OJXFkhaJabNx90Wd','🌄 Hills','Moderate','hike','Nandi hills.'),
    T('kiunga','Kiunga Marine Lamu','🇰🇪 Kenya','Lamu, Kenya',7500,'3 Days','8-20','2026-07-22','upcoming','13467RwyEi-fX5vpOGgNEH7PRkeFPvppU','🐢 Marine','Moderate','adventure','Marine reserve by boat.'),
    T('mwaluganje','Mwaluganje Elephants Kwale','🇰🇪 Kenya','Kwale, Kenya',7400,'2 Days','10-25','2026-07-29','upcoming','1hYuF6zJM-mH6SIGJI9oum08K72TZcBhv','🐘 Elephants','Easy','adventure-wildlife','Elephant sanctuary.'),
    T('turkwel','Turkwel Dam Pokot','🇰🇪 Kenya','West Pokot, Kenya',5200,'2 Days','10-25','2026-08-05','upcoming','12B7oswtwM-1aGhYyuMlLnqFAdxwc_0_O','💧 Dam','Moderate','adventure','Turkwel Dam and gorge.'),
    T('sheldrickkwale','Sheldrick Falls Kwale','🇰🇪 Kenya','Kwale, Kenya',7400,'2 Days','10-25','2026-08-12','upcoming','1I-ZeS-hWyYGcbhyA5KKh7HQRz8-JT_T7','💧 Waterfall','Moderate','hike','Sheldrick Falls hike.'),
    T('sironka','Sironka Valley Resort','🇰🇪 Kenya','Narok, Kenya',5500,'2 Days','10-30','2026-08-19','upcoming','1QHzXM5YDSSCrbVYZzKBMSWmqEAV12oPr','🏞️ Resort','Easy','recreational','Sironka Valley Resort.'),
    T('mathews','Mathews Range - Samburu','🇰🇪 Kenya','Samburu, Kenya',6200,'2 Days','8-15','2026-08-26','upcoming','18M8YvyyLpwMtg5sG4IrCti4uDdjbPfeY','🏔️ Range','Challenging','hike','Mathews Range trek.'),
    T('saltys',"Salty's on the Creek Kilifi",'🇰🇪 Kenya','Kilifi, Kenya',7500,'2 Days','10-25','2026-09-02','upcoming','1zdQb39mJbi_U6gS-2LHYIF4AWz90Sl_i','🏖️ Beach','Easy','recreational',"Salty's creek lodge."),
    T('sarara','Sarara Tree House','🇰🇪 Kenya','Samburu, Kenya',5000,'2 Days','8-15','2026-09-09','upcoming','1IPM1nll7SDLYseB8hQHiK4BAfMlPof6n','🌳 Treehouse','Easy','adventure','Sarara tree house.'),
    T('loisaba','Loisaba Starbeds','🇰🇪 Kenya','Laikipia, Kenya',6000,'2 Days','8-20','2026-09-16','upcoming','16kmYZePyhlhQKRnels1r36b5h2l4zb5J','⭐ Stargazing','Easy','adventure','Loisaba Starbeds.'),
    T('kiwayu','Kiwayu Island Lamu','🇰🇪 Kenya','Lamu, Kenya',7000,'3 Days','8-20','2026-09-23','upcoming','1RTti-bK1L8Om36Wi6lYS94JnoLgT1a67','🏝️ Island','Moderate','adventure','Kiwayu Island by boat.'),
    T('chepkiit','Chepkiit Waterfalls Nandi','🇰🇪 Kenya','Nandi, Kenya',6800,'2 Days','10-25','2026-09-30','upcoming','1fjDn4YgLhvijthX72Y2hxi012SM-SzzP','💧 Waterfall','Moderate','hike','Chepkiit Falls overnight.'),
    T('kapedo','Lake Kapedo Turkana','🇰🇪 Kenya','Turkana, Kenya',8500,'3 Days','6-12','2026-10-07','upcoming','1w6yhmCd6mlMLGTJO0plWUJzSS9IlhK5Y','🌊 Remote','Challenging','adventure','Lake Kapedo.'),
    T('takawiri','Takawiri Island','🇰🇪 Kenya','Homa Bay, Kenya',7200,'3 Days','10-25','2026-10-14','upcoming','1mrRxKjUSEZt_YLbLonXemxM3THdh_CWT','🏝️ Island','Easy','adventure','Takawiri Island.'),
    T('nguuni','Nguuni Sanctuary','🇰🇪 Kenya','Mombasa, Kenya',5400,'2 Days','10-30','2026-10-21','upcoming','1ET72ZBLxi91Q91MKldyLfvSf1ZNgTIf5','🦌 Sanctuary','Easy','adventure-wildlife','Nguuni Nature Sanctuary.'),
    T('tiwi','Tiwi Beach','🇰🇪 Kenya','Kwale, Kenya',7400,'2 Days','10-25','2026-10-28','upcoming','1SMCiYPNs9dDk5RNrMEtb7GOpU6lg8ldt','🏖️ Beach','Easy','beach','Tiwi Beach.'),
    T('nyali','Nyali Beach','🇰🇪 Kenya','Mombasa, Kenya',5400,'2 Days','10-30','2026-11-04','upcoming','13uodhezzhTUv-Te6YQIp9R_Jzma9NDEL','🏖️ Beach','Easy','beach','Nyali Beach.'),
    T('bamburi','Bamburi Beach','🇰🇪 Kenya','Mombasa, Kenya',5400,'2 Days','10-30','2026-11-11','upcoming','1OyaO0tPZ1xTUzlv8WkUU3WvtW6mcvsmP','🏖️ Beach','Easy','beach','Bamburi Beach.'),
    T('pirates','Pirates Beach','🇰🇪 Kenya','Mombasa, Kenya',5400,'2 Days','10-30','2026-11-18','upcoming','1J4OV3DwS1CG7Uj_yAWGJ86A5ieLZGB-T','🏖️ Beach','Easy','beach','Pirates Beach.'),
    T('shanzu','Shanzu Beach','🇰🇪 Kenya','Mombasa, Kenya',5400,'2 Days','10-30','2026-11-25','upcoming','1S1t7vn_Z4EuoYEkBgddf0aQck0IU_9fs','🏖️ Beach','Easy','beach','Shanzu Beach.'),
    T('kikambala','Kikambala Beach','🇰🇪 Kenya','Kilifi, Kenya',5400,'2 Days','10-30','2026-12-02','upcoming','1-DCDwrNbyx_FhaIsL6rtiOBPA6K1JAU9','🏖️ Beach','Easy','beach','Kikambala Beach.'),
    T('chale','Chale Beach','🇰🇪 Kenya','Kwale, Kenya',5500,'2 Days','10-25','2026-12-09','upcoming','1HLohqfPl1cdWilkGyQAquLWqwXVJW5JM','🏖️ Beach','Easy','beach','Chale Beach.'),
    T('shelly','Shelly Beach','🇰🇪 Kenya','Mombasa, Kenya',5400,'2 Days','10-30','2026-12-16','upcoming','1jfW4D03B5JAGP1sQVex0pkz0u8zVyaNK','🏖️ Beach','Easy','beach','Shelly Beach.'),
    T('galu','Galu Beach','🇰🇪 Kenya','Kwale, Kenya',5400,'2 Days','10-25','2026-12-23','upcoming','1630_PIBKmvEo4N8m7T3ddjE_DJ1nMe4H','🏖️ Beach','Easy','beach','Galu Beach.')
  ];

  const KENYA = [
    {id:'rift',name:'Great Rift Valley Viewpoint',country:'🇰🇪 Kenya',location:'Kenya',price:5000,rating:4.4,difficulty:'Easy',duration:'Half Day',type:'adventure',image:'1VQtgp7fJb24o7YAjgsYQ7HkeYDHir8Tn',badge:'🌄 Views',description:'Scenic stop with sweeping vistas.'},
    {id:'hellsnp',name:"Hell's Gate National Park",country:'🇰🇪 Kenya',location:'Naivasha, Kenya',price:10000,rating:4.5,difficulty:'Moderate',duration:'1 Day',type:'adventure-wildlife',image:'1TDFZTQaICUHbK-SKakPrOlN-nVWTyw_V',badge:'🚴 Biking',description:'Dramatic gorge walk or bike.'},
    {id:'naivasha',name:'Lake Naivasha',country:'🇰🇪 Kenya',location:'Naivasha, Kenya',price:12000,rating:4.6,difficulty:'Easy',duration:'1 Day',type:'adventure-wildlife',image:'114jpi93_LuSz7gGUhj9E7lQKADemnTGa',badge:'🦛 Hippos',description:'Freshwater Rift Valley lake.'},
    {id:'nairnp',name:'Nairobi National Park',country:'🇰🇪 Kenya',location:'Nairobi, Kenya',price:15000,rating:4.8,difficulty:'Easy',duration:'1 Day',type:'adventure-wildlife',image:'1hVMpX2RKhnGzOD3sdWp9ti8R-rsZscIw',badge:'🦏 Urban Safari',description:'Urban safari park.'},
    {id:'nakuru',name:'Lake Nakuru National Park',country:'🇰🇪 Kenya',location:'Nakuru, Kenya',price:18000,rating:4.7,difficulty:'Easy',duration:'1 Day',type:'adventure-wildlife',image:'1QPyFGD9FgFG2640AyI27Wh5fZ5I7Fgct',badge:'🦩 Flamingos',description:'Alkaline lake with flamingos.'},
    {id:'mombasa',name:'Mombasa Old Town & Fort Jesus',country:'🇰🇪 Kenya',location:'Mombasa, Kenya',price:22000,rating:4.6,difficulty:'Easy',duration:'3 Days',type:'cultural',image:'1HrDmP90ISMymfaGS1rU0FcMNZRaB3cpj',badge:'🏰 History',description:'Historic coastal hub.'},
    {id:'amboseli',name:'Amboseli National Park',country:'🇰🇪 Kenya',location:'Kajiado, Kenya',price:28000,rating:4.8,difficulty:'Easy',duration:'3 Days',type:'adventure-wildlife',image:'1RtMxGQ929jV2mXKcnraYYQoo3ZD_rHfW',badge:'🐘 Elephants',description:'Elephants with Kilimanjaro views.'},
    {id:'watamu',name:'Watamu Marine Park',country:'🇰🇪 Kenya',location:'Kilifi, Kenya',price:28000,rating:4.7,difficulty:'Easy',duration:'3 Days',type:'beach',image:'1nbawFeNL-j4NI12-eHdf7Om80V3G2TNF',badge:'🐠 Snorkeling',description:'Pristine coral reefs.'},
    {id:'tsavo',name:'Tsavo National Park',country:'🇰🇪 Kenya',location:'Taita-Taveta, Kenya',price:30000,rating:4.7,difficulty:'Moderate',duration:'3 Days',type:'adventure-wildlife',image:'17YI4ERcm_GZ1M0f0k9IEkfDE6bagF8r2',badge:'🔴 Red Elephants',description:'Red dust elephants.'},
    {id:'dianib',name:'Diani Beach',country:'🇰🇪 Kenya',location:'Kwale, Kenya',price:30000,rating:4.9,difficulty:'Easy',duration:'3 Days',type:'beach',image:'1F8XfXt5U6FYevCXSgP6xmhoQAUtTxZUV',badge:'🏖️ Beach',description:'White-sand beach.'},
    {id:'samburuOrig',name:'Samburu Cultural Visit',country:'🇰🇪 Kenya',location:'Samburu, Kenya',price:32000,rating:4.6,difficulty:'Moderate',duration:'3 Days',type:'cultural',image:'1RWeoEYSrCa-hPaqaTC326pVQhbgz7kwQ',badge:'🦓 Cultural',description:'Samburu warrior immersion.'},
    {id:'mara',name:'Maasai Mara National Reserve',country:'🇰🇪 Kenya',location:'Narok, Kenya',price:35000,rating:4.9,difficulty:'Easy',duration:'3 Days',type:'adventure-wildlife',image:'1V_56Ll5gwyBCE5KnaiRzkS7HBLDdVcMX',badge:'🦁 Safari',description:'Great Migration.'},
    {id:'lamu',name:'Lamu Island',country:'🇰🇪 Kenya',location:'Lamu, Kenya',price:35000,rating:4.7,difficulty:'Easy',duration:'3 Days',type:'cultural',image:'1pvBm5cDcUTy8CJvLN-p5IvOEn20TO85r',badge:'🕌 Heritage',description:'Ancient Swahili settlement.'},
    {id:'pejeta',name:'Ol Pejeta Conservancy',country:'🇰🇪 Kenya',location:'Laikipia, Kenya',price:38000,rating:4.8,difficulty:'Easy',duration:'3 Days',type:'adventure-wildlife',image:'1BE3LkQmN-mq5mkvTYm8cIv67pMF5EKl8',badge:'🦏 Conservation',description:'Rhino conservancy.'},
    {id:'mtkenya',name:'Mount Kenya',country:'🇰🇪 Kenya',location:'Central Kenya',price:55000,rating:4.9,difficulty:'Challenging',duration:'5 Days',type:'hike',image:'1h-F55sz6wPXF5pAhjtn_G7ZbA31ieSkg',badge:'🏔️ Climbing',description:"Africa's 2nd-highest peak."}
  ];

  const AFRICA = [
    {id:'zanzibar',name:'Zanzibar',country:'🇹🇿 Tanzania',location:'Tanzania',price:45000,rating:4.8,duration:'5 Days',type:'beach',image:'1Q_LZsTE_OzD3myxYczfNt3EcGlRBITyA',badge:'🏖️ Island',description:'Indian Ocean island.'},
    {id:'luxor',name:'Luxor Beach & Hotel',country:'🇪🇬 Egypt',location:'Luxor, Egypt',price:50000,rating:4.6,duration:'5 Days',type:'cultural',image:'13Xnsz0JKhPrfk04adm1p74lizu9NW2Ip',badge:'🏛️ History',description:'Valley of the Kings.'},
    {id:'pyramids',name:'Pyramids of Giza',country:'🇪🇬 Egypt',location:'Cairo, Egypt',price:55000,rating:4.7,duration:'5 Days',type:'cultural',image:'18NLRXYILEEHidIPUokpbCvqPxAjbvUrP',badge:'🏛️ Ancient',description:'Pyramids and Sphinx.'},
    {id:'marrakech',name:'Marrakesh Imperial City',country:'🇲🇦 Morocco',location:'Marrakesh, Morocco',price:60000,rating:4.6,duration:'5 Days',type:'cultural',image:'1AjNCVEZ8WYmfsBqZKzIk0nfC3_00e7eF',badge:'🕌 Medina',description:'Bustling souks.'},
    {id:'serengeti',name:'Serengeti National Park',country:'🇹🇿 Tanzania',location:'Tanzania',price:65000,rating:4.9,duration:'5 Days',type:'adventure-wildlife',image:'1GZNLYkUvPd0NFBXeYLgMfCbkmhjkG9Tx',badge:'🦁 Safari',description:'Great Migration.'},
    {id:'sossusvlei',name:'Sossusvlei Sand Dunes',country:'🇳🇦 Namibia',location:'Namib Desert',price:65000,rating:4.7,duration:'5 Days',type:'adventure',image:'1y2ae-qfF1sZRptZ2koEjBq0hO0UluuZi',badge:'🏜️ Dunes',description:'Red sand dunes.'},
    {id:'kruger',name:'Kruger National Park',country:'🇿🇦 South Africa',location:'South Africa',price:70000,rating:4.8,duration:'7 Days',type:'adventure-wildlife',image:'1IRA8_XshOad-O_m4mwGhpXCSJ_P_QqZg',badge:'🦁 Safari',description:'Big Five park.'},
    {id:'vicfalls',name:'Victoria Falls',country:'🇿🇼 Zimbabwe',location:'Zimbabwe',price:75000,rating:4.8,duration:'5 Days',type:'adventure',image:'11bCsr6ILe1GrKRI4-x6k9JezXT3toB30',badge:'💦 Waterfall',description:'Massive waterfall.'},
    {id:'mauritius',name:'Mauritius',country:'🇲🇺 Mauritius',location:'Mauritius',price:75000,rating:4.8,duration:'7 Days',type:'beach',image:'1A5-XNXpEvOG2HMALCR7xNx9vzX4W7axa',badge:'🌊 Lagoon',description:'Coral reefs and lagoons.'},
    {id:'tablemt',name:'Table Mountain & Cape Town',country:'🇿🇦 South Africa',location:'Cape Town',price:80000,rating:4.8,duration:'7 Days',type:'city',image:'1jkDrNDhp3QjzoA8Y-hgGd_S3yTogmfLC',badge:'🏔️ City',description:'Flat-topped mountain city.'},
    {id:'okavango',name:'Okavango Delta',country:'🇧🇼 Botswana',location:'Botswana',price:85000,rating:4.9,duration:'5 Days',type:'adventure-wildlife',image:'1GEDD7I_9e4WJvXAb1dQSySPh5s_-sD7c',badge:'🛶 Mokoro',description:'Inland delta canoes.'},
    {id:'kilimanjaro',name:'Mount Kilimanjaro Camps',country:'🇹🇿 Tanzania',location:'Tanzania',price:90000,rating:4.8,duration:'7 Days',type:'hike',image:'1yeOg_m8oTGMB4kYbCr9IVsrfCHA7mk8e',badge:'🏔️ Summit',description:"Africa's highest peak."},
    {id:'bwindi',name:'Bwindi Forest',country:'🇺🇬 Uganda',location:'Uganda',price:95000,rating:5.0,duration:'3 Days',type:'adventure-wildlife',image:'1kPUfbugp-tnMekaRhRSQcdJGJ0U1PAaH',badge:'🦍 Gorillas',description:'Gorilla trekking.'},
    {id:'seychelles',name:'The Seychelles Beach',country:'🇸🇨 Seychelles',location:'Seychelles',price:95000,rating:4.9,duration:'7 Days',type:'beach',image:'1aH1KRxlgOhVQqFXyDUdOSnfHK4NQ4qkr',badge:'🏝️ Island',description:'Pristine archipelago.'}
  ];

  const GLOBAL = [
    {id:'bangkok',name:'Bangkok',country:'🇹🇭 Thailand',location:'Thailand',price:85000,rating:4.5,duration:'10 Days',type:'city',image:'1EoolNAV8sR6ZqEON_xR3xuePwubI7jfD',badge:'🛕 Temples',description:'Temples and islands.'},
    {id:'dubai',name:'Dubai',country:'🇦🇪 UAE',location:'UAE',price:95000,rating:4.8,duration:'5 Days',type:'city',image:'1F7uuxkLZXO444usOY28dftb44EvqQZVf',badge:'🏙️ Burj Khalifa',description:'Burj Khalifa and desert.'},
    {id:'istanbul',name:'Istanbul & Cappadocia',country:'🇹🇷 Turkey',location:'Turkey',price:100000,rating:4.7,duration:'10 Days',type:'cultural',image:'1lwTxOtC0DytReE1ZQG57FT-LRAkNGpOS',badge:'🎈 Balloons',description:'Hot air balloons.'},
    {id:'singapore',name:'Singapore',country:'🇸🇬 Singapore',location:'Singapore',price:110000,rating:4.7,duration:'7 Days',type:'city',image:'1LwaeaRQ5sWDSTLDlnuA1tqQuyYWCw-hK',badge:'🌴 Garden City',description:'Gardens by the Bay.'},
    {id:'barcelona',name:'Barcelona',country:'🇪🇸 Spain',location:'Spain',price:110000,rating:4.6,duration:'7 Days',type:'city',image:'1EuwLfghBH2Gy5vgGxrCylyMJ_ECNg9lf',badge:'🏖️ Mediterranean',description:'Sunny beaches and Gaudí.'},
    {id:'paris',name:'Paris',country:'🇫🇷 France',location:'France',price:120000,rating:4.8,duration:'7 Days',type:'city',image:'1Bzz1eS0bIUfG6zz-kZp9MslooK34D_0K',badge:'🗼 City of Light',description:'Eiffel Tower.'},
    {id:'berlin',name:'Berlin',country:'🇩🇪 Germany',location:'Germany',price:120000,rating:4.6,duration:'7 Days',type:'city',image:'1D_JAhMVZF18rADen738_s0XwXoASe4Jo',badge:'🏰 Castles',description:'Castles and history.'},
    {id:'bali',name:'Bali',country:'🇮🇩 Indonesia',location:'Indonesia',price:130000,rating:4.8,duration:'10 Days',type:'beach',image:'1Yg0cuE0LspALpCnVbvbhF4hy6pybVPLH',badge:'🌾 Rice Terraces',description:'Beaches and rice terraces.'},
    {id:'rome',name:'Rome',country:'🇮🇹 Italy',location:'Italy',price:130000,rating:4.8,duration:'7 Days',type:'cultural',image:'1VZ3o-c4C7dDVDkxycjGSqeJm4ubXgnc1',badge:'🏛️ Eternal City',description:'Colosseum.'},
    {id:'london',name:'London & Tower Bridge',country:'🇬🇧 UK',location:'UK',price:140000,rating:4.7,duration:'7 Days',type:'city',image:'1nWX1EpnJz1YuM5uHqr0sVoFJ0XNlT9Cu',badge:'🕰️ Big Ben',description:'Big Ben.'},
    {id:'beijing',name:'Beijing & Great Wall',country:'🇨🇳 China',location:'China',price:150000,rating:4.6,duration:'15 Days',type:'cultural',image:'1025UIak6mRSdvl39N-t8_ZPsnmW5l9Nw',badge:'🏯 Ancient',description:'Great Wall.'},
    {id:'cancun',name:'Cancún & Mayan Ruins',country:'🇲🇽 Mexico',location:'Mexico',price:160000,rating:4.6,duration:'15 Days',type:'beach',image:'17nCK_yHQ4yKb4sqneSsQqFYa4Nbk2pW4',badge:'🌴 Caribbean',description:'Mayan ruins.'},
    {id:'tokyo',name:'Tokyo',country:'🇯🇵 Japan',location:'Japan',price:180000,rating:4.8,duration:'15 Days',type:'city',image:'1AYr1t27uDmZM-84d9xxdl2S-sO702jEA',badge:'🗾 Blend',description:'Temples and tech.'},
    {id:'newyork',name:'New York',country:'🇺🇸 USA',location:'United States',price:200000,rating:4.7,duration:'15 Days',type:'city',image:'1re3K_7KtivtWr1AwG1UU4jBwxow-RCdt',badge:'🗽 Big Apple',description:'The Big Apple.'},
    {id:'sydney',name:'Sydney',country:'🇦🇺 Australia',location:'Australia',price:220000,rating:4.8,duration:'15 Days',type:'city',image:'1QMy8LvEXIgTiYlIYcy0Rue2CW-0CSVeI',badge:'🎭 Opera House',description:'Opera House.'}
  ];

  const CURATED = [
    {id:'nairday',name:'Nairobi City Day Tour',country:'🇰🇪 Kenya',location:'Kenya',price:8000,rating:4.6,duration:'1 Day',difficulty:'Easy',group:'2–15 pax',type:'city',image:'19Woke6AL2YxAtWGss9gFhSCA5obmrGN2',badge:'🏙️ City',description:'Giraffe Centre, Karen Blixen.'},
    {id:'mombwalk',name:'Mombasa Old Town Walk',country:'🇰🇪 Kenya',location:'Kenya',price:5000,rating:4.5,duration:'Half Day',difficulty:'Easy',group:'2–20 pax',type:'cultural',image:'1VmWgoSdHMBtcKWJsUEbCL7GojkvxG_Jh',badge:'🏰 Heritage',description:'Fort Jesus.'},
    {id:'naivbike',name:'Naivasha Bike & Hike',country:'🇰🇪 Kenya',location:'Kenya',price:15000,rating:4.6,duration:'2 Days',difficulty:'Moderate',group:'2–12 pax',type:'adventure',image:'1fq5KYE5N0DLgHi076LmIGJeoVdP9MNkq',badge:'🚴 Active',description:'Bike and hike.'},
    {id:'sambculture',name:'Samburu Cultural Visit',country:'🇰🇪 Kenya',location:'Kenya',price:18000,rating:4.6,duration:'2 Days',difficulty:'Moderate',group:'2–12 pax',type:'cultural',image:'1RWeoEYSrCa-hPaqaTC326pVQhbgz7kwQ',badge:'🏕️ Immersion',description:'Samburu warriors.'},
    {id:'deepfish',name:'Deep Sea Fishing',country:'🇰🇪 Kenya',location:'Kenya',price:25000,rating:4.5,duration:'1 Day',difficulty:'Moderate',group:'2–6 pax',type:'adventure',image:'1WZvTtHNMa9pW8R9C5PKv7np0NpKlf07O',badge:'🎣 Fishing',description:'Deep sea fishing.'},
    {id:'ambphoto',name:'Amboseli Photo Safari',country:'🇰🇪 Kenya',location:'Kenya',price:28000,rating:4.8,duration:'3 Days',difficulty:'Easy',group:'2–10 pax',type:'adventure-wildlife',image:'1RtMxGQ929jV2mXKcnraYYQoo3ZD_rHfW',badge:'📸 Photography',description:'Photo safari.'},
    {id:'lamudhow',name:'Lamu Dhow Cruise',country:'🇰🇪 Kenya',location:'Kenya',price:35000,rating:4.7,duration:'3 Days',difficulty:'Easy',group:'2–10 pax',type:'cultural',image:'1pvBm5cDcUTy8CJvLN-p5IvOEn20TO85r',badge:'⛵ Sailing',description:'Dhow cruise.'},
    {id:'dianiesc',name:'Diani Beach Escape',country:'🇰🇪 Kenya',location:'Kenya',price:38000,rating:4.7,duration:'5 Days',difficulty:'Easy',group:'2–20 pax',type:'beach',image:'1F8XfXt5U6FYevCXSgP6xmhoQAUtTxZUV',badge:'🏖️ Relax',description:'Beach resort.'},
    {id:'greatmig',name:'The Great Migration Safari',country:'🇰🇪 Kenya',location:'Kenya',price:45000,rating:4.9,duration:'4 Days',difficulty:'Easy',group:'2–12 pax',type:'adventure-wildlife',image:'1UePQ2iQpiuhALTNnD--tfbTGFxlcG3Ki',badge:'🦁 Signature',description:'Great Migration.'},
    {id:'balloon',name:'Hot Air Balloon Safari',country:'🇰🇪 Kenya',location:'Kenya',price:55000,rating:4.9,duration:'1 Day',difficulty:'Easy',group:'2–16 pax',type:'adventure',image:'11QC0mfWM061XpuaEl4WLe9AeBNxyMY7Z',badge:'🎈 Unique',description:'Balloon safari.'},
    {id:'kclimb',name:'Mount Kenya Climb',country:'🇰🇪 Kenya',location:'Kenya',price:65000,rating:4.7,duration:'5 Days',difficulty:'Challenging',group:'2–8 pax',type:'hike',image:'1h-F55sz6wPXF5pAhjtn_G7ZbA31ieSkg',badge:'🏔️ Summit',description:'Climb Mount Kenya.'},
    {id:'gorilla',name:'Mountain Gorilla Trekking',country:'🇺🇬 Uganda',location:'Uganda',price:85000,rating:4.8,duration:'3 Days',difficulty:'Challenging',group:'2–8 pax',type:'adventure-wildlife',image:'1Utpprqd8YCtX7i8ZgEE1G9nbbJJLD4w6',badge:'🦍 Rare',description:'Gorilla trek.'}
  ];

  const PORTFOLIO = [
    {id:'p1',name:"Sarah & Tom's Honeymoon",category:'Safaris',clientType:'Honeymoon Couple',story:'Sarah and Tom celebrated their new beginning with a 4-day safari.',testimonial:'Spyre made our honeymoon absolutely magical!',images:['1UePQ2iQpiuhALTNnD--tfbTGFxlcG3Ki','1GZNLYkUvPd0NFBXeYLgMfCbkmhjkG9Tx','11QC0mfWM061XpuaEl4WLe9AeBNxyMY7Z']},
    {id:'p2',name:'The Omondi Family',category:'Beach',clientType:'Family of 5',story:'The Omondi family enjoyed a 7-day all-inclusive beach holiday.',testimonial:'Best family vacation ever!',images:['1F8XfXt5U6FYevCXSgP6xmhoQAUtTxZUV','1Q_LZsTE_OzD3myxYczfNt3EcGlRBITyA','1V_56Ll5gwyBCE5KnaiRzkS7HBLDdVcMX']},
    {id:'p3',name:'TechAfrica Ltd.',category:'City',clientType:'Corporate Group',story:'20-person executive team combined business with pleasure.',testimonial:'Flawlessly organized.',images:['19Woke6AL2YxAtWGss9gFhSCA5obmrGN2','1hVMpX2RKhnGzOD3sdWp9ti8R-rsZscIw','1QPyFGD9FgFG2640AyI27Wh5fZ5I7Fgct']},
    {id:'p4',name:'Backpacker Group',category:'Cultural',clientType:'Backpackers',story:'8 international backpackers immersed in Maasai culture.',testimonial:'A transformation. Asante sana!',images:['1RWeoEYSrCa-hPaqaTC326pVQhbgz7kwQ','1BE3LkQmN-mq5mkvTYm8cIv67pMF5EKl8','1V_56Ll5gwyBCE5KnaiRzkS7HBLDdVcMX']}
  ];

  const MERCH = [
    {id:'m1',name:'Hoodie',price:3000,image:'1P-BOSJgX8El3cD1vy_OZi9uP8wsIeBll',tag:'Best Seller',type:'apparel'},
    {id:'m2',name:'Executive Polo Shirt',price:2000,image:'139ax2MppTS5Zdk2lhbUKAM-aW1cNuEfv',tag:'Classic',type:'apparel'},
    {id:'m3',name:'Sweat Suit & Hoodie Set',price:5500,image:'1s066zDSp9jWVO-Hk_w6fqyUQigISmHpG',tag:'Premium',type:'apparel'},
    {id:'m4',name:'Sweat Shirt',price:2500,image:'1bofCfrleKsJrn2V980hBm_tBrVWid1z1',tag:'Warm',type:'apparel'},
    {id:'m5',name:'White Polo Shirt',price:1200,image:'16pT0GnA_L9iLlLetQbEDfomdvuXmSekw',tag:'Clean',type:'apparel'},
    {id:'m6',name:'Green Polo Shirt',price:1200,image:'1fmy38Yu15H6FvPTueGhrHfv-ICrGOb2Q',tag:'Fresh',type:'apparel'},
    {id:'m7',name:'Color Mixed Polo Shirt',price:1500,image:'1wfKt1PEUNd_8BdmP_9cnzLa27GWEFJSa',tag:'Colorful',type:'apparel'},
    {id:'m8',name:'Executive T-Shirt',price:1500,image:'1XuBjVoawR1fzJJGZVFEUj_36R8zs6Yes',tag:'Smart',type:'apparel'},
    {id:'m9',name:'White T-Shirt',price:800,image:'10U8rNZppFNCPIhy3N39NDKLBkUhOgBLh',tag:'Basic',type:'apparel'},
    {id:'m10',name:'Green T-Shirt',price:800,image:'1k4zPAMSNmFsflBXGDVmIjm5z1qmlOF03',tag:'Fresh',type:'apparel'},
    {id:'m11',name:'Color Mixed T-Shirt',price:1000,image:'1eufK6qVKFQrLVx2v8sr2olsUMLdIL8ke',tag:'Vibrant',type:'apparel'},
    {id:'m12',name:'White Cap',price:500,image:'12AO7SrjMkJV60KtRUrjZ_D99SY8Li3DF',tag:'Gear',type:'gear'},
    {id:'m13',name:'Stanley Mug',price:3000,image:'1zOLGUxymSqYUtrckBjIqWJlmTxa_VaXs',tag:'Gear',type:'gear'},
    {id:'m14',name:'Stanley Mug (Alt)',price:3000,image:'1Gs1OFUmy6JTpcFlEsuc6CmXkKL1-AD1D',tag:'Gear',type:'gear'},
    {id:'m15',name:'Tote Bag',price:600,image:'1m8Y031imyhOIWvYrgkOkg9mcg_-PCnxP',tag:'Gear',type:'gear'},
    {id:'m16',name:'Safari Cap',price:850,image:'14QuRFy54yQPyI34rx8icUKVUzy433KIB',tag:'Gear',type:'gear'},
    {id:'m17',name:'White Small Safari Cap',price:750,image:'1asdZjdrGG18v9llqXaJ717OMw8E0grNT',tag:'Gear',type:'gear'},
    {id:'m18',name:'Water Bottle',price:1800,image:'1OgWjh5c-3XLENrzoz27UJdt29SxpBAov',tag:'Gear',type:'gear'}
  ];

  const DEALS = [
    {id:'d1',destId:'dianib',name:'Diani Beach Escape',discount:30,type:'Flash Sale',validity:'7 days',badge:'🔥 Hot Deal',image:'1F8XfXt5U6FYevCXSgP6xmhoQAUtTxZUV'},
    {id:'d2',destId:'amboseli',name:'Amboseli Weekend Safari',discount:25,type:'Early Bird',validity:'30 days',badge:'🐦 Early Bird',image:'1RtMxGQ929jV2mXKcnraYYQoo3ZD_rHfW'},
    {id:'d3',destId:'mara',name:'Group Maasai Mara',discount:17,type:'Group Special',validity:'60 days',badge:'👥 Group',image:'1V_56Ll5gwyBCE5KnaiRzkS7HBLDdVcMX'},
    {id:'d4',destId:'mombasa',name:'Mombasa All-Inclusive',discount:40,type:'Last Minute',validity:'2 days',badge:'⚡ Flash',image:'1HrDmP90ISMymfaGS1rU0FcMNZRaB3cpj'},
    {id:'d5',destId:'naivasha',name:'Lake Naivasha Weekend',discount:20,type:'Early Bird',validity:'30 days',badge:'🌅 Special',image:'114jpi93_LuSz7gGUhj9E7lQKADemnTGa'},
    {id:'d6',destId:'hellsnp',name:"Hell's Gate Cycling",discount:25,type:'Flash Sale',validity:'14 days',badge:'🚴 Deal',image:'1TDFZTQaICUHbK-SKakPrOlN-nVWTyw_V'},
    {id:'d7',destId:'lamu',name:'Lamu Island Escape',discount:22,type:'Group Special',validity:'45 days',badge:'🕌 Deal',image:'1pvBm5cDcUTy8CJvLN-p5IvOEn20TO85r'},
    {id:'d8',destId:'watamu',name:'Watamu Marine Park',discount:20,type:'Early Bird',validity:'30 days',badge:'🐠 Deal',image:'1nbawFeNL-j4NI12-eHdf7Om80V3G2TNF'}
  ];

  return {
    local: LOCAL.concat(LOCAL_NEW),
    weekend: WEEKEND,
    kenya: KENYA,
    africa: AFRICA,
    global: GLOBAL,
    curated: CURATED,
    portfolio: PORTFOLIO,
    merch: MERCH,
    deals: DEALS,
    team: [{id:'tm1',name:'Ben',role:'Founder & Chairman',bio:'With a passion for outdoor adventures and strategic leadership, Ben founded Silque Tours in 2025 to make group travel across Kenya and beyond accessible and unforgettable.',image:'1S-37CcfzLyZciV8lrPraAqEEHfrm-6x7',isFounder:true}],
    partners: [
      {id:'pt1',name:'Evewings Tours',description:'Premium travel partner for seamless Kenyan adventures.',image:'1ay3C650XzXKnjZ8ylvZdg_XQ4NoS57HW'},
      {id:'pt2',name:'Shavi Tours',description:'Reliable transportation and logistics partner.',image:'1C79g7OE5J9xcXpHvY19f0kBcXbBvVbZN'},
      {id:'pt3',name:'Anonymous Partner',description:'Confidential strategic partner for premium experiences. 🤫',image:''}
    ],
    testimonials: [
      {id:'ts1',name:'Linet',image:'12LKI2IxM6yNFF8jW0dwYKyIIEMg3hKqy',text:"Silque Tours made our WRC Naivasha experience absolutely incredible!",rating:5},
      {id:'ts2',name:'Lizzy',image:'1hCPhAWZ0ief1Rzox4t4NSP-yE6Ln0tJk',text:"The Kanunga Falls hike was exactly what I needed – well-organized!",rating:5},
      {id:'ts3',name:'Gift',image:'1_9SUadeu9wxpcl9VukqWWrX6Hbk4WvWD',text:"As a first-time traveler with Silque, I was blown away. Life-changing!",rating:5},
      {id:'ts4',name:'Msanii',image:'1K794ay32VgvybVLO-zzyv2j5mJoHcpQA',text:"Silque Tours knows how to create magic! Every detail was thought of.",rating:5}
    ],
    gallery: [],
    settings: {
      name:'Silque', slogan:'UNLOCK HAPPINESS', logo:'1jpHOrEq2eojQJS3orvtMnt2iFWST9ey3',
      heroImage:'1V_56Ll5gwyBCE5KnaiRzkS7HBLDdVcMX',
      heroText:"Curated group expeditions, international escapes, and unforgettable experiences.",
      phone:'+254 755 942 294', wa:'254755942294', email:'silquetours@gmail.com', location:'Nairobi, Kenya',
      officePhones:'+254 755 942 294', waNumbers:'254755942294',
      instagram:'https://www.instagram.com/silque_tnt',
      facebook:'https://www.facebook.com/share/1CYSWuphcN/',
      tiktok:'https://www.tiktok.com/@silque_tnt',
      youtube:'https://youtube.com/@benquzmedia',
      aboutTitle:'About Silque Tours', aboutSubtitle:'Established 2025. Creating unforgettable adventures.',
      aboutDesc:'Silque Tours was founded to make group travel across Kenya and beyond accessible and unforgettable.',
      newsTitle:'Latest Updates', newsBody:'Subscribe for new trips and exclusive deals.',
      privacy:'Your privacy is important. Silque Tours collects only information necessary for bookings. We never sell your data.',
      terms:'By booking you agree to our terms. Deposits are non-refundable within 7 days of trip departure.',
      faqs:'Q: Airport pickups? A: Yes, on request. Q: Group discounts? A: 10+ guests. Q: Payment? A: M-Pesa, bank, card.',
      paymentMethods: []
    },
    bookings: [], cart: [], devices: []
  };
})();