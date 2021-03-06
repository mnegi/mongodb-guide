const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


 // before() => to get connection only once
before((done) => {
    mongoose.connect('mongodb://localhost:27017/users_test', { useNewUrlParser: true });
    mongoose.connection
        .once('open', () => { done();})
        .on('error', (error) => {
            console.warn('Warning', error);
        });
});


 
beforeEach((done) => {
    const { users, comments, blogposts } = mongoose.connection.collections;

    users.drop(() => {
        comments.drop(() => {
            blogposts.drop(() => {
                done();
            })
        })
    });
});