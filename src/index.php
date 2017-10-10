<!DOCTYPE html>
<html>
<head>
    <title>Speedsolving timer</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/style.css" />
    <link rel="icon" href="img/speedtimer.png" />
    <script src="/js/all.min.js"></script>
</head>
<body>
    <main>
        <header>
            <h1>S<span class="small">PEED</span></br> S<span class="small">OLVING</span></br> T<span class="small">IMER</span></br></h1>
        </header>
        <time>
            00.000
        </time>
        <section class="stats">
            <table id="last_times">
                <?php include("extract.php") ?>
            </table>
            <table id="stats">
            
            </table>
        </section>
        <!--
        <footer>Timer in progress</footer>
        -->
    </main>
</body>
</html>
