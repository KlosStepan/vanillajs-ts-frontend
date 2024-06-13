const content = document.getElementById('calculation');

function add(x: number, y: number): void {
    const result: number = x + y;
    if (content) { // Check if content is not null
        content.innerHTML = `<span>${result}</span>`;
    }
}
if (content) {
    add(12, 17);
}
