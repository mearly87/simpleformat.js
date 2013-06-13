var odo = odo || {};
odo.helpers = odo.helpers || {};

odo.helpers.format = function(value, format, escapeCharacter)
{
		var numberRegex = new RegExp(escapeCharacter,"g"),
		numberCount = (format.match(numberRegex)||[]).length,
		rawInput = value.replace(/[^\d]/g, '').substring(0,numberCount);
		newVal = '';
		index = 0;
		for(i in format) {
			var nextChar = rawInput.substring(0,1),
			nextFormat = format[i];
			if (nextFormat == escapeCharacter) {
				newVal += nextChar
				rawInput = rawInput.substring(1);
				if (rawInput.length == 0) {
					break;
				}
			} else {
				newVal += nextFormat;
			}
		}
		return newVal;
}

odo.helpers.formatInput = function(obj, event, format, escapeCharacter)
{
	escapeCharacter = escapeCharacter || 'X';
	if(isCharacterKeyPress(event)) {
			var newVal = odo.helpers.format(obj.value, format, escapeCharacter);
	    	$(obj).change();
	    	if (newVal != obj.value) {
	    		cursor = odo.helpers.getNewCursorPosition(obj.selectionStart, obj.value, newVal, format.length)
	    		obj.value = newVal
	    		if (cursor != -1) {
	    			if(obj.setSelectionRange) {
	    				obj.setSelectionRange(cursor, cursor, 0);
	    			}
	    		}
	    			
	    	}
	    }
}

odo.helpers.formatPhone = function(obj, event)
{
		phoneFormat = '(XXX) XXX-XXXX'
		odo.helpers.formatInput(obj, event, phoneFormat);
}

odo.helpers.formatTaxId = function(obj, event)
{
		var taxIdFormat = 'XX-XXXXXXX';
		odo.helpers.formatInput(obj, event, taxIdFormat);
}

odo.helpers.formatSSN = function(obj, event)
{
		var taxIdFormat = 'XXX-XX-XXXX';
		odo.helpers.formatInput(obj, event, taxIdFormat);
}

odo.helpers.getNewCursorPosition = function(cursor, startVal, endVal, formatLength) {
	newChar = startVal.charAt(cursor - 1),
	nextCharInfo = startVal.substring(cursor, formatLength).match(/\d/),
	nextChar = (nextCharInfo ||[])[0],
	nextCharPos = (nextCharInfo ||{}).index + cursor;
	if(newChar.match(/[^\d]/)) {
		return cursor - 1;
	}
	if(nextChar) {
		return endVal.substring(nextCharPos).indexOf(nextChar) + nextCharPos;
	}
	return -1;
}

// XXX-XX-XXX


function isCharacterKeyPress(evt) {
    if (typeof evt.which == "undefined") {
        // This is IE, which only fires keypress events for printable keys
        return true;
    } else if (typeof evt.which == "number" && evt.which > 0) {
        // In other browsers except old versions of WebKit, evt.which is
        // only greater than zero if the keypress is a printable key.
        // We need to filter out backspace and ctrl/alt/meta key combinations
        return !evt.ctrlKey && !evt.metaKey && !evt.altKey && evt.which != 8;
    }
    return false;
}