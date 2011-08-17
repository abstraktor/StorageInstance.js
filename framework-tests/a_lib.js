function assert(not_falsy, errorMessage) {
    errorMessage = errorMessage || this.file + ": Assertion failed!";
    if (!not_falsy) throw new Error(errorMessage);
}
function assert_equals(real_val, should_be, errorMessage) {
    errorMessage = errorMessage || this.file + ": \"" + real_val + "\" and  \"" + should_be + "\" should have an equal value";
    if (JSON.stringify(real_val) != JSON.stringify(should_be)) throw new Error(errorMessage);
}
function assert_same(real_val, should_be, errorMessage) {
    errorMessage = errorMessage || this.file + ": \"" + real_val + "\" and  \"" + should_be + "\" should be the same object";
    if (real_val !== should_be) throw new Error(errorMessage);
}