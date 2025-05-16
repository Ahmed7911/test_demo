document.addEventListener('DOMContentLoaded', () => {
    const mainText = document.getElementById('area1');
    const javaScriptConverted = document.getElementById('javaScriptConverted');
    const CSSConverted = document.getElementById('CSSConverted');
    const CSSDiv = document.getElementById('CSSDiv');
    const javaDiv = document.getElementById('javaDiv');
    const copyjs = document.getElementById('copyjs');
    const copyCSS = document.getElementById('copyCSS'); // Corrected element assignment

    copyjs.addEventListener('click', copyjavaText);
    copyCSS.addEventListener('click', copyCSSText);

    function copyCSSText() {
        var textarea2 = document.getElementById("CSSConverted");
        navigator.clipboard.writeText(textarea2.value).then(function() {
            console.log('Text copied to clipboard');
        }).catch(function(err) {
            console.error('Could not copy text: ', err);
        });
    }

    function copyjavaText() {
        var textarea = document.getElementById("javaScriptConverted");
        navigator.clipboard.writeText(textarea.value).then(function() {
            console.log('Text copied to clipboard');
        }).catch(function(err) {
            console.error('Could not copy text: ', err);
        });
    }

    function handleClick() {
        let text = mainText.value;
        let parts = text.split('"');

        // Clear previous content
        CSSDiv.innerHTML = '';
        javaDiv.innerHTML = '';
        javaScriptConverted.value = '';
        CSSConverted.value = '';

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            const nextPart = parts[i + 1];

            if (nextPart && nextPart.trim()) {
                if (part.includes('id=')) {
                    // Create JavaScript element with select
                    const jsElement = document.createElement('div');
                    jsElement.className = 'js-item';
                    jsElement.innerHTML = `
                        <select class="js-selector">
                            <option value="const">const</option>
                            <option value="var">var</option>
                            <option value="let">let</option>
                        </select>
                        ${nextPart} = document.getElementById('${nextPart}');
                        <button class="add-js-btn" data-name="${nextPart}" data-type="getElementById">Add</button>
                    `;
                    javaDiv.appendChild(jsElement);

                    // Create CSS element
                    const cssElement = document.createElement('div');
                    cssElement.innerHTML = `
                        <div>
                            #${nextPart} {}
                            <button onclick="addToCSS('#${nextPart} {}')">Add</button>
                        </div>
                    `;
                    CSSDiv.appendChild(cssElement);

                } else if (part.includes('class=')) {
                    // Create JavaScript element with select
                    const jsElement = document.createElement('div');
                    jsElement.className = 'js-item';
                    jsElement.innerHTML = `
                        <select class="js-selector">
                            <option value="const">const</option>
                            <option value="var">var</option>
                            <option value="let">let</option>
                        </select>
                        ${nextPart} = document.querySelector('.${nextPart}');
                        <button class="add-js-btn" data-name="${nextPart}" data-type="querySelector">Add</button>
                    `;
                    javaDiv.appendChild(jsElement);

                    // Create CSS element
                    const cssElement = document.createElement('div');
                    cssElement.innerHTML = `
                        <div>
                            .${nextPart} {}
                            <button onclick="addToCSS('.${nextPart} {}')">Add</button>
                        </div>
                    `;
                    CSSDiv.appendChild(cssElement);
                }
            }
        }

        // Add event listeners for JavaScript buttons
        document.querySelectorAll('.add-js-btn').forEach(button => {
            button.addEventListener('click', function() {
                const select = this.parentElement.querySelector('.js-selector');
                const varType = select.value;
                const varName = this.getAttribute('data-name');
                const method = this.getAttribute('data-type');

                let jsCode;
                if (method === 'getElementById') {
                    jsCode = `${varType} ${varName} = document.getElementById('${varName}');`;
                } else {
                    jsCode = `${varType} ${varName} = document.querySelector('.${varName}');`;
                }

                addToJS(jsCode);
            });
        });
    }

    // Add to JavaScript output
    window.addToJS = function(code) {
        const jsOutput = document.getElementById('javaScriptConverted');
        jsOutput.value += code + '\n';
    };

    // Add to CSS output
    window.addToCSS = function(code) {
        const cssOutput = document.getElementById('CSSConverted');
        cssOutput.value += code + '\n';
    };

    // Add click event listener to the button
    document.getElementById('convertButton').addEventListener('click', handleClick);
});
