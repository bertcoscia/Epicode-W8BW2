# Epicode-W8BW2 - Spotify Clone

### Pagine Richieste:
#### HOMEPAGE:

- Mostra una serie di album a vostra scelta rispettando lo stile e l'UI di Spotify. N.B. Potete ricreare anche l'attuale UI di Spotify.

![Homepage](https://cms.epicode.com/assets/5a1fbbd7-8b35-445b-85d9-079cd20b7dcf)

#### ALBUM PAGE:

- Quando l'utente clicca su un album, dovrebbe essere trasportato alla pagina corrispondente. 
- **ATTENZIONE!** NON creare una pagina per ogni album!
- Creare UNA pagina (`album.html`) e popolarla dinamicamente tramite l'id dell'album cliccato.
- Utilizzare `URLSearchParams` per gestire i parametri.
- **Endpoint**: [https://striveschool-api.herokuapp.com/api/deezer/album/{id}](https://striveschool-api.herokuapp.com/api/deezer/album/{id})

![Album Page](https://cms.epicode.com/assets/fc668166-f0bd-4cd8-84c7-1db57922053d)

#### ARTIST PAGE:

- I nomi degli artisti devono essere cliccabili e portare l'utente in una pagina dedicata all'artista.
- **ATTENZIONE!** NON creare una pagina per ogni artista!
- Creare UNA pagina (`artist.html`) e popolarla dinamicamente tramite l'id dell'artista cliccato.
- Utilizzare `URLSearchParams` per gestire i parametri.
- **Endpoint**: [https://striveschool-api.herokuapp.com/api/deezer/artist/{id}](https://striveschool-api.herokuapp.com/api/deezer/artist/{id})
- **Esempio**: [https://striveschool-api.herokuapp.com/api/deezer/artist/412](https://striveschool-api.herokuapp.com/api/deezer/artist/412)

![Artist Page](https://cms.epicode.com/assets/e01a4667-a4d0-4c23-a68a-a7f93f67c2f0)

### Player:

- Cliccando sulle tracce nella pagina album o artista, i dettagli della traccia devono essere mostrati sul player in basso. La funzione di play/pausa è gradita ma non obbligatoria.

### Search:

- Creare una funzione di ricerca utilizzando l'endpoint dedicato. Si può creare una pagina a parte o mostrare i risultati sulla homepage.
- Creare una funzione di ricerca utilizzando l'endpoint dedicato.
- Si può creare una pagina a parte o mostrare i risultati sulla homepage.
- **Parametro**: query
- **Endpoint**: [https://striveschool-api.herokuapp.com/api/deezer/search?q={query}](https://striveschool-api.herokuapp.com/api/deezer/search?q={query})

### Versione Mobile:

- La versione mobile deve essere responsive.

![Mobile Version](https://cms.epicode.com/assets/f4d5b41c-3200-4819-9fe4-54556fa7a660)
![Mobile Version](https://cms.epicode.com/assets/fda2b3a6-0907-412f-a438-43e311926b7e)
![Mobile Version](https://cms.epicode.com/assets/e1e1fbda-cc07-4415-961e-c48daa908d68)
![Mobile Version](https://cms.epicode.com/assets/751034d7-d7a2-4916-8bea-b3a90675d699)
