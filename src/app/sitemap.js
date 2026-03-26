import cidades from '../../cidades.json';
import termos from '../../termos.json';

const BASE_URL = 'https://desenvolvedor.abraaocosta.com.br'; 
const URLS_POR_SITEMAP = 50000;

export async function generateSitemaps() {
  const totalCombinacoes = termos.length * cidades.length;
  const quantidadeSitemaps = Math.ceil(totalCombinacoes / URLS_POR_SITEMAP);

  // Gera os IDs necessários para os sitemaps (0, 1, 2, 3...)
  return Array.from({ length: quantidadeSitemaps }, (_, i) => ({ id: i }));
}

export default async function sitemap({ id }) {
  // BLINDAGEM: Força o ID a virar um número válido. Se o Next.js falhar, ele usa 0.
  const idString = await id;
  const idNumero = idString !== undefined && idString !== null ? Number(idString) : 0;
  
  const start = idNumero * URLS_POR_SITEMAP;
  const end = Math.min((idNumero + 1) * URLS_POR_SITEMAP, termos.length * cidades.length);

  const urls = [];

  for (let i = start; i < end; i++) {
    const termoIndex = Math.floor(i / cidades.length);
    const cidadeIndex = i % cidades.length;

    // Dupla verificação para evitar que o loop quebre se algum dado faltar
    if (termos[termoIndex] && cidades[cidadeIndex]) {
      urls.push({
        url: `${BASE_URL}/${termos[termoIndex].slug}/${cidades[cidadeIndex].slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return urls;
}