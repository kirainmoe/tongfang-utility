import str from "../resource/string";

const makeAlert = (
    message,
    showCancel = false,
    approveText = undefined,
    cancelText = undefined
) => {
    const messageCover = document.createElement("div");
    messageCover.classList.add("global-alert-cover");

    const messageDiv = document.createElement("div");
    messageDiv.classList.add("global-alert");
    messageCover.appendChild(messageDiv);

    const messageContent = document.createElement("div");
    messageContent.classList.add("global-alert-content");
    messageContent.innerHTML = message;
    messageDiv.appendChild(messageContent);

    const messageAction = document.createElement("div"),
        approveButton = document.createElement("button"),
        cancelButton = document.createElement("button");
    messageAction.classList.add("global-alert-action");
    approveButton.innerText = approveText ? approveText : str("approve");
    cancelButton.innerText = cancelText ? cancelText : str("cancel");
    approveButton.classList.add("approve");
    cancelButton.classList.add("cancel");

    const closeDialog = () => document.body.removeChild(messageCover);
    messageAction.appendChild(approveButton);

    const keylistener = (e) => {
        if (e.shiftKey) {
            messageContent.setAttribute("role", "alert");
            messageContent.setAttribute("aria-atomic", "true");            
            messageContent.innerHTML = "";
            messageContent.innerHTML = message;
        }
    }
    document.addEventListener("keydown",  keylistener);

    const awaitPromise = new Promise((resolve, reject) => {
        approveButton.addEventListener("click", () => {
            closeDialog();
            resolve();
            document.removeEventListener("keydown", keylistener);
        });
        if (showCancel) {
            cancelButton.addEventListener("click", () => {
                reject();
                closeDialog();
                document.removeEventListener("keydown", keylistener);
            });
            messageAction.appendChild(cancelButton);
        }
    });
    messageDiv.appendChild(messageAction);
    document.body.appendChild(messageCover);
    approveButton.setAttribute("aria-label", `${approveText ? approveText : str("approve")}, 你当前正在交互提示框中，按 Shift 键可以阅读提示框内容`);
    approveButton.focus();

    return awaitPromise;
};

export default makeAlert;
