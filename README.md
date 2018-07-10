# IPTask
Skrypt pobiera listę paczkomatów z API i wyświetla je w formie listy wyboru.
## Instalacja na stronie
Pobierz plik listWidget.js. Umieść go na swojej stronie internetowej: 
```
<script src="listWidget.js"></script>
```
Utwórz element html oraz nadaj mu unikalne id:
```
<body>
  <div id="widget"></div>
</body>
```
Wywolaj funkcję inicjalizujaca:
```
<script>
  easyPack.ListWidget('widget');
</script>
```
##### Przykład
```
<html>
  <head>
    <meta charset="UTF-8">
    <title>Paczkomaty InPost</title>
  </head>
  <body>
    <div id="widget"></div>
    <script src="listWidget.js"></script>
    <script>
      easyPack.ListWidget('widget');
    </script>
  </body>
</html>
```
## Demo
Aby uruchomić przykład znajdujący się w repozytorium:  
- sklonuj repozytorium
```
git clone https://github.com/frycz/IPTask.git
```
- przejdź do katalogu z przykładem
```
cd example
```
- uruchom dowolny serwer http. Polecam [http-server]( https://github.com/indexzero/http-server)
```
http-server
```
Strona powinna być dostępna na domenie lokalnej (port zgodny z konfiguracją, najczęściej 8080)
```
http://localhost:8080
```
