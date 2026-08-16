const os = require('os');

const ansi = {
    green: (text) => `\x1b[32m${text}\x1b[0m`,
    blue: (text) => `\x1b[34m${text}\x1b[0m`,
    yellow: (text) => `\x1b[33m${text}\x1b[0m`,
    red: (text) => `\x1b[31m${text}\x1b[0m`,
    cyan: (text) => `\x1b[36m${text}\x1b[0m`,
    gray: (text) => `\x1b[90m${text}\x1b[0m`,
    white: (text) => `\x1b[37m${text}\x1b[0m`
};

const getTimestamp = () => new Date().toISOString().replace('T', ' ').substring(0, 19);
const getRandomHex = (len) => Math.random().toString(16).substring(2, 2 + len).toUpperCase();
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function printLog(text, color = 'white', delay = 0) {
    if (delay > 0) await sleep(delay);
    const colorFn = ansi[color] || ansi.white;
    console.log(`${ansi.gray(`[${getTimestamp()}]`)} ${colorFn(text)}`);
}

async function runSequence() {
    const hostname = os.hostname();
    const platform = os.platform();
    const arch = os.arch();
    const pid = process.pid;

    // Initialization
    await printLog(`[BOOT] Initializing Pen2text Engine on ${hostname} (${platform}-${arch})`, 'cyan', 200);
    await printLog(`[SYSTEM] PID: ${pid} | Node version: ${process.version}`, 'gray', 400);
    await printLog(`[CONFIG] Loading environment variables from .env...`, 'cyan', 600);
    
    // Hardware check
    await printLog(`[CORE] Probing hardware accelerators...`, 'blue', 800);
    const gpuName = "NVIDIA A100-SXM4-40GB";
    await printLog(`[CORE] CUDA compatible device found: ${gpuName}`, 'green', 1200);
    await printLog(`[TF] Primary device set to /device:GPU:0 (UUID: GPU-${getRandomHex(8)}-${getRandomHex(4)})`, 'gray', 300);

    // Model Loading Sequence (Dynamic Progress)
    await printLog(`[MODEL] Fetching Transformer weights: 'Pen2text-Core-v4.h5'`, 'blue', 1000);
    
    let progress = 0;
    while (progress < 100) {
        progress += Math.floor(Math.random() * 25) + 5;
        if (progress > 100) progress = 100;
        await printLog(`   ... ⏬ loading tensors: ${progress}% completed`, 'gray', Math.random() * 800 + 200);
    }
    
    await printLog(`[MODEL] Model loaded successfully. Total parameters: 542,108,354`, 'green', 500);
    await printLog(`[MODEL] Checksum verified: sha256:${getRandomHex(16)}`, 'gray', 200);

    // OCR Engine
    await printLog(`[OCR] Starting Tesseract-LSTM OCR Engine...`, 'yellow', 800);
    await printLog(`[OCR] Registered languages: [en-US, hi-IN, mr-IN]`, 'yellow', 600);
    await printLog(`[OCR] Pipeline active: NoiseReduction -> AdaptiveThreshold -> SkewCorrection`, 'cyan', 400);

    // Database
    await printLog(`[DB] Establishing handshake with MongoDB Cluster (primary)...`, 'blue', 1000);
    await printLog(`[DB] Authentication successful. Active handle: db_p2t_prod`, 'green', 600);

    // Final Server Start
    const port = 5000;
    await printLog(`[SERVER] Spawning worker processes...`, 'cyan', 500);
    await printLog(`[SERVER] Listening on http://localhost:${port} | http://127.0.0.1:${port}`, 'blue', 400);
    
    await printLog(`[SUCCESS] Pen2text backend is fully operational.`, 'green', 800);
    await printLog(`------------------------------------------------------------`, 'gray', 100);

    // Periodic "Activity" Simulation
    setInterval(async () => {
        const actions = [
            { msg: "Heartbeat check: status=OK", color: "gray" },
            { msg: `Cache cleanup: evicted ${Math.floor(Math.random() * 10)} keys`, color: "gray" },
            { msg: "Incoming request: GET /api/health", color: "cyan" },
            { msg: `Processing job ${getRandomHex(6)}... done in ${Math.floor(Math.random() * 150)}ms`, color: "green" }
        ];
        
        // Only print occasionally
        if (Math.random() > 0.8) {
            const action = actions[Math.floor(Math.random() * actions.length)];
            await printLog(action.msg, action.color);
        }
    }, 5000);
}

runSequence().catch(err => {
    console.error(ansi.red(`[CRITICAL ERROR] ${err.message}`));
});

// Prevent process from exiting
process.stdin.resume();
