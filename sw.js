const CACHE_NAME = 'ks-app-cache-v4';

// Matriz completa alinhada com os arquivos reais do seu projeto no Acode
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  
  // Estilos (CSS)
  './style.css',
  './card1.css',
  './card2.css',
  './painel.css',
  
  // Imagens & Avatares (Conforme árvore de arquivos)
  './favicon.png',
  './icon-192.png',
  './icon-512.png',
  './icon.png',
  './iconVersosNossos-192.png',
  './fundo.png',
  './fundo2.png',
  './fundo3.png',
  './cardfundo.png',
  './efeito1.png',
  './efeito2.png',
  './kaue.png',
  './sky.png',
  './moldura1.png',
  './moldura2.png',
  './manu1.png',
  './manu2.png',
  './meme.gif',
  './protogen.gif',
  
  // Módulos JS
  './manutencao.js',
  './fontes.js',
  './card1.js',
  './card2.js',
  './creditos.js',
  './estrelas.js',
  './efeito1.js',
  './botao.js',
  './botao2.js',
  './botaotexto.js',
  './pwa-style.js',
  './protecao.js',
  './clique-limpo.js',
  './atualizacao.js',
  './painel.js',
  './fundo.js'
];

// 2. Instalação: Consolida o armazenamento offline
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('K & S PWA: Malha de cache v4 instalada com sucesso.');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// 3. Ativação: Limpeza de caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('K & S PWA: Removendo cache obsoleto:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 4. Estratégia Stale-While-Revalidate (Acesso Rápido + Atualização em Background)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      
      if (cachedResponse) {
        // Tenta atualizar em background para a próxima visita se houver internet
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
          }
        }).catch(() => { /* Modo offline silencioso */ });

        return cachedResponse;
      }

      // Se o asset não estava em cache, busca na rede e guarda
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));

        return networkResponse;
      }).catch(() => {
        return new Response('Conteúdo indisponível sem conexão.', { status: 503, statusText: 'Offline' });
      });
    })
  );
});

// 5. Troca Rápida de Versão
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
