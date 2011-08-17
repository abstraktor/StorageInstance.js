(function() {
    this.file = "storageInstance.test.js";
    (function getItem() {
        var st = new StorageInstance();
        st.setItem("a", {
            'e': 3
        });
        assert_equals(st.getItem("a"), {
            'e': 3
        });
        st.destroy();
    })();
    (function clear() {
        var st = new StorageInstance();
        st.setItem("a", {
            'e': 3
        });
        st.clear();
        assert(st.getItem(""));
        st.destroy();
    })();
    (function destroy() {
        var st = new StorageInstance();
        st.setItem("a", {
            'e': 3
        });
        st.destroy();
        assert(!st.getItem(""));
    })();
    (function multipleInstances() {
        var st = new StorageInstance("a");
        var st_b = new StorageInstance("a");
        st.setItem("x13", {
            'e': 3
        });
        assert_equals(st.getItem("a"), st_b.getItem("a"));
        st.destroy();
    })();
})();
