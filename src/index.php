<!DOCTYPE html>
<html>
<head>
    <title>Speedsolving timer</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/style.css" />
    <link rel="icon" href="img/speedtimer.png" />
    <script>
    var tableArray = <?php include("extract.php") ?>
    </script>
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
            <table>
                <thead>
                <tr>
                    <td>ID</td>
                    <td>TIME</td>
                    <td>SOLVING DATE</td>
                    <td class="undel">UNDELETE</td>
                </tr>
                </thead>
                <tbody id="last_times">
                </tbody>
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
