const funnyLogs = [
    "시스템 분석 중... 가현이 미모 수치 초과 (System Overload)",
    "남자친구 데이터베이스 조회 중...",
    "남자친구의 인내심 데이터 다운로드 중... 99%",
    "애교세포 활성화 시도... 성공!",
    "초콜릿 데이터 압축 해제 중...",
    "뽀뽀 권한 승인 대기 중...",
    "최종 확인 완료: 공주님 맞음"
];

const decryptLogs = [
    "[ACCESS] 시스템 심부 접속 시도...",
    "[WARN] 남친의 뇌 구조 분석 중... (비정상적 상태)",
    "[INFO] 전략적 꼬심 기술 서버 접속 중...",
    "[CRITICAL] 억울함 수치 계산 완료: 9999점",
    "[LOAD] 가현이 한정 가드 해제 중 (0/100)",
    "[LOAD] 가현이 한정 가드 해제 중 (45/100)",
    "[LOAD] 가현이 한정 가드 해제 중 (100/100) - SUCCESS",
    "[INFO] 진심 알고리즘 복구 중...",
    "[DONE] 해독 완료! 편지를 불러옵니다."
];

const faceIdOverlay = document.getElementById('face-id-overlay');
const statusText = document.querySelector('.status-text');
const logList = document.querySelector('.log-list');
const container = document.querySelector('.container');
const faceIcon = document.querySelector('.face-icon');

let logIndex = 0;
const totalDuration = 10000;
const intervalTime = totalDuration / funnyLogs.length;
let timer;

faceIdOverlay.classList.remove('hidden');
startFaceID();

function startFaceID() {
    setTimeout(() => {
        faceIdOverlay.classList.add('scanning');
    }, 500);

    timer = setInterval(addLog, intervalTime);

    setTimeout(() => {
        clearInterval(timer);
        statusText.innerText = "사용자 확인 완료";
        statusText.style.color = "#007aff";
        statusText.style.fontWeight = "bold";

        if (faceIcon) {
            faceIcon.style.animation = 'none';
            faceIcon.style.transform = 'scale(1)';
            const paths = faceIcon.querySelectorAll('path');
            paths.forEach(p => p.setAttribute('stroke', '#007aff'));
        }

        setTimeout(() => {
            faceIdOverlay.classList.add('success');
            setTimeout(() => {
                faceIdOverlay.style.display = 'none';
                container.classList.remove('hidden');
                setInterval(createHearts, 300);
            }, 500);
        }, 1500);

    }, totalDuration);
}

function addLog() {
    if (logIndex >= funnyLogs.length) return;
    const item = document.createElement('li');
    item.innerText = `✔️ ${funnyLogs[logIndex]}`;
    logList.appendChild(item);
    const wrapper = document.querySelector('.log-list-wrapper');
    wrapper.scrollTop = wrapper.scrollHeight;
    if (logIndex % 3 === 0) statusText.innerText = "분석 진행 중...";
    logIndex++;
}

function createHearts() {
    const mobileWrapper = document.querySelector('.mobile-wrapper') || document.querySelector('.container');
    if (!mobileWrapper) return;
    const heartEl = document.createElement('div');
    heartEl.className = 'bg-heart';
    heartEl.innerHTML = '❤️';
    heartEl.style.left = Math.random() * 100 + '%';
    const duration = Math.random() * 3 + 3;
    heartEl.style.animationDuration = duration + 's';
    heartEl.style.fontSize = (Math.random() * 20 + 10) + 'px';
    mobileWrapper.appendChild(heartEl);
    setTimeout(() => { heartEl.remove(); }, duration * 1000);
}

// Strategic Decryptor Logic
async function runDecryptor() {
    const overlay = document.getElementById('decrypt-overlay');
    const logList = document.getElementById('decrypt-log-list');
    const progressBar = document.querySelector('.progress-bar');

    overlay.classList.remove('hidden');

    for (let i = 0; i < decryptLogs.length; i++) {
        const li = document.createElement('li');
        li.innerText = decryptLogs[i];
        logList.appendChild(li);

        // Update progress bar
        const progress = ((i + 1) / decryptLogs.length) * 100;
        progressBar.style.width = progress + '%';

        // Scroll logs
        const logBox = document.querySelector('.decrypt-logs');
        logBox.scrollTop = logBox.scrollHeight;

        // Random typing delay
        await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 500));
    }

    // Fade out decryptor and show letter
    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.classList.add('hidden');
            document.querySelector('.letter-container').classList.add('show');
        }, 500);
    }, 1000);
}

// Open Letter logic
document.addEventListener('DOMContentLoaded', () => {
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    if (envelopeWrapper) {
        envelopeWrapper.addEventListener('click', () => {
            if (!envelopeWrapper.classList.contains('open')) {
                envelopeWrapper.classList.add('open');

                // Wait for envelope open animation, then run decryptor
                setTimeout(() => {
                    runDecryptor();
                }, 800);
            }
        });
    }
});
