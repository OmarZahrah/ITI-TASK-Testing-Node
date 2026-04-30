
describe("lab testing:", () => {

    describe("users routes:", () => {
        it("(GET /user/search) should respond with the correct user with the name requested",  () => { 
            // Note: user name must be sent in request query not request params
        })
        it("GET /user/search with invalid name should respond with status 404 and the message",  () => { })

    })


    describe("todos routes:", () => {
        it("(PATCH /todo) without title with id only should respond with res status 400 and a message",  () => { })
        it("(PATCH /todo) with id and title should respond with status 200 and the new todo",  () => { })

        it("(GET /todo/user) should respond with the user's all todos",  () => { })
        it("(GET /todo/user) for a user hasn't any todo, should respond with status 200 and a message",  () => { })

    })



})