class Character {
    constructor(char, x, y, size, input_color) {
        this.value = char;
        this.v = new p5.Vector(x, y);
        this.size = size;
        this.color = input_color
        this.counted = false
        this.alignment_horizontal = LEFT
        this.alignment_vertical = CENTER
    }

    move(speed) {
        this.v.x -= speed;
    }

    draw() {
        noStroke()
        fill(this.color)
        strokeWeight(1)
        textSize(this.size)
        textAlign(this.alignment_horizontal, this.alignment_vertical)
        text(this.value, this.v.x, this.v.y)
    }
}

class Book {
    constructor(input_string, title, character_size, y_value, speed, input_color) {
        this.text = input_string
        this.title = title
        this.character_size = character_size
        this.active_chars = new Array();
        this.current_index = 0;
        this.speed = speed
        this.y = y_value
        this.color = input_color
        this.character_counter = {}
        this.actively_counting = ""
        this.imp_chars = []
        this.counting_complete = false
    }

    count_characters() {
        this.character_counter = {}
        for (let i = 0; i < this.text.length; i++) {
            if (this.text[i] in this.character_counter) {
                this.character_counter[this.text[i]] += 1
            } else {
                this.character_counter[this.text[i]] = 1
            }
        }
        this.counting_complete = true
    }

    spawn_char() {
        let char = new Character(this.text[this.current_index], width, this.y, this.character_size, this.color)
        this.active_chars.push(char)
        this.current_index += 1
    }

    run() {

        if (this.active_chars.length == 0) {
            this.current_index = 0
            this.spawn_char()
        }

        for (let i = 0; i < this.active_chars.length; i++) {
            let c = this.active_chars[i]
            c.move(this.speed)
            c.v.y = this.y
            c.draw()

            if (c.v.x < width / 2 && !c.counted) {

                if (c.value in this.character_counter) {
                    this.character_counter[c.value] += 1
                } else {
                    this.character_counter[c.value] = 1
                }

                c.counted = true;
            }
            if (c.v.x < width / 2) {
                this.actively_counting = c.value + ": " + str(this.character_counter[c.value])
            }


        }

        if (this.active_chars[this.active_chars.length - 1].v.x < width - this.character_size && this.current_index < this.text.length) {
            this.spawn_char()
        }

        if (this.active_chars[0].v.x < -this.character_size) {
            this.active_chars.shift()
        }



    }

    drawTitle() {
        noStroke()
        fill(this.color)
        strokeWeight(1)
        textSize(this.character_size * .75)
        textAlign(LEFT, CENTER)
        text(this.title, width / 10, this.y - this.character_size * 2)
    }

    drawBox() {

        noFill()
        stroke(this.color)
        strokeWeight(4)
        rectMode(CENTER)
        rect(width / 2, this.y, this.character_size * 1.5)

    }

    drawCounter() {
        noStroke()
        fill(this.color)
        strokeWeight(1)
        textSize(this.character_size)
        textAlign(CENTER, CENTER)
        text(this.actively_counting, width / 2, this.y - this.character_size * 2)
    }

    drawCharacters() {
        if (this.imp_chars.length == 0) {
            for (let i = 0; i < important_chars.length; i++) {
                let temp_char = new Character(important_chars[i] + ":0", width / (important_chars.length + 1) * (i + 1), this.y + this.character_size * 1.5, this.character_size / 2, this.color)

                temp_char.alignment_horizontal = CENTER
                this.imp_chars.push(temp_char)
            }
        }

        let char_lab
        for (let i = 0; i < important_chars.length; i++) {
            if (important_chars[i] in this.character_counter) {
                let total_char_rate = Math.round((this.character_counter[important_chars[i]] / this.text.length) * 1000000) / 100

                char_lab = important_chars[i] + ":" + str(this.character_counter[important_chars[i]])
            } else {
                char_lab = important_chars[i] + ":0"
            }

            let active_char_lab = this.imp_chars[i]

            if (active_char_lab.v.y != this.y + this.character_size * 1.5) {
                active_char_lab.v.y = lerp(active_char_lab.v.y, this.y + this.character_size * 1.5, .025)
            }

            if (active_char_lab.value != char_lab) {
                active_char_lab.value = char_lab
                active_char_lab.color = color(255, 255, 255)
                active_char_lab.size = this.character_size;
            }

            if (active_char_lab.color != this.color) {
                active_char_lab.color = lerpColor(active_char_lab.color, this.color, .025)
            }

            if (active_char_lab.size != this.character_size / 2) {
                active_char_lab.size = lerp(active_char_lab.size, this.character_size / 2, .025)
            }

            active_char_lab.draw();
        }
    }

}
