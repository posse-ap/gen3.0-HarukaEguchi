'use strict';

{
  const correct_answers = [
    {
      index: 1,
      value: '約79万人',
    },
    {
      index: 2,
      value: 'X-TECH',
    },
    {
      index: 0,
      value: 'Internet of Things',
    },
    {
      index: 0,
      value: 'Sosiety 5.0',
    },
    {
      index: 0,
      value: 'Web3.0',
    },
    {
      index: 1,
      value: '約５倍',
    }
  ]
}

//  問題の取得 
  const allQuiz = document.querySelectorAll('.js-quiz');

// ボタンの非活性化
  const setDisabled = answers => {
    answers.forEach(answer =>{
      answer.disabled = true;
    })
  }

// true or false
const setTitle = (target, isCorrect) => {
  target.innerText = isCorrect ? '正解' : '不正解...';
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
      const selectedAnswer =Number(answer.getAttribute('data-answer'));

      // ボタン非活性化
      setDisabled(answers);
        
      // 正解-true,不正解-false
      const isCorrect = correct_answers[selectedQuiz].index === selectedAnswer;

      answerText.innerText = correct_answers[selectedQuiz].value;
      setTitle(answerTitle, isCorrect);
      setClassName(answerBox, isCorrect);
      })
    })
  }
)