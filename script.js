// Quiz logic
let currentQuestion = 0;
let answers = {};
const totalQuestions = 10;

// Capture UTM parameters from the query string
const utmParams = (() => {
    const params = new URLSearchParams(window.location.search);
    const utms = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(key => {
        if (params.has(key)) {
            utms[key] = params.get(key);
        }
    });
    return utms;
})();

// Store tracking information
const trackingData = [];

function trackAnswer(questionIndex, answerValue) {
    trackingData.push({
        question: questionIndex,
        answer: answerValue,
        utms: utmParams
    });
    console.log('Tracked answer:', trackingData[trackingData.length - 1]);
}

const packages = {
    'A': {
        name: 'Package A: Lean Solo Operator',
        description: 'Perfect for solo stylists who prioritize simplicity and affordability',
        features: [
            '📅 Calendly for simple booking',
            '📧 Mailchimp for light email marketing',
            '🔗 Linktree for social media presence',
            '📱 Mobile-friendly setup',
            '💰 Cost-effective solution'
        ],
        color: 'from-green-400 to-teal-500'
    },
    'B': {
        name: 'Package B: Self-Sufficient Team with Wix',
        description: 'All-in-one solution for small teams wanting branded presence',
        features: [
            '🌐 Wix website with booking system',
            '🛒 Wix Store for product sales',
            '📊 Built-in CRM and analytics',
            '✨ Professional branded presence',
            '👥 Team scheduling capabilities'
        ],
        color: 'from-blue-400 to-indigo-500'
    },
    'C': {
        name: 'Package C: Team-Led using Zanoti',
        description: 'Custom solution for medium-large teams with specific needs',
        features: [
            '🔧 Custom booking logic',
            '👥 Advanced team management',
            '📈 Scalable architecture',
            '🔄 Integration capabilities',
            '⚙️ Tailored to your workflow'
        ],
        color: 'from-purple-400 to-violet-500'
    },
    'D': {
        name: 'Package D: Retail-First Hybrid with Shopify',
        description: 'Scalable ecommerce solution with advanced marketing',
        features: [
            '🛍️ Shopify for scalable inventory',
            '📧 Klaviyo email automation',
            '🎁 Smile.io loyalty program',
            '📦 Bundled checkout options',
            '📈 Deep ecommerce expansion'
        ],
        color: 'from-emerald-400 to-green-500'
    },
    'E': {
        name: 'Package E: Service-Led Growth with Vagaro',
        description: 'Perfect for appointment-heavy businesses with service packages',
        features: [
            '📅 Advanced appointment scheduling',
            '💳 Built-in POS system',
            '📚 Class and package management',
            '🔄 Calendar sync capabilities',
            '📊 Service-focused analytics'
        ],
        color: 'from-orange-400 to-red-500'
    },
    'F': {
        name: 'Package F: Delegated & Scalable (Fresha Core)',
        description: 'Fully managed solution for hands-off business owners',
        features: [
            '🏪 Marketplace presence (Treatwell/Fresha)',
            '🤝 Fully managed platform',
            '📱 Native booking and POS',
            '👥 Built-in CRM system',
            '🔧 No technical management required'
        ],
        color: 'from-pink-400 to-rose-500'
    }
};

function selectOption(value) {
    answers[currentQuestion] = value;
    trackAnswer(currentQuestion, value);

    // Visual feedback
    document.querySelectorAll('.question-card.active .option-button').forEach(btn => {
        btn.classList.remove('ring-4', 'ring-purple-300');
    });
    event.target.closest('.option-button').classList.add('ring-4', 'ring-purple-300');

    setTimeout(() => {
        nextQuestion();
    }, 500);
}

function nextQuestion() {
    if (currentQuestion < totalQuestions - 1) {
        const current = document.querySelector(`[data-question="${currentQuestion}"]`);
        current.classList.remove('active');
        current.classList.add('prev');

        currentQuestion++;
        updateProgress();

        setTimeout(() => {
            const next = document.querySelector(`[data-question="${currentQuestion}"]`);
            next.classList.add('active');
        }, 100);
    } else {
        showResults();
    }
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `${currentQuestion + 1}/${totalQuestions}`;
}

function calculateResult() {
    let scores = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };

    if (answers[0] === 'solo' || answers[0] === 'mobile') scores.A += 3;
    if (answers[0] === 'small') scores.B += 3;
    if (answers[0] === 'large') { scores.C += 2; scores.D += 2; }

    if (answers[1] === 'dms' || answers[1] === 'gcal') scores.A += 2;
    if (answers[1] === 'platform') { scores.B += 2; scores.E += 2; scores.F += 3; }
    if (answers[1] === 'none') scores.A += 1;

    if (answers[2] === 'simple') scores.A += 3;
    if (answers[2] === 'team') { scores.B += 3; scores.C += 2; }
    if (answers[2] === 'pos') { scores.E += 3; scores.F += 2; }

    if (answers[3] === 'dms') scores.A += 2;
    if (answers[3] === 'email') { scores.B += 2; scores.D += 1; }
    if (answers[3] === 'automation') { scores.D += 3; scores.F += 2; }

    if (answers[4] === 'none') { scores.A += 3; scores.E += 3; }
    if (answers[4] === 'salon') { scores.B += 2; scores.E += 1; }
    if (answers[4] === 'webshop') { scores.D += 3; scores.B += 1; }
    if (answers[4] === 'dropship') scores.D += 2;

    if (answers[5] === 'yes') { scores.E += 2; scores.B += 1; }
    if (answers[5] === 'no') { scores.A += 1; scores.F += 1; }

    if (answers[6] === 'social') scores.A += 2;
    if (answers[6] === 'retention') { scores.B += 2; scores.E += 1; }
    if (answers[6] === 'growth') { scores.D += 2; scores.F += 1; }
    if (answers[6] === 'automation') { scores.D += 3; scores.F += 2; }

    if (answers[7] === 'lightweight') { scores.A += 3; scores.F += 1; }
    if (answers[7] === 'branded') { scores.B += 3; scores.D += 2; }

    if (answers[8] === 'handsoff') scores.F += 3;
    if (answers[8] === 'control') { scores.A += 2; scores.B += 2; scores.D += 1; }

    if (answers[9] === 'essential') scores.F += 3;
    if (answers[9] === 'optional') { scores.E += 1; scores.B += 1; }
    if (answers[9] === 'notneeded') { scores.A += 2; scores.D += 1; }

    let maxScore = 0;
    let result = 'A';
    for (let pkg in scores) {
        if (scores[pkg] > maxScore) {
            maxScore = scores[pkg];
            result = pkg;
        }
    }

    return result;
}

function showResults() {
    const result = calculateResult();
    trackAnswer('result', result);
    const pkg = packages[result];

    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('results').classList.remove('hidden');

    document.getElementById('package-result').textContent = pkg.name;

    const detailsHTML = `
        <div class="bg-gradient-to-r ${pkg.color} text-white p-6 rounded-xl mb-6">
            <h3 class="text-xl font-semibold mb-2">Why this package?</h3>
            <p class="text-lg">${pkg.description}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${pkg.features.map(feature => `
                <div class="flex items-center p-4 bg-gray-50 rounded-lg">
                    <span class="text-lg">${feature}</span>
                </div>
            `).join('')}
        </div>
    `;

    document.getElementById('package-details').innerHTML = detailsHTML;
}

function restartQuiz() {
    currentQuestion = 0;
    answers = {};

    document.getElementById('results').classList.add('hidden');
    document.getElementById('quiz-container').style.display = 'block';

    document.querySelectorAll('.question-card').forEach((card, index) => {
        card.classList.remove('active', 'prev');
        if (index === 0) card.classList.add('active');
    });

    updateProgress();

    document.querySelectorAll('.option-button').forEach(btn => {
        btn.classList.remove('ring-4', 'ring-purple-300');
    });
}

document.addEventListener('click', function(e) {
    if (e.target.closest('.option-button')) {
        const value = e.target.closest('.option-button').dataset.value;
        selectOption(value);
    }
});

updateProgress();
