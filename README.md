# IPTask
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
Wywolaj funkcje inicjalizujaca:
```
<script>
  easyPack.ListWidget('widget');
</script>
```
Przyklad:
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
