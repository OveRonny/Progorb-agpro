export default class Result {
    constructor(status, value = null, message = null) {
        this.status = status; 
        this.value = value;
        this.message = message;
    }

    static success(value) { return new Result("success", value); }
    static alreadyExists(value) { return new Result("alreadyExists", value, "Item already exists"); }
    static failure(message) { return new Result("failure", null, message); }
}