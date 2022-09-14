let shuihu_book;
let all_books;
let sanguo_book;
let xiyou_book;
let jpm_book;
let hlm_book;
let state = 0;
let char_size = 48;
let backgroundColor;
let important_chars = "之的說曰了不他我"

function setup() {
    createCanvas(windowWidth, windowHeight);
    backgroundColor = color(20, 20, 20)
    shuihu_book = new Book(shuihu, "Water Margin", char_size, height / 2, 1, color(255, 0, 255))
    sanguo_book = new Book(sanguo, "Three Kingdoms", char_size / 2, height / 5 * 2, 15, color(0, 255, 255))
    xiyou_book = new Book(xiyouji, "Journey to the West", char_size / 2, height / 5 * 3, 15, color(255, 255, 0))
    jpm_book = new Book(jpm, "Plum in the Golden Vase", char_size / 2, height / 5 * 4, 15, color(0, 255, 0))
    all_books = [shuihu_book, sanguo_book, xiyou_book, jpm_book];
}

function draw() {
    background(backgroundColor);

    if (state == 0) {
        shuihu_book.run()
        shuihu_book.drawTitle()
    }

    if (state == 1) {
        shuihu_book.run()
        shuihu_book.drawTitle()
        shuihu_book.drawBox()
        shuihu_book.drawCounter()
    } else if (state == 2) {
        shuihu_book.run()
        shuihu_book.drawTitle()
        shuihu_book.speed = lerp(shuihu_book.speed, 15, .05)
        shuihu_book.drawBox()
        shuihu_book.drawCounter()
    } else if (state == 3) {
        shuihu_book.run()
        shuihu_book.drawTitle()
        shuihu_book.drawBox()
        shuihu_book.drawCounter()
        shuihu_book.drawCharacters()
    } else if (state == 4) {

        if (shuihu_book.y != height / 6) {
            shuihu_book.run()
            shuihu_book.drawTitle()
            shuihu_book.y = lerp(shuihu_book.y, height / 6, .025)
            shuihu_book.character_size = lerp(shuihu_book.character_size, char_size / 2, 0.025)
            shuihu_book.drawBox()
            shuihu_book.drawCounter()
            shuihu_book.drawCharacters()
        }
        for (let i = 1; i < all_books.length; i++) {
            let book = all_books[i]
            if (shuihu_book.y < height / 6 + 10) {
                book.run()
                book.drawTitle()
                book.drawBox()
                book.drawCounter()
                book.drawCharacters()
            }
        }

    } else if (state == 5) {
        for (let i = 0; i < all_books.length; i++) {
            let book = all_books[i]

            if (!book.counting_complete) {
                book.count_characters()
            }

            book.drawTitle()

            book.drawCharacters()
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        state -= 1
    } else if (keyCode === RIGHT_ARROW) {
        state += 1
    }
}