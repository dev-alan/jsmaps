import Vue from 'vue';
$(function () {
  const body = document.querySelector('body');
  const mobileTrigger = document.querySelector('#mobile-menu-trigger');

  let page = {
    init() {
      this.loadMobileMenu();
      this.loadCarousel();
      this.loadBackgroundImages();
      this.loadBookingForm();
    },
    loadBookingForm() {
      if(document.querySelector('#app-booking-form')) {
        let bookingForm = new Vue({
          el: '#app-booking-form',
          data: {
            marketData: {},
            currentStep: 3,
            selectedState: '',
            states: [],
            selectedRegion: '',
            regions: [],
            selectedTown: '',
            towns: [],
            selectedRadioStation: '',
            radioStations: [],
            selectedTimeSlot: 'Session Times',
            timeSlots: [],
            selectedAdType: 'Recorded',
            adTypes: [],
            sessionTimes: {},
            currentRecordedAdvertisingItem: null,
            mondaysX30: [],
            sponsorship: {
              news: {
                checked: false
              },
              sport: {
                checked: false
              },
              weather: {
                checked: false
              },
              traffic: {
                checked: false
              },
              finance: {
                checked: false
              },
              entertainment: {
                checked: false
              },
              quizzes: {
                checked: false
              },
              other: {
                checked: false
              },
              otherText: {
                disabled: true,
                value: ''
              }
            }
          },
          methods: {
            revealSection() {
              let visibleStep = 1;
              if(this.selectedState) {
                visibleStep = 2;
                if(this.selectedRegion && this.selectedTown && this.selectedRadioStation && this.selectedTimeSlot && this.selectedAdType) {
                  visibleStep = 3;
                }
              }
              this.currentStep = visibleStep;
            },
            getSortedStates() {
              let states = [];
              for(let state in this.marketData) {
                states.push(state);
              }
              this.states = states.sort((a, b) => {
                return a === b ? '0' : (a > b ? 1 : -1); 
              });
              //fast track
              if(this.states.length === 1) {
                this.selectedState = this.states[0];
                this.updateState();
              }
            },
            updateState() {
              this.selectedRegion = '';
              this.regions = [];
              this.selectedTown = '';
              this.towns = [];
              this.selectedRadioStation = '';
              this.radioStations = [];
              // this.selectedTimeSlot = '';
              // this.selectedAdType = '';
              if (this.selectedState) {
                this.getSortedRegions();
              }
              this.revealSection();
            },
            getSortedRegions() {
              let regions = [];
              if(!this.selectedState || !this.marketData[this.selectedState])
                return regions;
              for(let region in this.marketData[this.selectedState]) {
                regions.push(region);
              }
              this.regions = regions.sort((a, b) => {
                return a === b ? '0' : (a > b ? 1 : -1); 
              });
              //fast track
              if(this.regions.length === 1) {
                this.selectedRegion = this.regions[0];
                this.updateRegion();
              }
            },
            updateRegion() {
              this.selectedTown = '';
              this.towns = [];
              this.selectedRadioStation = '';
              this.radioStations = [];
              // this.selectedTimeSlot = '';
              // this.selectedAdType = '';
              if (this.selectedState && this.selectedRegion) {
                this.getSortedTowns();
              }
              this.revealSection();
            },
            getSortedTowns() {
              let towns = [];
              if(!this.selectedState || !this.marketData[this.selectedState] || !this.marketData[this.selectedState][this.selectedRegion])
                return towns;
              for(let town in this.marketData[this.selectedState][this.selectedRegion]) {
                towns.push(town);
              }
              this.towns = towns.sort((a, b) => {
                return a === b ? '0' : (a > b ? 1 : -1); 
              });

              //fast track
              if(this.towns.length === 1) {
                this.selectedTown = this.towns[0];
                this.updateTown();
              }
            },
            updateTown() {
              this.selectedRadioStation = '';
              this.radioStations = [];
              // this.selectedTimeSlot = '';
              // this.selectedAdType = '';
              if (this.selectedState && this.selectedRegion && this.selectedTown) {
                this.getSortedRadioStations();
              }
              this.revealSection();
            },
            getSortedRadioStations() {
              const ID = 0;
              const NAME = 1;
              let radioStations = [];
              if(!this.selectedState || !this.marketData[this.selectedState] || !this.marketData[this.selectedState][this.selectedRegion] || !this.marketData[this.selectedState][this.selectedRegion][this.selectedTown])
                return radioStations;
              radioStations = this.marketData[this.selectedState][this.selectedRegion][this.selectedTown];
              this.radioStations = radioStations.sort((a, b) => {
                return a[NAME] === b[NAME] ? '0' : (a[NAME] > b[NAME] ? 1 : -1); 
              });

              //fast track
              if(this.radioStations.length === 1) {
                // console.log(this.radioStations[0][ID])
                this.selectedRadioStation = this.radioStations[0][ID];
                this.updateRadioStation();
              }
            },
            updateRadioStation() {
              // this.selectedTimeSlot = '';
              // this.selectedAdType = '';
              if (this.selectedState && this.selectedRegion && this.selectedTown && this.selectedRadioStation) {
                //todo
              }
              this.revealSection();
            },
            getTimeSlots() {

            },
            updateTimesSlot() {
              //changes section 3
            },
            getAdType() {

            },
            updateAdType() {

            },
            getRecordedAdvertisingItem() {
              //reset item
              this.currentRecordedAdvertisingItem = this.generateRecordedAdvertisingItem();
            },
            generateRecordedAdvertisingItem() {
              var item = {
                breakfast: {
                  sessionInfo: {
                    title: 'breakfast',
                    timeSlot: '6am - 9am',
                  }
                },
                morning: {
                  sessionInfo: {
                    title: 'morning',
                    timeSlot: '9am - 12noon',
                  }
                },
                afternoon: {
                  sessionInfo: {
                    title: 'afternoon',
                    timeSlot: '12noon - 4pm',
                  }
                },
                drive: {
                  sessionInfo: {
                    title: 'drive',
                    timeSlot: '4pm - 7pm',
                  }
                },
                evening: {
                  sessionInfo: {
                    title: 'evening',
                    timeSlot: '7pm - 10pm',
                  }
                }
              }
              for(const prop in item) {
                item[prop]['week'] = {
                  mon: 0,
                  tue: 0,
                  wed: 0,
                  thur: 0,
                  fri: 0,
                  sat: 0,
                  sun: 0
                }
                item[prop]['activeWeeks'] = 0;
                item[prop]['weekCommencing'] = this.mondaysX30;
                item[prop]['estimate'] = 0;
              }
              return item;
            },
            getMondays(limit) {
              //by KB
              let d = new Date();
              if (d.getDay() > 1) {
                d.setDate(d.getDate() - (d.getDay() - 1));
              }
              let dates = [];
              for (var i = 0; i < limit - 1; i++) {
                d.setDate(d.getDate() + 7);
                dates.push(d.toJSON().slice(0, 10));
              }
            },
            updatedSponsorshipOther() {
              this.sponsorship.other.checked = !this.sponsorship.other.checked;
              if(this.sponsorship.other.checked) {
                this.sponsorship.otherText.disabled = false;
              } else {
                this.sponsorship.otherText.disabled = true;
                this.sponsorship.otherText.text = '';
              }
            },
            log(str) {
              console.log(str)
              if(this[str]) {
                console.log(this[str]);
              }
            }
          },
          computed: {
            
          },
          beforeMount() {
            this.marketData = { "NT": { "NT Darwin": { "Katherine": [[302, "8DN Darwin NT"]], "Darwin": [[300, "HOT 100 FM"], [301, "Territory 104.1 FM"], [303, "MIX 104.9 FM"], [304, "indigenous radio"]] }, "Alice Springs": { "Alice Springs": [[305, "8HA"], [306, "Sun FM 96.9"]] } }, "VIC": { "Victoria Regional": { "Warrnambool": [[127, "3YB 882 AM"], [128, "COAST 95.3"]], "SHEPPARTON": [[122, "hit 96.9"], [123, "Triple M 95.3"]], "WARRAGUL": [[126, "hit 94.3"]], "MT BULLER": [[118, "Triple M 91.3"]], "Hamilton": [[112, "3HA 981 AM"], [113, "MIXX 88.9 FM"]], "Horsham": [[115, "MIXX 101.3"], [114, "3WM 1089 AM"]], "Ballarat": [[102, "3BA 102.3 FM "], [103, "POWER 103.1 FM"]], "REMOTE VIC": [[119, "FLOW FM VICTORIA"]], "Sale Taralgon": [[120, "Gold 1242 AM"], [121, "TRFM"]], "MILDURA": [[116, "hit 99.5 FM"], [117, "Triple M 97.9"]], "BENDIGO": [[104, "Gold 98.3 FM"], [105, "1071 AM"], [106, "hit 91.9 FM"], [107, "Triple M 93.5"]], "Colac": [[108, "3CS 1134 AM"], [109, "MIXX 106.3 FM"]], "Swan Hill": [[124, "3SH 1332 AM"], [125, "MIXX 107.7"]], "Geelong": [[110, "BAY 93.9 FM"], [111, "KROCK FM"]] }, "Victoria": { "Melbourne": [[91, "SEN 1116 AM"], [92, "3AW 693 AM"], [93, "Talking Lifestyle 1278"], [94, "FOX Hit FM 101.9"], [95, "GOLD 104.3"], [96, "KIIS fm 101.1"], [97, "Triple M 105.1"], [98, "NOVA FM 100"], [99, "Smooth fm 91.5"], [100, "MyMP 1377 AM"], [101, "RSN Racing & Sport 927 AM"]] } }, "QLD": { "QLD Regional": { "ROMA": [[195, "hit 95.1 FM Roma"], [196, "4ZR 1476 AM"]], "REMOTE QLD/NSW": [[190, "REBEL NETWORK"], [191, "BREEZE NETWORK"]], "EMERALD": [[155, "hit 94.7 FM Emerald"], [156, "4HI  1143 AM"]], "Gold Coast": [[160, "Hot Tomato 102.9fm"], [161, "GOLD FM 92.5"], [162, "SEA hit 90.9 FM"]], "TOOWOOMBA": [[204, "4AK 1242 AM"], [205, "4WK 963 AM"], [201, "hit 100.7"], [202, "THE RANGE"], [203, "Triple M 864 "]], "MT ISA": [[181, "hot 102.5 Mt Isa"], [182, "4LM 666 AM"]], "MAREEBA": [[176, "hit 97.9 FM Mareeba"], [177, "4AM 1422 AM"]], "CHARLEVILLE": [[151, "Triple C FM 101.7"], [152, "4VL 918 AM"]], "Maroochydore": [[178, "Hot 91.1 FM"]], "MARYBOROUGH": [[179, "hit 101.9"], [180, "Triple M 103.5"]], "LONGREACH": [[170, "WEST FM 104.5"], [171, "4LG 1098 AM"]], "Airlie Beach COMBO": [[143, "STAR 90.7 FM"]], "Ipswich": [[167, "RIVER 94.9 FM"]], "WARWICK DALBY": [[212, "hit 91.9  97.5"]], "BUNDABERG": [[144, "SEA 93.1 FM"], [145, "4BU 1332 AM"], [146, "93.9 HITZ FM"]], "SUNSHINE COAST": [[198, "SEA 91.9"], [199, "MIX 92.7"], [200, "Hot 91.1 FM"]], "Innisfail": [[165, "4KZ 1025 AM"], [166, "KOOL 98.3 FM"]], "Gympie, Noosa": [[163, "4GY 558 AM"], [164, "ZINC 96.1 FM"]], "GLADSTONE": [[159, "4CC"], [157, "hit 93.5 FM"], [158, "Triple M 95.1"]], "ST GEORGE/DALBY": [[197, "4DB/4EM HOT COUNTRY"]], "REMOTE QLD": [[184, "REBEL OUTBACK"], [185, "REBEL SOUTH BRISBANE"], [186, "REBEL WESTERN DOWNS"], [187, "REBEL WIDE BAY"], [188, "BREEZE REGIONAL QLD"], [189, "BREEZE SOUTH BRISBANE"]], "CAIRNS": [[150, "STAR 102.7 FM"], [147, "hit 103.5 HOT FM"], [148, "Triple M 99.5"], [149, "4CA 846 AM"]], "MACKAY": [[172, "hit 100.3 FM"], [173, "Triple M 98.7"], [174, "4MK 1026 AM"], [175, "STAR 101.9 FM"]], "WHITSUNDAYS": [[213, "hit 94.7 FM"], [214, "Triple M 92.3"]], "CHARTERS TOWERS": [[153, "HOT FM 95.9"], [154, "4GC 828 AM"]], "Noosa": [[183, "ZINC 96.1 FM"]], "KINGAROY": [[168, "hit 89.1"], [169, "4SB 1071 AM"]], "ROCKHAMPTON": [[192, "107.9 hot fm Rockhampton"], [193, "Triple M 101.5"], [194, "4RO 990 AM"]], "TOWNSVILLE": [[206, "hit 103.1"], [207, "4TO 102.3 FM"], [208, "POWER 100.7 FM"], [209, "STAR 106.3 FM"], [210, "ZINC 100.7 FM"], [211, "STAR 106.3FM"]] }, "QLD": { "Gold Coast": [[140, "Hot Tomato 102.9fm"], [141, "GOLD FM 92.5"], [142, "SEA hit 90.9 FM"]], "Brisbane": [[133, "4BC 1116 AM"], [134, "Talking Lifestyle 882 Brisbane"], [135, "4KQ 693 AM"], [136, "hit 105 Brisbane"], [137, "97.3fm Brisbane"], [138, "Triple M 104.5"], [139, "NOVA FM 106.9"]] } }, "SA": { "SA Regional": { "Berri/Riverland": [[221, "5RM  801 AM"], [222, "MAGIC 93.1FM"]], "Spencer Gulf": [[229, "MAGIC 105.9FM"]], "REMOTE SA/NT/VIC": [[235, "FLOW FM NETWORK"]], "Murray Bridge": [[223, "5MU 1125 AM"], [224, "POWER 98.7FM"]], "REMOTE NT": [[236, "FLOW FM NT"]], "Port Pirie/Whyalla": [[228, "5CS 1044 AM"]], "REMOTE SA": [[232, "FLOW FM CENTRAL"], [233, "FLOW FM OUTBACK"], [234, "FLOW FM SOUTH EAST"]], "Port Lincoln": [[226, "5CC 765 AM"], [227, "MAGIC 89.9FM"]], "MT GAMBIER": [[230, "STAR 96.1FM"], [231, "5SE 963 AM Mt Gambier"]], "Port Augusta/Whyalla": [[225, "5AU 1242 AM"]] }, "Adelaide": { "Adelaide": [[216, "CRUISE 1323 AM"], [219, "NOVA 91.9"], [215, "FIVE AA 1395 AM"], [217, "MIX 102.3FM"], [218, "Triple M 104.7"], [220, "HIT 107 FM"]] } }, "ACT": { "ACT": { "Canberra": [[129, "2CA 1053 AM"], [130, "2CC 1206 AM"], [131, "HIT 104.7 FM"], [132, "MIX 106.3 FM"]] } }, "TAS": { "Tasmania": { "Hobart": [[289, "Hit 100.9 fm"], [290, "7HO FM 101.7"], [291, "Ultra 106.5 fm"], [292, "Hobart 107.3 FM"], [293, "HEART107.3"]], "Devonport": [[287, "7AD 900 AM"], [288, "SEA FM 107.7"]], "St Helens": [[298, "Star FM (CRS) St Helens"]], "Queenstown": [[296, "7XS 92.1 FM"]], "Scottsdale": [[297, "7SD 540 AM"]], "Launceston": [[294, "89.3 LAFM"], [295, "Chilli FM 90.1"]], "Burnie": [[285, "7BU 558 AM"], [286, "SEA FM 101.7"]], "Wynyard": [[299, "Coast 106.1 FM (CRS)"]] } }, "NSW": { "NSW Regional": { "REMOTE QLD/NSW": [[78, "REBEL BORDER RANGES/NSW"]], "Cooma, Snowy Mountains ": [[30, "2XL"], [31, "SNOW FM 97.7"]], "Broken Hill": [[24, "2BH 567 AM"], [25, "HILL FM 96.5"]], "CAMPBELLTOWN": [[57, "C91.3"]], "Gunnedah": [[46, "2MO 1080 AM"], [47, "Triple G 97.5 FM"]], "WAGGA WAGGA": [[86, "2WG Triple M 1152"]], "Tamworth": [[79, "92.9 FM Triple T"], [80, "2TM 1287 AM"]], "Mudgee": [[60, "2MG 1449 AM"], [61, "REAL FM 93.1 "]], "Armidale": [[17, "FM 100.3 Armidale"], [18, "2AD 1134 AM"]], "Coffs Harbour": [[27, "2HC 639AM"], [28, "hit 105.5 Coffs Coast"], [29, "Triple M 106.3 Coffs Coast"]], "Tweed/Gold Coast": [[83, "Radio 97 AM"], [84, "94.1 FM"]], "Newcastle": [[63, "2HD 1143 AM"], [64, "KOFM 102.9 "], [65, "NEW FM 105.3"], [66, "hit 106.9 Newcastle"]], "Nowra": [[67, "2ST"], [68, "POWER 94.9 FM"]], "Moree": [[58, "2VM 1530 AM"], [59, "NOW FM 98.3"]], "Riverina": [[85, "hit 93.1 FM Riverina"]], "Parkes": [[72, "2PK 1404 AM"], [73, "ROK 95.5 FM"]], "Macarthur Campbelltown": [[26, "C91.3 FM"]], "Dubbo": [[34, "2DU"], [35, "ZOO FM"], [36, "hit 93.5 Dubbo"]], "Goulburn": [[40, "2GN 1368 AM"], [41, "EAGLE FM 93.5"]], "Murwillumbah, Tweed Heads": [[62, "Radio 97 AM"]], "Bega": [[21, "2EC Bega 765 & 1584"], [22, "POWER 102.5FM"]], "Griffith & Riverina": [[44, "hit 99.7 FM Riverina"], [45, "Triple M 963 AM"]], "Taree": [[81, "2RE"], [82, "MAX 107.3 FM"]], "Bourke": [[23, "2WEB 585 AM"]], "REMOTE NSW": [[77, "BREEZE NSW"]], "Deniliquin": [[32, "2QN 1521 AM"], [33, "102.5 FM Classic Rock"]], "Katoomba, Medlow Bath": [[50, "The Edge 96.1 FM"]], "Lismore": [[53, "2LM 900 AM"], [54, "ZZZ 100.9 FM"]], "Orange & Central West": [[69, "2EL RADIO 1089"], [70, "hit 105.9 Orange"], [71, "Triple M 105.1"]], "Young": [[89, "2LF 1350 AM"], [90, "ROCCY FM"]], "Port Macquarie": [[74, "RADIO 531 AM FM 93.5"], [75, "hit 102.3 FM"], [76, "Triple M 100.7  106.7"]], "Bathurst": [[19, "2BS 1503 AM"], [20, "B-ROCK 99.3 FM"]], "Hunter Valley": [[48, "2NM 981 AM"], [49, "POWER 98.1 FM"]], "Albury Wodonga": [[14, "2AY 1494 AM"], [15, "hit 104.9 Albury Wodonga"], [16, "Triple M 105.7 The Border"]], "Lithgow": [[55, "2LT 900 AM"], [56, "MOVE 107.9 FM"]], "Grafton and Clarence Valley": [[42, "2GF 1206 AM"], [43, "Clarence Coast 104.7 FM"]], "WOLLONGONG": [[87, "WAVE 96.5 FM"], [88, "i98 FM"]], "Gosford": [[37, "104.5 STAR FM"], [38, "2GO FM 107.7"], [39, "SEA hit 101.3 Gosford"]], "Inverell": [[51, "2NZ 1188 AM"], [52, "GEM FM"]] }, "NSW Metro": { "Campbelltown": [[13, "C91.3 FM"]], "Blue Mountains": [[12, "The EDGE"]], "Sydney": [[1, "2CH 1170 AM"], [2, "2GB 873 AM"], [3, "Talking Lifestyle 954"], [4, "SKY Sports Radio"], [5, "2DAY hit 104.1 FM"], [7, "Triple M 104.9 FM"], [8, "NOVA 96.9 FM"], [9, "Smooth FM 95.3"], [10, "WSFM GOLD 101.7"], [11, "2SM 1269 AM"], [6, "KIIS 106.5 FM"]] } }, "WA": { "WA Regional": { "ESPERANCE": [[255, "hit 102.3"], [256, "Triple M 747 AM"]], "INDIGENOUS STATION - FITZROY CROSSING": [[261, "6FX"]], "INDIGENOUS STATION - KALGOORLIE": [[264, "tjuma 96.3"]], "MANDURAH": [[274, "6MM 1116 AM "], [273, "COAST97.3"]], "PORT HEDLAND": [[281, "PORT HEDLAND REDFM"], [282, "PORT HEDLAND SPIRIT"]], "MERREDIN": [[275, "hit 105.1"], [276, "Triple M 1098 AM Central Wheatbelt"]], "GERALDTON": [[257, "GERALDTON REDFM"], [258, "GERALDTON SPIRIT"]], "BUSSELTON": [[252, "Triple M 756"]], "INDIGENOUS STATION - PORT HEDLAND": [[266, "6HCR"]], "INDIGENOUS STATION - DERBY": [[260, "6DBY"]], "INDIGENOUS STATION - CARNARVON": [[259, "MAMA 102.9"]], "WA REMOTE": [[283, "RED FM"], [284, "SPIRIT REMOTE"]], "BROOME": [[247, "RED FM BROOME "], [248, "BROOME SPIRIT"]], "NARROGIN": [[277, "hit 100.5"], [278, "Triple M 918 AM"]], "CARNARVON": [[253, "Hot Hits 99.7fm"], [254, "CH666"]], "BUNBURY": [[249, "SPIRIT621"], [250, "Triple M 963"]], "KATANNING": [[271, "hit 94.9"], [272, "Triple M 1071 AM"]], "ALBANY": [[243, "hit 106.5"], [244, "Triple M 783"]], "KARRATHA": [[269, "KARRATHA REDFM"], [270, "KARRATHA SPIRIT"]], "INDIGENOUS STATION - KUNUNURRA": [[265, "6WR"]], "BRIDGETOWN/COLLIE": [[245, "hit FM COLLIE"], [246, "Triple M 900/1134"]], "KALGOORLIE": [[267, "hit 97.9"], [268, "Triple M 981"]], "INDIGENOUS STATION - HALLS CREEK": [[263, "6PRK"]], "BUNBURY/BUSSELTON": [[251, "hit FM BUNBURY"]], "INDIGENOUS STATION - GERALDTON": [[262, "MAMA 100.5"]], "NORTHAM": [[279, "hit 96.5"], [280, "Triple M 864 AM"]] }, "WA": { "Perth": [[237, "6IX 1080 AM"], [238, "6PR 882 AM"], [239, "MIX 94.5"], [240, "HIT 92.9"], [241, "96FM"], [242, "NOVA 93.7"]] } } };
            console.log(this.marketData)

            this.sessionTimes = {"market":"Sydney","share_audience_percent_mon_to_fri_drive":9,"share_audience_percent_sat_to_sun_weekends":9,"share_audience_percent_mon_to_fri_evening":7,"share_audience_percent_mon_to_fri_breakfast":9,"share_audience_percent_mon_to_sun_people_18_24":11,"format_network":"ARN","audience":4360000,"share_audience_percent_mon_to_sun_people_10_17":6,"share_audience_percent_mon_to_fri_all_shifts_all_week":9,"share_audience_percent_mon_to_sun_people_25_39":7,"share_audience_percent_mon_to_sun_people_1_10":9,"state":"NSW","station_image":"","share_audience_percent_mon_to_sun_people_40_54":14,"station":"WSFM GOLD 101.7","region":"NSW Metro","share_audience_percent_mon_to_sun_people_55_64":14,"description":"Pure Gold hits all day plus all the latest from Jonesy & Amanda for breakfast","listeners_per_week":639000,"share_audience_percent_mon_to_sun_people_65_100":5,"share_audience_percent_mon_to_fri_afternoons":10,"share_audience_percent_mon_to_fri_morning":11};
            console.log(this.sessionTimes)


            this.getSortedStates();
            this.mondaysX30 = this.getMondays(30);
            this.getRecordedAdvertisingItem();
          }
        });
      }
    },
    loadBackgroundImages() {
      Array.prototype.slice.call(document.querySelectorAll('[data-background]')).forEach((el) => {
        el.style.backgroundImage = 'url(' + el.getAttribute('data-background') + ')';
      });
    },
    loadCarousel() {
      $('#page-content .tile-carousel').each(function (i, el) {
        $(el).owlCarousel({
          responsive: {
            0: {
              items: 1
            },
            400: {
              items: 2
            },
            767: {
              items: 3
            },
            991: {
              items: 4
            },
            1199: {
              items: 5
            }
          },
          loop: true,
          dots: false,
          nav: true,
          navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>']
        });
      });
    },
    loadMobileMenu() {
      mobileTrigger.addEventListener('click', e => {   
        e.preventDefault;
        body.getAttribute('data-menu-open') === 'true' ? body.setAttribute('data-menu-open', 'false') : body.setAttribute('data-menu-open', 'true');
      });
    },
  }
  page.init();
});
