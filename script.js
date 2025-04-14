const allStudents = [
    "あべとうま", "あわのつばさ", "ふくだまゆ", "ふくしままさと", "ふくしまろか",
    "はがさくと", "はつしかよしき", "ひさゆきしおん", "ほつみひなこ", "いかだいゆうた",
    "いとうりゅうのすけ", "かとうまこと", "かつらもとゆき", "きたがわねね", "こばやしみく",
    "くわたさほ", "こひやまりょうた", "こまつこうたろう", "こみやるな", "こじまみさき",
    "くろだみゆ", "まつしたれいな", "まつざかような", "みついゆうた", "みやのまひろ",
    "ながはまかずは", "なかみやび", "なかじまたいき", "にしおほのか", "おかもとおうら",
    "おかむらかずき", "おおしばさくら", "おつともみさき", "おやふそかずき", "おやまだたける",
    "おじまひのは", "りょうじゃちぇん", "さとうきょうや", "しまむらけんたろう", "しみずいぶき",
    "そんげいゆうか", "すずきゆいな", "たかばたけせれな", "たかだいくる", "たけだみらい",
    "たけうちりいな", "たけうちゆい", "たきがわれんせい", "たきぐちさや", "たぬまそら",
    "とおいこなつ", "うえだゆい", "うとみくり", "やぎぬまこうた", "やまひでこうき","ただみりく","とむらこはる","かみじょうみやび"];
  
  let quizData = [];
  let currentQuestion = 0;
  let correctCount = 0;
  let timer;
  let timeLeft = 10;
  let introIndex = 0;
  
  // 導入モード
  function startIntroMode() {
    document.querySelector(".mode-selection").classList.add("hidden");
    document.getElementById("intro").classList.remove("hidden");
  
    quizData = shuffle([...allStudents]);
    introIndex = 0;
    showIntro();
  }
  
  function showIntro() {
    document.getElementById("intro-name").classList.add("hidden");
    document.getElementById("intro-image").src = `images/${quizData[introIndex]}.jpg`;
    setTimeout(() => {
      document.getElementById("intro-name").textContent = quizData[introIndex];
      document.getElementById("intro-name").classList.remove("hidden");
    }, 1000);
  }
  
  function nextIntro() {
    introIndex++;
    if (introIndex < quizData.length) {
      showIntro();
    } else {
      location.reload();
    }
  }
  
  // ホームに戻る
  function goHome() {
    document.getElementById("intro").classList.add("hidden");
    document.querySelector(".mode-selection").classList.remove("hidden");
  }
  
  // 練習・テストモード
  function startGame(mode) {
    document.querySelector(".mode-selection").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
  
    quizData = shuffle([...allStudents]);
    if (mode === "practice") quizData = quizData.slice(0, 10);
  
    currentQuestion = 0;
    correctCount = 0;
    showQuestion();
  }
  
  function showQuestion() {
    resetTimer();
    document.getElementById("feedback").textContent = "";
    document.getElementById("answer").value = "";
    document.getElementById("quiz-image").src = `images/${quizData[currentQuestion]}.jpg`;
    document.getElementById("question-counter").textContent = `${currentQuestion + 1} / ${quizData.length}`;
    startTimer();
  }
  
  function submitAnswer() {
    const userAnswer = document.getElementById("answer").value.trim();
    if (!userAnswer) return;
  
    stopTimer();
    const correctAnswer = quizData[currentQuestion];
  
    if (userAnswer === correctAnswer) {
      document.getElementById("feedback").textContent = "⭕️ 正解！";
      correctCount++;
    } else {
      document.getElementById("feedback").textContent = `❌ 不正解… 正解は「${correctAnswer}」でした`;
    }
  
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      setTimeout(showQuestion, 1500);
    } else {
      setTimeout(showResult, 1500);
    }
  }
  
  function showResult() {
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("score").textContent = `正解数：${correctCount} / ${quizData.length}`;
  }
  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // タイマー
  function startTimer() {
    timeLeft = 10;
    document.getElementById("timer").textContent = `残り時間: ${timeLeft}秒`;
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById("timer").textContent = `残り時間: ${timeLeft}秒`;
      if (timeLeft <= 0) {
        stopTimer();
        submitAnswer();
      }
    }, 1000);
  }
  
  function stopTimer() {
    clearInterval(timer);
  }
  
  function resetTimer() {
    clearInterval(timer);
    document.getElementById("timer").textContent = "残り時間: 10秒";
  }
  