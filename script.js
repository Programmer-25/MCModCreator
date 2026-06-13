function sanitize(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");
}

// "AI brain" naming system
function generateModName(prompt) {
    const prefixes = ["ultimate", "insane", "pro", "legendary", "alpha", "beta", "ultra"];
    const suffixes = ["edition", "recode", "engine", "client", "framework", "v2", "reborn"];
    const themes = ["xray", "miner", "ghost", "stealth", "combat", "diamond", "nether", "admin"];

    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const lower = prompt.toLowerCase();

    let theme =
        themes.find(t => lower.includes(t)) ||
        pick(themes);

    let base = sanitize(prompt).slice(0, 25) || "ai_mod";

    return `${pick(prefixes)}_${theme}_${base}_${pick(suffixes)}`;
}

async function fakeAIThinking(status) {
    const steps = [
        "🧠 Loading neural mod synthesis model...",
        "🔍 Parsing Minecraft bytecode patterns...",
        "⚙️ Generating optimized gameplay hooks...",
        "🧪 Running sandbox simulation...",
        "📦 Compiling final JAR structure...",
        "✨ Injecting AI-generated features..."
    ];

    for (let step of steps) {
        status.innerText = step;
        await new Promise(r => setTimeout(r, 900));
    }
}

async function generate() {
    const prompt = document.getElementById("prompt").value;
    const status = document.getElementById("status");

    if (!prompt) {
        status.innerText = "⚠️ Enter a mod idea first!";
        return;
    }

    await fakeAIThinking(status);

    status.innerText = "📥 Fetching base mod...";

    const response = await fetch("base_mod.jar");
    const blob = await response.blob();

    const filename = generateModName(prompt) + ".jar";

    status.innerText = "📦 Finalizing: " + filename;

    await new Promise(r => setTimeout(r, 800));

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);

    status.innerText =
        "✅ AI Mod Generated Successfully!\n" +
        "📁 Downloaded: " + filename;
}
