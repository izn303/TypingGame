'use strict';
{
  const words = [
    'strawberry trapper',
    'guilty night,guilty kiss',
    'jumping heart',
    'hand in hand',
    'dreamer',
    'mirai ticket',
    'self control',
    'daydream worrior',
    'lonely tuning',
    'guilty eyes fever',
    'happy party train',
    'sky journey',
    'galaxy hide and seek',
    'innocent bird',
    'shadow gate to love',
    'landing action yeah',
    'my list to you',
    'miracle wave',
    'awaken the power',
    'crash mind',
    'drop out',
    'one more sunshine story',
    'water blue new world',
    'in this unstable world',
    'pianoforte monologue',
    'beginners sailing',
    'red gem wink',
    'white first love',
    'new winding road',
    'guilty farewell party',
    'thank you friends',
    'marine border parasol',
    'next sparkling',
    'hop stop nonstop',
    'believe again',
    'brightest melody',
    'jump up high',
    'deep resonance',
    'dance with minotaurus',
    'kokoro magic a to z',
    'wake up challenger',
    'new romantic sailors',
    'love pulsar',
    'changeless',
    'never giving up',
  ];

  let word;
  let loc;
  let score;
  let miss;
  const timeLimit = 30 * 1000;
  let startTime;
  let isPlaying = false;
  var type = new Audio('gun.mp3');
  var gameover = new Audio('correct.mp3');
  

  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');

  function updateTarget(){
    let placeholder = '';
    for (let i = 0; i< loc; i++){
      placeholder += '_';
    }
    target.textContent = placeholder + word.substring(loc);
  }

  function updateTimer(){
    const timeLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft / 1000).toFixed(2);

    const timeoutId = setTimeout(() =>{
      updateTimer();
    },10);

    if(timeLeft < 0){
      isPlaying = false;
      clearTimeout(timeoutId);
      timerLabel.textContent = '0.00';
      setTimeout(() =>{
        showResult();
      },100)
      gameover.play(); 
      gameover.volume = 1.0;
      target.textContent = 'click to replay';
    }
  }

  function showResult(){
    const accuracy = score + miss === 0 ? 0 :score/ (score + miss) * 100;
    alert(`${score} lettters.${miss}misses. ${accuracy.toFixed(2)}% accuracy!`);
    
  }

  window.addEventListener('click',() => {
    if(isPlaying === true){
      return;
    }
    isPlaying = true;

    loc = 0;
    score = 0;
    miss = 0;
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    word = words[Math.floor(Math.random() * words.length)];

    target.textContent = word;
    startTime = Date.now();
    updateTimer();
  });

  window.addEventListener('keydown', e => {
    if(isPlaying !== true){
      return;
    }

    if(e.key === word[loc]){
      type.play(); 
      type.currentTime = 0;
      type.volume = 1.0;

      console.log('score');
      loc ++;
      if(loc === word.length){
        word = words[Math.floor(Math.random() * words.length)];
        loc = 0 ;
      }
      updateTarget();
      score++;
      scoreLabel.textContent = score;
    }else{
      console.log('miss');
      miss++;
      missLabel.textContent = score;
    }
  });
}