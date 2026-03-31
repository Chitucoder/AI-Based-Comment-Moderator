const inputArea = document.getElementById('text-input');
const predictionContainer = document.getElementById('prediction-container');
let typingTimer;

inputArea.oninput = function () {
    clearTimeout(typingTimer);

    typingTimer = setTimeout(async () => {
        const text = inputArea.value;
        if (text.length < 3) {
            predictionContainer.style.display = 'none';
            return;
        }

        const response = await fetch('https://comment-moderation-api-yx0y.onrender.com/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: text })
        });

        const data = await response.json();

        let html = '<h4>AI Analysis:</h4>';
        html += '<div><strong>Probabilities:</strong></div>';
        const probs = data.probabilities;
        const categories = [
            { key: 'toxic', label: 'Toxic', class: 'toxic-fill' },
            { key: 'severe_toxic', label: 'Severe Toxic', class: 'severe-toxic-fill' },
            { key: 'obscene', label: 'Obscene', class: 'obscene-fill' },
            { key: 'threat', label: 'Threat', class: 'threat-fill' },
            { key: 'insult', label: 'Insult', class: 'insult-fill' },
            { key: 'identity_hate', label: 'Identity Hate', class: 'identity-hate-fill' }
        ];

        categories.forEach(cat => {
            const prob = probs[cat.key] || 0;
            const width = (prob * 100).toFixed(1);
            html += `
                <div class="prob-item" style="grid-template-columns: 112px minmax(0,1fr) 60px; gap: 8px; margin-bottom: 6px;">
                    <span style="font-weight: 600;">${cat.label}</span>
                    <div class="probability-bar" style="height: 10px;">
                        <div class="probability-fill ${cat.class}" style="width: ${width}%;"></div>
                    </div>
                    <span>${width}%</span>
                </div>`;
        });

        const mod = data.moderation;
        html += '<div style="margin-top: 10px;"><strong>Moderation:</strong></div>';
        html += `<div>Flagged: ${mod.is_flagged ? 'Yes' : 'No'}</div>`;
        html += `<div>Violation list: ${mod.violations && mod.violations.length ? mod.violations.join(', ') : 'None'}</div>`;
        html += `<div>Recommendation: ${mod.recommendation}</div>`;

        if (mod.is_flagged) {
            predictionContainer.style.backgroundColor = '#fff5f5';
            predictionContainer.style.color = '#c53030';
            html = '⚠️ <b>Warning:</b> Potentially harmful content detected.<br>' + html;
        } else {
            predictionContainer.style.backgroundColor = '#f0fff4';
            predictionContainer.style.color = '#276749';
            html = '✅ <b>Safe:</b> Content appears appropriate.<br>' + html;
        }

        predictionContainer.innerHTML = html;
        predictionContainer.style.display = 'block';
    }, 500);
};

async function handlePost() {
    const user = document.getElementById('username-input').value;
    const text = document.getElementById('text-input').value;
    if (!user || !text) {
        alert('Please enter both a username and a message.');
        return;
    }

    const predictResponse = await fetch('https://comment-moderation-api-yx0y.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text })
    });
    const predictData = await predictResponse.json();

    if (predictData.moderation.is_flagged) {
        let modalHtml = '⚠️ <b>AI Warning:</b> This post is flagged as potentially harmful.<br><br>';
        modalHtml += '<strong>Probabilities:</strong><br>';
        const probs = predictData.probabilities;
        const categories = ['toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate'];

        categories.forEach(cat => {
            const prob = probs[cat] || 0;
            modalHtml += `${cat.replace('_', ' ')}: ${(prob * 100).toFixed(1)}%<br>`;
        });

        modalHtml += '<br><strong>Violations:</strong> ' + (predictData.moderation.violations.length > 0 ? predictData.moderation.violations.join(', ') : 'None') + '<br>';
        modalHtml += '<strong>Recommendation:</strong> ' + predictData.moderation.recommendation + '<br><br>';
        modalHtml += 'Are you sure you want to post?';

        document.getElementById('modal-message').innerHTML = modalHtml;
        document.getElementById('confirmation-modal').style.display = 'flex';
    } else {
        await submitPost(user, text);
    }
}

async function submitPost(user, text) {
    const url = `https://comment-moderation-api-yx0y.onrender.com/submit?username=${encodeURIComponent(user)}&content=${encodeURIComponent(text)}`;
    const response = await fetch(url, { method: 'POST' });

    if (response.ok) {
        document.getElementById('text-input').value = '';
        predictionContainer.style.display = 'none';
        showTab('feed');
        alert('Post shared successfully!');
    } else {
        alert('Error saving post. Check your terminal!');
    }
}

document.getElementById('confirm-yes').onclick = async () => {
    const user = document.getElementById('username-input').value;
    const text = document.getElementById('text-input').value;
    await submitPost(user, text);
    document.getElementById('confirmation-modal').style.display = 'none';
};

document.getElementById('confirm-no').onclick = () => {
    document.getElementById('confirmation-modal').style.display = 'none';
};

async function loadFeed(containerId, filterUser = null) {
    const response = await fetch('https://comment-moderation-api-yx0y.onrender.com/comments');
    let comments = await response.json();

    if (filterUser) {
        comments = comments.filter(c => c.username === filterUser);
    }

    const container = document.getElementById(containerId);
    container.innerHTML = '';

    comments.forEach(c => {
        const card = document.createElement('div');
        card.className = 'post-card';
        const isToxic = c.is_flagged;

        const toggleAttr = isToxic ? 'onclick="this.classList.toggle(\'toxic-blur\')" title="Click to toggle blur on/off"' : '';
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span style="font-weight:bold; color: #1877f2;">@${c.username}</span>
                <span style="color: #999; font-size: 11px;">${new Date(c.created_at).toLocaleTimeString()}</span>
            </div>
            <p class="${isToxic ? 'toxic-blur' : ''}" ${toggleAttr}>
                ${c.content}
            </p>
            ${isToxic ? '<span style="color:red; font-size:10px; font-weight:bold;">⚠️ FLAGGED BY AI</span>' : ''}
        `;

        container.appendChild(card);
    });
}

function setActiveTab(tabName) {
    ['create', 'feed', 'history'].forEach(name => {
        const button = document.getElementById(`${name}-btn`);
        if (!button) return;
        if (name === tabName) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

function showTab(tabName) {
    document.getElementById('tab-create').style.display = 'none';
    document.getElementById('tab-feed').style.display = 'none';
    document.getElementById('tab-history').style.display = 'none';

    if (tabName === 'history') {
        const currentUser = document.getElementById('username-input').value.trim();
        if (!currentUser) {
            alert('Please enter your username in the Create tab before viewing History.');
            document.getElementById('tab-create').style.display = 'block';
            setActiveTab('create');
            return;
        }
        document.getElementById('tab-history').style.display = 'block';
        setActiveTab('history');
        loadFeed('history-list', currentUser);
        return;
    }

    document.getElementById('tab-' + tabName).style.display = 'block';
    setActiveTab(tabName);

    if (tabName === 'feed') {
        loadFeed('feed-list');
    }
}
