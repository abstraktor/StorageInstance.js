function StorageInstance(
/*optional*/
prefix) {
    /*
		this is a proxy class to sessionStore that emulates multiple sessionstores
		with prefixing the keys (with increasing numbers or a given prefix 
		for debugging purposes)
		
		To avoid complications, accesss sessionStorage only through this proxy.
		
		Wording:
			id: the key provided to a StorageInstance when getting, setting etc.
			key: the key generated of the id that is unique to the sessionStorage	
	*/

    var self = this;

    function _key_from_id_with_sid(storage_id, id) {
        return "si" + storage_id + "_" + id;
    }

    function key_from_id(id) {
        //prepends a prefix to the id
        return self.prefix + id;
    }

    function id_from_key(key) {
        //cuts the prefix off the key
        return key.substring(self.prefix.length);
    }

    function test_for_mine(str) {
        //this tests a given key whether it belongs to this storage or not
        return new RegExp("^" + key_from_id("")).test(str)
    }

    function _all_keys() {
        // this function returns all keys used in the sessionStorage
        // WARNING: that ones that aren't mine as well
        res = [];
        for (i = 0; i < sessionStorage.length; i++)
        res.push(sessionStorage.key(i));
        return res;
    };
	
	function update_timestamp() {
        self.setItem("", new Date().getTime());
    };

    this.ids = function() {
        //returns all known keys in this storage
        res = [];
        for (i = 0; i < sessionStorage.length; i++)
        if (test_for_mine(sessionStorage.key(i)))
        res.push(id_from_key(sessionStorage.key(i)));
        return res;
    };

    this.getItems = function(ids) {
        //returns multiple items of a storage
        return ids().map(function(id) {
            //fetch this item from cache
            return self.getItem(id);
        });
    };

    this.get = function(id) {
        //returns the item of a storage with the key key
        return JSON.parse(sessionStorage.getItem(key_from_id(id)));
    };
    this.getItem = this.get;

    this.set = function(id, val) {
        //sets a value in the storage
        sessionStorage.setItem(key_from_id(id), JSON.stringify(val));
    };
    this.setItem = this.set;

    this.getAll = function() {
        //returns all elements of a storage
        return self.getItems(self.ids());
    };

    this.clear = function() {
        //deletes all items off a storage
        self.removeItems(self.ids());
        self.setItem("", new Date().getTime());
    };

    this.destroy = function() {
        //deletes all items off a storage and unreferences this StorageInstance
        self.clear();
        self.removeItem("");
    };

    this.removeItems = function(ids) {
        this.ids().forEach(bind(this, this.removeItem));
    }

    this.removeItem = function(id) {
        sessionStorage.removeItem(key_from_id(id));
    };

    this.length = function() {
        return ids().length;
    };


    self.prefix = prefix;

    // if no or a falsy prefix is given, lets find an unused generated
    if (prefix == undefined) {
        all_keys = _all_keys();
        var i = 0;
        for (i = 0; true; i++)
        {
            self.prefix = _key_from_id_with_sid(i, "");
            if (!sessionStorage.getItem(key_from_id("")))
            break;
        };
        update_timestamp();
    }
    else if (self.getItem(""))
    console.warn("you are reusing a storageInstance!");
    else update_timestamp();

}