const routeAll = [{ latitude: -31.78009104720832, longitude: -52.32406932319721 }];
const routeAnglo = [
  { latitude: -31.78009104720832, longitude: -52.32406932319721 },
  { latitude: -31.78066107393328, longitude: -52.32613462197347 },
  { latitude: -31.778963808882136, longitude: -52.331936291030075 },
  { latitude: -31.781621037386863, longitude: -52.33303352101327 },
  { latitude: -31.78158850910611, longitude: -52.333543879882505 },
  { latitude: -31.77936511274965, longitude: -52.34072711324684 },
  { latitude: -31.776610152798153, longitude: -52.3396553778092 },
  { latitude: -31.7758292433672, longitude: -52.3423985099217 },
  { latitude: -31.77377914630235, longitude: -52.34160751952347 },
  { latitude: -31.770971330841565, longitude: -52.350936089867226 },
  { latitude: -31.770960495711307, longitude: -52.35134436358497 },
  { latitude: -31.77401928571459, longitude: -52.3515101291551 },
  { latitude: -31.77419282413793, longitude: -52.35111459540819 },
  { latitude: -31.771319864810955, longitude: -52.34984337780667 },
  { latitude: -31.773816870330755, longitude: -52.34160093244853 },
  { latitude: -31.775487187671125, longitude: -52.33611460163492 },
  { latitude: -31.775508879864233, longitude: -52.336089082572414 },
  { latitude: -31.773578158648483, longitude: -52.33532365535401 },
  { latitude: -31.774359127967678, longitude: -52.33568085857193 },
  { latitude: -31.77357825969726, longitude: -52.33839849726272 },
  { latitude: -31.776626154509426, longitude: -52.33964880201283 },
];
const routeCapao = [
  { latitude: -31.781088670646465, longitude: -52.33513613247284}, 
  { latitude: -31.779670133560575, longitude: -52.339793481824515 },
  { latitude: -31.77207743695761, longitude: -52.33675728790814 },
  { latitude: -31.770087720968412, longitude: -52.34307953590211 },
  { latitude: -31.773964465814267, longitude: -52.34476676532621 },
  { latitude: -31.772289806986358, longitude: -52.350226147614535 },
  { latitude: -31.76720417963168, longitude: -52.34810456767763 },
  { latitude: -31.760856946524353, longitude: -52.360924525370564 },
  { latitude: -31.75722375273219, longitude: -52.37078993238236 },
  { latitude: -31.757344075889705, longitude: -52.37422700194069 },
  { latitude: -31.753894969840918, longitude: -52.3952991355365 },
  { latitude: -31.756630142549024, longitude: -52.401049626796876 },
  { latitude: -31.762130760127143, longitude: -52.40344843239378 },
  { latitude: -31.764429489471087, longitude: -52.4115486910931 },
  { latitude: -31.76255695459262, longitude: -52.41843996829907 },
  { latitude: -31.7673898146873, longitude: -52.4187637618566 },
  { latitude: -31.769874954396233, longitude: -52.417663172256425 },
  { latitude: -31.781670871081083, longitude: -52.4150646801622 },
  { latitude: -31.78167080089419, longitude: -52.41504682509338 },
  { latitude: -31.79292833972107, longitude: -52.4082622549537 },
  { latitude: -31.79637893882488, longitude: -52.40759467548014 },
  { latitude: -31.800013621608667, longitude: -52.40820799271153 },
  { latitude: -31.800320369721483, longitude: -52.40912826513786 },
  { latitude: -31.800998545981347, longitude: -52.40921508492081 },
  { latitude: -31.801372652058454, longitude: -52.4096552615135 },
  { latitude: -31.80139976080619, longitude: -52.40964250231934 },
  { latitude: -31.80145479690037, longitude: -52.415075903411164 },
];

const mapStyle = [
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];

export { routeAll, routeAnglo, routeCapao, mapStyle };
