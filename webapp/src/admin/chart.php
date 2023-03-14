<?php
$total_hours_sql = "SELECT studyhours FROM hours";
$stmt = $pdo->query($total_hours_sql);
$total_hours = $stmt->fetchAll(PDO::FETCH_COLUMN);
$total = array_sum($total_hours);



$daily_hours = array($today_total);//PHPで配列を生成
$var_js = json_encode($daily_hours);//JavaScriptに渡すためにjson_encodeを行う

?>

<script>
var data1=JSON.parse('<?php echo $var_js; ?>');//jsonをparseしてJavaScriptの変数に代入
</script>

<script src="../assets/scripts/webapp.js"></script>
<!-- 外部のJavaScriptファイルの読み込み -->