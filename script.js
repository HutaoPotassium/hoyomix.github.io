 // 点击“开始”按钮时
 window.startExperience = function() {
 	document.getElementById("welcome").style.display = "none";
 	document.querySelector("main").style.display = "block"; // 显示主内容
 	document.getElementById("footer").style.display = "block";
 	playRandom();
 };

 const musicLists = {
 	hoyomix: [
 		"music/hym/HOYO-MiX - 不觉入梦里 Drifting Into Dream.flac",
 		"music/hym/HOYO-MiX - 浮光摇日月 Xuanlian's Wavering Light.flac",
 		"music/hym/HOYO-MiX - 轻漪的节音 Ondulations du rythme.flac"
 	],
 	genshin: [
 		"music/genshin/HOYO-MiX - Astral Chime 星芒若铃.flac",
 		"music/genshin/HOYO-MiX - 众水之诗 Ballad of Many Waters.flac",
                "music/genshin/陈致逸 _ HOYO-MiX - Genshin Impact Main Theme 原神.flac"
 	],
 	starrail: [
 		"music/starrail/HOYO-MiX - 太空漫步 Space Walk.flac",
 		"music/starrail/HOYO-MiX - 星海浮沉录 A Star Is Born.flac"
 	],
 	zzz: [
 		"music/zzz/三Z-STUDIO _ HOYO-MiX - 60%的日常.flac",
 		"music/zzz/三Z-STUDIO _ HOYO-MiX - 60%的日常·悠闲.flac"
 	]
 };


 let currentList = musicLists["hoyomix"];
 const player = document.getElementById("musicPlayer");

 // 淡出函数
 function fadeOutAudio(audio, callback) {
 	let fadeInterval = setInterval(() => {
 		if (audio.volume > 0.05) {
 			audio.volume -= 0.05;
 		} else {
 			audio.volume = 0;
 			clearInterval(fadeInterval);
 			if (callback) callback();
 		}
 	}, 50);
 }

 // 淡入函数
 function fadeInAudio(audio) {
 	audio.volume = 0;
 	let fadeInterval = setInterval(() => {
 		if (audio.volume < 0.95) {
 			audio.volume += 0.05;
 		} else {
 			audio.volume = 1;
 			clearInterval(fadeInterval);
 		}
 	}, 50);
 }

 // 播放随机歌曲并添加淡入淡出效果
 function playRandom() {
 	if (!currentList.length) return;

 	fadeOutAudio(player, () => {
 		const index = Math.floor(Math.random() * currentList.length);
 		player.src = currentList[index];
 		player.play().then(() => {
 			fadeInAudio(player);
 		});
 	});
 }

 // 播放完自动下一首
 player.addEventListener("ended", playRandom);


 const muteButton = document.getElementById("muteButton");

 muteButton.addEventListener("click", () => {
 	player.muted = !player.muted;
 	muteButton.textContent = player.muted ? "🔇 " : "🔈 ";
 });





 // 点击栏目切换时
 window.showContent = function(id) {
 	const sections = document.querySelectorAll(".game-section");
 	sections.forEach((section) => {
 		section.classList.remove("active");
 		section.style.display = "none";
 	});

 	const activeSection = document.getElementById(id);
 	if (activeSection) {
 		activeSection.classList.add("active");
 		activeSection.style.display = "block";
 	}

 	if (musicLists[id]) {
 		currentList = musicLists[id];
 		playRandom();
 	} else {
 		player.pause();
 		player.currentTime = 0;
 		currentList = [];
 	}
 };