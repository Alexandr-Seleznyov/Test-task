<!DOCTYPE html>
<html>
<head>
    <title><?= $mainInfo[0]['title'] ?></title>
    <meta charset="utf-8">
    <meta name="Description" content=<?= '"'.$mainInfo[0]['description'].'"' ?>>
    <meta name="keywords" content=<?= '"'.$mainInfo[0]['keywords'].'"' ?>>
    <link rel="stylesheet" href="css/task/main.css">
    <script src="js/task/main.js"></script>

</head>
<body>
<div class="container">
    <div class="header">

        <a class="logo" href="#">
            <div class="wrapper-loader">
                <div class="loader-1"></div>
                <div class="loader-2"></div>
            </div>
            <div class="logo-text">
                helicopter view<span>.</span>
            </div>
        </a>
        <div class="menu-button">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul class="menu">
            <li><a href="">about us.</a></li>
            <li><a class="selected" href="">service.</a></li>
            <li><a href="">out projecrtts.</a></li>
            <li><a href="">process.</a></li>
            <li><a href="">faq.</a></li>
            <li><a href="">blog.</a></li>
            <li><a href="">contacts.</a></li>
        </ul>
    </div>
    <div class="service-header">
        <div class="service-title">
            <p><?= $mainInfo[0]['service_title'] ?><span>.</span></p>
        </div>
        <div class="service-description">
            <p><?= $mainInfo[0]['service_description_1'] ?></p>
            <p><?= $mainInfo[0]['service_description_2'] ?></p>
        </div>
    </div>
    <div class="service-content">

    </div>
    <div class="offer-header">
        <p><?= $mainInfo[0]['offer_title'] ?><span>.</span></p>
    </div>
    <div class="offer-content">

    </div>
</div>
<div class="footer">
    <center><p>© 2017. helicopter view. All rights reserved. Design and development – <span>Sponge D&D.</span></p></center>
</div>
</body>
</html>