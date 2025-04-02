
export interface TravelPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  region: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  featured?: boolean;
}

export const travelPosts: TravelPost[] = [
  {
    id: "1",
    title: "The Serene Landscapes of Kyoto",
    slug: "serene-landscapes-kyoto",
    excerpt: "Exploring the tranquil temples and gardens of Japan's ancient capital city.",
    content: `
      <p>Kyoto, the former imperial capital of Japan, is home to thousands of classical Buddhist temples, gardens, imperial palaces, Shinto shrines and traditional wooden houses. It's one of the few cities in Japan that was not heavily bombed during World War II, leaving much of its architectural heritage intact.</p>
      
      <h2>The Temple Gardens</h2>
      
      <p>One cannot speak of Kyoto without mentioning its exquisite gardens. The careful arrangement of stones, water, plants, and architecture creates spaces that invite contemplation and reflection. The gardens of temples like Ryoan-ji, with its famous rock garden, exemplify the Japanese aesthetic principles of simplicity and suggestion.</p>
      
      <p>My journey began at the Kinkaku-ji (Golden Pavilion), a Zen Buddhist temple whose top two floors are completely covered in gold leaf. The pavilion sits beside a large pond, creating a perfect mirror image on clear days. The surrounding garden is designed in the traditional fashion with various small islands and stones placed in specific positions to represent famous places in China and Japan or Buddhist paradises.</p>
      
      <h2>Walking the Philosopher's Path</h2>
      
      <p>The Philosopher's Path is a stone path that follows a canal lined with cherry trees between Ginkaku-ji (Silver Pavilion) and Nanzen-ji. The path is named after Nishida Kitaro, one of Japan's most famous philosophers, who was said to practice meditation while walking this route on his daily commute to Kyoto University.</p>
      
      <p>During cherry blossom season, usually early April, this path becomes one of the most photographed spots in Kyoto. However, I found it equally enchanting in autumn when the maple trees turn brilliant shades of red and orange.</p>
      
      <h2>The Arashiyama Bamboo Grove</h2>
      
      <p>On the western outskirts of Kyoto is the Arashiyama Bamboo Grove. Walking through this towering bamboo forest is like entering another world. The seemingly endless green columns rise toward the sky, creating a canopy that sways and rustles with the wind, filtering the sunlight to create an atmosphere of otherworldly beauty.</p>
      
      <p>I arrived early in the morning to avoid the crowds, allowing me to fully appreciate the tranquility of the space. The sound of bamboo creaking and leaves rustling in the gentle morning breeze created a natural symphony that embodied the spirit of Zen that pervades much of Kyoto's cultural heritage.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    date: "2023-04-15",
    region: "Asia",
    location: "Kyoto, Japan",
    coordinates: { lat: 35.0116, lng: 135.7681 },
    featured: true
  },
  {
    id: "2",
    title: "Hidden Corners of Lisbon",
    slug: "hidden-corners-lisbon",
    excerpt: "Discovering the charming alleyways and secret viewpoints of Portugal's coastal capital.",
    content: `
      <p>Lisbon, Portugal's coastal capital, is known for its colorful architecture, historic trams, and vibrant culture. Beyond the well-trodden tourist paths lie hidden gems that reveal the authentic heart of this enchanting city.</p>
      
      <h2>Alfama's Secret Viewpoints</h2>
      
      <p>The oldest district in Lisbon, Alfama, is a labyrinth of narrow streets and ancient houses that survived the 1755 earthquake. While many tourists head to the popular Santa Luzia viewpoint, I discovered a lesser-known miradouro (viewpoint) called Santo Estêvão, which offers equally stunning panoramas without the crowds.</p>
      
      <p>From this peaceful spot, I watched the sunset over the terracotta rooftops cascading down to the Tagus River. The fading light cast a golden glow over the city, while the distant sound of Fado music floated up from a nearby taverna.</p>
      
      <h2>The Literary Cafés of Chiado</h2>
      
      <p>Chiado, the elegant cultural and commercial heart of Lisbon, has been a meeting place for writers, artists, and intellectuals for generations. Café A Brasileira, with its Art Deco interior and statue of poet Fernando Pessoa outside, is well-known to tourists. However, I preferred the quieter Café Benard, where local writers still gather amid the aroma of freshly baked pastries.</p>
      
      <p>Here, I spent hours reading Portuguese literature and observing the rhythms of daily life in Lisbon. The café's original 1920s decor and unhurried atmosphere provided a window into a more contemplative side of Portuguese culture.</p>
      
      <h2>Gardens and Green Spaces</h2>
      
      <p>Though Lisbon is known for its urban charm, the city is dotted with beautiful gardens that provide respite from the bustling streets. The Jardim da Estrela, opposite the Basílica da Estrela, is a local favorite with its exotic trees, duck ponds, and wrought-iron gazebo where bands play on summer afternoons.</p>
      
      <p>Another hidden oasis I discovered was the Jardim do Torel, a small garden built on one of Lisbon's seven hills. Few tourists venture here, but the garden offers spectacular views of the city center and has a charming café where elderly Portuguese men gather to play cards under the shade of ancient trees.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1525947088131-b701cd0f6dc3",
    date: "2023-06-22",
    region: "Europe",
    location: "Lisbon, Portugal",
    coordinates: { lat: 38.7223, lng: -9.1393 }
  },
  {
    id: "3",
    title: "Desert Nights in Marrakech",
    slug: "desert-nights-marrakech",
    excerpt: "Experiencing the magical contrast between bustling souks and peaceful desert skies.",
    content: `
      <p>Marrakech, the fourth largest city in Morocco, is a place where African, Middle Eastern, and European cultures blend to create a vibrant tapestry of experiences. From the bustling medina to the tranquil gardens and the nearby desert, this city offers an intoxicating journey for the senses.</p>
      
      <h2>The Medina: A Labyrinth of Wonders</h2>
      
      <p>The ancient walled city center, or medina, is a UNESCO World Heritage site and the beating heart of Marrakech. Navigating through its narrow alleyways feels like stepping back in time. The souks (markets) are organized by trade – from spices and textiles to woodwork and metalware. The sensory experience is overwhelming: vibrant colors, exotic scents, and the constant hum of commerce and conversation.</p>
      
      <p>I spent days getting deliberately lost in the medina, discovering small workshops where artisans practice crafts passed down through generations. In one tiny atelier, I watched a man delicately craft intricate patterns on brass trays, using techniques unchanged for centuries.</p>
      
      <h2>Escape to the Gardens</h2>
      
      <p>When the intensity of the medina became overwhelming, I sought refuge in Marrakech's famous gardens. The Jardin Majorelle, created by French painter Jacques Majorelle and later owned by Yves Saint Laurent, is an oasis of exotic plants, cobalt blue buildings, and serene water features.</p>
      
      <p>Less visited but equally beautiful is Le Jardin Secret, a recently restored historic palace garden in the heart of the medina. Here, Islamic garden design principles create a paradise of symmetry, water, and carefully selected plants that thrive in the desert climate.</p>
      
      <h2>Into the Desert</h2>
      
      <p>No visit to Marrakech would be complete without venturing into the nearby desert. I joined a small group traveling to the Agafay Desert, just an hour from the city. Unlike the sand dunes of the Sahara, Agafay is a rocky desert with undulating hills that create an almost lunar landscape.</p>
      
      <p>We arrived at our luxury desert camp as the sun was setting, casting long shadows across the barren terrain. After a traditional Moroccan dinner under a canopy of stars, local Berber musicians performed around a campfire. The contrast between the frenetic energy of the medina and the profound silence of the desert night was striking – two faces of Morocco that together create its unique magic.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1539020140153-e8c2cc4e81d5",
    date: "2023-03-08",
    region: "Africa",
    location: "Marrakech, Morocco",
    coordinates: { lat: 31.6295, lng: -7.9811 },
    featured: true
  },
  {
    id: "4",
    title: "Coastal Majesty of Big Sur",
    slug: "coastal-majesty-big-sur",
    excerpt: "Road tripping along California's most dramatic coastline where mountains meet the Pacific.",
    content: `
      <p>Big Sur, a rugged stretch of California's central coast, offers one of the most dramatic coastal drives in the world. The Santa Lucia Mountains rise abruptly from the Pacific Ocean, creating a stunning backdrop for the winding Highway 1 that hugs the cliffs.</p>
      
      <h2>The Iconic Drive</h2>
      
      <p>My journey began in Monterey, heading south on Highway 1. The road quickly narrowed and began to twist and turn along the coastline. Around each bend, a new vista appeared – jagged cliffs plunging into turquoise waters, waves crashing against sea stacks, and California condors soaring overhead.</p>
      
      <p>The Bixby Creek Bridge, one of the most photographed features along the coast, was even more impressive in person than in the countless images I'd seen before. I pulled over at the viewpoint to appreciate its graceful concrete arch spanning the deep canyon below, framed by the vast blue Pacific.</p>
      
      <h2>Embracing Nature</h2>
      
      <p>Big Sur is home to several state parks that protect the region's natural beauty. In Pfeiffer Big Sur State Park, I hiked through groves of coastal redwoods, some over 300 feet tall. The dappled light filtering through the canopy created an almost mystical atmosphere in the understory.</p>
      
      <p>At Julia Pfeiffer Burns State Park, a short trail led to the iconic McWay Falls, where a slender waterfall drops 80 feet directly onto a pristine beach. Due to landslides reshaping the cove over the years, the beach is inaccessible, preserving its untouched beauty.</p>
      
      <h2>Evenings of Contemplation</h2>
      
      <p>I stayed at a small cabin perched on a cliffside, where the boundary between inside and outside seemed to dissolve. Each evening, I sat on the deck watching the fog roll in from the Pacific, engulfing the coastline in a soft, ethereal blanket. As darkness fell, the absence of light pollution revealed a sky ablaze with stars.</p>
      
      <p>The nights in Big Sur were defined by the constant rhythm of waves against the shore and the occasional call of an owl in the nearby forest. It's a place where the elemental forces of nature – earth, water, air – converge with particular intensity, creating a landscape that feels both ancient and ever-changing.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9",
    date: "2023-07-30",
    region: "North America",
    location: "Big Sur, California, USA",
    coordinates: { lat: 36.2704, lng: -121.8081 }
  },
  {
    id: "5",
    title: "Ancient Wonders of Machu Picchu",
    slug: "ancient-wonders-machu-picchu",
    excerpt: "Hiking the Inca Trail to discover Peru's most magnificent archaeological treasure.",
    content: `
      <p>Machu Picchu, the 15th-century Inca citadel perched high in the Andes Mountains of Peru, has long captured the imagination of travelers. Rather than taking the train, I chose to reach this ancient wonder via the four-day Inca Trail trek, following in the footsteps of the civilization that built it.</p>
      
      <h2>The Journey Begins</h2>
      
      <p>The classic Inca Trail begins at Kilometer 82 of the Cusco-Machu Picchu railway. Our small group of eight hikers and two guides gathered early in the morning, excitement palpable as we crossed the checkpoint and began our journey. The first day's hike was relatively gentle, following the Urubamba River through semi-arid terrain dotted with cacti and bromeliads.</p>
      
      <p>We stopped at several small archaeological sites along the way, where our guide explained the sophisticated agricultural and hydraulic systems the Incas developed. By late afternoon, we reached our first campsite, where porters had already set up tents and begun preparing dinner. The night sky in the Andes, free from light pollution, revealed a stunning canopy of stars.</p>
      
      <h2>Challenging Heights</h2>
      
      <p>The second day was the most challenging, as we climbed to Dead Woman's Pass at 4,215 meters (13,828 feet) above sea level. The thin air made each step a deliberate effort, but the panoramic views of snow-capped peaks and deep valleys provided ample reward for our exertion.</p>
      
      <p>Descending from the pass, we entered a different ecosystem – cloud forest – where mist hung between trees draped with moss and orchids. The changing environments along the trail showcase Peru's incredible biodiversity, transitioning from high alpine terrain to subtropical jungle in the span of a day's walk.</p>
      
      <h2>Arrival at the Sun Gate</h2>
      
      <p>On the final morning, we woke before dawn to reach the Sun Gate (Inti Punku) for our first view of Machu Picchu illuminated by the rising sun. After three days of challenging hiking, seeing the ancient city emerge from the morning mist was a profoundly moving experience.</p>
      
      <p>Descending into the site before the day-visitors arrived allowed us to explore the remarkably preserved stone structures in relative solitude. Our guide explained how the city was aligned with astronomical events and how its sophisticated architecture was built without mortar, with stones cut so precisely that a blade of grass cannot be inserted between them.</p>
      
      <p>Standing amid the ancient terraces with Huayna Picchu mountain rising dramatically behind the ruins, I gained a deeper appreciation not just for the engineering prowess of the Incas, but for their harmony with the natural landscape. Machu Picchu doesn't dominate its environment – it enhances and celebrates it.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1526392060635-9d6019884377",
    date: "2023-02-14",
    region: "South America",
    location: "Machu Picchu, Peru",
    coordinates: { lat: -13.1631, lng: -72.5450 },
    featured: true
  },
  {
    id: "6",
    title: "Island Tranquility in the Maldives",
    slug: "island-tranquility-maldives",
    excerpt: "Finding peace in the pristine atolls and turquoise waters of the Indian Ocean.",
    content: `
      <p>The Maldives, an archipelago of 1,192 coral islands grouped into 26 atolls in the Indian Ocean, represents the quintessential tropical paradise. With its powder-white beaches, crystal clear waters, and vibrant marine life, it offers a retreat from the frenetic pace of modern life.</p>
      
      <h2>Life on a Private Island</h2>
      
      <p>My journey began with a seaplane flight from Malé, the capital city. Flying low over the atolls provided a breathtaking perspective – rings of islands in various shapes and sizes, surrounded by shallow turquoise lagoons that gradually deepened to indigo blue.</p>
      
      <p>The resort occupied an entire small island, with overwater bungalows extending from one side and beach villas nestled among tropical vegetation on the other. My accommodation, an overwater villa, offered direct access to the lagoon from a private deck – a simple pleasure that never lost its novelty during my stay.</p>
      
      <h2>Beneath the Surface</h2>
      
      <p>While the Maldives is undeniably beautiful above water, its true riches lie beneath the surface. The coral reefs surrounding the islands support an extraordinary diversity of marine life. During daily snorkeling excursions, I swam alongside graceful manta rays, playful dolphins, and countless tropical fish in a kaleidoscope of colors.</p>
      
      <p>One morning, I joined a marine biologist from the resort's conservation center to help transplant fragments of healthy coral onto specially designed structures. This coral gardening project aims to regenerate areas damaged by rising ocean temperatures – a sobering reminder that this paradise is particularly vulnerable to climate change.</p>
      
      <h2>Island Rhythms</h2>
      
      <p>Days in the Maldives quickly settled into a tranquil rhythm dictated by the sun and tides. Mornings began with yoga on the beach as the sun rose over the ocean. Afternoons were spent exploring different reefs or simply reading in a hammock slung between palms. As sunset approached, I would walk the circumference of the island – a journey of just 30 minutes – watching as the sky transformed through shades of gold, pink, and purple.</p>
      
      <p>One evening, I dined at an underwater restaurant built 16 feet below sea level. Through the curved acrylic walls, I watched elegant reef sharks and eagle rays glide by as if performing for the diners. The juxtaposition of refined cuisine and raw natural beauty epitomized the Maldivian experience – luxury in harmony with nature.</p>
      
      <p>The Maldives taught me that true luxury isn't about opulence, but about space, silence, and unspoiled natural beauty – increasingly rare commodities in our crowded, connected world.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8",
    date: "2023-01-05",
    region: "Asia",
    location: "Maldives",
    coordinates: { lat: 3.2028, lng: 73.2207 }
  }
];

// Helper functions
export const getTravelPostBySlug = (slug: string): TravelPost | undefined => {
  return travelPosts.find(post => post.slug === slug);
};

export const getFeaturedTravelPosts = (): TravelPost[] => {
  return travelPosts.filter(post => post.featured);
};

export const getRecentTravelPosts = (count: number): TravelPost[] => {
  return [...travelPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

export const getRelatedTravelPosts = (currentPostId: string, region: string, count: number = 3): TravelPost[] => {
  return travelPosts
    .filter(post => post.id !== currentPostId && post.region === region)
    .slice(0, count);
};
