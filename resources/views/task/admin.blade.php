<?php
    $discrArray = function ($txt) {
        $result = explode('<br>', $txt);
        for ($i = 0; $i < 4; $i++) {
            if (!isset($result[$i])) {
                $result[$i] = '';
            }
        }
        return $result;
    };

    $checked = function($txt) {
        return substr($txt, -7) === '</span>' ? 'checked' : '';
    };
?>

<!DOCTYPE html>
<html>
<head>
    <title>Admin</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/task/main_admin.css">
    <script> 
        var svgFileNameAll = [];
        "<?php foreach ($fileNameAll as $file) { ?>"
                svgFileNameAll.push("<?= $file ?>");
        "<?php } ?>";
    </script>
    <script src="js/task/main_admin.js"></script>
</head>
<body>

<div class="container">
    <div class="header">
        <ul class="menu">
            <li><p info="main-info">main</p></li>
            <li><p info="service-info" class = "selected">service</p></li>
            <li><p info="offer-info">our offer</p></li>
        </ul>
    </div>
    <div class="main-info">
        <h1>Main information:</h1>
        <div class="main-wrapper">
            <form method="POST" action="" name=<?= '"ajaxForm-main-'.$mainInfo[0]['id'].'"' ?>> <br />
                <h3>Title:</h3>
                <textarea rows="1" maxlength="191" name="title"><?= $mainInfo[0]['title'] ?></textarea>
                <h3>Keywords:</h3>
                <textarea rows="10" name="keywords"><?= $mainInfo[0]['keywords'] ?></textarea>
                <h3>Description:</h3>
                <textarea rows="3" name="description"><?= $mainInfo[0]['description'] ?></textarea>
                <h3>Service title:</h3>
                <textarea rows="1" name="service_title" maxlength="191"><?= $mainInfo[0]['service_title'] ?></textarea>
                <h3>Service description - 1:</h3>
                <textarea rows="1" name="service_description_1" maxlength="191"><?= $mainInfo[0]['service_description_1'] ?></textarea>
                <h3>Service description - 2:</h3>
                <textarea rows="1" name="service_description_2" maxlength="191"><?= $mainInfo[0]['service_description_2'] ?></textarea>
                <h3>Offer title:</h3>
                <textarea rows="1" name="offer_title" maxlength="191"><?= $mainInfo[0]['offer_title'] ?></textarea>
                <input type="submit" name="set" value="Update"/>
                <p class="message"></p>
            </form>
        </div>
    </div>

    <div class="service-info selected">
        <h1>Service information:</h1>

<?php foreach($blockService as $bs) { ?>

        <div class="service" id=<?= '"bs-'.$bs['id'].'"' ?>>
            <div class="result">

                <div class="service-block">
                    <center>
                        <a href=<?= '"'.$bs['href'].'"' ?>><img src=<?= '"'.$bs['icon'].'"' ?>/></a>
                    </center>
                    <p class="txt"><?= $bs['description'] ?></p>
                </div>

            </div>
            <div class="edit">
                <form method="POST" action="" name=<?= '"ajaxForm-service-'.$bs['id'].'"' ?>> <br />
                    <h3>Order:</h3>
                    <input type="number" step name="order" maxlength="11" value=<?= '"'.$bs['order'].'"' ?>/>
                    <h3>URL:</h3>
                    <input type="url" name="href" value=<?= '"'.$bs['href'].'"' ?>/>
                    <h3>Description:</h3>
                    <textarea rows="4" name="description"><?= $bs['description'] ?></textarea>

                    <input type="checkbox" name="bold1" <?= $checked($discrArray($bs['description'])[0]) ?>>
                    <textarea rows="1" name="description1"><?= strip_tags($discrArray($bs['description'])[0]) ?></textarea>
                    <input type="checkbox" name="bold2" <?= $checked($discrArray($bs['description'])[1]) ?>>
                    <textarea rows="1" name="description2"><?= strip_tags($discrArray($bs['description'])[1]) ?></textarea>
                    <input type="checkbox" name="bold3" <?= $checked($discrArray($bs['description'])[2]) ?>>
                    <textarea rows="1" name="description3"><?= strip_tags($discrArray($bs['description'])[2]) ?></textarea>
                    <input type="checkbox" name="bold4" <?= $checked($discrArray($bs['description'])[3]) ?>>
                    <textarea rows="1" name="description4"><?= strip_tags($discrArray($bs['description'])[3]) ?></textarea>

                    <h3>Icon:</h3>
                    <textarea rows="1" maxlength="191" name="icon"><?= $bs['icon'] ?></textarea>
                    <textarea rows="1" readonly name="SVG" value="\n"></textarea>
                    <input type="submit" name="add" value="Insert"/>
                    <input type="submit" name="set" value="Update"/>
                    <input type="submit" name="del" value="Delete"/>
                    <p class="message"></p>
                </form>
            </div>
        </div>

<?php } ?>

    </div>

    <div class="offer-info">
        <h1>Our offer information:</h1>

<?php foreach($blockOffer as $bo) { ?>

        <div class="offer" id=<?= '"bo-'.$bo['id'].'"' ?>>
            <div class="result">

                <div class="offer-block">
                    <div class="wrapper">
                        <a href=<?= '"'.$bo['href'].'"' ?>><img src=<?= '"'.$bo['icon'].'"' ?>/></a>
                        <p class="txt"><span><?= $bo['title'] ?></span><br><?= $bo['description'] ?></p>
                    </div>
                </div>

            </div>
            <div class="edit">
                <form method="POST" action="" name=<?= '"ajaxForm-offer-'.$bo['id'].'"' ?>> <br />
                    <h3>Order:</h3>
                    <input type="number" step name="order" maxlength="11" value=<?= '"'.$bo['order'].'"' ?>/>
                    <h3>URL:</h3>
                    <textarea rows="1" maxlength="191" name="href"><?= $bo['href'] ?></textarea>
                    <h3>Title:</h3>
                    <textarea rows="1" name="title"><?= $bo['title'] ?></textarea>
                    <h3>Description:</h3>
                    <textarea rows="4" name="description"><?= $bo['description'] ?></textarea>
                    <h3>Icon:</h3>
                    <textarea rows="1" maxlength="191" name="icon"><?= $bo['icon'] ?></textarea>
                    <textarea rows="1" readonly name="SVG" value="\n"></textarea>
                    <input type="submit" name="add" value="Insert"/>
                    <input type="submit" name="set" value="Update"/>
                    <input type="submit" name="del" value="Delete"/>
                    <p class="message"></p>
                </form>
            </div>
        </div>

<?php } ?>

    </div>

</div>

</body>
</html>