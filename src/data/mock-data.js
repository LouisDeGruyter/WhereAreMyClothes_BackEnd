const KLEDING = [{
    id: 1,
    color:'rood',
    type: "t-shirt", 
    size: 40,
    kleerkast: {
        id: 1,
        name:"kast1",
    }
  },
  {
    id: 2,
    color:'blauw',
    type: "trui",
    size: 42,
    kleerkast: {
        id: 1,
        name:"kast1",
    }
  },
    {
    id: 3,
    color:'groen',
    type: "broek",
    size: 44,
    kleerkast: {
        id: 1,
        name:"kast1",
    }
    },
    {
    id: 4,
    color:'geel',
    type: "rok",
    size: 46,
    kleerkast: {
        id: 1,
        name:"kast1",
    }
    },
    {
    id: 5,
    color:'paars',
    type: "jasje",
    size: 48,
    kleerkast: {
        id: 2,
        name:"kast2",
    }
    },
    {
    id: 6,
    color:'oranje',
    type: "vest",
    size: 50,
    kleerkast: {
        id: 2,
        name:"kast2",
    }
    },
    {
    id: 7,
    color:'zwart',
    type: "broek",
    size: 52,
    kleerkast: {
        id: 2,
        name:"kast2",
    }
    },
    {
    id: 8,
    color:'wit',
    type: "rok",
    size: 54,
    kleerkast: {
        id: 2,
        name:"kast2",
    }
    },
    {
    id: 9,
    color:'roze',
    type: "jasje",
    size: 56,
    kleerkast: {
        id: 3,
        name:"kast3",
    }
    },
    {
    id: 10,
    color:'bruin',
    type: "vest",
    size: 58,
    kleerkast: {
        id: 3,
        name:"kast3",
    }
    },
    {
    id: 11,
    color:'grijs',
    type: "broek",
    size: 60,
    kleerkast: {
        id: 3,
        name:"kast3",
    }
    },
    {
    id: 12,
    color:'rood',
    type: "rok",
    size: 62,
    kleerkast: {
        id: 3,
        name:"kast3",
    }
    }
];
const KLEERKASTEN = [
    {
        id: 1,
        name: "kast1",
        location: "kamer"
    },
    {
        id: 2,
        name: "kast2",
        location: "gang"
    },
    {
        id: 3,
        name: "kast3",
        location: "mcDonalds"
    },
];
module.exports = {KLEDING, KLEERKASTEN};