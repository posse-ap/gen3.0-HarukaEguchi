<?php
$pdo = new PDO('mysql:host=db;dbname=posse', 'root', 'root');

$hours = $pdo->query("SELECT * FROM hours")->fetchAll(PDO::FETCH_ASSOC);



/* dataが今日のものを指定してとってくる */

/* 今日の日付を取得 */
/* dataの中に今日があればとってくる */
$today_date = date("Y-m-d");
$today_hours_sql = "SELECT studyhours FROM hours WHERE DATE(date) = '$today_date'";
$stmt = $pdo->query($today_hours_sql);
$this_hours = $stmt->fetchAll(PDO::FETCH_COLUMN);
$today_total = array_sum($this_hours); /* 今日の総勉強時間 */

/* 今日の月の合計時間を表示 */
/* 今日が含まれる月の情報を全部取ってきて、それを合計したのを表示させたい */
/* $stmt2 = $pdo->query()
$this_month = $stmt2->fetchAll();
$month_total = array_sum($this_month); */




$first_day_of_month = date("y-m-01");  /* この書き方は2023-03-01~2023-03-31 */
$last_day_of_month = date("y-m-t");
$this_month_hours_sql = "SELECT studyhours FROM hours WHERE date BETWEEN '$first_day_of_month' AND '$last_day_of_month'";
$stmt = $pdo->query($this_month_hours_sql);
$this_month_hours = $stmt->fetchAll(PDO::FETCH_COLUMN);
$month_total = array_sum($this_month_hours);



/* 後で */
/* $today_month = date('m');

$this_month_hours_sql = "SELECT studyhours FROM hours where date('m')= 03";

$stmt = $pdo->query($this_month_hours_sql);
$this_month_hours = $stmt->fetchAll(PDO::FETCH_COLUMN);
$month_total = array_sum($this_month_hours);

*/

$total_hours_sql = "SELECT studyhours FROM hours";
$stmt = $pdo->query($total_hours_sql);
$total_hours = $stmt->fetchAll(PDO::FETCH_COLUMN);
$total = array_sum($total_hours);  //$totalは総学習時間


$daily_hours = array($today_total); //PHPで配列を生成  $today_totalは一日の学習時間


/* 一日ごと */
$first_day = date("01");
/*  $last_day = ("d");
for ($i = $first_day; $i <= $last_day; $i = date('d', strtotime($i . '+1 day'))) {
  echo $i . PHP_EOL; 
}


/* var_dump($today_total);
var_dump($daily_hours);

$var_js = json_encode($daily_hours); */ //JavaScriptに渡すためにjson_encodeを行う
/* file_put_contents("chart1.json", $var_js);
 */
?>



<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- stylesheet -->
  <link rel="stylesheet" href="../assets/styles/index.css">
  <!-- FontAwesome -->
  <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
  <script src="https://unpkg.com/chart.js-plugin-labels-dv@3.0.5/dist/chartjs-plugin-labels.min.js"></script>
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="【アカウント名(例：@santmove_com)】" />
  <meta name="twitter:title" content="【シェアするページのタイトル】" />
  <meta name="twitter:description" content="【シェアするページの概要】" />
  <meta name="twitter:image" content="【シェアするページのアイコン画像(絶対パス)】" />
  <meta name="twitter:url" content="【シェアするページのURL】" />

  <title>Webapp</title>
</head>

<body>
  <!-- header -->
  <header class="webapp-header">
    <div class="header-inner-left">
      <div class="header-logo"><img src="../assets/img/logo.svg"></div>
      <span class="header-inner-week">4th week</span>
    </div>
    <div class="header-inner-right">
      <button class="header-button">
        <p class="header-button-text" id="openModal1">記録・投稿</p>
      </button>
  </header>
  <!-- modal -->
  <!-- modal-1 lift -->
  <section id="modalArea1" class="modalArea1">
    <div id="modalBg1" class="modalBg1"></div>
    <div class="modalWrapper1">
      <div class="modalContents">
        <div class="modal-contents-left">
          <ul class="modal-contents-left-list">
            <li class="modal-contents-left-item">
              <p>学習日</p>
              <input type=”date” name=”date” id="openCalendar">
            </li>
            <li class="modal-contents-left-item">
              <p>学習コンテンツ(複数選択可)</p>
              <ul class="modal-contents-stydy-list">
                <il class="modal-contents-dtudy-item">
                  <label class="mardal-contents-study-checkbox"><input class="modal-contents-study-checkbox-input" type="checkbox"><span class="modal-checkbox-input"><span class="modal-checkbox-label">Ｎ予備校</span>
                  </label>
                </il>
                <il class="modal-contents-dtudy-item">
                  <label class="mardal-contents-study-checkbox"><input class="modal-contents-study-checkbox-input" type="checkbox"><span class="modal-checkbox-input"><span class="modal-checkbox-label">ドットインストール</span>
                  </label>
                </il>
                <il class="modal-contents-dtudy-item">
                  <label class="mardal-contents-study-checkbox"><input class="modal-contents-study-checkbox-input" type="checkbox"><span class="modal-checkbox-input"><span class="modal-checkbox-label">POSSE課題</span>
                  </label>
                </il>
              </ul>
            </li>
            <li class="modal-contents-left-item">
              <p>学習書籍(複数選択可)</p>
              <ul class="modal-contents-stydy-list">
                <il class="modal-contents-dtudy-item">
                  <label class="mardal-contents-study-checkbox"><input class="modal-contents-study-checkbox-input" type="checkbox"><span class="modal-checkbox-input"><span class="modal-checkbox-label">HTML</span>
                  </label>
                </il>
                <il class="modal-contents-dtudy-item">
                  <label class="mardal-contents-study-checkbox"><input class="modal-contents-study-checkbox-input" type="checkbox"><span class="modal-checkbox-input"><span class="modal-checkbox-label">CSS</span>
                  </label>
                </il>
                <il class="modal-contents-dtudy-item">
                  <label class="mardal-contents-study-checkbox"><input class="modal-contents-study-checkbox-input" type="checkbox"><span class="modal-checkbox-input"><span class="modal-checkbox-label">JavaScript</span>
                  </label>
                </il>
                <il class="modal-contents-dtudy-item">
                  <label class="mardal-contents-study-checkbox"><input class="modal-contents-study-checkbox-input" type="checkbox"><span class="modal-checkbox-input"><span class="modal-checkbox-label">PHP</span>
                  </label>
                </il>
                <il class="modal-contents-dtudy-item">
                  <label class="mardal-contents-study-checkbox"><input class="modal-contents-study-checkbox-input" type="checkbox"><span class="modal-checkbox-input"><span class="modal-checkbox-label">Laravel</span>
                  </label>
                </il>
                <il class="modal-contents-dtudy-item">
                  <label class="mardal-contents-study-checkbox"><input class="modal-contents-study-checkbox-input" type="checkbox"><span class="modal-checkbox-input"><span class="modal-checkbox-label">SQL</span>
                  </label>
                </il>
                <il class="modal-contents-dtudy-item">
                  <label class="mardal-contents-study-checkbox"><input class="modal-contents-study-checkbox-input" type="checkbox"><span class="modal-checkbox-input"><span class="modal-checkbox-label">SHELL</span>
                  </label>
                </il>
                <il class="modal-contents-dtudy-item">
                  <label class="mardal-contents-study-checkbox"><input class="modal-contents-study-checkbox-input" type="checkbox"><span class="modal-checkbox-input"><span class="modal-checkbox-label">情報システム基礎知識(その他)</span>
                  </label>
                </il>
              </ul>
            </li>
          </ul>
        </div>
        <!-- modal-1 right -->
        <div class="modal-contents-right">
          <ul class="modal-contents-right-list">
            <li class="modal-contents-right-item">
              <p>学習時間</p>
              <input type=”text” name=”name”>
            </li>
            <li class="modal-contents-right-item">
              <div class=modal-twitter-comment>
                <p>Twitter用コメント</p>
                <textarea class="textarea" name=”name” style="height: 100px; width: 281PX;" id="twitterComment"></textarea>

            </li>
            <li class="modal-contents-right-item"><label class="mardal-contents-study-checkbox">
                <input class="modal-contents-study-checkbox-input" type="checkbox" id="shareTwitter" name="shareTwitter"><span class="modal-checkbox-input"><span class="modal-checkbox-label">Twitterに自動投稿する</span>
                  <div id="share-area"></div>
              </label></li>
          </ul>
        </div>
      </div>
      <div id="closeModal1" class="closeModal1">
        ×
      </div>
      <div class="modal-record-button">
        <button class="modal-button" id="openModal2">
          <p class="modal-button-text">記録・投稿</p>
        </button>
      </div>
    </div>
  </section>
  <!-- modal-2 -->
  <section id="modalArea2" class="modalArea2">
    <div id="modalBg2" class="modalBg2"></div>
    <div class="modalWrapper2">
      <div class="modalWrapper2-contents">
        <div class="awesome">
          <span class="awesome-text">
            AWESOME!
          </span>
          <span class="awesome-img"><img src="./assets/img/checkmark.png" height="100px" width="100px"></span>
        </div>
        <div class="modalWrapper2-text">
          <P>記録・投稿</P>
          <p>完了しました</p>
        </div>
      </div>
      <div id="closeModal2" class="closeModal2">
        ×
      </div>
    </div>
  </section>
  <!-- modal-3 -->
  <section id="modalArea3" class="modalArea3">
    <div id="modalBg3" class="modalBg3"></div>
    <div class="modalWrapper3">
      <div id="closeModal3" class="closeModal3">
        ×
      </div>
      <table>
        <thead>
          <tr>
            <th id="prev">&laquo;</th>
            <th id="title" colspan="5">2020/05</th>
            <th id="next">&raquo;</th>
          </tr>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
        <tfoot>
          <tr>
          </tr>
        </tfoot>
      </table>
      <div class="modal-record-button">
        <button class="modal-button" id="openModal1a">
          <p class="modal-button-text">決定</p>
        </button>
      </div>
    </div>
  </section>
  <!-- modal-4 -->
  <section id="modalArea4" class="modalArea4">
    <div id="modalBg4" class="modalBg4"></div>
    <div class="modalWrapper4">
      <div class="modalWrapper4-contents">
        <div class="sk-chase">
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
        </div>
      </div>
      <div id="closeModal4" class="closeModal4">
        ×
      </div>
    </div>
  </section>

  <!-- main -->
  <main>
    <div class="main-contents">
      <ul class="main-contents-inner">
        <li class="main-study-time">
          <div class="main-study-time-count">
            <ul class="main-study-time-list">
              <li class="main-study-time-item">
                <h2 class="main-study-time-title">Today</h2>
                <p class="study-time-number"><?php echo $today_total; ?></p>
                <p class="study-time-hour">hour</p>
              </li>
              <li class="main-study-time-item">
                <h2 class="main-study-time-title">Month</h2>
                <p class="study-time-number"><?php echo $month_total; ?></p>
                <p class="study-time-hour">hour</p>
              </li>
              <li class="main-study-time-item">
                <h2 class="main-study-time-title">Total</h2>
                <p class="study-time-number"><?php echo $total; ?></p>
                <p class="study-time-hour">hour</p>
              </li>
            </ul>
          </div>
          <div class="main-study-time-chart"><canvas id="barChart">
            </canvas></div>
        </li>
        <li class="main-study-language">
          <ul class="main-study-list">
            <li class="main-study-item">
              <h2 class="main-study-language-title">学習言語</h2>
              <div class="main-study-language-chart"><canvas id="timeCircle1">
                </canvas></div>
            </li>
            <li class="main-study-item">
              <h2 class="main-study-language-title">学習コンテンツ</h2>
              <div class="main-study-language-chart"><canvas id="timeCircle2">
                </canvas></div>
            </li>
          </ul>
        </li>
      </ul>
      <div class="main-date-top">
        <div class="main-date"><i class="main-date-text-symbol">＜</i>
          <p class="main-date-date">2020年 10月</p>
          <i class="main-date-text-symbol">＞</i>
        </div>
        <div class="footer-button-section">
          <button class="footer-button">
            <p class="footer-button-text" id="openModal1-2">記録・投稿</p>
          </button>
        </div>
      </div>
    </div>
  </main>
</body>
<script src="../assets/scripts/webapp.js"></script>

</html>