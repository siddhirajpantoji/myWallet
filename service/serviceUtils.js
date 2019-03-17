function runSequence(data) {
    return data.reduce((p, item) => {
        return p.then(item[0]).then(item[1]).catch(item[2]);
    }, Promise.resolve());
}


module.exports = {runSequence}