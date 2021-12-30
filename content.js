const vahak_ext = function(){
    this.vahak_feedback_store = {
        isLoaded: false,
        isStarted: false,
        message: ""

    }
    this.loadScript = (url, callback) => {
        const script = document.createElement("script")
        script.type = "text/javascript";
        if (script.readyState) {  // only required for IE <9
            script.onreadystatechange = function () {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  //Others
            script.onload = function () {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    this.feedbackBtnhandler = (e) => {
        if (!this.vahak_feedback_store.isLoaded) {
            this.start();
        }
        else if (this.vahak_feedback_store.isLoaded) {
            const url = prompt("Enter the feedback url to send");
            console.log(url);
        }
    }
    this.addFeedButton = (hashChane) => {
        const button = window.$("<button id='vahak-feedback-btn' style='background: red;padding: 0.75rem;border-radius: 0.95rem 0.95rem 0.95rem 0rem;color: white;font-family: fantasy;font-weight: 500;font-size: 1.55rem;'>"+(hashChane ? "Ready":"Loading...")+"</button>");
        button.prependTo(window.$(".rc-header__block.rc-header__block-action"));
        setTimeout(() => {
            document.querySelector("#vahak-feedback-btn").addEventListener("click", this.feedbackBtnhandler);
        }, 300);
    }
    this.attachCloseBtnHandler = () => {
        setTimeout(() => {
            // close btn clciked
            if (document.querySelector("button.button.button-block.close-livechat")) {
                document.querySelector("button.button.button-block.close-livechat").addEventListener("click", (e) => {
                    console.log("Clicked close livechat");
                    setTimeout(() => {
                        var isSendClicked = false;
                        window.localStorage.setItem("emoji.recent", "smiley");
                        // emoji open
                        window.$(".rc-icon.rc-input__icon-svg.rc-input__icon-svg--emoji").click();
                        setTimeout(() => {
                            window.$("li[data-emoji='smiley']").click();
                        }, 300);
                        setTimeout(() => {
                            window.$("#hsm-message-mak").val("Hello please fill out the feedback! https://vaha.com/feedback/phone_num");
                            console.log(document.querySelector("span.rc-message-box__icon.rc-message-box__send.js-send > svg"));
                            if (document.querySelector("span.rc-message-box__icon.rc-message-box__send.js-send > svg")) {
                                window.$("span.rc-message-box__icon.rc-message-box__send.js-send > svg").click();
                            }
                            else {
                                setTimeout(() => {
                                    window.$("span.rc-message-box__icon.rc-message-box__send.js-send > svg").click();
                                }, 300);
                            }
                        }, 400);
                    });
                }, 300);
            }
            else {
                this.attachCloseBtnHandler();
            }
        }, 300);
    }
    this.attachVisitHandler = (event) => {
        console.log("Clicked visit-info");
        this.vahak_feedback_store.isStarted = true;
        // window.$('#vahak-feedback-btn').html("Feedback").show();
        this.feedBackBtnUpdate("Feedback");
        this.attachCloseBtnHandler();
    }
    this.feedBackBtnUpdate = (text) => {
        setTimeout(() => {
            window.$('#vahak-feedback-btn').hide();
            window.$('#vahak-feedback-btn').html(text).fadeIn();
        }, 300);
    }
    this.start = () => {
        setTimeout(() => {
            console.log("Loading: ", document.querySelector("div.loading-animation"));
            if (!document.querySelector("div.loading-animation")) {
                this.afterDomload();
            } else {
                this.start();
            }
        }, 500);
    }
    this.afterDomload = () => {
        console.log("Hello from vahak_ext");
        console.log(window.jQuery);
        // button adder on change url
        let lastUrl = location.href; 
        new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            onUrlChange();
        }
        }).observe(document, {subtree: true, childList: true});
        
        
        function onUrlChange() {
        if(!document.querySelector("#vahak-feedback-btn")){
            setTimeout(this.addFeedButton(true), 180);    
        }
        }
        setTimeout(this.addFeedButton, 300);
        // if (!window.jQuery) {
        //     const jquery_url = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js';
        //     this.loadScript(jquery_url, function () {
        //         alert('script ready!');
        //     });         
        // }
        var click_event = new CustomEvent('click');
        if (!document.querySelector("div[data-id='visitor-info']")) {
            // window.location.reload(true);
            this.vahak_feedback_store.isLoaded = false;
            // window.$('#vahak-feedback-btn').hide();
            // window.$('#vahak-feedback-btn').html("Load").fadeIn();
            this.feedBackBtnUpdate("Load");
        }
        else {
            this.vahak_feedback_store.isLoaded = true;
            console.log("btn", document.querySelector('#vahak-feedback-btn'));
            this.feedBackBtnUpdate("Ready");
            // window.$('#vahak-feedback-btn').fadeIn();
            document.querySelector("div[data-id='visitor-info']").addEventListener("click", this.attachVisitHandler);
        }

    }
    if (document.readyState === 'loading') {
        window.addEventListener("DOMContentLoaded", this.start);
    } else {
        this.start();
    }
};
vahak_ext();
