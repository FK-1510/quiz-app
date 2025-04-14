let userName = '';  // ユーザー名
let correctCount = 0; // 正解数
let shuffledQuiz = []; // シャッフルした問題

// クイズデータ（サンプル）
const quizData = [
  { name: 'あべとうま', image: 'abetouma.jpg' },
  { name: 'あわのつばさ', image: 'awanotsubasa.jpg' },
  { name: 'いかだいゆうた', image: 'ikadailyuta.jpg' },
  { name: 'いとうりゅうのすけ', image: 'itouryunosuke.jpg' },
  { name: 'うえだゆい', image: 'uedayui.jpg' },
  { name: 'うとみくり', image: 'utomikuri.jpg' },
  { name: 'おおしばさくら', image: 'oosibasakura.jpg' },
];

// クイズスタート
function startQuiz() {
  userName = document.getElementById('user-name').value.trim();
  if (!userName) {
    alert("名前を入力してください！");
    return;
  }

  // ローカルストレージからランキングデータを読み込み
  let rankings = JSON.parse(localStorage.getItem('rankings')) || [];

  // ランキングに新たに挑戦したユーザーを追加
  rankings.push({ name: userName, score: correctCount });

  // ランキングをローカルストレージに保存
  localStorage.setItem('rankings', JSON.stringify(rankings));

  // クイズ開始
  shuffledQuiz = shuffle([...quizData]);
  loadNewQuestion();
  document.getElementById('name-container').style.display = 'none';
  document.getElementById('quiz-container').style.display = 'block';
  correctCount = 0;
}

// シャッフル関数（配列の順番をランダムに変更）
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 新しい問題を表示
function loadNewQuestion() {
  const currentQuiz = shuffledQuiz[0];
  document.getElementById('quiz-image').src = currentQuiz.image;
  document.getElementById('question').innerText = 'この人は誰？';
}

// 答えをチェック
function checkAnswer() {
  const answer = document.getElementById('answer').value.trim();
  const correctAnswer = shuffledQuiz[0].name;

  if (answer === correctAnswer) {
    correctCount++;
  }

  shuffledQuiz.shift();  // 次の問題に進む
  if (shuffledQuiz.length === 0) {
    showSummary();
  } else {
    loadNewQuestion();
  }
}

// 結果とランキングを表示
function showSummary() {
  // ランキングを表示
  let rankings = JSON.parse(localStorage.getItem('rankings')) || [];
  rankings.sort((a, b) => b.score - a.score); // スコア順に並べ替え

  let rankingText = rankings.map((rank, index) => `${index + 1}. ${rank.name} - ${rank.score}点`).join('<br>');

  document.getElementById('quiz-container').style.display = 'none';
  document.getElementById('summary').style.display = 'block';
  document.getElementById('summary-text').innerHTML =
    `あなたの正解数は ${correctCount} / ${quizData.length} でした！<br><br>
     ランキング：<br>${rankingText}`;
}
