const CACHE_NAME = 'ks-app-cache-v3'; // CORREÇÃO: 'const' em minúsculo para evitar erro de sintaxe

// 1. Matriz Completa de Assets (Alinhada com o novo ecossistema modular)
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  
  // Camada de Estilos (CSS)
  './style.css',
  './card1.css',
  './card2.css',
  './painel.css',
  
  // Camada de Identidade Visual (Imagens & Avatares)
  './icon-192.png',
  './icon-512.png',
  './fundo2.png',
  './efeito1.png',
  './efeito2.png',
  './kaue.png',
  './sky.png',
  './moldura1.png',
  './moldura2.png',
  './meme.gif',
  
  // Camada Lógica Modular (JavaScript)
  './manutencao.js',
  './fontes.js',
  './card1.js',
  './card2.js',
  './creditos.js',
  './estrelas.js',
  './efeito1.js',
  './botao2.js', // Garantindo o botão ativo do ecossistema
  './botaotexto.js',
  './pwa-style.js',
  './protecao.js',
  './clique-limpo.js',
  './atualizacao.js',
  './painel.js'
  './cardfundo.mp4'
];

// 2. Instalação: Consolida e força o armazenamento da infraestrutura
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('K & S PWA: Malha de cache instalada com sucesso.');
      // IMPORTANTE: Certifique-se de que todos os arquivos acima existam no servidor para não quebrar aqui
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting()) // Autotransição rápida de ciclo de vida
  );
});

// 3. Ativação: Varredura de segurança contra registros obsoletos (v1/v2)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('K & S PWA: Purgando registros antigos de cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 4. Estratégia Stale-While-Revalidate Otimizada
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      
      // Se localizou o asset em cache, despacha imediatamente (Instant Loading)
      if (cachedResponse) {
        // Busca atualização silenciosa em background para a próxima visita
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
          }
        }).catch(() => { /* Silencia falhas normais quando o usuário está offline */ });

        return cachedResponse;
      }

      // Se o asset não existia (ex: Favicons externos varridos dinamicamente), perfura a rede
      return fetch(event.request).then((networkResponse) => {
        // CORREÇÃO: Removida a trava rígida de 'basic' para permitir o cacheamento correto dos favicons externos do GitHub/Google
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        // Grava novos elementos encontrados (aprendizado contínuo do PWA)
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));

        return networkResponse;
      }).catch(() => {
        // Retorno defensivo caso a rede caia totalmente e o recurso não esteja em cache
        return new Response('Rede indisponível no momento.', { status: 503, statusText: 'Service Unavailable' });
      });
    })
  );
});

// 5. Interceptador de Mensagens do Sistema (Hot Reload do PWA)
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    console.log('K & S PWA: Ignorando fila de espera. Reinicializando worker...');
    self.skipWaiting();
  }
});
