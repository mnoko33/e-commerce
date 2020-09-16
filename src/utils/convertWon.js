// 가격을 회계형식으로 변경
function convertWon(x) {
    x = String(x);
    let result = '';
    const N = x.length;
    for (let i = 0; i < N; i++) {
        result += x[i];
        if ((N - i - 1) % 3 === 0 && i < N - 1) {
            result += ',';
        }
    }
    return result;
}

export default convertWon;