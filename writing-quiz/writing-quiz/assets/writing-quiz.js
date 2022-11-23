'use strict';
{
  /**
   * @typedef 型定義の説明 QUIZ 
   * @property 属性 {number} correctNumber 問題番号
   * @property {string | undefined} note ノート 説明  {}で型を指定
   * @property {string} question 問題文
   * @property {string[]} answers 回答の配列
   */

  /**
   * @description 問題と回答の定数
   * @type {QUIZ[]} 配列
   */

  /* 問題と答えを定義 */
  const ALL_QUIZ = [
    {
      id: 1,
      question: '日本のIT人材が2030年には最大どれくらい不足すると言われているでしょうか？',
      answers: ['約28万人', '約79万人', '約183万人'],
      correctNumber: 1,
      note: '経済産業省 2019年3月 － IT 人材需給に関する調査'
    },
    {
      id: 2,
      question: '既存業界のビジネスと、先進的なテクノロジーを結びつけて生まれた、新しいビジネスのことをなんと言うでしょう？',
      answers: ['INTECH', 'BIZZTECH', 'X-TECH'],
      correctNumber: 2
    },
    {
      id: 3,
      question: 'IoTとは何の略でしょう？',
      answers: ['Internet of Things', 'Integrate into Technology', 'Information  on Tool'],
      correctNumber: 0
    },
    {
      id: 4,
      question: '日本が目指すサイバー空間とフィジカル空間を高度に融合させたシステムによって開かれる未来社会のことをなんと言うでしょうか？',
      answers: ['Society 5.0', 'CyPhy', 'SDGs'],
      correctNumber: 0,
      note: 'Society5.0 - 科学技術政策 - 内閣府'
    },
    {
      id: 5,
      question: 'イギリスのコンピューター科学者であるギャビン・ウッド氏が提唱した、ブロックチェーン技術を活用した「次世代分散型インターネット」のことをなんと言うでしょう？',
      answers: ['Web3.0', 'NFT', 'メタバース'],
      correctNumber: 0
    },
    {
      id: 6,
      question: '先進テクノロジー活用企業と出遅れた企業の収益性の差はどれくらいあると言われているでしょうか？',
      answers: ['約2倍', '約5倍', '約11倍'],
      correctNumber: 1,
      note: 'Accenture Technology Vision 2021 '
    }
  ];

  /**
   * @description クイズコンテナーの取得
   * @type {HTMLElement} HTML内から取得
   */

  /* quizContainerを取得 */
  const quizContainer = document.getElementById('js-quizContainer');



  /**
   * @description クイズ１つ１つのHTMLを生成するための関数
   * @param 変数 quizItem { QUIZ }
   * @param questionNumber { number }
   * @returns 戻り値 {string 文字列型}
   */


  /* quizのHTMLを作成 */
  const createQuizHtml = (quizItem, questionNumber) => {

    /**
     * @description 回答の生成
     * @type {string}
     */

    /* 選択肢の定義 */
    const answersHtml = quizItem.answers.map((answer, answerIndex) => `<li class="answer-item">
        <button class="answer-item-button js-answer" data-answer="${answerIndex}">
          ${answer}<div class="arrow-icon"><img src="./assets/img/icon/icon-arrow.svg"></div></button>
      </li>
    `).join('');

    /* noteがあるかないか */
    const noteHtml = quizItem.note ? `<cite class="quiz-note">
<div class="quiz-note-icon"><img src="./assets/img/icon/icon-note.svg"></div><div class="quiz-note-text">${quizItem.note}</div>
</cite>` : '';

    // 書きたいHtml
    return `
    <div class="quiz-container">
    <section class="quiz-box js-quiz" data-quiz="${questionNumber}">
    <h2 class="Q">Q${questionNumber + 1}</h2>
        <div class="question-title">${quizItem.question}</div>
        <img src="./assets/img/quiz/img-quiz0${quizItem.id}.png">

      <div class="answer">
        <h2 class="A">A</h2>
        <div class="answers">
          <ul class="answer-lists">
              ${answersHtml}
          </ul>
        </div>
        <div class="answer-box js-answerBox" id>
          <p class="answer-box-title js-answerTitle"></p>
          <p class="answer-box-contents">
            <span class="answer-box-contents-label">A</span>
            <span class="answer-box-contents-text js-answerText"></span>
          </p>
        </div>
      </div>
    </div>
    ${noteHtml}
    </section>
    </div>`
  }


  /**
   * @description 配列の並び替え シャッフル出題
   * @param arrays {Array} {}型を指定
   * @returns {Array}
   */

  /* シャッフル出題 */
  const shuffle = arrays => {
    const array = arrays.slice();
    for (let i = array.length - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array
}

/**
  * @description quizArrayに並び替えたクイズを格納
  * @type {Array}
  */

/* allQUizをシャッフル */
const quizArray = shuffle(ALL_QUIZ)

/* 生成したHTMLをquiz-containerに挿入 */
quizContainer.innerHTML = quizArray.map((quizItem, index) => {
  return createQuizHtml(quizItem, index)
}).join('')

/* すべてのクイズを取得 */
const allQuiz = document.querySelectorAll('.js-quiz');
console.log(allQuiz);

/* ボタンを押したらすべてのボタンにdisabled */
/* const setDisabled = document.getElementById('js-quizItem');
setDisabled = true; */

const setDisabled = answers => {
  answers.forEach(answer => {
    answer.disabled = true;
  })
}

/* 正解？不正解？ */
const setTitle = (target, isCorrect) => {
  target.innerText = isCorrect ? '正解！' : '不正解...'};

  /* 正解、不正解によってクラス名をそれぞれ付与 */
  const setClassName = (target, isCorrect) => {
    target.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
  }

  allQuiz.forEach(quiz => {
    const answers = quiz.querySelectorAll('.js-answer');
    console.log(answers);
    const answerBox = quiz.querySelector('.js-answerBox');
    const answerTitle = quiz.querySelector('.js-answerTitle');
    const answerText = quiz.querySelector('.js-answerText');
    const selectedQuiz = Number(quiz.getAttribute('data-quiz'));

    answers.forEach(/* forEach 配列をループ処理だから複数個ないといけない＝＞L181でqueryselectorAll */answer => {
      console.log(answers);
      answer.addEventListener('click', () => {
        answer.classList.add('is-selected');
        const selectedAnswerNumber = Number(answer.getAttribute('data-answer'));

        /* すべてのボタンを非活性化 */
        setDisabled(answers);

        /* 正解ならtrue, 不正解ならfalse */
        const correctNumber = quizArray[selectedQuiz].correctNumber
        const isCorrect = correctNumber === selectedAnswerNumber;

        answerText.innerText = quizArray[selectedQuiz].answers[correctNumber];
        setTitle(answerTitle, isCorrect);
        setClassName(answerBox, isCorrect);
      })
    })
  })

}
