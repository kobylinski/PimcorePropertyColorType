pimcore.element.properties.prototype.getCellEditor = function (record, defaultField ) {
    var data = record.data;
    var value = data.all;

    var type = data.type;
    var property;

    if (type == "text") {
        property = new Ext.form.TextField();
    }
/* ------------------------------------------------------------ */
/* Add color pick field 									    */
    else if (type == "color"){
        property = new Ext.ux.colorpick.Field({
            editable: true
        });
        if(data.value){
            property.applyColor(data.value);
        }else{
            property.applyColor('FFFFFF');
        }
    }
/* ------------------------------------------------------------ */
    
    else if (type == "document" || type == "asset" || type == "object") {
        //no editor needed here
    }
    else if (type == "bool") {
        //no editor needed here
    }
    else if (type == "select") {
        var config = data.config;
        property = new Ext.form.ComboBox({
            triggerAction: 'all',
            editable: false,
            store: config.split(",")
        });
    }

    return property;
};