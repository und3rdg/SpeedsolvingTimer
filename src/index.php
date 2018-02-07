<!DOCTYPE html>
<html>
<head>
  <title>Speedsolving timer</title>
  <meta charset="utf-8">
  <link rel="stylesheet" type="text/css" media="screen" href="/css/main.css" />
  <link rel="icon" href="/img/speedtimer.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<main class="container">
  <header class="header">
    <h1><span>Speed</span> <span>Solving</span> <span>Timer</span></h1>
    <div id="menu">
      <span></span>
    </div>
  </header>
  <div class="clock">
    <div class="bgClock"></div>
    <time>
      00.000
    </time>
  </div>
  <section class="statTables">
    <table id="stats">
      <tbody>
        <tr class="top1">
          <td>TOP1</td>
          <td>33.333</td>
        </tr>
        <tr class="mo3">
          <td>Mo3</td>
          <td>34.333</td>
        </tr>
        <tr class="ao5">
          <td>Ao5</td>
          <td>34.333</td>
        </tr>
        <tr class="ao12">
          <td>Ao12</td>
          <td>33.333</td>
        </tr>
        <tr>
          <td class="mo50">Mo50</td>
          <td>33.333</td>
        </tr>
        <tr class="mo100">
          <td>Mo100</td>
          <td>33.333</td>
        </tr>
      </tbody>
    </table>
    <table id="last_times">
      <thead>
        <tr>
          <td class="time-id">ID</td>
          <td class="time-solve">TIME</td>
          <td class="time-date">DATE</td>
          <td class="undel time-action">UNDELETE</td>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  </section>
  <footer>
    <a href="https://github.com/und3rdg/ssTimer">github.com/und3rdg/ssTimer</a>
  </footer>
</main>
<script src="/js/main.js"></script>
</body>
</html>
