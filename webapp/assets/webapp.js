'use strict';

console.clear();

{
  let ctx = document.getElementById("barChart");
  let barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      //凡例のラベル
      labels: ['', '', '2', '', '4', '', '6', '', '8', '', '10', '', '12', '', '14', '', '16', '', '18', '', '20', '', '22', '', '24', '', '26', '', '28', '', '30', ''],
      datasets: [
        {
          /* label: '訪問者数', //データ項目のラベル */
          data: [0, 2.5, 4.5, 1, 3.5, 3.5, 4, 6, 7.5, 1.5, 4, 2, 5.5, 7, 8, 7.5, 3.5, 0.5, 0.5, 1, 4, 3, 5.5, 1.5, 6, 8, 8, 1.5, 0.5, 4, 1, 5], //グラフのデータ
          /* datalabels: {
            display: false
          }, */
          backgroundColor: 'rgb(6,108,186)',
          borderRadius: '10'
        }
      ]
    },
    options: {
      plugins: {
        labels: {
          display: false,
        },
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false
          },
          /* ticks: {
            max: 30, //最大値
            min: 2, //最小値
            stepSize: 2, //縦ラベルの数値単位
          }, */
          display: true,
          stacked: false,


        },
        y: {
          grid: {
            display: false,
            drawBorder: false
          },
          ticks: {
            max: 8, //最大値
            min: 0, //最小値
            stepSize: 2, //縦ラベルの数値単位
            callback: function (tick) {
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
            display: true,
            position: 'bottom'
          },
        },
      },
    });
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
          tooltip: {
            enabled: false
          },
          /*  datalabels: {
             display: false;
          } */
          legend: {
            display: true,
            position: 'bottom'
          },
        }
      },


    }


  /* } */);
  };


  /* modal----- */

  $(function () {
    $('#openModal1, #openModal1-2').click(function () {
      $('#modalArea1').fadeIn();
    });

    $('#closeModal1 , #modalBg1').click(function () {
      $('#modalArea1').fadeOut();
    });
    $('#closeModal2 , #modalBg2').click(function () {
      $('#modalArea2').fadeOut();
    });
    $('#closeModal3 , #modalBg3').click(function () {
      $('#modalArea3').fadeOut();
    });
    $('#closeModal4 , #modalBg4').click(function () {
      $('#modalArea4').fadeOut();
    });

    $('#openModal2').click(function () {

      $('#modalArea1').fadeOut();
      $('#modalArea4').fadeIn();
      /* const btn = document.getElementById("openModal2");
      btn.addEventListener("click", () => { */
      window.setTimeout(() => {
        $('#modalArea4').fadeOut();
        $('#modalArea2').fadeIn();
      }, 3000);


      /* function myCheck() { */
        var flag = false;
        

        const shareTwitter = document.getElementById('shareTwitter').checked;
console.log(shareTwitter);
        if (shareTwitter == true) {
          flag = true;


          let text = document.getElementById('twitterComment').value;
          function openTwitter(text) {
            var turl = "https://twitter.com/intent/tweet?text=" + text;
            window.open(turl, '_blank');
          }
          openTwitter(text);
        }
        //openTwitter(投稿文、シェアするURL、ハッシュタグ、提供元アカウント)

  /*     } */
      //呼び出し例：openTwitter("テスト","https://santmove.com","santmove","santmove_com");

    });


    $('#openModal1a').click(function () {
      $('#modalArea3').fadeOut();
      $('#modalArea1').fadeIn();
      console.log('click');
    });

    $('#closeModal2 , #modalBg2').click(function () {
      $('#modalArea2').fadeOut();
      $
    });


    $('#openCalendar').click(function () {
      $('#modalArea3').fadeIn();
      $('#modalArea1').fadeOut();

    });
   

    /*   $('#closeModal3 , #modalBg3').click(function () {
        $('#modalArea4').fadeIn();
  
  
      }); */
  });

  /* calender */

  console.clear();

  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();

  function getCalendarHead() {
    const dates = [];
    const d = new Date(year, month, 0).getDate();
    const n = new Date(year, month, 1).getDay();

    for (let i = 0; i < n; i++) {
      /* 30 */
      /* 29, 30 */
      /* 28, 29, 30 */
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true,
      });
    }

    return dates;
  }

  function getCalendarBody() {
    let dates = [];
    let lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }

    if (year === today.getFullYear() && month === today.getMonth()) {
      dates[today.getDate() - 1].isToday = true;
    }



    return dates;

  }

  function getCalendarTail() {
    const dates = [];
    const lastDay = new Date(year, month, + 1, 0).getDay();

    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }

    return dates;
  }


  function clearCalendar() {
    const tbody = document.querySelector('tbody');

    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }

  function renderTitle() {
    const title = `${year}/${String(month + 1).padStart(2, '0')}`;
    document.getElementById('title').textContent = title;
  }

  function renderWeeks() {
    const dates = [
      ...getCalendarHead(),
      ...getCalendarBody(),
      ...getCalendarTail(),
    ];

    const weeks = [];
    const weeksCount = dates.length / 7;

    for (let i = 0; i < weeksCount; i++) {
      weeks.push(dates.splice(0, 7))
    }


    weeks.forEach(week => {
      const tr = document.createElement('tr');
      week.forEach(date => {
        const td = document.createElement('td');

        td.textContent = date.date;
        if (date.isToday) {
          td.classList.add('today');
        }

        if (date.isDisabled) {
          td.classList.add('disabled')
        }

        tr.appendChild(td);

        td.addEventListener('click', () => {
          document.getElementById("openCalendar").value = title.textContent + "/" + td.textContent;

        })
      }

      );
      document.querySelector('tBody').appendChild(tr);
    });
  }




  function createCalendar() {

    clearCalendar();
    renderTitle();
    renderWeeks();




  }

  document.getElementById('prev').addEventListener('click', () => {
    month--;
    if (month < 0) {
      year--;
      month = 11;
    }

    createCalendar();
  });

  document.getElementById('next').addEventListener('click', () => {
    month++;
    if (month > 11) {
      year++;
      month = 0;
    }

    createCalendar();
  });

  createCalendar();





}
