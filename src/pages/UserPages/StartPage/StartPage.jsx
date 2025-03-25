import React, { useEffect, useRef } from "react";
import "./StartPage.scss";

class TextScramble {
    constructor(el) {
        this.el = el;
        // Burada "chars" sadəcə random simvollar üçün istifadə olunacaq.
        // Final mətnimiz "yaxınlaşdırırıq..." olduğu üçün, burada onu yazmağa ehtiyac yoxdur.
        this.chars = "yaxınlaşdırırıq";
        this.update = this.update.bind(this);
    }

    setText(newText) {
        this.newText = newText; // Final mətnimizi saxlayırıq
        const promise = new Promise((resolve) => (this.resolve = resolve));
        this.queue = [];

        const delay = 5;      // Hərflər arası gecikmə (frame cinsindən)
        const duration = 15;  // Hər bir hərfin animasiya müddəti (frame cinsindən)

        // Hərflərin sırası üzrə vaxtlarını təyin edirik.
        for (let i = 0; i < newText.length-1; i++) {
            const to = newText[i];
            const from = this.randomChar(); // ilkin olaraq random simvol
            const start = 0; // Bütün hərflər eyni anda animasiyaya başlayır
            const end = i * delay + duration; // Hərflər ardıcıl tamamlanır
            this.queue.push({ from, to, start, end, char: "" });
        }

        // Final vaxtını yadda saxlayırıq
        this.finalEnd = this.queue[this.queue.length - 1].end;

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        // Əgər animasiya artıq final vaxtını keçibsə, final mətn tam olaraq göstərilsin.
        if (this.frame >= this.finalEnd) {
            this.el.innerHTML = this.newText;
            this.resolve();
            return;
        }

        let output = "";
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

const StartPage = () => {
    const elRef = useRef(null);

    useEffect(() => {
        const fx = new TextScramble(elRef.current);
        fx.setText("yaxınlaşdırırıq");
    }, []);

    return (
        <div className="start-page-container">
            <h1 className="static-text">Dünyanı sizin üçün</h1>
            <div className="animated-text-container">
                <h1 ref={elRef} className="animated-text"></h1>
                <h1 className="placeholder-text">yaxınlaşdırırıq...</h1>
            </div>
        </div>
    );
};

export default StartPage;
