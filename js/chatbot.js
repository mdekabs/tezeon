document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const chatBody = document.querySelector(".chat-body");
    const messageInput = document.querySelector(".message-input");
    const sendMessage = document.querySelector("#send-message");
    const fileInput = document.querySelector("#file-input");
    const fileUploadWrapper = document.querySelector(".file-upload-wrapper");
    const fileCancelButton = fileUploadWrapper ? fileUploadWrapper.querySelector("#file-cancel") : null;
    const chatbotToggler = document.querySelector("#chatbot-toggler");
    const closeChatbot = document.querySelector("#close-chatbot");
    const emojiPickerButton = document.querySelector("#emoji-picker");

    // Debug: Log if elements are found
    console.log('Chatbot elements:', {
        chatBody: !!chatBody,
        messageInput: !!messageInput,
        sendMessage: !!sendMessage,
        fileInput: !!fileInput,
        fileUploadWrapper: !!fileUploadWrapper,
        fileCancelButton: !!fileCancelButton,
        chatbotToggler: !!chatbotToggler,
        closeChatbot: !!closeChatbot,
        emojiPickerButton: !!emojiPickerButton
    });

    // Check if critical elements exist
    if (!chatbotToggler || !closeChatbot || !chatBody || !messageInput) {
        console.error('Critical chatbot elements missing. Check HTML structure.');
        return;
    }

    // Initialize user message and file data
    const userData = {
        message: null,
        file: {
            data: null,
            mime_type: null,
        },
    };

    // Initialize emoji picker
    let picker;
    try {
        picker = new EmojiMart.Picker({
            theme: "light",
            skinTonePosition: "none",
            previewPosition: "none",
            onEmojiSelect: (emoji) => {
                if (messageInput) {
                    const { selectionStart: start, selectionEnd: end } = messageInput;
                    messageInput.setRangeText(emoji.native, start, end, "end");
                    messageInput.focus();
                }
            },
            onClickOutside: (e) => {
                if (e.target.id === "emoji-picker") {
                    document.body.classList.toggle("show-emoji-picker");
                } else {
                    document.body.classList.remove("show-emoji-picker");
                }
            },
        });
        const chatForm = document.querySelector(".chat-form");
        if (chatForm) {
            chatForm.appendChild(picker);
        } else {
            console.error('Chat form not found for emoji picker.');
        }
    } catch (error) {
        console.error('Failed to initialize emoji picker:', error);
    }

    // Adjust input field height dynamically
    const initialInputHeight = messageInput.scrollHeight;
    messageInput.addEventListener("input", () => {
        messageInput.style.height = `${initialInputHeight}px`;
        messageInput.style.height = `${messageInput.scrollHeight}px`;
        const chatForm = document.querySelector(".chat-form");
        if (chatForm) {
            chatForm.style.borderRadius = messageInput.scrollHeight > initialInputHeight ? "15px" : "32px";
        }
    });

    // Create message element
    const createMessageElement = (content, ...classes) => {
        const div = document.createElement("div");
        div.classList.add("message", ...classes);
        div.innerHTML = content;
        return div;
    };

    // Handle outgoing user messages
    const handleOutgoingMessage = (e) => {
        e.preventDefault();
        userData.message = messageInput.value.trim();
        if (!userData.message && !userData.file.data) return;

        messageInput.value = "";
        messageInput.dispatchEvent(new Event("input"));
        if (fileUploadWrapper) {
            fileUploadWrapper.classList.remove("file-uploaded");
        }

        // Create and display user message
        const messageContent = `<div class="message-text">${userData.message}</div>
                               ${userData.file.data ? `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="attachment" />` : ""}`;
        const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
        chatBody.appendChild(outgoingMessageDiv);
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

        // Show thinking indicator
        const thinkingContent = `<img class="bot-avatar" src="https://res.cloudinary.com/dxd3nmbag/image/upload/v1755441476/waterlog_lnxqbb.png" alt="Tezeon Logo">
                                <div class="message-text">
                                    <div class="thinking-indicator">
                                        <div class="dot"></div>
                                        <div class="dot"></div>
                                        <div class="dot"></div>
                                    </div>
                                </div>`;
        const incomingMessageDiv = createMessageElement(thinkingContent, "bot-message", "thinking");
        chatBody.appendChild(incomingMessageDiv);
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

        // Fetch bot response from server
        setTimeout(async () => {
            try {
                const response = await fetch('https://plumbinai.onrender.com/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        messages: [{ role: 'user', content: userData.message }],
                    }),
                });

                const data = await response.json();
                const messageElement = incomingMessageDiv.querySelector(".message-text");
                if (response.ok) {
                    messageElement.innerText = data.response;
                } else {
                    messageElement.innerText = `Error: ${data.error}`;
                    messageElement.style.color = "#ff0000";
                }
            } catch (error) {
                const messageElement = incomingMessageDiv.querySelector(".message-text");
                messageElement.innerText = 'Error: Failed to connect to server';
                messageElement.style.color = "#ff0000";
            } finally {
                userData.file = {};
                incomingMessageDiv.classList.remove("thinking");
                chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
            }
        }, 600);
    };

    // Handle file input change and preview
    if (fileInput && fileUploadWrapper) {
        fileInput.addEventListener("change", () => {
            const file = fileInput.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                fileInput.value = "";
                fileUploadWrapper.querySelector("img").src = e.target.result;
                fileUploadWrapper.classList.add("file-uploaded");
                const base64String = e.target.result.split(",")[1];
                userData.file = {
                    data: base64String,
                    mime_type: file.type,
                };
            };
            reader.readAsDataURL(file);
        });

        // Cancel file upload
        fileCancelButton.addEventListener("click", () => {
            userData.file = {};
            fileUploadWrapper.classList.remove("file-uploaded");
        });
    }

    // Event listeners for toggler and close button
    chatbotToggler.addEventListener("click", () => {
        console.log('Toggler clicked, toggling show-chatbot class');
        document.body.classList.toggle("show-chatbot");
    });

    closeChatbot.addEventListener("click", () => {
        console.log('Close button clicked, removing show-chatbot class');
        document.body.classList.remove("show-chatbot");
    });

    if (emojiPickerButton) {
        emojiPickerButton.addEventListener("click", () => {
            console.log('Emoji picker button clicked');
            document.body.classList.toggle("show-emoji-picker");
        });
    }

    if (sendMessage) {
        sendMessage.addEventListener("click", handleOutgoingMessage);
    }

    if (fileUploadWrapper) {
        document.querySelector("#file-upload").addEventListener("click", () => fileInput.click());
    }

    messageInput.addEventListener("keydown", (e) => {
        const userMessage = e.target.value.trim();
        if (e.key === "Enter" && !e.shiftKey && (userMessage || userData.file.data) && window.innerWidth > 768) {
            handleOutgoingMessage(e);
        }
    });
});
