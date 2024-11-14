// Ja vēsture ir saglabāta vietējā atmiņā, ielādējam to
let history = JSON.parse(localStorage.getItem('history')) || [];

// Funkcija, kas pievieno vērtības uz ekrāna
function appendToDisplay(value) {
    const display = document.getElementById('display');
    display.value += value; // Pievieno rakstzīmi ievades laukā
}

// Funkcija, kas aprēķina izteiksmi
function calculate() {
    const display = document.getElementById('display');
    try {
        // Izmanto eval() funkciju, lai aprēķinātu izteiksmi
        let result = eval(display.value);
        // Pievieno aprēķinu vēsturei
        addToHistory(display.value + " = " + result);
        display.value = result; // Parāda rezultātu ekrānā
    } catch (error) {
        display.value = 'Error'; // Ja ir kļūda, parāda "Error"
    }
}

// Funkcija, kas dzēš visu ievadi
function clearDisplay() {
    document.getElementById('display').value = ''; // Notīra ievades lauku
}

// Funkcija, kas pievieno ierakstu vēsturē
function addToHistory(entry) {
    history.push(entry); // Pievieno jaunu ierakstu vēsturei
    localStorage.setItem('history', JSON.stringify(history)); // Saglabā vēsturi vietējā atmiņā
    updateHistory(); // Atjaunina vēstures sarakstu
}

// Funkcija, kas atjaunina vēstures sarakstu
function updateHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = ''; // Notīra vēstures sarakstu
    history.forEach((entry, index) => {
        const li = document.createElement('li');
        li.innerHTML = entry + ' <button onclick="deleteHistoryItem(' + index + ')">Dzēst</button>';
        historyList.appendChild(li); // Pievieno katru ierakstu sarakstam
    });
}

// Funkcija, kas dzēš atsevišķu vēstures ierakstu
function deleteHistoryItem(index) {
    history.splice(index, 1); // Izņem ierakstu no vēstures
    localStorage.setItem('history', JSON.stringify(history)); // Saglabā atjaunoto vēsturi
    updateHistory(); // Atjaunina vēstures sarakstu
}

// Funkcija, kas dzēš visu vēsturi
function clearHistory() {
    history = []; // Notīra visu vēsturi
    localStorage.setItem('history', JSON.stringify(history)); // Saglabā tukšu vēsturi
    updateHistory(); // Atjaunina vēstures sarakstu
}

// Inicializē vēsturi, kad lapa tiek ielādēta
updateHistory();
