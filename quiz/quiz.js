'use strict';

{
  /**
   * @typedef QUIZ
   * @property {number} correctNumber 問題番号
   * @property {string | undefined} note ノート
   * @property {string} question 問題文
   * @property {string[]} answers 回答の配列
   */

  /**
   * @description 問題と回答の定数
   * @type {QUIZ[]}
   */

const ALL_QUIZ = [
  {
    question: '日本のIT人材が2030年には最大どれくらい不足すると言われているでしょうか？',
    answers: ['約28万人', '約79万人', '約183万人'],
    correctNumber: 1,
    note: '経済産業省 2019年3月 － IT 人材需給に関する調査'
  },
  {
    question: '既存業界のビジネスと、先進的なテクノロジーを結びつけて生まれた、新しいビジネスのことをなんと言うでしょう？',
    answers: ['INTECH', 'BIZZTECH', 'X-TECH'],
    correctNumber: 2,
  },
  {
    question: 'IoTとは何の略でしょう？',
    answers: ['Internet of Things', 'Integrate into Technology', 'Information on Tool'],
    correctNumber: 0,
  },
  {
    question: 'イギリスのコンピューター科学者であるギャビン・ウッド氏が提唱した、ブロックチェーン技術を活用した「次世代分散型インターネット」のことをなんと言うでしょう？',
    answers: ['Society 5.0', 'CyPhy', 'SDGs'],
    correctNumber: 0,
    note: 'Society5.0 - 科学技術政策 - 内閣府'
  },
  {
    question: 'イギリスのコンピューター科学者であるギャビン・ウッド氏が提唱した、ブロックチェーン技術を活用した「次世代分散型インターネット」のことをなんと言うでしょう？',
    answers: ['Web3.0', 'NFT', 'メタバース'],
    correctNumber: 0,
  },
  {
    question: '先進テクノロジー活用企業と出遅れた企業の収益性の差はどれくらいあると言われているでしょうか？',
    answers: ['約2倍', '約5倍', '約11倍'],
    correctNumber: 1,
    note: 'Accenture Technology Vision 2021'
  }
];

  /**
   * @description クイズコンテナーの取得
   * @type {HTMLElement}
   */
const quizContainer = document.getElementById('js-quizContainer');

  /**
   * @description クイズ１つ１つのHTMLを生成するための関数
   * @param quizItem { QUIZ }
   * @param questionNumber { number }
   * @returns {string}
   */
const createQuizHtml = (quizItem, questionNumber) => {

  /**
   * @description 回答の生成
   * @type {string}
   */
  const answersHtml = quizItem.answers.map((answer, answerIndex) => `<li class="quiz-answer-item">
      <button class="choice js-answer" data-answer="${answerIndex}">
        ${answer}<div class="arrow"></div>
      </button>
    </li>`
  ).join('');

// 引用テキストの生成
const noteHtml = quizItem.note ? `<cite class="reference">
<i class="reference-icon"><img src="./img/reference-icon.png"></i><div class="reference-text">${quizItem.note}
</cite>` : '';

return `<section class="quiz1 js-quiz" data-quiz="${questionNumber}">
<div class="quiz-box-question">
  <h2 class="quiz-box-question-title">
    <span class="Q">Q${questionNumber + 1}</span>
    <span
      class="quiztext">${quizItem.question}</span>
  </h2>
  <figure class="quiz-box-image">
    <img src="./img/q${questionNumber + 1}-img.png" alt="">
  </figure>
</div>
<div class="quiz-box-answer">
  <span class="A">A</span>
  <ul class="choices">
    ${answersHtml}
  </ul>
  <div class="answerbox js-answerBox">
    <p class="answer-correct-title js-answerTitle"></p>
    <p class="answer-correct-content">
      <span class="answer-A">A</span>
      <span class="js-answerText"></span>
    </p>
  </div>
</div>
${noteHtml}
</section>`
}

  /**
   * @type {string}
   * @description 生成したクイズのHTMLを #js-quizContainer に挿入
   */
  quizContainer.innerHTML = ALL_QUIZ.map((quizItem, index) => {
    return createQuizHtml(quizItem, index)
  }).join('')

  /**
   * @type {NodeListOf<Element>}
   * @description すべての問題を取得
   */
  const allQuiz  = document.querySelectorAll('.js-quiz');

// ボタンの非活性化
  const setDisabled = answers => {
    answers.forEach(answer =>{
      answer.disabled = true;
    })
  }

// true or false
const setTitle = (target, isCorrect) => {
  target.innerText = isCorrect ? '正解!' : '不正解...';
}
const setClassName = (target,isCorrect) => {
  target.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
}

// 問題中での処理
allQuiz.forEach(quiz => {
  const answers = quiz.querySelectorAll('.js-answer');
  const selectedQuiz = Number(quiz.getAttribute('data-quiz'));
  const answerBox = quiz.querySelector('.js-answerBox');
  const answerTitle = quiz.querySelector('.js-answerTitle');
  const answerText = quiz.querySelector('.js-answerText');

  // clickしたらclassに追加
  answers.forEach(answer => {
    answer.addEventListener('click', () => {
      answer.classList.add('is-selected');
      const selectedAnswerNumber = Number(answer.getAttribute('data-answer'));

      // ボタン非活性化
      setDisabled(answers);
        
        // 正解ならtrue, 不正解ならfalseをcheckCorrectに格納
        const correctNumber = ALL_QUIZ[selectedQuiz].correctNumber
        const isCorrect = correctNumber === selectedAnswerNumber;

        // 回答欄にテキストやclass名を付与
        answerText.innerText = ALL_QUIZ[selectedQuiz].answers[correctNumber];

      setTitle(answerTitle, isCorrect);
      setClassName(answerBox, isCorrect);
      })
    })
  })
}