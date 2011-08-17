# StorageInstance.js
StorageInstance is a sessionStorage (html5!) with the difference, that instances have different storage-scopes by default.

Every instance-scope is identified by a key string. You can optionally provide the key-string in a constructor to initialize a certain storage. If it already has values, you will be warned, but can continue and read the stored data.