type callback = {
    <E extends Error> (err: E, ...rest: any[]): void
};

function promisify <E extends Error>(fn: (...args: (any|callback)[]) => void) {
    return (...args: any[]) => new Promise((resolve, reject) => {
        fn(...args, (err: E, ...rest: any[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(...rest);
            }
        });
    });
}

export default promisify;