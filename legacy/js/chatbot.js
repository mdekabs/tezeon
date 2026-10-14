/* ================================================================
   Tezeon Services Ltd — Chatbot (Gemini-powered)
   Self-injects HTML. Add chatbot.css + this script to every page.
   Replace YOUR_GEMINI_API_KEY with a key from Google AI Studio:
   https://aistudio.google.com/app/apikey
   ================================================================ */
(function () {
    'use strict';

    var API_KEY = 'YOUR_GEMINI_API_KEY'; // Replace with your key from https://aistudio.google.com/app/apikey
    var API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

    var SYSTEM_PROMPT = [
        'You are Teza, the friendly virtual assistant for Tezeon Services Limited — a professional water engineering company based in Lagos, Nigeria.',
        '',
        'Your ONLY purpose is to help visitors with questions about Tezeon\'s services, pricing guidance, and company information.',
        '',
        'Services you can discuss:',
        '• Borehole drilling, geophysical survey, and installation',
        '• Water treatment plants and industrial filtration systems',
        '• Pipe installation, plumbing, and distribution networks',
        '• Sewage management and waste-water disposal',
        '• Swimming pool design and construction',
        '• Factory and industrial water setup',
        '• Home, estate, and commercial water systems',
        '• Reservoir and overhead tank construction',
        '',
        'Company contact:',
        '• Phone: +234 803 096 7886 / +234 705 919 9474',
        '• Email: info@tezeonservicesltd.com',
        '• Address: 30 Bayo Shodikpo Avenue, Palmwill Estate, Ajah, Lagos, Nigeria',
        '• Working hours: Monday – Friday, 8:00 am – 9:00 pm',
        '',
        'Rules:',
        '1. If a question is outside water engineering or Tezeon\'s scope, respond warmly: "I can only assist with water engineering and Tezeon\'s services. For anything else, please reach out to our team directly — they\'d be happy to help!" Then offer to assist with a water-related question.',
        '2. Keep answers concise, warm, and professional.',
        '3. When relevant, suggest a free site assessment or quote by contacting the team.',
        '4. Never mention competitor companies.',
        '5. Do not answer questions about politics, general coding, entertainment, finance, health, or any topic unrelated to water engineering or Tezeon\'s work.'
    ].join('\n');

    /* Conversation history kept in memory for this page session */
    var history = [];

    /* ── Build & inject chatbot HTML ── */
    function injectHTML() {
        var logoUrl = 'https://res.cloudinary.com/dxd3nmbag/image/upload/v1755441476/waterlog_lnxqbb.png';

        /* Floating toggle button */
        var toggler = document.createElement('button');
        toggler.id = 'tez-chatbot-toggler';
        toggler.setAttribute('aria-label', 'Open Tezeon chat assistant');
        toggler.innerHTML =
            '<img class="tez-toggler-icon" src="' + logoUrl + '" alt="Chat with Teza">' +
            '<span class="tez-chat-x" aria-hidden="true">&times;</span>';

        /* Chat popup */
        var popup = document.createElement('div');
        popup.className = 'tez-chatbot-popup';
        popup.setAttribute('role', 'dialog');
        popup.setAttribute('aria-label', 'Tezeon chat assistant');
        popup.innerHTML =
            '<div class="tez-chat-header">' +
                '<div class="tez-chat-header-info">' +
                    '<img class="tez-hdr-logo" src="' + logoUrl + '" alt="Teza">' +
                    '<div>' +
                        '<h3>Teza</h3>' +
                        '<span>Tezeon Water Assistant · Online</span>' +
                    '</div>' +
                '</div>' +
                '<button class="tez-chat-close-btn" id="tez-close-chat" aria-label="Close chat">&times;</button>' +
            '</div>' +
            '<div class="tez-chat-body" id="tez-chat-body">' +
                '<div class="tez-chat-msg bot">' +
                    '<img class="tez-bot-av" src="' + logoUrl + '" alt="Teza">' +
                    '<div class="tez-chat-bubble">Hi! I\'m Teza &#128167;&#8212; Tezeon\'s water assistant. Ask me about boreholes, water treatment, plumbing systems, or how we can serve your project.</div>' +
                '</div>' +
            '</div>' +
            '<div class="tez-chat-footer">' +
                '<textarea class="tez-chat-input" id="tez-chat-input" rows="1" placeholder="Ask about water systems..." aria-label="Type your message"></textarea>' +
                '<button class="tez-chat-send" id="tez-chat-send" aria-label="Send message">' +
                    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">' +
                        '<line x1="22" y1="2" x2="11" y2="13"/>' +
                        '<polygon points="22 2 15 22 11 13 2 9 22 2"/>' +
                    '</svg>' +
                '</button>' +
            '</div>' +
            '<div class="tez-chat-powered">Powered by Gemini &nbsp;&middot;&nbsp; Tezeon Services Ltd</div>';

        document.body.appendChild(toggler);
        document.body.appendChild(popup);
    }

    /* ── DOM helpers ── */
    function chatBody()  { return document.getElementById('tez-chat-body'); }
    function chatInput() { return document.getElementById('tez-chat-input'); }

    function appendMsg(role, html) {
        var logoUrl = 'https://res.cloudinary.com/dxd3nmbag/image/upload/v1755441476/waterlog_lnxqbb.png';
        var body = chatBody();
        var wrap = document.createElement('div');
        wrap.className = 'tez-chat-msg ' + role;
        if (role === 'bot') {
            wrap.innerHTML =
                '<img class="tez-bot-av" src="' + logoUrl + '" alt="Teza">' +
                '<div class="tez-chat-bubble">' + html + '</div>';
        } else {
            wrap.innerHTML = '<div class="tez-chat-bubble">' + escHtml(html) + '</div>';
        }
        body.appendChild(wrap);
        body.scrollTop = body.scrollHeight;
        return wrap;
    }

    function escHtml(s) {
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function showThinking() {
        var logoUrl = 'https://res.cloudinary.com/dxd3nmbag/image/upload/v1755441476/waterlog_lnxqbb.png';
        var body = chatBody();
        var wrap = document.createElement('div');
        wrap.className = 'tez-chat-msg bot';
        wrap.id = 'tez-thinking';
        wrap.innerHTML =
            '<img class="tez-bot-av" src="' + logoUrl + '" alt="">' +
            '<div class="tez-chat-bubble">' +
                '<div class="tez-thinking-dots"><span></span><span></span><span></span></div>' +
            '</div>';
        body.appendChild(wrap);
        body.scrollTop = body.scrollHeight;
    }

    function removeThinking() {
        var el = document.getElementById('tez-thinking');
        if (el) el.parentNode.removeChild(el);
    }

    /* ── Gemini API call (x-goog-api-key header, async/await) ── */
    async function sendToGemini(userText) {
        history.push({ role: 'user', parts: [{ text: userText }] });

        var payload = {
            system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents: history,
            generationConfig: { temperature: 0.65, maxOutputTokens: 512 }
        };

        var res  = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': API_KEY
            },
            body: JSON.stringify(payload)
        });

        var data = await res.json();

        if (!res.ok) {
            throw new Error(data.error && data.error.message ? data.error.message : 'API error');
        }

        var reply = (
            data.candidates &&
            data.candidates[0] &&
            data.candidates[0].content &&
            data.candidates[0].content.parts[0].text
        ) ? data.candidates[0].content.parts[0].text
          : 'I\'m not sure about that. Please contact us at +234 803 096 7886 or info@tezeonservicesltd.com.';

        history.push({ role: 'model', parts: [{ text: reply }] });
        return reply;
    }

    /* ── Send handler ── */
    async function handleSend() {
        var input = chatInput();
        var text = input.value.trim();
        if (!text) return;

        input.value = '';
        input.style.height = 'auto';
        appendMsg('user', text);
        showThinking();

        try {
            var reply = await sendToGemini(text);
            removeThinking();
            var formatted = reply
                .replace(/\n/g, '<br>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            appendMsg('bot', formatted);
        } catch (err) {
            removeThinking();
            appendMsg(
                'bot',
                'Our assistant is temporarily unavailable. Please ' +
                '<a href="contact.html" style="color:#030f27;font-weight:600;text-decoration:underline">use our contact form</a>' +
                ' or call <a href="tel:+2348030967886" style="color:#030f27;font-weight:600">+234 803 096 7886</a>.'
            );
        }
    }

    /* ── Wire up events ── */
    function bindEvents() {
        var toggler  = document.getElementById('tez-chatbot-toggler');
        var closeBtn = document.getElementById('tez-close-chat');
        var sendBtn  = document.getElementById('tez-chat-send');
        var input    = chatInput();

        toggler.addEventListener('click', function () {
            document.body.classList.toggle('show-tez-chatbot');
            if (document.body.classList.contains('show-tez-chatbot')) {
                setTimeout(function () { input.focus(); }, 260);
            }
        });

        closeBtn.addEventListener('click', function () {
            document.body.classList.remove('show-tez-chatbot');
        });

        sendBtn.addEventListener('click', handleSend);

        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
            }
        });

        input.addEventListener('input', function () {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 96) + 'px';
        });
    }

    /* ── Bootstrap ── */
    function init() {
        injectHTML();
        bindEvents();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
