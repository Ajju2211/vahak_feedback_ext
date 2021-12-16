function injectScript(file_path, tag) {
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
}
console.log(chrome.runtime.getURL('content.js'));
injectScript(chrome.runtime.getURL('content.js'), 'body');