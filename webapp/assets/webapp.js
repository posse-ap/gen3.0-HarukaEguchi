'use strict';
{
  let ctx = document.getElementById("barChart");
  let barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      //凡例のラベル
      labels: ['','', '2', '', '4', '', '6', '', '8', '', '10', '', '12', '', '14', '', '16', '', '18', '', '20', '', '22', '', '24', '', '26', '', '28', '', '30', ''],
      datasets: [
        {
          /* label: '訪問者数', //データ項目のラベル */
          data: [0,2.5, 4.5, 1, 3.5, 3.5, 4, 6, 7.5, 1.5, 4, 2, 5.5, 7, 8, 7.5, 3.5, 0.5, 0.5, 1, 4, 3, 5.5, 1.5, 6, 8, 8, 1.5, 0.5, 4, 1, 5], //グラフのデータ
          backgroundColor: 'rgb(6,108,186)',
          borderRadius: '10'
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder:false
          },
          ticks: {
            max: 30, //最大値
            min: 2, //最小値
            stepSize: 2, //縦ラベルの数値単位
          },
          display: true,
          stacked: false,
          
          
        },
        y: {
          grid: {
            display: false,
            drawBorder:false
          },
          ticks: {
            max: 8, //最大値
            min: 0, //最小値
            stepSize: 2, //縦ラベルの数値単位
            callback: function(tick) {
              return tick.toString() + 'h';
          },
   /*        display: true, */
          /* stacked: false, */
          
          /* scaleLabel: {
            //表示されるy軸の名称について
            display: true, //表示するか否か
            labelString: "h" */
          }
        }
      },
      responsive: true,
      /* maintainAspectRatio: false, */
    }
  });

  /* 円グラフ */

  window.onload = function () {
    let context1 = document.querySelector("#timeCircle1").getContext('2d');
    
    new Chart(context1, {
      // 実際に表示したいグラフのデータ
      type: 'doughnut',
      data: {
        labels: ["JavaScript", "CSS", "PHP", "HTML", "Laravel", "SQL", "SHELL", "情報システム基礎知識(その他)"],
        datasets: [{
          backgroundColor: ["#0345EC", "#0F71BD", "#21BDDE", "#3BCEFE", "#B29EF3", "#6D46EC", '#4A17EF', '#3105C0'],
          data: [42, 18, 10, 9, 8, 6, 5, 4]
        }]
      },
      options: {
        responsive: false,
        plugins: {
          legend: {
            params: {
              position: ['bottom']
            },
          },
        },
      },
    });


  window.onload = function () {
    let context2 = document.querySelector("#timeCircle2").getContext('2d');
    
    new Chart(context2, {
      // 実際に表示したいグラフのデータ
      type: 'doughnut',
      data: {
        labels: ["ドットインストール", "N予備校", "POSSE課題"],
        datasets: [{
          backgroundColor: ["#0345EC", "#0F71BD", "#21BDDE"],
          data: [42, 33, 25]
        }]
      },
      options: {
        responsive: false,
        plugins: {
          legend: {
              position: ['bottom']
            
          }
        }
      }
    });

  };

};

/* mordal----- */

$(function () {
  $('#openModal').click(function(){
      $('#modalArea').fadeIn();
  });
  $('#closeModal , #modalBg').click(function(){
    $('#modalArea').fadeOut();
  });
});}
