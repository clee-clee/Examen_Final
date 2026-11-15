const BASE_URL = 'https://rickandmortyapi.com/api';

const request = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No se pudo cargar la información (${res.status})`);
  return res.json();
};

// 1. Catálogo de personajes (paginado)
export const getCharacters = (page = 1) => request(`${BASE_URL}/character?page=${page}`);

// 2. Detalle de un personaje por ID
export const getCharacterById = (id) => request(`${BASE_URL}/character/${id}`);

// 3. Catálogo de episodios (paginado)
export const getEpisodes = (page = 1) => request(`${BASE_URL}/episode?page=${page}`);

// 4. Todos los episodios (recorre las 3 páginas de la API)
export const getAllEpisodes = async () => {
  let page = 1;
  let all = [];
  while (true) {
    const data = await getEpisodes(page);
    all = all.concat(data.results);
    if (!data.info.next) break;
    page += 1;
  }
  return all;
};

// 5. Detalle de un episodio por ID
export const getEpisodeById = (id) => request(`${BASE_URL}/episode/${id}`);

// 6. Varios personajes a la vez (elenco de un episodio)
export const getMultipleCharacters = async (urls) => {
  const ids = urls.map((url) => url.split('/').pop()).join(',');
  if (!ids) return [];
  const data = await request(`${BASE_URL}/character/${ids}`);
  // Con un solo personaje la API devuelve un objeto, no un arreglo
  return Array.isArray(data) ? data : [data];
};
