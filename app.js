class Snake {

    // DOM Elements
    app = document.getElementById("app");
    snake = document.getElementById("snake");
    food = document.getElementById("food");
    eatCountElement = document.getElementById("eatCount")

    // App element features
    appWidth = this.app.offsetWidth;
    appHeight = this.app.offsetHeight;

    // Snake Element features
    snakeWidth = this.snake.offsetWidth;
    snakeHeight = this.snake.offsetHeight;
    snakeX = this.snake.offsetLeft;
    snakeY = this.snake.offsetTop

    // Food element features
    foodCount = this.appWidth / this.snakeWidth
    foodX = 0;
    foodY = 0;
    foods = ["🍑", "🥝", "🍎", "🍗", "🍟", "🍉", "🍕", "🍩", "🍤", "🍖", "🥑", "🍍", "🍓", "🌭", "🌮"]

    // Eat element features
    eatCount = 0;

    constructor() {
        this.onSnakeMoving();
        this.onCreateFood();
    }

    onSnakeMoving() {
        const $this = this;
        window.onkeydown = function (event) {
            $this.keyCode = event.code;
            if (!$this.interval) $this.onMoveInterval();
        }
    }

    onMoveInterval() {
        this.interval = setInterval(() => {
            this.onSnakeChangeMovingPosition();
            this.onFail();
        }, 1000)

    }

    onSnakeChangeMovingPosition() {

        switch (this.keyCode) {
            case "ArrowUp":
                this.snakeY = this.snakeY - this.snakeHeight
                break;
            case "ArrowDown":
                this.snakeY = this.snakeY + this.snakeHeight
                break;
            case "ArrowLeft":
                this.snakeX = this.snakeX - this.snakeWidth;
                break;
            case "ArrowRight":
                this.snakeX = this.snakeX + this.snakeWidth
                break;
            default:
                this.snakeX = this.snakeX + this.snakeWidth;
        }


        this.snake.style.top = `${this.snakeY}px`;
        this.snake.style.left = `${this.snakeX}px`;

        this.onSuccessEat()

    }

    onCreateFood() {
        this.foodX = Math.floor(Math.random() * this.foodCount) * this.snakeWidth;
        this.foodY = Math.floor(Math.random() * this.foodCount) * this.snakeHeight;

        this.food.style.top = `${this.foodY}px`;
        this.food.style.left = `${this.foodX}px`;

        const foodIndex = Math.floor(Math.random() * this.foods.length) - 1
        this.food.textContent = this.foods[foodIndex]
    }

    onSuccessEat() {
        if (this.snakeX === this.foodX && this.snakeY === this.foodY) {
            this.eatCount += 1;
            this.eatCountElement.textContent = this.eatCount;
            this.onCreateFood();
        }
    }

    onFail() {
        if (this.snakeX < 0 || this.snakeX === this.appWidth | this.snakeY < 0 | this.snakeY === this.appHeight) {
            alert("You can not move out of box");
            this.onClearInterval();
            this.onReset();
        }
    }

    onClearInterval() {
        clearInterval(this.interval)
    }

    onReset() {
        this.snake.removeAttribute("style");
        this.snakeX = 0;
        this.snakeY = 0;

        this.food.removeAttribute("style");
        this.foodCount = 0;
        this.interval = null;

        this.eatCountElement.textContent = 0;
        this.eatCount = 0;

        this.onCreateFood();
    }
}

new Snake();