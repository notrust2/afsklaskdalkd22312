
    const images = [
        'pngbmb/signals/85.png',
        'pngbmb/signals/86.png',
        'pngbmb/signals/87.png',
        'pngbmb/signals/88.png',
        'pngbmb/signals/89.png',
        'pngbmb/signals/90.png',
        'pngbmb/signals/91.png',
        'pngbmb/signals/92.png',
        'pngbmb/signals/93.png',
        'pngbmb/signals/94.png',
        'pngbmb/signals/95.png',
        'pngbmb/signals/96.png',
        'pngbmb/signals/97.png',

    ];

    let dotsCount = 0;
    let numRows = 2;
    let numCols = 2;
    let maxDots = 3;
    let squareSize = 130;
    
    function getRandomImage() {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
}
    
    function initializeBoard() {
        const gameBoard = document.getElementById('gameBoard');
        const playButton = document.querySelector('.custom-button-play');
        const resetButton = document.querySelector('.reset-button');
    
        gameBoard.innerHTML = '';
        for (let i = 0; i < numRows; i++) {
            const newRow = document.createElement('div');
            newRow.className = 'row';
            for (let j = 0; j < numCols; j++) {
                const newSquare = document.createElement('div');
                newSquare.className = 'square';
                newSquare.style.width = `${squareSize}px`;
                newSquare.style.height = `${squareSize}px`;
    
                const image = document.createElement('img');
                image.src = getRandomImage(); // Выбираем случайное изображение
                image.style.width = '100%';
                image.style.height = '100%';
                image.style.opacity = '0'; // Скрываем изображение по умолчанию
                image.className = 'green'
                newSquare.appendChild(image);
    
                newRow.appendChild(newSquare);
            }
            gameBoard.appendChild(newRow);
        }
        updateSelectAndButtonWidth();
    }
    
    function updateBoardSize() {
        const gameBoard = document.getElementById('gameBoard');
        const rowWidth = squareSize * numCols + (numCols - 1) * 2.7;
        gameBoard.style.width = `${rowWidth}px`;
        updateSelectAndButtonWidth();
    }
    
    function updateSelectAndButtonWidth() {
        const gameBoard = document.getElementById('gameBoard');
        const playButton = document.querySelector('.custom-button-play');
        const resetButton = document.querySelector('.reset-button');
        const firstRow = gameBoard.querySelector('.row');
        if (firstRow) {
            const firstRowWidth = firstRow.offsetWidth;
            // playButton.style.width = `${firstRowWidth}px`;
        
        }
    }
    
    function placeDot(rowNumber) {
        const gameBoard = document.getElementById('gameBoard');
        const rows = Array.from(gameBoard.querySelectorAll('.row'));
        const squares = rows[numRows - 1 - rowNumber].querySelectorAll('.square');
        const randomSquare = Math.floor(Math.random() * squares.length);
    
        const image = squares[randomSquare].querySelector('img');
        if (image) {
            image.style.opacity = '1'; // Показываем изображение
        }
    }
    
    function addRowWithDot() {
        const gameBoard = document.getElementById('gameBoard');
        const newRow = document.createElement('div');
        newRow.className = 'row';
        for (let i = 0; i < numCols; i++) {
            const newSquare = document.createElement('div');
            newSquare.className = 'square';
            newSquare.style.width = `${squareSize}px`;
            newSquare.style.height = `${squareSize}px`;
    
            const image = document.createElement('img');
            image.src = 'pngbmb/signals/87.png'; // Путь к изображению
            image.style.width = '100%';
            image.style.height = '100%';
            image.style.opacity = '0'; // Скрыто по умолчанию
            newSquare.appendChild(image);
    
            newRow.appendChild(newSquare);
        }
        gameBoard.insertBefore(newRow, gameBoard.firstChild);
        placeDotInNewRow(newRow);
        updateSelectAndButtonWidth();
    }
    
    function placeDotInNewRow(newRow) {
        const squares = newRow.querySelectorAll('.square');
        const randomSquare = Math.floor(Math.random() * squares.length);

        const newImage = document.createElement('img');
        newImage.src = getRandomImage(); // Выбираем случайное изображение
        newImage.style.width = '100%';
        newImage.style.height = '100%';
        newImage.style.opacity = '1'; // Показываем изображение
        newImage.className = 'green';

        squares[randomSquare].innerHTML = ''; // Очищаем содержимое квадрата
        squares[randomSquare].appendChild(newImage); // Добавляем новое изображение
    }
    
    function removeRowWithDot() {
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.removeChild(gameBoard.lastChild);
        updateSelectAndButtonWidth();
    }
    
    function maintainRowCount() {
        const gameBoard = document.getElementById('gameBoard');
        while (gameBoard.children.length > numRows) {
            gameBoard.removeChild(gameBoard.lastChild);
        }
    }
    
    function clearAllSquares() {
        const gameBoard = document.getElementById('gameBoard');
        const images = gameBoard.querySelectorAll('img');
        images.forEach(image => image.style.opacity = '0'); // Скрываем все изображения
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        const gameBoard = document.getElementById('gameBoard');
        const playButton = document.querySelector('.custom-button-play');
        const resetButton = document.querySelector('.reset-button');
    
        resetButton.addEventListener('click', () => {
            clearAllSquares();
            dotsCount = 0;
        });
    
        playButton.addEventListener('click', () => {
            if (dotsCount >= maxDots) {
                showCustomAlert('Game end!');
                return;
            }
    
            if (dotsCount < numRows) {
                placeDot(dotsCount);
            } else {
                removeRowWithDot();
                addRowWithDot();
            }
            dotsCount++;
            maintainRowCount();
        });
    
        window.addEventListener('resize', () => {
            updateBoardSize();
        });
    
        initializeBoard();
        updateBoardSize();
    });
    
    document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
            event.preventDefault(); // Отключаем стандартное поведение при мультитач событиях
        }
    }, { passive: false });
    
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault(); // Отключаем двойное нажатие
        }
        lastTouchEnd = now;
    }, false);
    
    function openPopup() {
        var popup = document.getElementById("popup");
        popup.style.display = "block";
    }
    
    function closePopup() {
        var popup = document.getElementById("popup");
        popup.style.display = "none";
    }
    
    function selectOption(value) {
        var selectedOption = document.querySelector(".selected-option");
        selectedOption.textContent = value;
        closePopup(); // Закрываем модальное окно после выбора
    
        // Обновляем параметры игры в зависимости от выбранного значения
        if (value === "6x15") {
            numRows = 5;
            numCols = 6;
            maxDots = 15;
            squareSize = 52;
        } else if (value === "3x6") {
            numRows = 3;
            numCols = 3;
            maxDots = 6;
            squareSize = 70;
        } else if (value === "2x3") {
            numRows = 2;
            numCols = 2;
            maxDots = 3;
            squareSize = 90;
        } else if (value === "4x9") {
            numRows = 4;
            numCols = 4;
            maxDots = 9;
            squareSize = 65;
        } else if (value === "5x12") {
            numRows = 4;
            numCols = 5;
            maxDots = 12;
            squareSize = 60;
        }
    
        initializeBoard();
        updateBoardSize();
        clearAllSquares();
        dotsCount = 0;
        updateStylesForFieldSize(value);

    }

    function updateStylesForFieldSize(fieldSize) {
        const gameBoard = document.getElementById('gameBoard');
        const resetButton = document.querySelector('.reset-button');

        if (fieldSize === "5x12") {
            gameBoard.style.marginBottom = "40px"; // Увеличиваем отступ снизу для игрового поля
            resetButton.style.marginTop = "40px"; // Увеличиваем отступ сверху для кнопки reset
        } else {
            gameBoard.style.marginBottom = "20px"; // Возвращаем стандартный отступ снизу для игрового поля
            resetButton.style.marginTop = "20px"; // Возвращаем стандартный отступ сверху для кнопки reset
        }
    }
    // Функция для отображения пользовательского диалогового окна
    function showCustomAlert(message) {
            const customAlert = document.getElementById('custom-alert');
            const customAlertMessage = document.getElementById('custom-alert-message');
            customAlertMessage.textContent = message;
            customAlert.style.display = 'flex';

            // Добавляем обработчик события click на элемент фона
            customAlert.addEventListener('click', handleClickOutside);
        }

    // Функция для закрытия пользовательского диалогового окна
    function closeCustomAlert() {
        const customAlert = document.getElementById('custom-alert');
        customAlert.style.display = 'none';

        // Удаляем обработчик события click
        customAlert.removeEventListener('click', handleClickOutside);
    }

    // Обработчик события click для закрытия диалогового окна при клике вне его области
    function handleClickOutside(event) {
        const customAlertContent = document.querySelector('.custom-alert-content');
        const isClickInside = customAlertContent.contains(event.target);

        if (!isClickInside) {
            closeCustomAlert();
        }
    }



