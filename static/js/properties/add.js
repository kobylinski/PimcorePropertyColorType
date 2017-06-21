pimcore.element.properties.prototype.add = function (key, type, value, config, inherited, inheritable, description) {

    if(in_array(key, this.disallowedKeys)) {
        return;
    }

    if(typeof description != "string") {
        description = "";
    }

    var store = this.propertyGrid.getStore();

    // check for duplicate name
    var dublicateIndex = store.findBy(function (key, record, id) {
        if (record.data.name.toLowerCase() == key.toLowerCase()) {
            return true;
        }
        return false;
    }.bind(this, key));


    if (dublicateIndex >= 0) {
        if (store.getAt(dublicateIndex).data.inherited == false) {
            Ext.MessageBox.alert(t("error"), t("name_already_in_use"));
            return;
        }
    }

    // check for empty key & type
    if (key.length < 2 || type.length < 1) {
        Ext.MessageBox.alert(t("error"), t("name_and_key_must_be_defined"));
        return;
    }

    if (!value) {
/* ------------------------------------------------------------------------ */
/* Refactoring & type == color condition 									*/ 
        if (type == "bool") {
            value = true;
        }
        else if(type == "color"){
            value = 'FFFFFF';
        }
        else{
            value = "";
        }
/* ------------------------------------------------------------------------ */
/* Original: 																*/
/*
        if (type == "bool") {
            value = true;
        }
        if (type == "document" || type == "asset" || type == "object") {
            value = "";
        }
        if (type == "text") {
            value = "";
        }
        value = "";
*/
/* ------------------------------------------------------------------------ */
    }

    if (typeof inheritable != "boolean") {
        inheritable = true;
    }

    var model = store.getModel();
    var newRecord = new model({
        name: key,
        data: value,
        type: type,
        inherited: false,
        inheritable: inheritable,
        config: config,
        description: description
    });

    store.add(newRecord);

    this.propertyGrid.getStore().group("inherited");
    this.propertyGrid.getView().refresh();
}
