if (typeof Omeka === 'undefined') {
    Omeka = {};
}

Omeka.CsvImport = {};

/**
 * Allow multiple mappings for each field, and add buttons to allow a mapping
 * to be removed.
 */
Omeka.CsvImport.enableElementMapping = function () {
    jQuery('.csv-import-element-select').change(function () {
        var select = jQuery(this);
        var elementId = select.val();
        if (elementId === '') {
            return;
        }
        var elementName = select.find(':selected').text();

        var hiddenInput = select.siblings('input[type="hidden"]');
        var mappingsString = hiddenInput.val();
        var mappings = [];
        if(mappingsString) {
            mappings = hiddenInput.val().split(',');
        }
        if (jQuery.inArray(elementId, mappings) === -1) {
            mappings.push(elementId);
            hiddenInput.val(mappings.join(','));

            var newMapping = jQuery('<li class="csv-import-element-delete">' + elementName + '</li>');
            newMapping.click(function () {
                Omeka.CsvImport.removeElementMapping(elementId, this);
            });

            var listSpan = select.siblings('span');
            var list = listSpan.children('ul');
            if (!list.length) {
                list = jQuery('<ul></ul>').appendTo(listSpan);
            }

            list.append(newMapping);
        }
        select.val('');
    });
};
/**
 * Remove a mapping and its associated button.
 *
 * @param {string} [elementId] ID of the element to remove the mapping to.
 * @param {Element} [removeButton] Button for mapping to remove.
 */
Omeka.CsvImport.removeElementMapping = function(elementId, removeButton) {
    var button = jQuery(removeButton);
    var hiddenInput = button.parent().parent().siblings('input[type="hidden"]');
    var mappings = hiddenInput.val().split(',');
    var index = jQuery.inArray(elementId, mappings);
    if (index !== -1) {
        mappings.splice(index, 1);
    }
    hiddenInput.val(mappings.join(','));

    button.remove();
};
/** 
*  Modification by UCF RICHES 2013
*  This is the default column mapping.  
*  To change it, change the columnMaps array {element_id:name}  
*  We also hard coded the columns to check.  These can be removed or changed to meet your needs.
*  Right now we have 200= tags, and certain element_ids map to columns that we want to "split"
*  into 2 entries by ";".  There is also a check box for "file" and you may add more than one file 
*  by splitting with ";"
**/
Omeka.CsvImport.default_column_map = function () {
    jQuery(document).ready(function () {
	var columnMaps = {50: "Title",  
		86: "Title:Alternative", 
		49: "Subject", 
		200:"Tags",
		41: "Description", 
		88: "Table Of Contents", 
		87: "Abstract", 
		51: "Type", 
		48: "Source", 
		300: "File"
		};

        var select = jQuery('#csv_import_column_map_elements_list_dropdown_25');
if (!select) return;
var i=0;
for (var index in columnMaps){
        var elementName = columnMaps[index]; 
        var elementId = index; 
        var select = jQuery('#csv_import_column_map_elements_list_dropdown_'+i);
        var hiddenInput = jQuery('#csv_import_column_map_elements_list_hidden_input_'+i);
	if (!select) return;
	if (index >30 ){
	if (i < 3 ){
	   var tagToCheck = jQuery('#csv_import_column_map_split_'+i);
		tagToCheck.attr('checked', true);
	}
	if (index ==200 || index ==300){
	   if (index ==200){
	   	var tagToCheck = jQuery('#csv_import_column_map_tag_'+i);
		tagToCheck.attr('checked', true);
		}
	   if (index ==300){
	   	var fileToCheck = jQuery('#csv_import_column_map_file_'+i);
		fileToCheck.attr('checked', true);
		}
	} else { //only if not a tag
        var mappingsString = "";
        var mappings = [];
        if (jQuery.inArray(elementId, mappings) === -1) {
            mappings.push(elementId);
            hiddenInput.val(mappings.join(','));

            var newMapping = jQuery('<li class="csv-import-element-delete">' + elementName + '</li>');
            newMapping.click(function () {
                Omeka.CsvImport.removeElementMapping(elementId, this);
            });

            var listSpan = select.siblings('span');
            var list = listSpan.children('ul');
            if (!list.length) {
                list = jQuery('<ul></ul>').appendTo(listSpan);
            }

            list.append(newMapping);
        }}
        select.val('');
	}
	i++;
}//for
    });
};
/**
 * Add a confirm step before undoing an import.
 */
Omeka.CsvImport.confirmUndoImport = function () {
    jQuery('.csv-undo-import').click(function () {
        return confirm("Undoing an import will delete all of its imported items. Are you sure you want to undo this import?");
    });
};
