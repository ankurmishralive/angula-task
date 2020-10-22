var Todo = require('./models/todo');

function getTodos(res) {
    Todo.find(function (err, todos) {

        // for get err
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all user in JSON format
    });
};

module.exports = function (app) {

    // api call  get all user---------------------------------------------------------------------
   
    app.get('/api/todos', function (req, res) {
       getTodos(res);
    });

    // create user and send back all users after creation
    app.post('/api/todos', function (req, res) {
        Todo.create({
            first: req.body.first,
            address: req.body.address,
            phone: req.body.phone,
            dob: req.body.dob,
            done: false
        },
          function (err, todo) {
            console.log(err)
            if (err)
                res.send(err);

            // get and return all the user after you create another
            getTodos(res);
        });

    });

    app.post('/api/todos/update', function (req, res) {

        console.log(req.body)
        var query = { _id: req.body.id};

 

        // create a user, information comes from Angular
        Todo.update(query, {
            first: req.body.first,
            address: req.body.address,
            phone: req.body.phone,
            dob: req.body.dob,
            done: false
        },{ multi: true },
          function (err, todo) {
            console.log(err) 
            if (err)
                res.send(err);

            // get and return all the users
            getTodos(res);
        });

    });

    // delete a user
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');  
    });
};
