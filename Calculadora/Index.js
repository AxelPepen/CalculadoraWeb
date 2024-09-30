(function() { 
    const screen = document.querySelector('.screen');
    const buttons = document.querySelectorAll('.btn');
    const clear = document.querySelector('.btn-clear');
    const equal = document.querySelector('.btn-equal');
    const historyList = document.querySelector('.history-list');
    const clearHistoryBtn = document.querySelector('.btn-clear-history');

    function loadHistory() {
        const history = JSON.parse(localStorage.getItem('history')) || [];
        history.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            historyList.appendChild(li);
        });
    }

    function addToHistory(calculation) {
        let history = JSON.parse(localStorage.getItem('history')) || [];
        history.push(calculation);
        localStorage.setItem('history', JSON.stringify(history));

        const li = document.createElement('li');
        li.textContent = calculation;
        historyList.appendChild(li);
    }

    buttons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            const value = e.target.dataset.num;
            if (value !== undefined) {
                if (screen.value === "ingrese una operacion") {
                    screen.value = "";  
                }
                screen.value += value;  
            }
        });
    });

    equal.addEventListener('click', function() {
        if (screen.value === '' || screen.value === "ingrese una operacion") {
            screen.value = "ingrese una operacion";
        } else {
            try {
                const answer = eval(screen.value);
                const calculation = `${screen.value} = ${answer}`;
                screen.value = answer;
                addToHistory(calculation);  
            } catch (error) {
                screen.value = "Error";
            }
        }
    });

    clear.addEventListener('click', function() {
        screen.value = "";
    });

    clearHistoryBtn.addEventListener('click', function() {
        localStorage.removeItem('history');
        historyList.innerHTML = '';
    });

    loadHistory();
})();
