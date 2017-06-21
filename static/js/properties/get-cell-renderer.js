pimcore.element.properties.prototype.getCellRenderer = function (value, metaData, record, rowIndex, colIndex, store) {

    var data = store.getAt(rowIndex).data;
    var type = data.type;

    if (!value) {
        value = "";
    }
    
    if (type == "document" || type == "asset" || type == "object") {
        if (value && data.inherited == false) {
            return '<div class="pimcore_property_droptarget">' + value + '</div>';
        }
        else if (data.inherited == false) {
            return '<div class="pimcore_property_droptarget">&nbsp;</div>';
        }
    } else if (type == "bool" && data.inherited == false) {
        if (value) {
            return '<div style="text-align: left"><div role="button" class="x-grid-checkcolumn x-grid-checkcolumn-checked" style=""></div></div>';
        } else {
            return '<div style="text-align: left"><div role="button" class="x-grid-checkcolumn" style=""></div></div>';
        }
/* ----------------------------------------------------------------------- */
/* Add cell renderer 													   */
    } else if(type == "color") {
        if(value) {
            return '<div><span style="width:1em;height:1em;display:inline-block;vertical-align: middle;background-color: #'+value+';margin-right:1em;"></span>#'+value+'</div>';
        }else{
            return 'empty';
        }
    }
/* ----------------------------------------------------------------------- */

    return value;
};