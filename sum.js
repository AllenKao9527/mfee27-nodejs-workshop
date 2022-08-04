function sum(n) {
    let result = 0;
    for (let i = 1; i <= n; i++) {
        result += i;
    }
    return result;    
} 



function sum2(n){
    // n只跑1次
    //時間複雜度 O(n)
    return ((n+1) * n) / 2;
}

function sum3(n) {
    if (n === 1) {
        return n;
    }
    return sum3(n - 1) + n;}


console.time()
// console.log(sum(1));
// console.log(sum(3));
// console.log(sum(10));
